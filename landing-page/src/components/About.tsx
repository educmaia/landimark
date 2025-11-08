"use client";

import { motion } from "framer-motion";
import { Target, BookOpen, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lado esquerdo - Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-secondary-600" />
              <span className="text-sm font-semibold text-secondary-700">
                Sobre a Pesquisa
              </span>
            </div>

            <h2 className="section-title">
              Entenda como a IA está{" "}
              <span className="text-gradient">transformando</span> o marketing
              das PMEs
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Esta pesquisa de mestrado investiga se e como as Micro, Pequenas e
              Médias Empresas de <strong>Capivari-SP</strong> estão utilizando
              ferramentas de <strong>Inteligência Artificial Generativa</strong>{" "}
              em suas estratégias de marketing digital. Seu concorrente pode
              estar à sua frente e todas as grandes empresas já usam.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Conduzida por <strong>Eduardo Camargo Maia</strong>, mestrando em
              Business Administration pela{" "}
              <a
                href="https://mustedu.com/pt/conecte-se-atraves-da-must-university/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-semibold"
              >
                MUST University
              </a>
              , sob orientação do <strong>Prof. Dr. Marcos Crivelaro</strong>.
            </p>

            {/* Cards de destaque */}
            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  title: "Objetivo",
                  description:
                    "Compreender benefícios, desafios e fatores que influenciam a adoção de IA no marketing digital",
                },
                {
                  icon: Lightbulb,
                  title: "Relevância",
                  description:
                    "Contribuir para o conhecimento sobre transformação digital em empresas brasileiras do interior",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-xl shadow-md"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lado direito - Estatísticas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  number: "6-8",
                  label: "Empresas Selecionadas",
                  color: "primary",
                },
                {
                  number: "2-3",
                  label: "Minutos para questionário inicial",
                  color: "secondary",
                },
                { number: "100%", label: "Confidencial", color: "primary" },
                {
                  number: "3",
                  label: "Setores Representados",
                  color: "secondary",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`card text-center ${
                    stat.color === "primary"
                      ? "bg-gradient-to-br from-primary-50 to-primary-100"
                      : "bg-gradient-to-br from-secondary-50 to-secondary-100"
                  }`}
                >
                  <div
                    className={`text-4xl md:text-5xl font-bold mb-2 ${
                      stat.color === "primary"
                        ? "text-primary-600"
                        : "text-secondary-600"
                    }`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decoração */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 rounded-3xl blur-3xl opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
