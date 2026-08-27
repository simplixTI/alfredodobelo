import { render } from "@react-email/render";
import { headers } from "next/headers";
import AlfredoDoBeloEmail from "@/emails/AlfredoDoBeloEmail";

export const dynamic = "force-dynamic";

export default async function EmailPreviewPage({
  searchParams,
}: {
  searchParams: { nome?: string };
}) {
  const firstName = searchParams?.nome ?? "João";

  // Detecta o host da requisição para o preview funcionar tanto em localhost
  // quanto em Vercel/deploy sem precisar reconfigurar env
  const h = headers();
  const host = h.get("host") || "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const previewBase = `${proto}://${host}`;

  const html = await render(
    <AlfredoDoBeloEmail
      firstName={firstName}
      assetsBaseUrl={previewBase}
      unsubscribeUrl="#preview"
    />,
    { pretty: true },
  );

  return (
    <div style={{ background: "#e8e2d4", minHeight: "100vh", padding: 32 }}>
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto 24px",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
        }}
      >
        <div
          style={{
            background: "#1E2A44",
            color: "white",
            padding: "16px 24px",
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              letterSpacing: "0.02em",
            }}
          >
            📧 Preview do email —{" "}
            <span style={{ color: "#F5B417" }}>Alfredo do Belo 1001</span>
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13,
              opacity: 0.75,
            }}
          >
            Personalização: <strong>?nome={firstName}</strong> · troque na URL
            (ex: <code>?nome=Maria</code>) para testar. Deixe vazio para ver
            fallback.
          </p>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          maxWidth: 700,
          margin: "0 auto",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
