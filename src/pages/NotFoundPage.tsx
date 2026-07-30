import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function NotFoundPage() {
  useSeoMeta({
    title: "Página não encontrada — Pacer Academia",
    description: "A página que você procura não existe ou foi movida.",
    noIndex: true,
    canonical: "/404",
  });

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Erro 404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        O endereço pode ter mudado ou a página não existe. Volte para a página
        inicial ou explore nossas unidades e planos.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/">Ir para o início</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/unidades">Ver unidades</Link>
        </Button>
      </div>
    </main>
  );
}
