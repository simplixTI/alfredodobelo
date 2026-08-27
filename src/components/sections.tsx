import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  stats,
  bandeiras,
  propostas,
  movimentoCards,
  site,
} from "@/content/data";
import { Reveal, SectionHeader, Icon } from "./ui";

export function About() {
  return (
    <section
      id="quem-sou"
      className="relative overflow-hidden bg-brand-cream-light py-28 md:py-40"
    >
      {/* Halftone decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 right-0 h-64 w-64 dots-orange opacity-40"
      />
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.05]" />

      <div className="container-wide relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              {/* Halo laranja atrás */}
              <div
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-orange/15 blur-3xl"
                aria-hidden
              />

              {/* Card com foto Alfredo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border-4 border-brand-yellow bg-brand-cream-warm shadow-[0_30px_60px_-30px_rgba(220,78,18,0.45)]">
                {/* Halftone dentro */}
                <div
                  aria-hidden
                  className="absolute -left-4 top-6 h-32 w-32 dots-yellow opacity-80"
                />
                <div
                  aria-hidden
                  className="absolute right-4 bottom-10 h-40 w-40 dots-orange opacity-60"
                />

                <Image
                  src="/campanha/alfredo-2524.jpg"
                  alt="Alfredo do Belo"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-top"
                />

                {/* Pill superior */}
                <div className="absolute left-4 top-4 rounded-full bg-brand-orange px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white shadow-md">
                  Republicanos · 10
                </div>
              </div>

              {/* Card 1001 flutuante */}
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-brand-orange p-5 text-white shadow-brush md:block">
                <p className="num-1001 text-4xl leading-none">1001</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/90">
                  Deputado Federal
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeader
              index="01"
              eyebrow="Quem sou"
              title={
                <>
                  Do <span className="text-brand-orange">samba</span> à política:
                  uma vida a serviço de quem faz o Rio acontecer.
                </>
              }
            />

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft text-pretty">
              <Reveal delay={1}>
                <p>
                  Nascido e criado no Rio de Janeiro, Alfredo do Belo cresceu
                  entre rodas de samba, ensaios de escola e o pagode das
                  quadras de bairro. Antes de ser voz política, foi voz da
                  cultura — dos palcos, dos bastidores, da produção que faz o
                  Rio tocar todo fim de semana.
                </p>
              </Reveal>
              <Reveal delay={2}>
                <p>
                  Foram mais de duas décadas dedicadas ao entretenimento
                  popular: projetos musicais, agendas comunitárias, apoio a
                  artistas iniciantes e à economia criativa dos bairros. Alfredo
                  conhece de perto quem vive de música, de arte e da noite
                  carioca — e as urgências reais desse setor que emprega,
                  arrecada e representa o Brasil no mundo.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p>
                  Agora, se apresenta ao Estado do Rio para fazer pela cultura,
                  pela família, pela juventude e pelo pequeno empreendedor o
                  que sempre fez pela música:{" "}
                  <span className="font-bold text-brand-orange-deep">
                    aparecer, escutar de verdade e entregar o combinado
                  </span>
                  .
                </p>
              </Reveal>
            </div>

            <Reveal delay={4}>
              <ul className="mt-14 grid grid-cols-2 gap-y-8 border-t-2 border-brand-orange/30 pt-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <li key={s.label}>
                    <p className="num-1001 text-5xl leading-none text-brand-orange">
                      {s.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy/70">
                      {s.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Bandeiras() {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-28 text-brand-navy md:py-36">
      {/* Halftones sutis */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-12 h-64 w-64 dots-orange opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-40 h-64 w-64 dots-yellow opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.05]" />

      {/* Skyline vetorizado do Rio no rodapé da seção */}
      <div
        aria-hidden
        className="rio-skyline pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-25"
      />

      <div className="container-wide relative">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="num-1001 text-xl text-brand-orange">02</span>
              <span className="h-[3px] w-16 bg-brand-orange" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange-deep">
                Principais bandeiras
              </span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="num-1001 mt-6 text-4xl uppercase leading-[0.95] text-brand-navy md:text-6xl text-balance">
              Seis compromissos que{" "}
              <span className="text-brand-orange">movem</span> este movimento.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bandeiras.map((b, i) => (
            <Reveal key={b.id} delay={i} as="li">
              <article className="group relative h-full overflow-hidden rounded-2xl border-2 border-brand-navy/10 bg-white p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange hover:shadow-pop">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-orange-deep opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange transition-all duration-500 group-hover:bg-brand-orange group-hover:text-white group-hover:scale-105">
                    <Icon name={b.icon} className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="num-1001 text-3xl uppercase leading-none text-brand-navy">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-navy/70 text-pretty">
                      {b.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Propostas() {
  return (
    <section
      id="propostas"
      className="relative bg-brand-cream-light py-28 md:py-40"
    >
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.04]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 h-56 w-56 dots-orange opacity-30"
      />

      <div className="container-wide relative">
        <SectionHeader
          index="03"
          eyebrow="Propostas"
          title={
            <>
              Ideias com <span className="text-brand-orange">pé no chão</span> para o
              dia a dia do fluminense.
            </>
          }
          intro="Um conjunto de propostas construídas na escuta ativa das famílias, do pequeno empresário e da juventude que quer trabalhar e crescer no Rio."
        />

        <ol className="relative mt-20 grid gap-14 md:mt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-[3px] bg-gradient-to-b from-transparent via-brand-orange/40 to-transparent md:block"
          />
          {propostas.map((p, i) => (
            <Reveal key={p.id} delay={i} as="li">
              <div className="relative grid gap-6 md:grid-cols-12 md:items-start">
                <div className="relative md:col-span-2">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-orange bg-white text-brand-orange shadow-card">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </div>
                </div>

                <div className="md:col-span-10">
                  <p className="num-1001 text-lg uppercase tracking-[0.22em] text-brand-orange-deep">
                    Proposta 0{p.id}
                  </p>
                  <h3 className="num-1001 mt-2 text-3xl uppercase leading-none text-brand-navy md:text-5xl text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
                    {p.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Movimento() {
  return (
    <section
      id="movimento"
      className="relative overflow-hidden bg-brand-cream py-28 md:py-36"
    >
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.06]" />

      <div className="container-wide relative">
        <SectionHeader
          index="04"
          eyebrow="Movimento"
          title={
            <>
              Este movimento é feito de{" "}
              <span className="text-brand-orange">gente</span>. Você faz parte
              dele.
            </>
          }
          intro="Cada pessoa que soma ajuda a levar essa agenda mais longe. Escolha a forma como você quer caminhar junto — todas contam."
          align="center"
          className="mx-auto"
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {movimentoCards.map((c, i) => (
            <Reveal key={c.id} delay={i} as="li">
              <a
                href={site.participarUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-participacao={c.value}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-navy/10 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange hover:shadow-pop"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-orange-deep opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange transition-all duration-500 group-hover:bg-brand-orange group-hover:text-white">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="num-1001 mt-6 text-2xl uppercase leading-none text-brand-navy">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/70 text-pretty">
                    {c.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange-deep">
                  Participar
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        {/* CTA final grande */}
        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <p className="num-1001 max-w-3xl text-4xl uppercase leading-[0.95] text-brand-navy md:text-6xl">
            Construindo um{" "}
            <span className="text-brand-orange">belo</span>{" "}
            <span className="text-brand-yellow-deep">futuro</span>.
          </p>
          <a
            href={site.participarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group text-base"
          >
            Quero apoiar o Alfredo
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
