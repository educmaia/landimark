"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileText, Calendar, MessageSquare, BarChart } from "lucide-react";

export default function Process() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Preencha o Formulário",
      description:
        "Inscreva-se através do formulário abaixo. Leva apenas 2-3 minutos.",
      duration: "2-3 min",
    },
    {
      number: "02",
      icon: CheckCircle2,
      title: "Triagem Inicial",
      description:
        "Verificaremos se sua empresa atende aos critérios da pesquisa (PME em Capivari-SP com marketing digital ativo).",
      duration: "1-2 dias",
    },
    {
      number: "03",
      icon: Calendar,
      title: "Agendamento",
      description:
        "Entraremos em contato para agendar a entrevista no melhor horário para você (presencial ou online).",
      duration: "3-5 dias",
    },
    {
      number: "04",
      icon: MessageSquare,
      title: "Entrevista",
      description:
        "Conversa estruturada sobre suas práticas de marketing digital e uso (ou não) de IA. Total flexibilidade e naturalidade.",
      duration: "60-90 min",
    },
    {
      number: "05",
      icon: BarChart,
      title: "Resultados",
      description:
        "Após conclusão da pesquisa, você receberá acesso exclusivo aos insights e conclusões consolidadas.",
      duration: "2-3 meses",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-md">
            <CheckCircle2 className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              Processo Simples
            </span>
          </div>

          <h2 className="section-title">
            Como{" "}
            <span className="text-gradient">funciona</span>?
          </h2>
          <p className="section-subtitle">
            Processo transparente e estruturado em 5 etapas simples
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Linha conectora */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-primary-300 to-transparent -z-10 hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row gap-6 mb-8 md:mb-12">
                {/* Ícone e número */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-primary-500">
                      <span className="text-xs font-bold text-primary-600">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Garantias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              title: "Flexibilidade Total",
              description: "Você escolhe formato, local e horário",
            },
            {
              title: "Sem Compromisso",
              description: "Pode desistir a qualquer momento",
            },
            {
              title: "Suporte Contínuo",
              description: "Tire dúvidas em qualquer etapa",
            },
          ].map((guarantee, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{guarantee.title}</h4>
              <p className="text-sm text-gray-600">{guarantee.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
