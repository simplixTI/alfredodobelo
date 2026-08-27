import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface AlfredoDoBeloEmailProps {
  firstName?: string;
  supportUrl?: string;
  reelUrl?: string;
  assetsBaseUrl?: string;
  unsubscribeUrl?: string;
}

const DEFAULT_ASSETS_BASE =
  process.env.NEXT_PUBLIC_ASSETS_BASE_URL ||
  "https://apoie.alfredodobelo.com.br";
const DEFAULT_SUPPORT_URL =
  "https://www.alfredodobelo.com.br/campanha/alfredo-do-belo";
const DEFAULT_REEL_URL = "https://www.instagram.com/reel/DcToAYmR3J8/";
const CNPJ_CAMPANHA = "68.470.396/0001-74";

export default function AlfredoDoBeloEmail({
  firstName,
  supportUrl = DEFAULT_SUPPORT_URL,
  reelUrl = DEFAULT_REEL_URL,
  assetsBaseUrl = DEFAULT_ASSETS_BASE,
  unsubscribeUrl = "{{{RESEND_UNSUBSCRIBE_URL}}}",
}: AlfredoDoBeloEmailProps) {
  const saudacao = firstName?.trim()
    ? `Olá, ${firstName.trim().split(" ")[0]},`
    : "Olá,";

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>
        Cultura que move. Gente que transforma. Conheça o Alfredo do Belo 1001.
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
            >
              <tbody>
                <tr>
                  <td align="left" style={{ verticalAlign: "middle" }}>
                    <Img
                      src={`${assetsBaseUrl}/campanha/logo-alfredo.png`}
                      alt="Alfredo do Belo"
                      width="170"
                      height="77"
                      style={{ display: "block" }}
                    />
                  </td>
                  <td
                    align="right"
                    style={{
                      verticalAlign: "middle",
                      paddingTop: 12,
                      paddingBottom: 4,
                    }}
                  >
                    <span style={headerNumero}>1001</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Hero image — arte panorâmica completa (CAPAFACEBOOK) */}
          <Section style={heroWrapper}>
            <Img
              src={`${assetsBaseUrl}/campanha/hero-desktop.jpg`}
              alt="Alfredo do Belo 1001 — Deputado Federal · Cultura que move. Gente que transforma."
              width="600"
              height="250"
              style={heroImg}
            />
          </Section>

          {/* Título e corpo — curto e direto */}
          <Section style={content}>
            <Text style={eyebrow}>Deputado Federal · RJ</Text>
            <Text style={h1}>
              O Belo apoia.{" "}
              <span style={{ color: "#F26522" }}>E você?</span>
            </Text>

            <Text style={saudacaoStyle}>{saudacao}</Text>

            <Text style={p}>
              Se você é fã do Belo, <strong>aperta o play</strong> no vídeo
              abaixo. Ele conta, com as palavras dele, a nossa história juntos e
              por que resolveu apoiar essa candidatura.
            </Text>

            <Text style={p}>
              Gosta do Belo? Confia no Belo?{" "}
              <strong>Faz como ele</strong>: apoia o Alfredo do Belo 1001 e
              soma nesse movimento.
            </Text>
          </Section>

          {/* CTAs */}
          <Section style={{ padding: "16px 56px 96px" }}>
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
            >
              <tbody>
                <tr>
                  <td align="center" style={{ paddingBottom: 12 }}>
                    <Button href={reelUrl} style={btnOutline}>
                      ▶ Ver o vídeo com Belo
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Button href={supportUrl} style={btnPrimary}>
                      Quero apoiar o Alfredo 1001 →
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={hr} />

          {/* Espaço em branco antes do selo */}
          <Section style={{ padding: "48px 40px" }} />

          {/* Footer / selo eleitoral */}
          <Section style={footer}>
            <Text style={seloTitle}>Propaganda Eleitoral</Text>
            <Text style={seloBody}>
              CNPJ da campanha:{" "}
              <span style={{ fontFamily: "monospace" }}>{CNPJ_CAMPANHA}</span>
              <br />
              Coligação Republicanos · Rio de Janeiro
            </Text>
            <Text style={unsubscribeText}>
              Você está recebendo este email porque faz parte da rede de
              contatos da campanha.{" "}
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Descadastrar
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ---------- estilos inline ---------- */
const body: React.CSSProperties = {
  backgroundColor: "#FBEDD9",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  margin: 0,
  padding: 0,
  color: "#0F1420",
};

const container: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  maxWidth: 600,
  margin: "24px auto",
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: "0 6px 20px rgba(30,42,68,0.08)",
};

const header: React.CSSProperties = {
  padding: "40px 56px 32px",
  backgroundColor: "#FFF7E8",
  borderBottom: "3px solid #F26522",
};

const headerNumero: React.CSSProperties = {
  fontFamily: "Impact, 'Arial Narrow', sans-serif",
  fontSize: 42,
  lineHeight: 1,
  margin: 0,
  padding: "4px 14px 6px",
  color: "#FFFFFF",
  backgroundColor: "#F26522",
  borderRadius: 8,
  letterSpacing: "0.02em",
  display: "inline-block",
};

const heroWrapper: React.CSSProperties = {
  padding: 0,
  margin: 0,
};

const heroImg: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  maxWidth: 600,
};

const content: React.CSSProperties = {
  padding: "40px 56px 16px",
};

const eyebrow: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "#DC4E12",
  margin: "0 0 12px 0",
};

const h1: React.CSSProperties = {
  fontFamily: "Impact, 'Arial Narrow', sans-serif",
  fontSize: 34,
  lineHeight: 1.05,
  color: "#1E2A44",
  margin: "0 0 20px 0",
  textTransform: "uppercase",
  letterSpacing: "-0.01em",
};

const saudacaoStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "#1E2A44",
  margin: "8px 0 12px 0",
};

const p: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  color: "#2A2E36",
  margin: "0 0 14px 0",
};

const btnPrimary: React.CSSProperties = {
  backgroundColor: "#F26522",
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "14px 26px",
  borderRadius: 999,
  textDecoration: "none",
  display: "inline-block",
};

const btnOutline: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  color: "#F26522",
  border: "2px solid #F26522",
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "12px 26px",
  borderRadius: 999,
  textDecoration: "none",
  display: "inline-block",
};

const hr: React.CSSProperties = {
  borderColor: "#F4E4C7",
  margin: "0 56px",
};

const footer: React.CSSProperties = {
  backgroundColor: "#FBEDD9",
  padding: "32px 56px",
  borderTop: "1px solid #F4E4C7",
};

const seloTitle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "#DC4E12",
  margin: "0 0 6px 0",
  textAlign: "center",
};

const seloBody: React.CSSProperties = {
  fontSize: 12,
  color: "#5B6270",
  margin: "0 0 16px 0",
  textAlign: "center",
  lineHeight: 1.5,
};

const unsubscribeText: React.CSSProperties = {
  fontSize: 11,
  color: "#5B6270",
  textAlign: "center",
  margin: 0,
  lineHeight: 1.5,
};

const unsubscribeLink: React.CSSProperties = {
  color: "#1E2A44",
  textDecoration: "underline",
};
