"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Award, Users } from "lucide-react";

export default function SocialProof() {
  const credentials = [
    {
      icon: GraduationCap,
      title: "MUST University",
      description: "Mestrado em Business Administration",
    },
    {
      icon: Building2,
      title: "Pesquisa Acadêmica",
      description: "Digital Marketing Concentration",
    },
    {
      icon: Award,
      title: "Rigor Científico",
      description: "Metodologia validada internacionalmente",
    },
    {
      icon: Users,
      title: "Impacto Real",
      description: "Contribuição para PMEs brasileiras",
    },
  ];

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container-custom">
        {/* Texto de credibilidade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-primary-600 font-semibold mb-2">
            Credibilidade Acadêmica
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Pesquisa conduzida com rigor científico
          </h2>
        </motion.div>

        {/* Grid de credenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                <item.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Selo de confiança */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 border border-primary-200 rounded-full">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold text-primary-700">
              100% Confidencial e Seguro • Aprovado por Comitê de Ética
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
