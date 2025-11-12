"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const optionalText = z
  .string()
  .max(500)
  .optional()
  .or(z.literal(""))
  .transform((value) => value?.trim() ?? "");

const canaisDigitaisOptions = [
  "Instagram",
  "Facebook",
  "TikTok",
  "Site/Blog institucional",
  "E-commerce próprio",
  "WhatsApp Business",
  "E-mail marketing",
  "LinkedIn",
  "Google Meu Negócio",
];

const tarefasIAOptions = [
  "Criar textos para redes sociais",
  "Gerar imagens, artes ou banners",
  "Criar vídeos ou roteiros",
  "Escrever descrições de produtos",
  "Responder clientes (chatbots)",
  "Analisar dados de campanhas",
  "Gerar ideias/brainstorming",
  "Traduzir conteúdos",
];

const motivosParadaOptions = [
  "Resultados não eram bons",
  "Muito difícil de usar",
  "Falta de tempo para aprender",
  "Conteúdo muito genérico",
  "Preocupações com erros/qualidade",
  "Custo não justificava",
];

// Schema de validação
const formSchema = z
  .object({
    nomeEmpresa: optionalText,
    localizacao: z.enum(["capivari", "outra"], {
      required_error: "Selecione a localização da empresa",
    }),
    numeroFuncionarios: z.enum(["ate-9", "10-49", "50-249", "250+"], {
      required_error: "Informe o número aproximado de funcionários",
    }),
    setor: z.enum(["comercio", "servicos", "industria", "outro"], {
      required_error: "Informe o setor de atuação",
    }),
    outroSetor: optionalText,
    presencaDigital: z.enum(["sim", "nao"], {
      required_error: "Informe se há presença digital ativa",
    }),
    canaisDigitais: z.array(z.string()).default([]),
    outroCanal: optionalText,
    conhecimentoIA: z.enum(["usa", "conhece", "nao-conhece"]).optional(),
    usoIA: z
      .enum([
        "regular",
        "ocasional",
        "testou",
        "considerando",
        "nao-pretende",
        "nao-sabe",
      ])
      .optional(),
    tarefasIA: z.array(z.string()).default([]),
    outraTarefaIA: optionalText,
    motivosParadaIA: z.array(z.string()).default([]),
    outroMotivoParada: optionalText,
    tempoPresencaDigital: z
      .enum(["menos-6", "6-12", "1-3", "mais-3"])
      .optional(),
    investimentoAds: z
      .enum(["regular", "ocasional", "parou", "nunca"])
      .optional(),
    nomeResponsavel: z
      .string()
      .min(2, "Nome do responsável é obrigatório")
      .max(200),
    cargo: z.string().min(2, "Cargo é obrigatório").max(150),
    email: z.string().email("E-mail inválido"),
    whatsapp: z
      .string()
      .min(10, "WhatsApp inválido (mínimo 10 dígitos)")
      .max(20, "WhatsApp inválido"),
    disponibilidadeEntrevista: z.enum(
      ["presencial", "online", "qualquer-formato", "talvez", "nao"],
      { required_error: "Selecione sua disponibilidade" }
    ),
    observacoes: optionalText,
  })
  .superRefine((data, ctx) => {
    if (data.localizacao === "outra") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["localizacao"],
        message: "Esta etapa é exclusiva para empresas de Capivari-SP.",
      });
    }

    if (data.numeroFuncionarios === "250+") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["numeroFuncionarios"],
        message:
          "A pesquisa contempla apenas empresas com até 249 funcionários.",
      });
    }

    if (data.presencaDigital === "nao") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["presencaDigital"],
        message:
          "Somente empresas com presença digital ativa podem participar.",
      });
    }

    if (data.presencaDigital === "sim" && data.canaisDigitais.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["canaisDigitais"],
        message: "Selecione ao menos um canal digital utilizado.",
      });
    }

    const participaDosBlocos =
      data.localizacao === "capivari" &&
      data.numeroFuncionarios !== "250+" &&
      data.presencaDigital === "sim";

    if (participaDosBlocos) {
      if (!data.conhecimentoIA) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["conhecimentoIA"],
          message: "Informe seu nível de familiaridade com IA Generativa.",
        });
      }

      if (!data.usoIA) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["usoIA"],
          message: "Informe se a empresa usa IA Generativa.",
        });
      }

      if (!data.tempoPresencaDigital) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tempoPresencaDigital"],
          message: "Informe há quanto tempo está presente nos canais digitais.",
        });
      }

      if (!data.investimentoAds) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["investimentoAds"],
          message: "Informe o comportamento de investimento em mídia paga.",
        });
      }
    }

    const usaOuTestouIA =
      participaDosBlocos &&
      !!data.usoIA &&
      ["regular", "ocasional", "testou"].includes(data.usoIA);

    if (usaOuTestouIA && data.tarefasIA.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tarefasIA"],
        message: "Selecione as tarefas em que a IA é/foi aplicada.",
      });
    }

    if (
      participaDosBlocos &&
      data.usoIA === "testou" &&
      data.motivosParadaIA.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["motivosParadaIA"],
        message: "Informe o motivo da interrupção do uso de IA.",
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      canaisDigitais: [],
      tarefasIA: [],
      motivosParadaIA: [],
    },
  });

  const localizacao = watch("localizacao");
  const numeroFuncionarios = watch("numeroFuncionarios");
  const presencaDigital = watch("presencaDigital");
  const usoIA = watch("usoIA");

  const isEligibleForBlocos =
    localizacao === "capivari" &&
    numeroFuncionarios &&
    numeroFuncionarios !== "250+" &&
    presencaDigital === "sim";

  const usaOuTestouIA = ["regular", "ocasional", "testou"].includes(
    usoIA ?? ""
  );

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Aqui você pode integrar com seu backend ou serviço de formulários
      // Exemplo: Google Forms, Typeform, seu próprio API, etc.

      // Simulação de envio (substitua pela sua lógica real)
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();

        // Google Analytics event (se configurado)
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "form_submission", {
            event_category: "engagement",
            event_label: "research_signup",
          });
        }
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-20 lg:py-32 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <Send className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Inscrição Rápida
              </span>
            </div>

            <h2 className="section-title">
              Pronto para <span className="text-gradient">participar</span>?
            </h2>
            <p className="section-subtitle">
              Preencha o formulário abaixo e entraremos em contato em breve
            </p>
          </div>

          {/* Formulário */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 md:p-12">
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Inscrição Recebida!
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Obrigado por se inscrever! Entraremos em contato em breve para
                  confirmar sua participação e agendar a entrevista. Você
                  receberá acesso ao <strong>vídeo exclusivo sobre IA</strong> e
                  ao <strong>guia de ferramentas</strong> após a confirmação.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="btn-secondary"
                >
                  Enviar Outra Inscrição
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Bloco A - Triagem */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                    Seus Dados
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome da Empresa (opcional)
                      </label>
                      <input
                        {...register("nomeEmpresa")}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Pode responder de forma anônima"
                      />
                      {errors.nomeEmpresa && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nomeEmpresa.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Localização *
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { value: "capivari", label: "Capivari-SP" },
                          { value: "outra", label: "Outra cidade" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              {...register("localizacao")}
                              type="radio"
                              value={option.value}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.localizacao && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.localizacao.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {localizacao === "outra" && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                      No momento a pesquisa contempla apenas empresas situadas
                      em Capivari-SP. Agradecemos sua intenção de participar!
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número de funcionários (aproximado) *
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { value: "ate-9", label: "Até 9 (Microempresa)" },
                          { value: "10-49", label: "10 a 49 (Pequena)" },
                          { value: "50-249", label: "50 a 249 (Média)" },
                          { value: "250+", label: "250 ou mais" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 rounded-lg px-4 py-2"
                          >
                            <input
                              {...register("numeroFuncionarios")}
                              type="radio"
                              value={option.value}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.numeroFuncionarios && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.numeroFuncionarios.message}
                        </p>
                      )}
                    </div>

                    {numeroFuncionarios === "250+" && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                        O estudo atual é voltado para PMEs (até 249
                        colaboradores).
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Principal setor de atuação *
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { value: "comercio", label: "Comércio varejista" },
                          {
                            value: "servicos",
                            label: "Serviços profissionais",
                          },
                          {
                            value: "industria",
                            label: "Indústria / Agroindústria",
                          },
                          { value: "outro", label: "Outro" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 rounded-lg px-4 py-2"
                          >
                            <input
                              {...register("setor")}
                              type="radio"
                              value={option.value}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.setor && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.setor.message}
                        </p>
                      )}
                    </div>
                    {watch("setor") === "outro" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Descreva o setor
                        </label>
                        <input
                          {...register("outroSetor")}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                          placeholder="Ex: Saúde, Educação, Tecnologia..."
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Uso ativo de redes sociais (Instagram, Facebook, Tiktok,
                      Whatsapp) para vendas? *
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { value: "sim", label: "Sim" },
                        { value: "nao", label: "Não" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            {...register("presencaDigital")}
                            type="radio"
                            value={option.value}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.presencaDigital && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.presencaDigital.message}
                      </p>
                    )}
                  </div>

                  {presencaDigital === "nao" && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                      Esta etapa é destinada às empresas com presença digital
                      ativa. Caso inicie em breve, volte a nos procurar!
                    </div>
                  )}

                  {presencaDigital === "sim" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Quais canais digitais utiliza ativamente? *
                        </label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {canaisDigitaisOptions.map((canal) => (
                            <label
                              key={canal}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                {...register("canaisDigitais")}
                                type="checkbox"
                                value={canal}
                                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                              />
                              <span className="text-gray-700">{canal}</span>
                            </label>
                          ))}
                        </div>
                        {errors.canaisDigitais && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.canaisDigitais.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Outros canais (opcional)
                        </label>
                        <input
                          {...register("outroCanal")}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                          placeholder="Ex: Pinterest, Marketplace, Podcasts..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bloco B - IA */}
                {isEligibleForBlocos && (
                  <div className="space-y-6 pt-6">
                    <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                      Posicionamento frente à IA Generativa (ChatGPT, Gemini,
                      Claude, etc)
                    </h3>

                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-gray-700">
                        Você conhece ferramentas de IA Generativa (ChatGPT,
                        Gemini, Claude, etc)? *
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { value: "usa", label: "Sim, conheço e uso" },
                          {
                            value: "conhece",
                            label: "Já ouvi falar, mas não conheço a fundo",
                          },
                          {
                            value: "nao-conhece",
                            label: "Não conheço / nunca ouvi falar",
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              {...register("conhecimentoIA")}
                              type="radio"
                              value={option.value}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.conhecimentoIA && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.conhecimentoIA.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Sua empresa utiliza (ou já utilizou) IA Generativa para
                        marketing digital? *
                      </label>
                      <div className="space-y-2">
                        {[
                          {
                            value: "regular",
                            label:
                              "Sim, utilizamos regularmente (1x/semana ou mais)",
                          },
                          {
                            value: "ocasional",
                            label: "Sim, utilizamos ocasionalmente",
                          },
                          {
                            value: "testou",
                            label: "Testamos, mas paramos de usar",
                          },
                          {
                            value: "considerando",
                            label: "Não utilizamos, mas estamos considerando",
                          },
                          {
                            value: "nao-pretende",
                            label: "Não utilizamos e não pretendemos usar",
                          },
                          {
                            value: "nao-sabe",
                            label: "Não sabemos do que se trata",
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 rounded-lg px-4 py-2"
                          >
                            <input
                              {...register("usoIA")}
                              type="radio"
                              value={option.value}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.usoIA && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.usoIA.message}
                        </p>
                      )}
                    </div>

                    {usaOuTestouIA && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Para quais tarefas de marketing digital você usa (ou
                            usou) IA? *
                          </label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {tarefasIAOptions.map((tarefa) => (
                              <label
                                key={tarefa}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  {...register("tarefasIA")}
                                  type="checkbox"
                                  value={tarefa}
                                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                />
                                <span className="text-gray-700">{tarefa}</span>
                              </label>
                            ))}
                          </div>
                          {errors.tarefasIA && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.tarefasIA.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Outras tarefas (opcional)
                          </label>
                          <input
                            {...register("outraTarefaIA")}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                            placeholder="Ex: Auditoria de conteúdo, Planejamento editorial..."
                          />
                        </div>
                      </div>
                    )}

                    {usoIA === "testou" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Por que pararam de usar IA? *
                          </label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {motivosParadaOptions.map((motivo) => (
                              <label
                                key={motivo}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  {...register("motivosParadaIA")}
                                  type="checkbox"
                                  value={motivo}
                                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                />
                                <span className="text-gray-700">{motivo}</span>
                              </label>
                            ))}
                          </div>
                          {errors.motivosParadaIA && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.motivosParadaIA.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Outros motivos (opcional)
                          </label>
                          <input
                            {...register("outroMotivoParada")}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                            placeholder="Compartilhe outros fatores relevantes"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bloco C - Maturidade Digital */}
                {isEligibleForBlocos && (
                  <div className="space-y-6 pt-6">
                    <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                      Índice de Maturidade Digital
                    </h3>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Há quanto tempo a empresa está nos canais digitais? *
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { value: "menos-6", label: "Menos de 6 meses" },
                          { value: "6-12", label: "6 meses a 1 ano" },
                          { value: "1-3", label: "1 a 3 anos" },
                          { value: "mais-3", label: "Mais de 3 anos" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              {...register("tempoPresencaDigital")}
                              type="radio"
                              value={option.value}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.tempoPresencaDigital && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.tempoPresencaDigital.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Investimento em publicidade digital paga *
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: "regular", label: "Sim, regularmente" },
                          { value: "ocasional", label: "Sim, ocasionalmente" },
                          {
                            value: "parou",
                            label: "Já investimos, mas paramos",
                          },
                          { value: "nunca", label: "Nunca investimos" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 rounded-lg px-4 py-2"
                          >
                            <input
                              {...register("investimentoAds")}
                              type="radio"
                              value={option.value}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.investimentoAds && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.investimentoAds.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Bloco D - Disponibilidade */}
                <div className="space-y-6 pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                    Disponibilidade para Participação (Contamos com sua ajuda)
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome do responsável *
                      </label>
                      <input
                        {...register("nomeResponsavel")}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Quem responderá à entrevista"
                      />
                      {errors.nomeResponsavel && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nomeResponsavel.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cargo/Função *
                      </label>
                      <input
                        {...register("cargo")}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Ex: Proprietário, Marketing, Comercial..."
                      />
                      {errors.cargo && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cargo.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="seu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        WhatsApp para contato *
                      </label>
                      <input
                        {...register("whatsapp")}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="(19) 99999-9999"
                      />
                      {errors.whatsapp && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.whatsapp.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Disponibilidade para entrevista (45-90min) *
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          value: "qualquer-formato",
                          label: "Sim, qualquer formato",
                        },
                        {
                          value: "presencial",
                          label: "Sim, presencial em Capivari",
                        },
                        {
                          value: "online",
                          label: "Sim, online (Zoom / Google Meet)",
                        },
                        {
                          value: "talvez",
                          label: "Talvez, preciso saber mais",
                        },
                        {
                          value: "nao",
                          label: "Não tenho disponibilidade",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 rounded-lg px-4 py-2"
                        >
                          <input
                            {...register("disponibilidadeEntrevista")}
                            type="radio"
                            value={option.value}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.disponibilidadeEntrevista && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.disponibilidadeEntrevista.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Observações ou dúvidas (opcional)
                    </label>
                    <textarea
                      {...register("observacoes")}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                      placeholder="Compartilhe informações adicionais relevantes para a seleção..."
                    />
                  </div>
                </div>

                {/* Erro de envio */}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700">
                      Ocorreu um erro ao enviar o formulário. Por favor, tente
                      novamente ou entre em contato diretamente.
                    </p>
                  </div>
                )}

                {/* Botão de envio */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Inscrição
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    Ao enviar, você concorda em participar da pesquisa. Seus
                    dados serão tratados com total confidencialidade.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
