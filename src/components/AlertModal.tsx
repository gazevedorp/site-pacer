import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useAlertaAtivo } from "@/hooks/cms/useAlertaAtivo";

const SESSION_KEY = "pacer-alerta-dismissed";

interface AlertModalProps {
  enabled: boolean;
}

export function AlertModal({ enabled }: AlertModalProps) {
  const { data: alerta } = useAlertaAtivo();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled || !alerta) return;
    const dismissed = sessionStorage.getItem(`${SESSION_KEY}-${alerta.id}`);
    if (!dismissed) setOpen(true);
  }, [enabled, alerta]);

  function handleClose() {
    if (alerta) {
      sessionStorage.setItem(`${SESSION_KEY}-${alerta.id}`, "1");
    }
    setOpen(false);
  }

  if (!alerta) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[91] max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl focus:outline-none"
          aria-label="Aviso promocional"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground hover:text-foreground"
            aria-label="Fechar aviso"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={alerta.imagemUrl}
            alt="Aviso Pacer Academia"
            className="max-h-[85vh] w-full object-contain"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
