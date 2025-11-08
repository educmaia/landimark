import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";

// Lazy load componentes abaixo da dobra com loading states otimizados
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const Eduardo = dynamic(() => import("@/components/Eduardo"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const Benefits = dynamic(() => import("@/components/Benefits"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const Process = dynamic(() => import("@/components/Process"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const Form = dynamic(() => import("@/components/Form"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-24 animate-pulse bg-gray-100" />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <Hero />
      <SocialProof />
      <About />
      <Eduardo />
      <Benefits />
      <Process />
      <Form />
      <FAQ />
      <Footer />
    </main>
  );
}
