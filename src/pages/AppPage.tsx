import { useSeoMeta } from "@/hooks/useSeoMeta";
import { AppBanner } from "@/components/sections/App/AppBanner";
import { AppDownload } from "@/components/sections/App/AppDownload";

export default function AppPage() {
  useSeoMeta({
    title: "App Pacer Academia | Baixe para iOS e Android",
    description:
      "Baixe o app Pacer Academia. Acesse seus treinos, consulte a agenda de aulas coletivas e receba notificações, tudo no seu celular.",
  });

  return (
    <main>
      <AppBanner />
      <AppDownload />
    </main>
  );
}
