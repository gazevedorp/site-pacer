import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  Academia: [
    { label: "Modalidades",   href: "/modalidades" },
    { label: "Unidades",      href: "/unidades" },
    { label: "Planos",        href: "/planos" },
    { label: "Grade de Aulas",href: "/aulas" },
  ],
  Institucional: [
    { label: "Personais",          href: "/personais" },
    { label: "Trabalhe conosco",   href: "/trabalhe-conosco" },
    { label: "Contato",            href: "/contato" },
  ],
  Social: [
    { label: "Instagram", href: "https://instagram.com/paceracademia" },
    { label: "YouTube",   href: "https://youtube.com/@paceracademia" },
    { label: "TikTok",    href: "https://tiktok.com/@paceracademia" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img src="/logo-sem-fundo.png" alt="Pacer Academia" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Saúde e qualidade de vida. A rede de academias que mais cresce na
              região de Ribeirão Preto e Sertãozinho.
            </p>
            <div className="mt-4 space-y-1.5">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden />
                sac@paceracademia.com.br
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden />
                Ribeirão Preto e Sertãozinho – SP
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pacer Academia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Ribeirão Preto e Sertãozinho – SP
          </p>
        </div>
      </div>
    </footer>
  );
}
