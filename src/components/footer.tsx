"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { site, navLinks } from "@/content/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-cream-light pt-24 pb-10 text-brand-navy">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.06]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 h-56 w-56 dots-orange opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 dots-yellow opacity-30"
      />

      {/* Skyline sutil de fundo */}
      <div
        aria-hidden
        className="rio-skyline pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-20"
      />

      <div className="container-wide relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {/* Logo do footer */}
            <div className="flex items-center gap-3">
              <img
                src="/campanha/logo-alfredo.png"
                alt="Alfredo do Belo"
                className="h-10 w-auto"
              />
              <span className="num-1001 text-3xl text-brand-yellow-deep">
                1001
              </span>
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-orange-deep">
              {site.party} · {site.partyNumero} · {site.state}
            </p>

            <p className="mt-6 max-w-md text-brand-navy/75 text-pretty">
              {site.taglineSecondary} Um movimento de escuta, diálogo e ação —
              pelas famílias, pela cultura popular e por quem faz o Rio
              acontecer todos os dias.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <SocialLink href={site.social.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="Youtube">
                <Youtube className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange-deep">
              Navegue
            </p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-brand-navy/80 transition-colors hover:text-brand-orange"
                  >
                    <span className="h-[2px] w-4 bg-brand-navy/25 transition-all duration-300 group-hover:w-6 group-hover:bg-brand-orange" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange-deep">
              Contato
            </p>
            <ul className="mt-6 space-y-4 text-sm text-brand-navy/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-orange" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-brand-orange" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-brand-orange"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <a
              href={site.participarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
            >
              Quero apoiar
            </a>
          </div>
        </div>

        {/* Selo eleitoral obrigatório */}
        <div className="mt-16 rounded-2xl border-2 border-brand-orange/30 bg-white p-6 text-center shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-orange-deep">
            Propaganda Eleitoral
          </p>
          <p className="mt-2 text-xs text-brand-navy/80">
            CNPJ da campanha:{" "}
            <span className="font-mono font-semibold text-brand-navy">
              {site.cnpj}
            </span>{" "}
            · Coligação Republicanos · Rio de Janeiro
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-brand-navy/10 pt-8 text-xs text-brand-navy/55 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
          </p>
          <p className="text-brand-navy/45">
            Este é o site oficial de campanha eleitoral.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-navy/15 bg-white text-brand-navy/80 transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange hover:text-white"
    >
      {children}
    </a>
  );
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <AnimatePresence>
        {visible && (
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-orange bg-white text-brand-orange shadow-card transition-colors hover:bg-brand-orange hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          "Olá! Vim pela página do Alfredo do Belo 1001 e quero apoiar.",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
