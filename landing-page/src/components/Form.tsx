"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// Schema de validação
const formSchema = z.object({
  nomeEmpresa: z.string().min(2, "Nome da empresa é obrigatório"),
  nomeResponsavel: z.string().min(2, "Nome do responsável é obrigatório"),
  cargo: z.string().min(2, "Cargo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
  numeroFuncionarios: z.enum([
    "1-9",
    "10-49",
    "50-99",
    "100+",
  ]),
  setor: z.enum(["comercio", "servicos", "industria", "outro"]),
  tempoAtuacao: z.enum([
    "menos-2",
    "2-5",
    "5-10",
    "mais-10",
  ]),
  canaisDigitais: z.array(z.string()).min(1, "Selecione ao menos um canal"),
  usaIA: z.enum(["sim-regularmente", "sim-esporadicamente", "testamos", "nunca"]),
  melhorContato: z.enum(["email", "whatsapp", "telefone"]),
  observacoes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

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
              Pronto para{" "}
              <span className="text-gradient">participar</span>?
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
                  confirmar sua participação e agendar a entrevista. Você receberá
                  acesso ao <strong>vídeo exclusivo sobre IA</strong> e ao{" "}
                  <strong>guia de ferramentas</strong> após a confirmação.
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
                {/* Dados da Empresa */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                    Dados da Empresa
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome da Empresa *
                      </label>
                      <input
                        {...register("nomeEmpresa")}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Ex: Comércio Silva Ltda"
                      />
                      {errors.nomeEmpresa && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nomeEmpresa.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número de Funcionários *
                      </label>
                      <select
                        {...register("numeroFuncionarios")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      >
                        <option value="">Selecione...</option>
                        <option value="1-9">1-9 (Microempresa)</option>
                        <option value="10-49">10-49 (Pequena)</option>
                        <option value="50-99">50-99 (Média)</option>
                        <option value="100+">100+ (Fora do escopo)</option>
                      </select>
                      {errors.numeroFuncionarios && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.numeroFuncionarios.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Setor de Atuação *
                      </label>
                      <select
                        {...register("setor")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      >
                        <option value="">Selecione...</option>
                        <option value="comercio">Comércio</option>
                        <option value="servicos">Serviços</option>
                        <option value="industria">Indústria</option>
                        <option value="outro">Outro</option>
                      </select>
                      {errors.setor && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.setor.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tempo de Atuação em Capivari *
                      </label>
                      <select
                        {...register("tempoAtuacao")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      >
                        <option value="">Selecione...</option>
                        <option value="menos-2">Menos de 2 anos</option>
                        <option value="2-5">2-5 anos</option>
                        <option value="5-10">5-10 anos</option>
                        <option value="mais-10">Mais de 10 anos</option>
                      </select>
                      {errors.tempoAtuacao && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.tempoAtuacao.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dados do Responsável */}
                <div className="space-y-6 pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                    Dados do Responsável
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        {...register("nomeResponsavel")}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Seu nome completo"
                      />
                      {errors.nomeResponsavel && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nomeResponsavel.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cargo *
                      </label>
                      <input
                        {...register("cargo")}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Ex: Proprietário, Gerente"
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
                        Telefone/WhatsApp *
                      </label>
                      <input
                        {...register("telefone")}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="(19) 99999-9999"
                      />
                      {errors.telefone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.telefone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Melhor forma de contato *
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { value: "email", label: "E-mail" },
                        { value: "whatsapp", label: "WhatsApp" },
                        { value: "telefone", label: "Telefone" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            {...register("melhorContato")}
                            type="radio"
                            value={option.value}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.melhorContato && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.melhorContato.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Marketing Digital e IA */}
                <div className="space-y-6 pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b pb-3">
                    Marketing Digital e IA
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Canais de marketing digital utilizados *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Instagram",
                        "Facebook",
                        "WhatsApp Business",
                        "Site institucional",
                        "Google Ads",
                        "E-mail marketing",
                      ].map((canal) => (
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
                      Utiliza ferramentas de IA no marketing? *
                    </label>
                    <select
                      {...register("usaIA")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    >
                      <option value="">Selecione...</option>
                      <option value="sim-regularmente">
                        Sim, regularmente (ao menos 1x/semana)
                      </option>
                      <option value="sim-esporadicamente">
                        Sim, mas esporadicamente
                      </option>
                      <option value="testamos">
                        Já testamos, mas não usamos atualmente
                      </option>
                      <option value="nunca">Nunca utilizamos</option>
                    </select>
                    {errors.usaIA && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.usaIA.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Comentários ou dúvidas (opcional)
                    </label>
                    <textarea
                      {...register("observacoes")}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                      placeholder="Compartilhe qualquer informação adicional ou dúvida sobre a pesquisa..."
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
