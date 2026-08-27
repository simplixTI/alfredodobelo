import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About, Bandeiras, Propostas, Movimento } from "@/components/sections";
import { Footer, FloatingActions } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <About />
        <Bandeiras />
        <Propostas />
        <Movimento />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
