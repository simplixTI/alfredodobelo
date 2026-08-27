"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/content/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-brand-cream-light/95 backdrop-blur-md shadow-[0_1px_0_rgba(30,42,68,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <a
          href="#inicio"
          aria-label="Alfredo do Belo 1001"
          className="relative z-10 flex items-center gap-3"
        >
          <Image
            src="/campanha/logo-alfredo.png"
            alt="Alfredo do Belo"
            width={200}
            height={90}
            priority
            className={cn(
              "h-auto w-auto object-contain transition-all duration-500",
              scrolled ? "max-h-9" : "max-h-11",
            )}
          />
          <span className="num-1001 text-2xl text-brand-yellow md:text-3xl">
            1001
          </span>
        </a>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[13px] font-bold uppercase tracking-[0.14em] text-brand-navy/80 transition-colors hover:text-brand-orange"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand-orange transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <a
            href={site.participarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Quero apoiar <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-orange bg-white text-brand-orange transition-colors hover:bg-brand-orange hover:text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-brand-cream lg:hidden"
          >
            <div className="absolute inset-0 bg-hero-cream opacity-90" />
            <div className="absolute inset-0 bg-grain opacity-[0.1]" />
            <div className="absolute right-4 top-32 h-40 w-40 dots-orange opacity-70" />

            <div className="relative flex h-full flex-col justify-between p-8 pt-28">
              <ul className="flex flex-col gap-6">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 leading-none"
                    >
                      <span className="num-1001 text-xs text-brand-orange">
                        0{i + 1}
                      </span>
                      <span className="num-1001 text-5xl text-brand-navy transition-colors group-hover:text-brand-orange">
                        {l.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <a
                  href={site.participarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-between"
                >
                  Quero apoiar <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-brand-navy/60">
                  Republicanos · 10 · Rio de Janeiro
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
