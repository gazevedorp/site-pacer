import { Link } from "react-router-dom";

const footerLinks = {
  Academia: [
    { label: "Modalidades", href: "/#modalidades" },
    { label: "Unidades", href: "/#unidades" },
    { label: "Planos", href: "/#planos" },
    { label: "Contato", href: "/#contato" },
  ],
  Institucional: [
    { label: "Sobre nós", href: "#" },
    { label: "Trabalhe conosco", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Social: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "TikTok", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Pacer Academia" className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Saúde e qualidade de vida. A rede de academias que mais cresce na
              região de Ribeirão Preto e Sertãozinho.
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-sm text-muted-foreground">
                ✉️ sac@paceracademia.com.br
              </p>
              <p className="text-sm text-muted-foreground">
                📍 Ribeirão Preto e Sertãozinho – SP
              </p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold">{category}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Pacer Academia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted">
            Ribeirão Preto e Sertãozinho – SP
          </p>
        </div>
      </div>
    </footer>
  );
}
