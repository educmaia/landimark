# Landing Page - Pesquisa de Mestrado
## Marketing Digital e IA em PMEs de Capivari-SP

Landing page profissional e magnética desenvolvida para atrair empresários de PMEs de Capivari-SP a participarem da pesquisa de mestrado sobre o uso de Inteligência Artificial no Marketing Digital.

---

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **Formulários**: React Hook Form + Zod
- **Analytics**: Vercel Analytics, Google Analytics 4, Meta Pixel
- **Deploy**: Vercel (recomendado)

---

## 📋 Funcionalidades

### 🎯 Conversão Otimizada
- Hero section com proposta de valor clara
- CTAs (Call-to-Actions) estrategicamente posicionados
- Prova social e credibilidade acadêmica
- Benefícios claros para participação
- Formulário de captação com validação robusta

### 📊 Analytics e Tracking
- Google Analytics 4 integrado
- Meta Pixel (Facebook Pixel) configurado
- Vercel Analytics e Speed Insights
- Tracking de eventos customizados (cliques em CTA, submissão de formulário, etc.)

### ⚡ Performance
- Server-side rendering (SSR)
- Otimização automática de imagens
- Code splitting e lazy loading
- Lighthouse score otimizado (90+)

### 📱 Responsividade
- Design mobile-first
- Testado em diversos dispositivos e navegadores
- Animações adaptativas baseadas em preferências do usuário

---

## 🛠️ Instalação e Setup

### Pré-requisitos
- Node.js 18.x ou superior
- npm, yarn ou pnpm

### 1. Instalação de Dependências

```bash
cd landing-page
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configuração de Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local` e configure as variáveis:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel (Facebook Pixel)
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX

# Resend (para envio de e-mails) - opcional
RESEND_API_KEY=re_xxxxxxxxxxxx

# Google Sheets Integration - opcional
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# URL do site
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

### 3. Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploy

### Deploy na Vercel (Recomendado)

1. Faça push do código para um repositório Git (GitHub, GitLab, Bitbucket)

2. Acesse [vercel.com](https://vercel.com) e importe o repositório

3. Configure as variáveis de ambiente no painel da Vercel

4. Deploy automático! ✨

#### Deploy via CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Deploy Manual

```bash
npm run build
npm start
```

---

## 📧 Configuração de Envio de E-mails (Formulário)

### Opção 1: Resend

1. Crie conta em [resend.com](https://resend.com)
2. Obtenha sua API key
3. Instale o pacote:
   ```bash
   npm install resend
   ```
4. Adicione a API key em `.env.local`
5. Descomente o código no arquivo `/src/app/api/submit-form/route.ts`

### Opção 2: Google Sheets

1. Crie uma planilha no Google Sheets
2. Vá em Extensions > Apps Script
3. Cole o seguinte código:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nomeEmpresa,
    data.nomeResponsavel,
    data.cargo,
    data.email,
    data.telefone,
    data.numeroFuncionarios,
    data.setor,
    data.usaIA,
    data.canaisDigitais.join(', '),
    data.observacoes || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy como Web App
5. Copie a URL e adicione em `.env.local`

### Opção 3: Serviços Terceiros

Integre com:
- **Typeform**: Formulários avançados
- **Google Forms**: Gratuito e simples
- **Airtable**: Banco de dados visual
- **Notion**: Organização de dados

---

## 📊 Analytics e Testes A/B

### Google Analytics 4

1. Crie uma propriedade GA4 em [analytics.google.com](https://analytics.google.com)
2. Obtenha o Measurement ID (formato: G-XXXXXXXXXX)
3. Adicione em `.env.local`
4. Os eventos já estão configurados:
   - `page_view`: Visualizações de página
   - `form_start`: Início do preenchimento do formulário
   - `form_submit`: Envio do formulário
   - `cta_click`: Cliques em CTAs
   - `section_view`: Visualização de seções

### Meta Pixel (Facebook Pixel)

1. Crie um pixel em [business.facebook.com](https://business.facebook.com)
2. Obtenha o Pixel ID
3. Adicione em `.env.local`

### Vercel Analytics (Testes A/B)

O Vercel Analytics já está integrado e oferece:
- Web Vitals (métricas de performance)
- Page insights
- Audience analytics

Para testes A/B avançados:

1. Acesse o projeto na Vercel
2. Vá em Analytics > Experiments
3. Configure variantes da landing page
4. Monitore conversões

### Google Optimize (Alternativa)

1. Crie um experimento em [optimize.google.com](https://optimize.google.com)
2. Adicione o snippet no `layout.tsx`
3. Configure variantes e objetivos

---

## 🎨 Customização

### Cores

Edite `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Sua paleta primária
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  },
}
```

### Fontes

Edite `src/app/layout.tsx`:

```typescript
const customFont = YourFont({
  subsets: ["latin"],
  variable: "--font-custom",
});
```

### Conteúdo

Todo o conteúdo está nos componentes em `/src/components/`:
- `Hero.tsx`: Seção principal
- `About.tsx`: Sobre a pesquisa
- `Benefits.tsx`: Benefícios da participação
- `Process.tsx`: Como funciona
- `Form.tsx`: Formulário de inscrição
- `FAQ.tsx`: Perguntas frequentes
- `Footer.tsx`: Rodapé

---

## 🧪 Testes

### Lighthouse

```bash
npm run build
npm start
```

Abra DevTools > Lighthouse e execute audit

### Testes de Formulário

1. Preencha o formulário com dados válidos
2. Verifique se o evento é disparado no Google Analytics
3. Confirme recebimento no seu sistema (email, planilha, etc.)

---

## 📈 Otimizações de Conversão

### Copywriting Estratégico

A landing page utiliza técnicas de copywriting para maximizar conversão:

1. **Headline magnética**: Focada em dor/desejo do empresário
2. **Benefícios claros**: O que o participante ganha
3. **Prova social**: Credibilidade acadêmica
4. **Urgência implícita**: Vagas limitadas (7-8 empresas)
5. **CTAs diretos**: Linguagem de ação

### Elementos de Conversão

- ✅ Above the fold otimizado
- ✅ Múltiplos CTAs ao longo da página
- ✅ Formulário simplificado (não assustador)
- ✅ Garantias de confidencialidade
- ✅ FAQ para quebrar objeções
- ✅ Social proof e credibilidade

### Sugestões de Teste A/B

1. **Headline**:
   - A: "Sua Empresa Está Pronta para a IA?"
   - B: "Como a IA Pode Transformar Seu Marketing?"

2. **CTA**:
   - A: "Quero Participar"
   - B: "Garantir Minha Vaga"

3. **Cores do CTA**:
   - A: Azul primário
   - B: Verde de ação

---

## 🔐 Segurança e Privacidade

- ✅ Validação de formulários no frontend e backend
- ✅ Proteção CSRF
- ✅ Headers de segurança configurados
- ✅ HTTPS obrigatório (via Vercel)
- ✅ Dados criptografados em trânsito
- ✅ Conformidade com LGPD

---

## 📱 Checklist Pré-Launch

- [ ] Configurar todas as variáveis de ambiente
- [ ] Testar formulário em produção
- [ ] Verificar analytics (GA4, Meta Pixel)
- [ ] Configurar domínio customizado
- [ ] Adicionar favicon e Open Graph images
- [ ] Testar em múltiplos dispositivos
- [ ] Verificar tempo de carregamento (< 3s)
- [ ] Revisar todo o conteúdo (typos, links)
- [ ] Configurar sistema de recebimento de leads
- [ ] Testar integração de e-mail
- [ ] Lighthouse score > 90
- [ ] Configurar testes A/B

---

## 🆘 Troubleshooting

### Formulário não envia

1. Verifique se o endpoint `/api/submit-form` está respondendo
2. Confirme configuração de API keys (Resend, Google Sheets, etc.)
3. Verifique console do navegador para erros

### Analytics não rastreia

1. Confirme se `NEXT_PUBLIC_GA_MEASUREMENT_ID` está correto
2. Verifique no Google Analytics em tempo real
3. Use extensões de debug (Google Tag Assistant)

### Erros de build

```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## 📞 Suporte

**Pesquisador**: Eduardo Camargo Maia
**E-mail**: eduardo.maia@must.edu
**LinkedIn**: [linkedin.com/in/eduardocamargomaia](#)

---

## 📄 Licença

Este projeto é de uso acadêmico para a pesquisa de mestrado da MUST University.

---

## 🎯 Próximos Passos

1. **Implementar retargeting**: Pixel personalizado para remarketing
2. **Criar email marketing**: Sequência de follow-up para não-convertidos
3. **Landing page variations**: Criar versões A/B para diferentes segmentos
4. **Chatbot**: Integrar assistente virtual para dúvidas
5. **Video testimonial**: Adicionar depoimento em vídeo (se disponível)

---

**Desenvolvido com ❤️ para impulsionar a pesquisa acadêmica**
