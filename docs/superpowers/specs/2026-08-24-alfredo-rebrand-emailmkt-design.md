# Alfredo do Belo — Rebrand da Landing + Email Marketing 100k

**Data:** 2026-08-24
**Autor:** brainstorm com Lucas
**Escopo:** 2 projetos que compartilham a nova identidade visual "1001"

---

## Contexto

Alfredo do Belo é pré-candidato a Deputado Federal pelo RJ (Republicanos, número **1001**). Estamos em ano eleitoral (2026) e já passamos de 16/08 — propaganda eleitoral online liberada.

O usuário quer:
1. Repaginar a landing existente (`apoie.alfredodobelo.com.br`, repo Next.js 14 em `/Alfredo`) para casar com a nova identidade visual da campanha (referências em `/referencia/*.png`).
2. Disparar campanha de email marketing para base de **97.601 contatos únicos** (já processada em `/referencia/contatos_limpos.csv`) convidando a conhecer a proposta e apoiar a campanha.

## Nova identidade visual (extraída de `/referencia/`)

**Paleta:**
- Laranja vibrante `#F26522` (primária, CTAs, destaques)
- Amarelo/dourado `#F5B417` (secundária, número 1001)
- Bege/creme `#FBEDD9` (fundo hero)
- Azul marinho `#1E2A44` (contraste, títulos secundários)
- Branco off-white `#FFFFFF`

**Tipografia:**
- Títulos e número `1001`: sans-serif bold condensada — sugestão **Anton** ou **Bebas Neue** (Google Fonts)
- Corpo: **Inter** (Google Fonts)

**Elementos gráficos recorrentes:**
- Pinceladas de tinta (splash marks) em laranja/branco
- Halftones (bolinhas em degradê)
- Estrela/spark de 4 pontas
- Aquarela do Rio de Janeiro (Cristo, Pão de Açúcar, Lapa, favela, palmeiras, tambor, cavaquinho) como cenário do hero
- Foto do candidato recortada com fundo transparente

**Slogans:**
- Principal: `Cultura que move. Gente que transforma.`
- Secundário: `Construindo um belo futuro`

**Selo obrigatório (LGPD/Justiça Eleitoral):**
- `PROPAGANDA ELEITORAL | CNPJ: 68.470.396/0001-74` — vertical à direita nas artes; no site, footer.

## Assets disponíveis

Pasta `/referencia/` (não vai pro git):
- `PERFIL1.png` / `PERFIL2.png` — foto Alfredo alta resolução
- `FIXARFEED_01/02/03.png` — composições com cenário do Rio
- `CAPAFACEBOOK.png` — arte panorâmica (hero desktop)
- `STORIES1-4.png` — arte vertical 9:16 (hero mobile / cards)
- `FEED2/FEED3.png` — arte quadrada (cards)
- `CAPAREELS/CAPAREELS2.png` — capa do Reel do Belo (email CTA)
- `Agenda ALFREDO DO BELO.png`

Os assets a serem usados na landing e no email devem ser **copiados para `/public/campanha/`** (versão comprimida/otimizada) e referenciados de lá.

## Projeto A — Rebrand da Landing

**Repo:** `/Alfredo` (Next.js 14 + Tailwind + Framer Motion)

**Arquivos a alterar:**
- `tailwind.config.ts` — adicionar tokens da nova paleta (`brand-orange`, `brand-yellow`, `brand-cream`, `brand-navy`) e fontes
- `src/app/globals.css` — importar Google Fonts, definir base
- `src/app/layout.tsx` — metadata atualizada (título com "1001")
- `src/content/data.ts` — atualizar `site` com:
  - `participarUrl`: `https://www.alfredodobelo.com.br/campanha/alfredo-do-belo`
  - `social.instagram`: perfil oficial do Alfredo
  - Adicionar novos campos: `numero: "1001"`, `sloganMain`, `sloganSecondary`, `cnpj`, `reelBelo` (URL do Reel)
- `src/components/hero.tsx` — refazer com número 1001 gigante, foto do Alfredo (PERFIL1/2), aquarela de fundo, CTAs
- `src/components/nav.tsx` — logo nova + número 1001
- `src/components/sections.tsx` — aplicar nova paleta
- `src/components/formulario.tsx` — cores da nova identidade
- `src/components/footer.tsx` — adicionar selo eleitoral obrigatório

**CTAs principais do hero:**
- **Primário:** `Quero apoiar` → `https://www.alfredodobelo.com.br/campanha/alfredo-do-belo`
- **Secundário:** `Assistir vídeo com Belo` → Reel `https://www.instagram.com/reel/DcToAYmR3J8/`

**Skill a usar:** `frontend-design` (superpowers)

## Projeto B — Email Marketing (só depois do Projeto A aprovado)

**Serviço:** Resend Pro ($35/mês, 100k emails incluídos)
**Chave API:** já fornecida pelo usuário (conta descartável pós-campanha; guardar em `.env.local`)

**Configuração:**
- Domínio de envio: `alfredodobelo.com.br` (autenticar SPF/DKIM/DMARC no DNS)
- Remetente: `alfredo@alfredodobelo.com.br`
- Nome exibido: `Alfredo do Belo 1001`
- Reply-to: `contato@alfredodobelo.com.br`
- Audience: importar `referencia/contatos_limpos.csv` (97.601 contatos)

**Template (React Email na mesma identidade da landing):**
- Header: logo + número 1001 (laranja/amarelo)
- Hero: uma das artes prontas (sugestão `FIXARFEED_01.png` — arte com Cristo e Rio)
- Saudação personalizada: `Olá, {{nome}},` (fallback: `Olá,`)
- Corpo curto (3-4 linhas): apresentar Alfredo, mencionar cultura/transformação
- **CTA 1:** botão laranja `Ver o vídeo com Belo` → Reel Instagram
- **CTA 2:** botão amarelo `Quero apoiar` → link de apoio
- Footer obrigatório:
  - Selo `PROPAGANDA ELEITORAL | CNPJ: 68.470.396/0001-74`
  - Link `Descadastrar` (obrigatório LGPD art. 57-E Lei 9.504/97) — automático via Resend

**Warmup + cronograma (25 dias):**

| Dia | Lote | Acumulado |
|---|---|---|
| D+1 | 500 | 500 |
| D+3 | 1.500 | 2.000 |
| D+5 | 3.000 | 5.000 |
| D+8 | 5.000 | 10.000 |
| D+10 | 10.000 | 20.000 |
| D+13–D+25 | 8× 10.000 | ~100.000 |

## Gates de aprovação (o usuário exigiu)

1. **Gate 1:** rebrand da landing pronto → usuário aprova visualmente antes de seguir
2. **Gate 2:** template de email pronto → usuário aprova antes de qualquer disparo
3. **Gate 3:** primeiro warmup de 500 pronto pra disparar → usuário aciona manualmente

## Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Base não é opt-in explícito | Link de descadastro em todo email (obrigatório LGPD) + monitorar bounces/complaints |
| Warmup mal feito → domínio queimado | Cronograma escalonado de 25 dias, começando por 500 |
| Chave Resend vazada em chat | Conta descartável, será desativada pós-campanha |
| Assets pesados no repo | Comprimir PNGs antes de copiar pra `/public/campanha/` |
| Personalização quebra pra 1.133 sem nome | Fallback `Olá,` no template |

## Fora de escopo (não fazer agora)

- Formulário nativo de captura de novos leads (usar `participarUrl` externo)
- Dashboard interno de métricas (usar painel do Resend)
- Segmentação por cidade/perfil (fazer se o primeiro disparo pedir)
- Automação de fluxos (drip campaigns) — só broadcast único
