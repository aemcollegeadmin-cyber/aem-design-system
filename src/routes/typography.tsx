import { createFileRoute } from "@tanstack/react-router";
import { Section, ShowcaseShell, Specimen } from "@/showcase/ShowcaseShell";
import { Text } from "@/design-system/aem";

export const Route = createFileRoute("/typography")({
  head: () => ({
    meta: [
      { title: "Типографіка — дизайн-система AEM" },
      {
        name: "description",
        content: "Шрифт Inter і повна типографічна шкала дизайн-системи AEM College.",
      },
      { property: "og:title", content: "Типографіка — дизайн-система AEM" },
      {
        property: "og:description",
        content: "Шрифт Inter і повна типографічна шкала дизайн-системи AEM College.",
      },
    ],
  }),
  component: TypographyPage,
});

function TypographyPage() {
  return (
    <ShowcaseShell>
      <Section
        title="Типографіка"
        description="Inter, ваги 400 / 500 / 600 / 700. Шкала задана токенами text-h1…text-caption."
      >
        <Specimen label="text-h1 — заголовок сторінки" code={`<Text variant="h1">Мої курси</Text>`}>
          <Text variant="h1">Мої курси</Text>
        </Specimen>
        <Specimen label="text-h2 — назва модуля" code={`<Text variant="h2">Модуль 2. Верстка</Text>`}>
          <Text variant="h2">Модуль 2. Верстка</Text>
        </Specimen>
        <Specimen label="text-h3 — підзаголовок секції" code={`<Text variant="h3">Урок 4. Сітки</Text>`}>
          <Text variant="h3">Урок 4. Сітки</Text>
        </Specimen>
        <Specimen label="text-h4 — заголовок картки" code={`<Text variant="h4">Домашнє завдання</Text>`}>
          <Text variant="h4">Домашнє завдання</Text>
        </Specimen>
        <Specimen
          label="text-body — основний текст"
          code={`<Text>Здайте роботу до 12 березня.</Text>`}
        >
          <Text>
            Здайте роботу до 12 березня, щоб куратор встиг перевірити її до наступного заняття.
          </Text>
        </Specimen>
        <Specimen label="text-caption — мета та підписи" code={`<Text variant="caption">2 години тому</Text>`}>
          <Text variant="caption">2 години тому · Куратор Олена</Text>
        </Specimen>
        <Specimen label="text-body, link — посилання" code={`<Text variant="link" href="/courses">Усі курси</Text>`}>
          <Text variant="link" href="/courses">
            Усі курси
          </Text>
        </Specimen>
      </Section>
    </ShowcaseShell>
  );
}