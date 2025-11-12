"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
      {/* Background decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-100 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Pesquisa Acadêmica -{" "}
                <a
                  href="https://mustedu.com/pt/conecte-se-atraves-da-must-university/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  MUST University
                </a>
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
              Como estão
              <span className="text-gradient block mt-2">suas vendas?</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Participe de uma pesquisa pioneira sobre{" "}
              <strong className="text-gray-900">
                Marketing Digital e uso de inteligência artificial
              </strong>{" "}
              por micro, pequenas e médias empresas (MPMEs) em Capivari-SP e{" "}
              <strong>
                <span className="text-gradient block mt-2">ganhe brindes.</span>
              </strong>
            </p>

            {/* Benefícios rápidos */}
            <div className="space-y-3 mb-8">
              {[
                "Acesso exclusivo a IA especializada em marketing digital para MPMEs - tire todas suas dúvidas",
                "Um guia de sugestões do que perguntar a IA e de ferramentas de marketing ou gratuitas ou com bom limite de uso gratuito",
                "Acesso a um vídeo exclusivo sobre IA e Marketing Digital (feito totalmente por IA)",
                "Preencha em 2-3 minutos",
                "Total confidencialidade garantida",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group"
              >
                Quero Participar
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Saiba Mais
              </motion.button>
            </div>
          </motion.div>

          {/* Imagem/Ilustração lado direito */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Imagem principal */}
            <div className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto lg:max-w-none">
              <Image
                src="/inicial.png"
                alt="Marketing Digital e Inteligência Artificial para PMEs"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
