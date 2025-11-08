# Guia de Personalização
## Como adaptar a landing page para sua pesquisa

---

## 🎨 Personalização Visual

### 1. Cores do Tema

Edite `/tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Substitua pelos valores da sua paleta
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... até 900
      },
      secondary: {
        // Cores secundárias
      },
    },
  },
}
```

**Ferramentas recomendadas**:
- [Tailwind Color Generator](https://uicolors.app/create)
- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

---

### 2. Tipografia

#### Trocar Fontes

Edite `/src/app/layout.tsx`:

```typescript
import { Montserrat, Roboto } from "next/font/google";

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

const body = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});
```

Depois, atualize `tailwind.config.ts`:

```typescript
fontFamily: {
  heading: ['var(--font-heading)'],
  body: ['var(--font-body)'],
},
```

**Fontes recomendadas**:
- Headlines: Poppins, Montserrat, Raleway, Inter
- Body: Inter, Open Sans, Roboto, Lato

---

### 3. Logos e Imagens

#### Adicionar Logo

1. Coloque o logo em `/public/logo.svg` ou `/public/logo.png`
2. No componente `Hero.tsx`, substitua:

```tsx
<Image
  src="/logo.svg"
  alt="Logo da Pesquisa"
  width={200}
  height={60}
  priority
/>
```

#### Trocar Ilustrações

Substitua o placeholder no `Hero.tsx`:

```tsx
<Image
  src="/hero-illustration.png"
  alt="Ilustração"
  width={600}
  height={600}
  className="rounded-3xl shadow-2xl"
/>
```

**Bancos de imagens**:
- [Unsplash](https://unsplash.com/)
- [Pexels](https://pexels.com/)
- [unDraw](https://undraw.co/) - Ilustrações customizáveis

---

## ✍️ Personalização de Conteúdo

### 1. Hero Section

Edite `/src/components/Hero.tsx`:

```tsx
// Título principal
<h1>
  Seu Título
  <span className="text-gradient">Destacado</span>
</h1>

// Subtítulo
<p>
  Seu subtítulo explicativo sobre a pesquisa
</p>

// Benefícios
{[
  "Seu benefício 1",
  "Seu benefício 2",
  "Seu benefício 3",
].map((benefit, index) => (
  // ...
))}
```

---

### 2. Sobre a Pesquisa

Edite `/src/components/About.tsx`:

```tsx
<p>
  Esta pesquisa investiga [SEU TEMA] em [SEU CONTEXTO].
  Conduzida por [SEU NOME], [SUA TITULAÇÃO] na [SUA UNIVERSIDADE].
</p>
```

---

### 3. Benefícios da Participação

Edite `/src/components/Benefits.tsx`:

Customize o array `benefits`:

```tsx
const benefits = [
  {
    icon: Clock,
    title: "Seu Benefício 1",
    description: "Descrição detalhada",
    color: "primary",
  },
  // Adicione mais benefícios
];
```

**Ícones disponíveis**: [Lucide Icons](https://lucide.dev/)

---

### 4. Processo (Como Funciona)

Edite `/src/components/Process.tsx`:

```tsx
const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Sua Etapa 1",
    description: "Descrição da etapa",
    duration: "Tempo estimado",
  },
  // Adicione ou remova etapas conforme necessário
];
```

---

### 5. FAQ

Edite `/src/components/FAQ.tsx`:

```tsx
const faqs = [
  {
    question: "Sua pergunta?",
    answer: "Sua resposta detalhada.",
  },
  // Adicione quantas perguntas precisar
];
```

**Dica**: Baseie as FAQs em objeções reais dos participantes potenciais.

---

### 6. Footer

Edite `/src/components/Footer.tsx`:

```tsx
// Informações de contato
<a href="mailto:seu@email.com">
  seu@email.com
</a>

<a href="tel:+5511999999999">
  (11) 99999-9999
</a>

// Redes sociais
<a href="https://linkedin.com/in/seuperfil">
  LinkedIn
</a>
```

---

## 📋 Personalização do Formulário

### 1. Adicionar/Remover Campos

Edite `/src/components/Form.tsx`:

#### Adicionar novo campo

```tsx
// No schema Zod
const formSchema = z.object({
  // ... campos existentes
  seuNovoCampo: z.string().min(2, "Mensagem de erro"),
});

// No formulário JSX
<div>
  <label>Seu Novo Campo *</label>
  <input
    {...register("seuNovoCampo")}
    type="text"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
    placeholder="Digite aqui..."
  />
  {errors.seuNovoCampo && (
    <p className="text-red-500 text-sm">
      {errors.seuNovoCampo.message}
    </p>
  )}
</div>
```

#### Remover campo

1. Remova do schema Zod
2. Remova do JSX do formulário
3. Remova do processamento no `/api/submit-form/route.ts`

---

### 2. Alterar Validações

```tsx
// E-mail obrigatório
email: z.string().email("E-mail inválido"),

// Telefone com regex customizado
telefone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato: (XX) XXXXX-XXXX"),

// Número mínimo/máximo
idade: z.number().min(18).max(100),

// String com tamanho específico
cpf: z.string().length(14, "CPF deve ter 14 caracteres"),

// Campo opcional
observacoes: z.string().optional(),

// Select com opções específicas
setor: z.enum(["comercio", "servicos", "industria", "outro"]),
```

---

### 3. Mudar Destino dos Dados

#### Opção A: Google Sheets

Edite `/src/app/api/submit-form/route.ts`:

```typescript
const response = await fetch(process.env.GOOGLE_SHEETS_SCRIPT_URL!, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

#### Opção B: E-mail via Resend

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@seudominio.com',
  to: 'seu@email.com',
  subject: 'Nova Inscrição',
  html: `<h1>Dados recebidos...</h1>`,
});
```

#### Opção C: Banco de Dados (Supabase, PlanetScale, etc.)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

await supabase
  .from('inscricoes')
  .insert([data]);
```

---

## 📊 Personalização de Analytics

### 1. Google Analytics 4

Adicione eventos customizados em `/src/lib/analytics.ts`:

```typescript
export const trackCustomEvent = (name: string) => {
  event({
    action: name,
    category: 'custom',
    label: 'sua_label',
  });
};
```

Use nos componentes:

```tsx
import { trackCustomEvent } from '@/lib/analytics';

<button onClick={() => trackCustomEvent('botao_especial')}>
  Clique Aqui
</button>
```

---

### 2. Meta Pixel

Adicione eventos customizados:

```typescript
import { fbEvent } from '@/lib/analytics';

// Evento de visualização de conteúdo
fbEvent('ViewContent', {
  content_name: 'Seção de Benefícios',
});

// Evento de lead
fbEvent('Lead', {
  content_category: 'Pesquisa Mestrado',
});
```

---

## 🎯 Personalização de CTAs

### 1. Textos dos Botões

Estratégias de copywriting para CTAs:

**Ação direta**:
- "Quero Participar"
- "Inscrever Agora"
- "Garantir Minha Vaga"

**Benefício**:
- "Receber Insights Exclusivos"
- "Contribuir para Pesquisa"
- "Fazer Parte da Mudança"

**Urgência**:
- "Últimas Vagas Disponíveis"
- "Participe Antes que Encerre"
- "Garanta Sua Participação"

---

### 2. Cores e Estilos

Edite `/src/app/globals.css`:

```css
.btn-primary {
  @apply px-8 py-4 bg-green-600 text-white; /* Mude a cor */
}

.btn-secondary {
  @apply px-8 py-4 bg-white text-green-600 border-2 border-green-600;
}

/* Botão com gradiente */
.btn-gradient {
  @apply bg-gradient-to-r from-purple-500 to-pink-500 text-white;
}
```

---

## 🌐 SEO e Metadata

### 1. Título e Descrição

Edite `/src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Seu Título Otimizado para SEO | Universidade",
  description: "Descrição convincente de até 160 caracteres que aparecerá nos resultados de busca.",
  keywords: [
    "palavra-chave-1",
    "palavra-chave-2",
    // Máximo 10-15 palavras-chave relevantes
  ],
};
```

---

### 2. Open Graph (Redes Sociais)

```typescript
openGraph: {
  type: "website",
  locale: "pt_BR",
  title: "Título para compartilhamento",
  description: "Descrição que aparece quando compartilhado",
  siteName: "Nome do Site",
  images: [
    {
      url: "https://seusite.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Imagem de compartilhamento",
    },
  ],
},
```

**Tamanho ideal da imagem OG**: 1200x630px

**Ferramentas de teste**:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

### 3. Favicon

1. Crie seu favicon (16x16, 32x32, 180x180 para Apple)
2. Use [Favicon Generator](https://realfavicongenerator.net/)
3. Coloque os arquivos em `/public/`
4. Adicione no `<head>`:

```tsx
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## 🚀 Customização Avançada

### 1. Animações Personalizadas

Adicione em `tailwind.config.ts`:

```typescript
animation: {
  'custom-bounce': 'bounce 2s infinite',
  'slide-in': 'slideIn 0.5s ease-out',
},
keyframes: {
  slideIn: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
}
```

Use nos componentes:

```tsx
<div className="animate-slide-in">
  Conteúdo animado
</div>
```

---

### 2. Modo Escuro (Dark Mode)

1. Adicione configuração no Tailwind:

```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // ou 'media'
  // ...
}
```

2. Crie componente toggle:

```tsx
// components/ThemeToggle.tsx
'use client';
import { useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  };

  return (
    <button onClick={toggle}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
```

3. Use classes dark:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Conteúdo
</div>
```

---

### 3. Internacionalização (i18n)

Para landing pages em múltiplos idiomas:

1. Instale dependência:

```bash
npm install next-intl
```

2. Configure `/middleware.ts`
3. Crie arquivos de tradução
4. Use no componente

**Referência**: [Next-intl Documentation](https://next-intl-docs.vercel.app/)

---

## 🎨 Templates de Seções Adicionais

### Adicionar Seção de Depoimentos

Crie `/src/components/Testimonials.tsx`:

```tsx
'use client';

export default function Testimonials() {
  const testimonials = [
    {
      name: "João Silva",
      role: "CEO, Empresa X",
      content: "Participar desta pesquisa foi extremamente valioso...",
      avatar: "/testimonial-1.jpg",
    },
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="section-title">O que dizem os participantes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="card">
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Adicionar Contador Regressivo

```tsx
'use client';
import { useState, useEffect } from 'react';

export default function Countdown() {
  const [days, setDays] = useState(0);
  const targetDate = new Date('2025-12-31');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="text-6xl font-bold text-primary-600">{days}</div>
      <p className="text-gray-600">dias para encerramento das inscrições</p>
    </div>
  );
}
```

---

## 📱 Notificações e Alertas

### Toast Notifications

Instale biblioteca:

```bash
npm install react-hot-toast
```

Use no formulário:

```tsx
import toast from 'react-hot-toast';

// Em caso de sucesso
toast.success('Inscrição enviada com sucesso!');

// Em caso de erro
toast.error('Erro ao enviar formulário');

// Loading
toast.loading('Enviando...');
```

---

## ✅ Checklist de Personalização

Antes de publicar, verifique:

- [ ] Todas as referências à "MUST University" atualizadas
- [ ] Informações de contato corretas
- [ ] Logos e imagens substituídas
- [ ] Cores do tema personalizadas
- [ ] Textos e CTAs adaptados ao seu público
- [ ] Formulário com campos relevantes
- [ ] Analytics configurado (GA4, Meta Pixel)
- [ ] SEO otimizado (título, descrição, keywords)
- [ ] Favicon adicionado
- [ ] Testes em dispositivos móveis
- [ ] Verificação de links e e-mails
- [ ] Performance otimizada (Lighthouse > 90)

---

**Dúvidas?** Entre em contato ou consulte a documentação oficial do Next.js: [nextjs.org/docs](https://nextjs.org/docs)
