import { createFileRoute } from "@tanstack/react-router";
import { Section, ShowcaseShell } from "@/showcase/ShowcaseShell";

export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Кольори — дизайн-система AEM" },
      {
        name: "description",
        content: "Повний набір кольорових токенів AEM College: чорнило, поверхні та акценти.",
      },
      { property: "og:title", content: "Кольори — дизайн-система AEM" },
      {
        property: "og:description",
        content: "Повний набір кольорових токенів AEM College: чорнило, поверхні та акценти.",
      },
    ],
  }),
  component: ColorsPage,
});

type Swatch = { token: string; className: string; role: string; fg?: string };

const inkAndSurface: Swatch[] = [
  { token: "bg-surface", className: "bg-surface", role: "основне полотно карток", fg: "text-ink" },
  { token: "bg-surface-muted", className: "bg-surface-muted", role: "фон сторінки, hover", fg: "text-ink" },
  { token: "text-ink", className: "bg-ink", role: "основний текст", fg: "text-surface" },
  { token: "text-ink-soft", className: "bg-ink-soft", role: "другорядний текст", fg: "text-surface" },
  { token: "text-ink-muted", className: "bg-ink-muted", role: "мета, підписи", fg: "text-surface" },
  { token: "bg-border-subtle", className: "bg-border-subtle", role: "тонкі лінії", fg: "text-ink" },
  { token: "bg-border-strong", className: "bg-border-strong", role: "виражені межі", fg: "text-ink" },
];

const accents: Swatch[] = [
  {
    token: "bg-accent-peach / text-accent-peach-fg",
    className: "bg-accent-peach",
    role: "очікує перевірки",
    fg: "text-accent-peach-fg",
  },
  {
    token: "bg-accent-lime / text-accent-lime-fg",
    className: "bg-accent-lime",
    role: "виконано, прийнято",
    fg: "text-accent-lime-fg",
  },
];

const states: Swatch[] = [
  { token: "bg-success / text-success-fg", className: "bg-success", role: "успішна дія", fg: "text-success-fg" },
  { token: "bg-warning / text-warning-fg", className: "bg-warning", role: "попередження", fg: "text-warning-fg" },
  { token: "bg-danger / text-danger-fg", className: "bg-danger", role: "помилка, видалення", fg: "text-danger-fg" },
  { token: "bg-info / text-info-fg", className: "bg-info", role: "нейтральна підказка", fg: "text-info-fg" },
];

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.token} className="flex flex-col gap-2 rounded-card bg-surface p-4 shadow-card">
          <div
            className={`flex h-20 items-end rounded-field p-3 ${item.className} ${item.fg ?? "text-ink"}`}
          >
            <span className="text-caption">Аа</span>
          </div>
          <span className="text-body text-ink">{item.token}</span>
          <span className="text-caption text-ink-muted">{item.role}</span>
        </div>
      ))}
    </div>
  );
}

function ColorsPage() {
  return (
    <ShowcaseShell>
      <Section
        title="Кольори"
        description="Використовуйте лише токени — жодних hex-літералів у продуктовому коді."
      >
        <SwatchGrid items={inkAndSurface} />
      </Section>
      <Section title="Акценти" description="Персиковий = очікування, лаймовий = завершено.">
        <SwatchGrid items={accents} />
      </Section>
      <Section title="Семантичні стани" description="Для повідомлень та валідації форм.">
        <SwatchGrid items={states} />
      </Section>
    </ShowcaseShell>
  );
}