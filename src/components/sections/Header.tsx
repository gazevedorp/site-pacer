import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CENTRAL_WHATSAPP } from "@/lib/whatsapp";
import { SCHEDULE_PAGE_ENABLED } from "@/config/features";

const navLinks = [
  { label: "Modalidades", href: "/modalidades" },
  { label: "Unidades", href: "/unidades" },
  { label: "Aulas", href: "/aulas", disabled: !SCHEDULE_PAGE_ENABLED },
  { label: "Planos", href: "/planos" },
  { label: "Personais", href: "/personais" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" },
] as const;

function NavItem({
  link,
  className,
  onNavigate,
}: {
  link: (typeof navLinks)[number];
  className: string | ((props: { isActive: boolean }) => string);
  onNavigate?: () => void;
}) {
  if ("disabled" in link && link.disabled) {
    return (
      <span
        className={cn(
          typeof className === "string" ? className : className({ isActive: false }),
          "cursor-not-allowed opacity-40"
        )}
        aria-disabled="true"
        title="Em breve"
      >
        {link.label}
      </span>
    );
  }

  return (
    <NavLink to={link.href} onClick={onNavigate} className={className}>
      {link.label}
    </NavLink>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.header
      initial={reduced ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-sem-fundo.png" alt="Pacer Academia" width={120} height={36} className="h-9 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )
              }
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* <Button variant="ghost" size="sm">
            Área do aluno
          </Button> */}
          <a
            href={`https://wa.me/${CENTRAL_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">#pacernoseuritmo</Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu backdrop */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[49] bg-black/40 backdrop-blur-[2px] lg:hidden"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <NavItem
                  key={link.label}
                  link={link}
                  onNavigate={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-card hover:text-foreground",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground"
                    )
                  }
                />
              ))}
              <div className="mt-3 flex flex-col gap-2">
                {/* <Button variant="outline" size="sm">
                  Área do aluno
                </Button> */}
                <a
                  href={`https://wa.me/${CENTRAL_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm">#pacernoseuritmo</Button>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
