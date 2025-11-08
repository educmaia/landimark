"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  Shield,
  Clock,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: Clock,
      title: "Investimento Mínimo de Tempo",
      description:
        "Apenas 45-90 minutos em uma única sessão. Você escolhe o melhor horário e formato (presencial ou online).",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Total Confidencialidade",
      description:
        "Seus dados e informações empresariais são 100% confidenciais e anônimos. Garantia de segurança acadêmica.",
      color: "secondary",
    },
    {
      icon: TrendingUp,
      title: "Insights Exclusivos",
      description:
        "Acesso antecipado aos resultados consolidados da pesquisa para apoiar suas decisões estratégicas.",
      color: "primary",
    },
    {
      icon: Award,
      title: "Contribuição Reconhecida",
      description:
        "Seu nome (se autorizado) será reconhecido nos agradecimentos da dissertação de mestrado.",
      color: "secondary",
    },
    {
      icon: FileCheck,
      title: "Processo Simples",
      description:
        "Entrevista estruturada mas flexível. Formato de conversa natural sobre sua experiência real.",
      color: "primary",
    },
    {
      icon: Users,
      title: "Impacto Coletivo",
      description:
        "Contribua para o avanço do conhecimento sobre transformação digital em PMEs brasileiras.",
      color: "secondary",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container-custom">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
            <Award className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              Benefícios da Participação
            </span>
          </div>

          <h2 className="section-title">
            Por que <span className="text-gradient">participar</span>?
          </h2>
          <p className="section-subtitle">
            Sua contribuição é valiosa e oferecemos retornos concretos pelo seu
            tempo
          </p>
        </motion.div>

        {/* Grid de benefícios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group card hover:scale-105 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${
                  benefit.color === "primary"
                    ? "bg-primary-100 group-hover:bg-primary-600"
                    : "bg-secondary-100 group-hover:bg-secondary-600"
                } transition-colors`}
              >
                <benefit.icon
                  className={`w-7 h-7 ${
                    benefit.color === "primary"
                      ? "text-primary-600 group-hover:text-white"
                      : "text-secondary-600 group-hover:text-white"
                  } transition-colors`}
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-700 mb-4 max-w-2xl">
              <strong className="text-gray-900">
                Empresas de todos os estágios são bem-vindas:
              </strong>{" "}
              Desde as que já utilizam IA ativamente até aquelas que ainda não
              adotaram. Todas as perspectivas são igualmente valiosas!
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary"
            >
              Inscreva-se Agora
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
