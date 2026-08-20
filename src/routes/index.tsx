import { createFileRoute, Link } from "@tanstack/react-router";
import { ShowcaseShell, Section, Specimen } from "@/showcase/ShowcaseShell";
import {
  Badge,
  Button,
  Callout,
  CourseCard,
  LessonRow,
  ModuleCard,
  StatCard,
  Text,
  UserChip,
} from "@/design-system/aem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Дизайн-система AEM College — огляд" },
      {
        name: "description",
        content:
          "Токени та компоненти навчальної платформи «Той самий коледж!»: спокійна графіка, персикові та лаймові акценти.",
      },
      { property: "og:title", content: "Дизайн-система AEM College — огляд" },
      {
        property: "og:description",
        content:
          "Токени та компоненти навчальної платформи «Той самий коледж!»: спокійна графіка, персикові та лаймові акценти.",
      },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <ShowcaseShell>
      <section className="flex flex-col gap-6 rounded-panel bg-surface p-8 shadow-card">
        <Badge variant="lime">версія 0.2 · чернетка</Badge>
        <Text variant="h1" className="max-w-2xl">
          Спокійний інтерфейс навчання: чорнило на світлому полотні, персик для очікування, лайм для
          завершеного.
        </Text>
        <Text className="max-w-2xl text-ink-soft">
          Дизайн-система «Той самий коледж!» — це набір токенів і компонентів для курсів, уроків,
          домашніх завдань і перевірки робіт. Інтерфейсні тексти українською.
        </Text>
        <div className="flex flex-wrap gap-3">
          <Button asChild={false} variant="primary">
            <Link to="/components" className="text-surface no-underline">
              Каталог компонентів
            </Link>
          </Button>
          <Button variant="secondary" asChild={false}>
            <Link to="/colors" className="text-ink no-underline">
              Кольори
            </Link>
          </Button>
        </div>
      </section>

      <Section title="Принципи" description="Три правила, які визначають вигляд платформи.">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Радіуси" value="Мʼякі" hint="картки, панелі, pill-кнопки" />
          <StatCard label="Персик" value="Очікує" tone="peach" hint="робота на перевірці" />
          <StatCard label="Лайм" value="Готово" tone="lime" hint="прийнято, пройдено" />
        </div>
      </Section>

      <Section title="Як це виглядає в продукті" description="Реальна композиція з компонентів системи.">
        <div className="flex flex-col gap-6 lg:flex-row">
          <CourseCard
            title="Веб-дизайн з нуля"
            description="6 модулів · 32 уроки"
            progress={64}
            mentors={
              <>
                <UserChip name="Олена Ковальчук" />
                <UserChip name="Ігор Мельник" />
              </>
            }
          />
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <ModuleCard
              title="Модуль 2. Верстка"
              description="Практика на реальних макетах"
              progress={50}
              meta={<Badge variant="peach">2 з 4</Badge>}
            >
              <LessonRow title="Урок 1. Flexbox" description="18 хвилин" status="completed" />
              <LessonRow title="Урок 2. Grid" description="24 хвилини" />
              <LessonRow title="Урок 3. Адаптивність" description="Відкриється 14 березня" status="locked" />
            </ModuleCard>
            <Callout>Домашнє завдання до уроку 1 на перевірці у куратора</Callout>
          </div>
        </div>
      </Section>

      <Section title="Що далі" description="Система готується до впровадження в LMS.">
        <Specimen label="статус впровадження">
          <div className="flex flex-col gap-2">
            <Text variant="caption">Токени, темна тема та shadcn-експорт — готові.</Text>
            <Text variant="caption">Форми, оверлеї, таблиці та навігація — готові.</Text>
            <Text variant="caption">Наступний крок — рев’ю системи, потім впровадження в LMS.</Text>
          </div>
        </Specimen>
      </Section>
    </ShowcaseShell>
  );
}
