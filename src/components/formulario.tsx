"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SectionHeader, Reveal } from "./ui";

type FormState = {
  nome: string;
  telefone: string;
  whatsapp: string;
  email: string;
  cidade: string;
  bairro: string;
  profissao: string;
  participacao: string;
  mensagem: string;
  lgpd: boolean;
};

const initial: FormState = {
  nome: "",
  telefone: "",
  whatsapp: "",
  email: "",
  cidade: "",
  bairro: "",
  profissao: "",
  participacao: "",
  mensagem: "",
  lgpd: false,
};

export function Formulario() {
  const [values, setValues] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.lgpd) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSent(true);
    setValues(initial);
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-cream-50 py-28 md:py-40">
      <div className="absolute inset-0 bg-grain opacity-[0.05]" aria-hidden />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl" aria-hidden />
      <div className="container-wide relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeader
              index="06"
              eyebrow="Fale com o movimento"
              title={
                <>
                  Sua história pode se tornar uma <span className="italic text-gold-600">pauta</span>.
                </>
              }
              intro="Preencha o formulário e junte-se ao movimento. Suas informações serão tratadas com respeito e usadas apenas para o contato solicitado."
            />

            <Reveal delay={2}>
              <dl className="mt-12 space-y-6 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.28em] text-gold-700">E-mail</dt>
                  <dd className="mt-1 font-display text-lg text-navy-800">
                    contato@alfredodobelo.com.br
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.28em] text-gold-700">WhatsApp</dt>
                  <dd className="mt-1 font-display text-lg text-navy-800">
                    (21) 9 0000-0000
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.28em] text-gold-700">Escritório</dt>
                  <dd className="mt-1 text-ink-soft">
                    Rua Exemplo, 000 — Rio de Janeiro / RJ
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-3xl border border-navy-800/10 bg-cream-50 p-8 shadow-card md:p-10">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-6 py-12 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl text-navy-800">Recebido, obrigado!</h3>
                        <p className="mt-3 max-w-md text-ink-muted">
                          Sua mensagem chegou à equipe do movimento. Em breve
                          entraremos em contato para caminhar junto.
                        </p>
                      </div>
                      <button type="button" onClick={() => setSent(false)} className="btn-ghost">
                        Enviar outra mensagem
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={onSubmit}
                      className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >
                      <Field label="Nome completo" required>
                        <input required type="text" value={values.nome} onChange={(e) => update("nome", e.target.value)} className="input" autoComplete="name" />
                      </Field>
                      <Field label="Telefone" required>
                        <input required type="tel" value={values.telefone} onChange={(e) => update("telefone", e.target.value)} className="input" autoComplete="tel" />
                      </Field>
                      <Field label="WhatsApp">
                        <input type="tel" value={values.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="input" />
                      </Field>
                      <Field label="E-mail" required>
                        <input required type="email" value={values.email} onChange={(e) => update("email", e.target.value)} className="input" autoComplete="email" />
                      </Field>
                      <Field label="Cidade">
                        <input type="text" value={values.cidade} onChange={(e) => update("cidade", e.target.value)} className="input" autoComplete="address-level2" />
                      </Field>
                      <Field label="Bairro">
                        <input type="text" value={values.bairro} onChange={(e) => update("bairro", e.target.value)} className="input" />
                      </Field>
                      <Field label="Profissão" full>
                        <input type="text" value={values.profissao} onChange={(e) => update("profissao", e.target.value)} className="input" />
                      </Field>
                      <Field label="Como deseja participar?" full required>
                        <select required value={values.participacao} onChange={(e) => update("participacao", e.target.value)} className="input">
                          <option value="" disabled>Selecione uma opção</option>
                          <option value="Voluntário">Voluntário</option>
                          <option value="Receber novidades">Receber novidades</option>
                          <option value="Quero conversar">Quero conversar</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </Field>
                      <Field label="Mensagem" full>
                        <textarea rows={4} value={values.mensagem} onChange={(e) => update("mensagem", e.target.value)} className="input resize-none" placeholder="Conte sua ideia, sua história ou o que precisa mudar por aí…" />
                      </Field>

                      <label className="md:col-span-2 flex items-start gap-3 rounded-xl border border-navy-800/10 bg-cream-100/70 p-4 text-sm text-ink-soft">
                        <input type="checkbox" required checked={values.lgpd} onChange={(e) => update("lgpd", e.target.checked)} className="mt-1 h-4 w-4 accent-gold-500" />
                        <span>
                          Autorizo o tratamento dos meus dados de acordo com a{" "}
                          <a href="#" className="underline decoration-gold-500/60 underline-offset-4">Política de Privacidade</a>{" "}
                          e a Lei Geral de Proteção de Dados (LGPD).
                        </span>
                      </label>

                      <div className="md:col-span-2 flex items-center justify-between gap-4">
                        <p className="text-xs text-ink-muted">Levaremos sua mensagem à equipe do movimento.</p>
                        <button type="submit" disabled={submitting || !values.lgpd} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                          {submitting ? "Enviando…" : "Quero Participar"}
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgb(10 31 68 / 0.12);
          background: rgb(255 255 255 / 0.6);
          padding: 0.75rem 0.95rem;
          font-size: 0.95rem;
          color: #14161A;
          transition: border-color 200ms, box-shadow 200ms, background 200ms;
        }
        .input:focus {
          outline: none;
          border-color: #C9A24B;
          box-shadow: 0 0 0 3px rgb(201 162 75 / 0.2);
          background: rgb(255 255 255 / 0.95);
        }
        .input::placeholder { color: rgb(20 22 26 / 0.4); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={full ? "md:col-span-2" : ""}>
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.24em] text-navy-800/70">
        {label}
        {required && <span className="ml-1 text-gold-600">*</span>}
      </span>
      {children}
    </label>
  );
}
