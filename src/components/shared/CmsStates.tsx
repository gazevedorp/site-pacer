interface CmsEmptyProps {
  message?: string;
  className?: string;
}

export function CmsEmpty({
  message = "Conteúdo em breve.",
  className = "",
}: CmsEmptyProps) {
  return (
    <p
      className={`py-12 text-center text-sm text-muted-foreground ${className}`}
      role="status"
    >
      {message}
    </p>
  );
}

interface CmsLoadingProps {
  className?: string;
}

export function CmsLoading({ className = "py-12" }: CmsLoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Carregando"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
