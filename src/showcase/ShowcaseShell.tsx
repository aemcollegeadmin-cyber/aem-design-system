import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { IconButton, Text, cn } from "@/design-system/aem";

const pages = [
  { to: "/", label: "Огляд" },
  { to: "/colors", label: "Кольори" },
  { to: "/typography", label: "Типографіка" },
  { to: "/components", label: "Компоненти" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <IconButton
      label={dark ? "Світла тема" : "Темна тема"}
      variant="muted"
      size="sm"
      onClick={() => setDark((value) => !value)}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </IconButton>
  );
}

export function ShowcaseShell({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-surface-muted">
        <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 bg-surface px-6 py-4 shadow-card">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-pill bg-accent-lime text-accent-lime-fg text-body font-semibold">
              А
            </span>
            <div className="flex flex-col leading-tight">
              <Text variant="paragraph" className="font-semibold">
                Той самий коледж
              </Text>
              <Text variant="caption" className="text-ink-muted">
                дизайн-система AEM
              </Text>
            </div>
          </div>
          <nav aria-label="Розділи системи" className="flex flex-wrap items-center gap-1">
            {pages.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="rounded-pill px-4 py-2 text-body text-ink-soft no-underline hover:bg-surface-muted hover:text-ink"
                activeProps={{ className: "bg-surface-muted font-medium text-ink" }}
                activeOptions={{ exact: page.to === "/" }}
              >
                {page.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </header>
        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">{children}</main>
      </div>
  );
}

export function Section({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-h2 font-semibold text-ink">{title}</h2>
        {description && <p className="text-caption text-ink-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function Specimen({
  label,
  code,
  className,
  children,
}: {
  label: string;
  code?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-card bg-surface p-5 shadow-card", className)}>
      <span className="text-caption text-ink-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      {code && (
        <details className="text-caption text-ink-muted">
          <summary className="cursor-pointer">Код</summary>
          <pre className="mt-2 overflow-x-auto rounded-field bg-surface-muted p-3 text-caption text-ink-soft">
            <code>{code}</code>
          </pre>
        </details>
      )}
    </div>
  );
}