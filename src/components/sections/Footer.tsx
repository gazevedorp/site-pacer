import { Link } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";
import { CENTRAL_WHATSAPP } from "@/lib/whatsapp";
import { SCHEDULE_PAGE_ENABLED } from "@/config/features";

const footerLinks = {
  Academia: [
    { label: "Modalidades", href: "/modalidades" },
    { label: "Unidades", href: "/unidades" },
    { label: "Planos", href: "/planos" },
    {
      label: "Grade de Aulas",
      href: "/aulas",
      disabled: !SCHEDULE_PAGE_ENABLED,
    },
  ],
  Institucional: [
    { label: "Personais", href: "/personais" },
    { label: "FAQ", href: "/faq" },
    { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
    { label: "Contato", href: "/contato" },
  ],
  Social: [
    { label: "Instagram", href: "https://instagram.com/paceracademia" },
    { label: "YouTube", href: "https://youtube.com/@paceracademia" },
    { label: "TikTok", href: "https://www.tiktok.com/@pacer.academia" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img src="/logo-sem-fundo.png" alt="Pacer Academia" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              <b>PACER, NO SEU RITMO.</b> A rede de academias que mais cresce em
              Ribeirão Preto e região.
            </p>
            <div className="mt-4 space-y-1.5">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden />
                sac@paceracademia.com.br
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden />
                <a
                  href={`https://wa.me/${CENTRAL_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  (16) 95782-0040
                </a>
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
                    {"disabled" in link && link.disabled ? (
                      <span
                        className="cursor-not-allowed text-sm text-muted-foreground/40"
                        aria-disabled="true"
                        title="Em breve"
                      >
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
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
        </div>
      </div>
    </footer>
  );
}
