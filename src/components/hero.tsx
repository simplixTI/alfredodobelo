"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/content/data";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reduce = useReducedMotion();

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const numberY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-hero-cream"
      aria-label="Alfredo do Belo — Deputado Federal 1001"
    >
      {/* Halftones decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 top-24 h-40 w-40 dots-orange opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 bottom-40 h-56 w-56 dots-yellow opacity-60"
      />

      {/* Splash de pincelada laranja atrás do número */}
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        className="pointer-events-none absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full bg-brand-orange/25 blur-3xl md:h-[720px] md:w-[720px]"
      />
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-brand-yellow/30 blur-3xl md:h-[620px] md:w-[620px]"
      />

      {/* Grão sutil */}
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.08]" />

      {/* Selo eleitoral vertical (direita) */}
      <div
        aria-hidden
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 md:block"
      >
        <p className="selo-eleitoral">
          Propaganda Eleitoral · CNPJ: {site.cnpj}
        </p>
      </div>

      {/* Número 1001 gigante como marca d'água (mobile e background desktop) */}
      <motion.div
        style={{ y: numberY }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-4 flex select-none justify-center overflow-hidden md:hidden"
      >
        <span className="num-1001 text-[62vw] text-brand-yellow/25">1001</span>
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="container-wide relative z-10 flex min-h-[100svh] flex-col justify-center py-28 md:py-32"
      >
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-6">
          {/* COLUNA ESQUERDA — Texto e número */}
          <div className="md:col-span-7">
            {/* Pill superior */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="pill-deputy mb-4"
            >
              Deputado Federal
            </motion.div>

            {/* Slogan principal (pequeno acima) */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="mb-6 max-w-[22ch] text-lg font-bold uppercase leading-[1.1] tracking-crisp text-brand-navy md:text-xl"
            >
              <span className="text-brand-orange">Cultura que move.</span>
              <br />
              Gente que transforma.
            </motion.p>

            {/* Logo ALFREDO DO BELO (imagem PNG) — grande e protagonista */}
            <motion.h1
              className="mb-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="sr-only">Alfredo do Belo</span>
              <Image
                src="/campanha/logo-alfredo.png"
                alt="Alfredo do Belo"
                width={900}
                height={410}
                priority
                sizes="(max-width: 768px) 90vw, 60vw"
                className="h-auto w-full max-w-[520px] md:max-w-[640px] lg:max-w-[720px]"
              />
            </motion.h1>

            {/* Número 1001 (desktop) — abaixo da logo, sem sombra deslocada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden md:block"
            >
              <span className="num-1001 block leading-[0.9] text-[11rem] text-brand-yellow lg:text-[14rem]">
                1001
              </span>
            </motion.div>

            {/* Faixa "DEPUTADO FEDERAL" — separada do 1001 para não sobrepor */}
            <motion.div
              initial={{ opacity: 0, x: -20, scaleX: 0.85 }}
              animate={{ opacity: 1, x: 0, scaleX: 1 }}
              transition={{ delay: 0.95, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 hidden origin-left rounded-md bg-brand-orange px-6 py-2.5 shadow-brush md:inline-block"
              style={{ transform: "skewX(-4deg)" }}
            >
              <span
                className="num-1001 text-2xl uppercase tracking-wider text-white"
                style={{ transform: "skewX(4deg)", display: "inline-block" }}
              >
                Deputado Federal
              </span>
            </motion.div>

            {/* Faixa DEPUTADO FEDERAL mobile */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-3 inline-block rounded-md bg-brand-orange px-4 py-1.5 md:hidden"
              style={{ transform: "skewX(-4deg)" }}
            >
              <span
                className="num-1001 text-base uppercase tracking-wider text-white"
                style={{ transform: "skewX(4deg)", display: "inline-block" }}
              >
                Deputado Federal · 1001
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10"
            >
              <a
                href={site.participarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                Quero apoiar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={site.reelBeloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group"
              >
                <Play className="h-4 w-4 fill-current" />
                Ver o vídeo com Belo
              </a>
            </motion.div>

            {/* Republicanos badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-brand-navy/60"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-orange-deep">
                <span className="num-1001 text-sm">10</span>
              </span>
              Republicanos · Rio de Janeiro
            </motion.div>
          </div>

          {/* COLUNA DIREITA — Foto do Alfredo (mobile menor, desktop grande) */}
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:col-span-5"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              {/* Círculo amarelo de fundo */}
              <div className="absolute inset-0 rounded-full border-[6px] border-brand-yellow bg-brand-cream-warm/80 shadow-[0_30px_80px_-30px_rgba(220,78,18,0.5)]" />

              {/* Halftone dentro do círculo */}
              <div
                aria-hidden
                className="absolute inset-6 overflow-hidden rounded-full"
              >
                <div className="absolute -left-2 top-4 h-32 w-32 dots-yellow opacity-80" />
              </div>

              {/* Foto Alfredo */}
              <div className="relative aspect-square h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/campanha/perfil-alfredo.png"
                  alt="Alfredo do Belo"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Spark 4-pontas decorativo */}
              <motion.svg
                aria-hidden
                initial={{ scale: 0, rotate: -60 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 1.0,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewBox="0 0 24 24"
                className="absolute -right-2 top-6 h-14 w-14 text-brand-yellow drop-shadow-md md:-right-4 md:top-8 md:h-20 md:w-20"
              >
                <path
                  d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
                  fill="currentColor"
                />
              </motion.svg>

              {/* Selo Republicanos 10 pill (canto inferior) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 shadow-card"
              >
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-navy">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-orange" />
                  Republicanos · 10
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Selo eleitoral horizontal (mobile) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 md:hidden">
        <p className="text-center text-[9px] uppercase tracking-[0.2em] text-brand-navy/50">
          Propaganda Eleitoral · CNPJ: {site.cnpj}
        </p>
      </div>
    </section>
  );
}
