"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Minha empresa precisa usar IA para participar?",
      answer:
        "Não! Empresas de todos os estágios são bem-vindas. Tanto as que já utilizam IA regularmente quanto aquelas que nunca usaram. Todas as perspectivas são igualmente valiosas para a pesquisa.",
    },
    {
      question: "Quanto tempo leva a entrevista?",
      answer:
        "A entrevista dura entre 45 e 90 minutos, em uma única sessão. Você escolhe o melhor horário e formato (presencial em sua empresa ou online por videochamada).",
    },
    {
      question: "Meus dados serão confidenciais?",
      answer:
        "Sim, 100%! Todas as informações fornecidas são tratadas com total confidencialidade e anonimato. Os dados serão utilizados exclusivamente para fins acadêmicos, sem identificação da empresa ou dos respondentes sem autorização prévia.",
    },
    {
      question: "Minha empresa não está em Capivari. Posso participar?",
      answer:
        "Infelizmente não. A pesquisa é especificamente sobre PMEs de Capivari-SP. No entanto, agradecemos seu interesse e você pode indicar empresas de Capivari que conheça!",
    },
    {
      question: "Quais os critérios para minha empresa participar?",
      answer:
        "Sua empresa deve: (1) estar localizada em Capivari-SP, (2) ser classificada como micro, pequena ou média empresa (até 99 funcionários no comércio/serviços ou até 499 na indústria), e (3) realizar atividades de marketing digital em ao menos um canal nos últimos 12 meses.",
    },
    {
      question: "O que ganho ao participar?",
      answer:
        "Você terá: (1) acesso exclusivo a uma inteligência artificial especializada em marketing digital para MPMEs - tire todas as suas dúvidas, (2) guia completo de ferramentas de marketing gratuitas ou com bom limite de uso gratuito, (3) vídeo exclusivo sobre IA e Marketing Digital, (4) acesso aos resultados consolidados da pesquisa, (5) reconhecimento acadêmico (se autorizado), e (6) contribuição para o avanço do conhecimento sobre transformação digital em PMEs brasileiras.",
    },
    {
      question: "Como será a entrevista? Preciso me preparar?",
      answer:
        "A entrevista é uma conversa estruturada mas natural sobre suas práticas de marketing digital e experiências com IA. Não é necessário preparação especial - basta compartilhar sua experiência real e perspectivas genuínas.",
    },
    {
      question: "Quando terei acesso aos resultados da pesquisa?",
      answer:
        "Após a conclusão de todas as entrevistas e análises, estimamos que os resultados consolidados estarão disponíveis em 2-3 meses. Você receberá um relatório executivo com os principais insights.",
    },
    {
      question: "Posso desistir depois de me inscrever?",
      answer:
        "Sim, com total liberdade! A participação é voluntária e você pode desistir a qualquer momento, sem qualquer tipo de penalidade ou necessidade de justificativa.",
    },
    {
      question: "Quem está conduzindo esta pesquisa?",
      answer: (
        <>
          A pesquisa é conduzida por Eduardo Camargo Maia, mestrando em Business
          Administration (Digital Marketing Concentration) pela{" "}
          <a
            href="https://mustedu.com/pt/conecte-se-atraves-da-must-university/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline font-semibold"
          >
            MUST University
          </a>
          , sob orientação do Prof. Dr. Marcos Crivelaro, seguindo rigorosos
          padrões acadêmicos e éticos.
        </>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-custom">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-md">
            <HelpCircle className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              Perguntas Frequentes
            </span>
          </div>

          <h2 className="section-title">
            Tire suas <span className="text-gradient">dúvidas</span>
          </h2>
          <p className="section-subtitle">
            Respostas para as perguntas mais comuns sobre a pesquisa
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 group"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-white rounded-2xl shadow-xl">
            <p className="text-lg text-gray-700 mb-4 max-w-2xl">
              <strong className="text-gray-900">Ainda tem dúvidas?</strong>{" "}
              Entre em contato diretamente e teremos prazer em responder!
            </p>
            <a
              href="https://wa.me/5519991260742"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Fale Conosco
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
