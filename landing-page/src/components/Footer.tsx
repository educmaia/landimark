import { Mail, MessageCircle, Instagram, GraduationCap, Building2 } from "lucide-react";

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
              <a
                href="https://mustedu.com/pt/conecte-se-atraves-da-must-university/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                MUST University
              </a>
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
                <a href="http://lattes.cnpq.br/9435178393114804" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Prof. Dr. Marcos Crivelaro</a>
              </p>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="mailto:eduardo@camargoemaia.com"
                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>eduardo@camargoemaia.com</span>
              </a>
              <a
                href="https://wa.me/5519991260742"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>WhatsApp: (19) 99126-0742</span>
              </a>
              <a
                href="https://www.instagram.com/educmaia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
              >
                <Instagram className="w-5 h-5 flex-shrink-0" />
                <span>@educmaia</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} Eduardo Camargo Maia •{" "}
              <a
                href="https://mustedu.com/pt/conecte-se-atraves-da-must-university/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                MUST University
              </a>{" "}
              • Todos os direitos reservados
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
            Desenvolvido por Eduardo Camargo Maia com Inteligência Artificial
            (Claude Code)
          </p>
        </div>
      </div>
    </footer>
  );
}
