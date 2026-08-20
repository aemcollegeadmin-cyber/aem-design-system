import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Upload, X } from "lucide-react";
import {
  AppHeader,
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  ChatBubble,
  ChatInput,
  CourseCard,
  IconButton,
  LessonRow,
  ModuleCard,
  ProgressBar,
  StatusIcon,
  SubmissionRow,
  Tabs,
  Text,
  Textarea,
  UserChip,
} from "@/design-system/aem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AEM College UI Kit — Tokens & Components" },
      {
        name: "description",
        content:
          "Starter design tokens and React components drafted from the AEM College learning platform UI kit.",
      },
      { property: "og:title", content: "AEM College UI Kit — Tokens & Components" },
      {
        property: "og:description",
        content:
          "Starter design tokens and React components drafted from the AEM College learning platform UI kit.",
      },
    ],
  }),
  component: Showcase,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <Text variant="h4" as="h2">
        {title}
      </Text>
      <Card variant="surface" padding="lg" radius="panel" className="flex flex-col gap-4">
        {children}
      </Card>
    </section>
  );
}

const swatches = [
  { name: "ink", className: "bg-ink" },
  { name: "surface", className: "bg-surface border border-border-subtle" },
  { name: "surface-muted", className: "bg-surface-muted" },
  { name: "accent-peach", className: "bg-accent-peach" },
  { name: "accent-lime", className: "bg-accent-lime" },
  { name: "accent-peach-fg", className: "bg-accent-peach-fg" },
  { name: "accent-lime-fg", className: "bg-accent-lime-fg" },
];

function Showcase() {
  const [tab, setTab] = useState("info");

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-2">
        <Text variant="h1">AEM College design system</Text>
        <Text variant="paragraph">
          Starter tokens and components drafted from the shared UI kit. Refine anything from here.
        </Text>
      </header>

      <Section title="Colors">
        <div className="flex flex-wrap gap-3">
          {swatches.map((s) => (
            <div key={s.name} className="flex flex-col gap-1">
              <div className={`size-16 rounded-field ${s.className}`} />
              <span className="text-caption text-ink-muted">{s.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <Text variant="h1">H1 Заголовок</Text>
        <Text variant="h2">H2 Заголовок</Text>
        <Text variant="h4">H4 Заголовок</Text>
        <Text variant="paragraph">Paragraph — основний текст інтерфейсу.</Text>
        <Text variant="link" href="#">
          Link
        </Text>
      </Section>

      <Section title="Buttons & badges">
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Upload className="size-4" /> Здати домашнє завдання
          </Button>
          <Button variant="secondary">
            <MessageCircle className="size-4" /> Відкрити чат із ментором
          </Button>
          <Button variant="lime">Прийняти</Button>
          <Button variant="ghost" size="sm">
            Перевірка завдань
          </Button>
          <IconButton label="Закрити">
            <X className="size-4" />
          </IconButton>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="peach">На перевірці</Badge>
          <Badge variant="lime">Прийнято</Badge>
          <Badge>4 уроки</Badge>
          <Badge variant="solid">Новий</Badge>
        </div>
      </Section>

      <Section title="Tabs, progress & status">
        <Tabs
          className="bg-surface-muted self-start"
          value={tab}
          onValueChange={setTab}
          items={[
            { value: "info", label: "Інформація" },
            { value: "task", label: "Домашнє завдання" },
          ]}
        />
        <ProgressBar value={28} />
        <ProgressBar value={100} label="Пройдено 100%" />
        <div className="flex gap-3">
          <StatusIcon status="available" />
          <StatusIcon status="completed" />
          <StatusIcon status="locked" />
        </div>
      </Section>

      <Section title="Callouts & fields">
        <Callout variant="pending">
          Щоб продовжити навчання, тобі потрібно отримати підтвердження від ментора.
        </Callout>
        <Callout variant="done">Ти пройшов цей урок 12 січня 2026.</Callout>
        <Textarea placeholder="Відправ всі потрібні деталі для перевірки" />
      </Section>

      <Section title="Identity">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name="Артур" size="sm" />
          <Avatar name="Артур" size="md" />
          <Avatar name="Артур" size="lg" variant="surface" />
          <UserChip name="Артур" />
          <UserChip variant="row" name="Артур" email="rais@gmail.com" />
        </div>
      </Section>

      <Section title="Lessons & modules">
        <LessonRow title="Назва уроку" description="Опис уроку" status="available" onOpen={() => {}} />
        <LessonRow title="Назва уроку" description="Опис уроку" status="completed" />
        <LessonRow title="Назва уроку" description="Опис уроку" status="locked" />
        <ModuleCard
          title="1. Введення в UX/UI дизайн"
          description="Короткий опис модулю"
          progress={28}
          meta={<Badge>4 уроки</Badge>}
        >
          <LessonRow title="Назва уроку" description="Опис уроку" status="completed" />
          <LessonRow title="Назва уроку" description="Опис уроку" status="available" />
          <LessonRow title="Назва уроку" description="Опис уроку" status="locked" />
        </ModuleCard>
      </Section>

      <Section title="Course & review queue">
        <CourseCard
          title="Інтерфейсник"
          description="Увійди в 5% дизайнерів, яких завжди наймають стартапи по всьому світу."
          progress={28}
          mentors={
            <>
              <UserChip name="Артур" />
              <UserChip name="Аліна" />
            </>
          }
        />
        <SubmissionRow
          title="Введення в UX/UI дизайн"
          subtitle="Назва курсу / Назва модулю"
          status="review"
          timestamp="2 години тому"
        />
        <SubmissionRow
          title="Введення в UX/UI дизайн"
          subtitle="Назва курсу / Назва модулю"
          status="accepted"
          timestamp="2 години тому"
        />
      </Section>

      <Section title="Header & chat">
        <AppHeader
          user={<UserChip variant="row" name="Артур" email="rais@gmail.com" />}
          brand="aem college"
          actions={<Button size="sm" variant="secondary">Перевірка завдань</Button>}
        />
        <ChatBubble author="Артур" time="15:28">
          Давай приберемо підзаголовок, щоб тут була лише назва самого курсу.
        </ChatBubble>
        <ChatBubble author="Аліна" time="15:28" variant="outgoing">
          Й зробити це відображення для всіх — модератора, студента та ментора.
        </ChatBubble>
        <ChatInput />
      </Section>
    </main>
  );
}
