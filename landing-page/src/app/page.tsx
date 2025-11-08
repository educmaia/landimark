import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";
import Process from "@/components/Process";
import Form from "@/components/Form";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-custom">
      <Hero />
      <SocialProof />
      <About />
      <Benefits />
      <Process />
      <Form />
      <FAQ />
      <Footer />
    </main>
  );
}
