import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/data/app";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28.99 31.99"
      aria-hidden
      className={className}
    >
      <path
        d="M13.54 15.28.12 29.34a3.66 3.66 0 0 0 5.33 2.16l15.1-8.6Z"
        fill="#EA4335"
      />
      <path
        d="m27.11 12.89-6.53-3.74-7.35 6.45 7.38 7.28 6.48-3.7a3.54 3.54 0 0 0 1.5-4.79 3.62 3.62 0 0 0-1.5-1.5z"
        fill="#FBBC04"
      />
      <path
        d="M.12 2.66a3.57 3.57 0 0 0-.12.92v24.84a3.57 3.57 0 0 0 .12.92L14 15.64Z"
        fill="#4285F4"
      />
      <path
        d="m13.64 16 6.94-6.85L5.5.51A3.73 3.73 0 0 0 3.63 0 3.64 3.64 0 0 0 .12 2.65Z"
        fill="#34A853"
      />
    </svg>
  );
}

interface StoreBadgeProps {
  href: string;
  label: string;
  platform: string;
  icon: ReactNode;
  className?: string;
}

function StoreBadge({ href, label, platform, icon, className }: StoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex w-full min-h-12 items-center gap-3 rounded-xl border border-white/10",
        "bg-white/[0.06] px-4 py-3.5 backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.1] hover:shadow-lg hover:shadow-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "sm:w-auto sm:min-w-[180px] sm:py-3",
        className
      )}
    >
      <span className="shrink-0 text-white transition-colors group-hover:text-primary">
        {icon}
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-wide text-white/55">
          {label}
        </span>
        <span className="mt-0.5 text-sm font-semibold text-white">
          {platform}
        </span>
      </span>
    </a>
  );
}

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:items-stretch lg:mx-0",
        className
      )}
    >
      <StoreBadge
        href={APP_STORE_URL}
        label="Baixar na"
        platform="App Store"
        icon={<AppleIcon className="h-7 w-7" />}
      />
      <StoreBadge
        href={GOOGLE_PLAY_URL}
        label="Disponível no"
        platform="Google Play"
        icon={<PlayStoreIcon className="h-7 w-7" />}
      />
    </div>
  );
}
