"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { galleryImages } from "@/content/data";
import { Reveal, SectionHeader } from "./ui";

export function Galeria() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((v) =>
        v === null ? v : (v - 1 + galleryImages.length) % galleryImages.length,
      ),
    [],
  );
  const next = useCallback(
    () => setActive((v) => (v === null ? v : (v + 1) % galleryImages.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <section className="relative bg-cream-100 py-28 md:py-36">
      <div className="absolute inset-0 bg-grain opacity-[0.05]" aria-hidden />
      <div className="container-wide relative">
        <SectionHeader
          index="07"
          eyebrow="Galeria"
          title={
            <>
              Encontros que <span className="italic text-gold-600">contam</span> uma
              história.
            </>
          }
          intro="Momentos de escuta, cultura e caminhada pelos bairros do Rio de Janeiro."
        />

        <ul className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {galleryImages.map((img, i) => (
            <Reveal key={img.src} delay={i} as="li">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Abrir imagem: ${img.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-xl bg-navy-100"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 translate-y-2 text-left text-xs font-medium uppercase tracking-[0.24em] text-cream-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-md"
            onClick={close}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Fechar"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/20 bg-cream-50/5 text-cream-50 backdrop-blur hover:bg-cream-50/10"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Anterior"
              className="absolute left-4 md:left-8 flex h-12 w-12 items-center justify-center rounded-full border border-cream-50/20 bg-cream-50/5 text-cream-50 backdrop-blur hover:bg-cream-50/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próxima"
              className="absolute right-4 md:right-8 flex h-12 w-12 items-center justify-center rounded-full border border-cream-50/20 bg-cream-50/5 text-cream-50 backdrop-blur hover:bg-cream-50/10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[active].src}
                alt={galleryImages[active].alt}
                className="max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain"
              />
              <p className="mt-4 text-center text-xs uppercase tracking-[0.28em] text-cream-50/70">
                {galleryImages[active].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
