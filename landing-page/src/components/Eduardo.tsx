"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, Heart, Users } from "lucide-react";

export default function Eduardo() {
  return (
    <section
      id="eduardo"
      className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-secondary-50"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
              <User className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Sobre o Pesquisador
              </span>
            </div>

            <h2 className="section-title">
              <span className="text-gradient">Eduardo Camargo Maia</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Foto/Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <GraduationCap className="w-32 h-32 mx-auto mb-4 opacity-80" />
                    <p className="text-2xl font-bold">Eduardo Camargo Maia</p>
                    <p className="text-lg opacity-90 mt-2">
                      Mestrando em Business Administration
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Conteúdo biográfico */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quem Sou */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Quem Sou</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Eduardo Camargo Maia é capivariano, 39 anos, filho da Dra.
                  Doxinha (Ana Eudóxia) e de João Carlos Belluzzo Maia, bisneto
                  do Dr. Agripino Maia, fundador da CANACAP, ASSOCAP e do
                  Hospital onde hoje funciona o Hospital Unimed. Esposo de Maysa
                  Maia, coordenadora pedagógica da Escola Fú Paulo no Bairro São
                  João Batista e pai do Heitor de 7 anos e do Henrique de 5
                  anos.
                </p>
              </motion.div>

              {/* Formação Acadêmica */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-secondary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Formação Acadêmica
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: "Graduação em Direito",
                      institution: "PUC-CAMPINAS",
                    },
                    {
                      title: "Graduação em Administração",
                      institution: "CNEC-Capivari",
                    },
                    {
                      title: "Graduação em Ciências Contábeis",
                      institution: "CNEC-Capivari",
                    },
                    {
                      title: "Pós-Graduação em Direito Público",
                      institution: "",
                    },
                    {
                      title: "Pós-Graduação em Gestão Pública",
                      institution: "",
                    },
                    {
                      title:
                        "Mestrando em Master of Business Administration - Digital Marketing",
                      institution: "Must University (desde 2024)",
                      highlight: true,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        item.highlight
                          ? "p-3 bg-primary-50 rounded-lg border-l-4 border-primary-500"
                          : ""
                      }`}
                    >
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p
                          className={`font-semibold ${
                            item.highlight
                              ? "text-primary-700"
                              : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </p>
                        {item.institution && (
                          <p className="text-sm text-gray-600">
                            {item.institution}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Experiência Profissional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Experiência Profissional
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Secretário Municipal de Projetos",
                      period: "Gestão Campaci (2009-2012)",
                      description:
                        "Liderou projetos estratégicos como a implantação do Distrito Industrial ao lado do portal da cidade, pavimentação do Bairro Santa Rita, entre outras dezenas de obras significativas.",
                    },
                    {
                      title: "Chefe de Gabinete",
                      period: "Prefeitura de Rafard (2013)",
                      description:
                        "Atuou no governo de César Moreira, contribuindo para a gestão municipal.",
                    },
                    {
                      title: "Executivo Público",
                      period:
                        "Secretaria Estadual de Educação de São Paulo (2013-2014)",
                      description:
                        "Cargo concursado, demonstrando compromisso com o serviço público.",
                    },
                    {
                      title: "Administrador",
                      period:
                        "Instituto Federal de São Paulo - Câmpus Capivari (desde 2014)",
                      description: "",
                    },
                    {
                      title: "Advogado",
                      period: "Camargo e Maia Advocacia (desde 2009)",
                      description: "",
                    },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary-200 pl-4 pb-2"
                    >
                      <h4 className="font-bold text-gray-900">{job.title}</h4>
                      <p className="text-sm text-primary-600 font-medium mb-1">
                        {job.period}
                      </p>
                      {job.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {job.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stats rápidos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { number: "15+", label: "Anos de Experiência" },
                  { number: "3", label: "Graduações" },
                  { number: "2", label: "Pós-Graduações" },
                  { number: "2024", label: "Mestrando MBA" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="card text-center bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-100"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-gray-700 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
