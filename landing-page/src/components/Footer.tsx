"use client";

import { Mail, Phone, Linkedin, GraduationCap, Building2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Sobre */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-primary-400" />
              <h3 className="text-xl font-bold text-white">
                Pesquisa de Mestrado
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Investigando o uso de Inteligência Artificial no Marketing Digital
              de PMEs em Capivari-SP.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="w-4 h-4 text-primary-400" />
              <span>MUST University</span>
            </div>
          </div>

          {/* Pesquisador */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Pesquisador</h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong className="text-white">Eduardo Camargo Maia</strong>
                <br />
                Mestrando em Business Administration
                <br />
                Digital Marketing Concentration
              </p>
              <p>
                <strong className="text-white">Orientador:</strong>
                <br />
                Prof. Dr. Marcos Crivelaro
              </p>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="mailto:eduardo.maia@must.edu"
                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>eduardo.maia@must.edu</span>
              </a>
              <a
                href="tel:+5519999999999"
                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>(19) 9999-9999</span>
              </a>
              <a
                href="https://linkedin.com/in/eduardocamargomaia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
              >
                <Linkedin className="w-5 h-5 flex-shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} Eduardo Camargo Maia • MUST University • Todos os
              direitos reservados
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Ética
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Badge de tecnologia */}
      <div className="bg-gray-950 py-4">
        <div className="container-custom">
          <p className="text-center text-xs text-gray-600">
            Desenvolvido com Next.js, React e Tailwind CSS • Otimizado para
            conversão e performance
          </p>
        </div>
      </div>
    </footer>
  );
}
