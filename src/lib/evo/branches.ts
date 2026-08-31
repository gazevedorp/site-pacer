export interface EvoBranch {
  idBranch: number;
  slug: string;
  name: string;
}

/** EVO `idBranch` discovered from schedule area names. */
export const EVO_BRANCHES: EvoBranch[] = [
  { idBranch: 3, slug: "bonfim-1", name: "Bonfim 1" },
  { idBranch: 7, slug: "fiusa", name: "Fiusa" },
  { idBranch: 10, slug: "galeria-ribeirao", name: "Galeria Ribeirão" },
  { idBranch: 8, slug: "greenville", name: "Greenville" },
  { idBranch: 5, slug: "mirante-sul", name: "Mirante Sul" },
  { idBranch: 9, slug: "nova-alianca-sul", name: "Nova Aliança Sul" },
  { idBranch: 2, slug: "novo-shopping", name: "Novo Shopping" },
  { idBranch: 4, slug: "ribeirania", name: "Ribeirânia" },
  { idBranch: 6, slug: "sertaozinho-1", name: "Sertãozinho 1" },
  { idBranch: 1, slug: "sertaozinho-3", name: "Sertãozinho 3" },
];

export function getEvoBranch(unitSlug: string): EvoBranch | undefined {
  return EVO_BRANCHES.find((branch) => branch.slug === unitSlug);
}

export function getEvoBranchId(unitSlug: string): number | undefined {
  return getEvoBranch(unitSlug)?.idBranch;
}
