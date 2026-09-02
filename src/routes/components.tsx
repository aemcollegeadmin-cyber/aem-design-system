import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ShowcaseShell, Specimen } from "@/showcase/ShowcaseShell";
import {
  AccordionItem,
  AccordionRoot,
  Alert,
  AppHeader,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Callout,
  Card,
  ChatBubble,
  ChatInput,
  Checkbox,
  ConfirmDialog,
  CourseCard,
  Dialog,
  EditHeader,
  DialogClose,
  DialogRoot,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Field,
  Icon,
  IconButton,
  icons,
  type IconName,
  Input,
  Label,
  LessonRow,
  LessonSidebar,
  MediaDialog,
  ModuleCard,
  OnboardingDialog,
  NavItem,
  PageHeader,
  PageNav,
  Pagination,
  PasswordInput,
  ProgressBar,
  RadioGroup,
  RadioGroupItem,
  SearchInput,
  Select,
  Separator,
  Sheet,
  SheetRoot,
  SheetTrigger,
  Sidebar,
  Skeleton,
  StatCard,
  StatusIcon,
  SubmissionRow,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Text,
  Textarea,
  Toolbar,
  Tooltip,
  TooltipRoot,
  TooltipTrigger,
  UserChip,
  toast,
} from "@/design-system/aem";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Компоненти — дизайн-система AEM" },
      {
        name: "description",
        content: "Живий каталог усіх компонентів дизайн-системи AEM College з варіантами та кодом.",
      },
      { property: "og:title", content: "Компоненти — дизайн-система AEM" },
      {
        property: "og:description",
        content: "Живий каталог усіх компонентів дизайн-системи AEM College з варіантами та кодом.",
      },
    ],
  }),
  component: ComponentsPage,
});

function ButtonDemo() {
  return (
    <>
      <Specimen
        label="variant: primary / secondary / ghost / lime"
        code={`<Button variant="primary">Продовжити</Button>`}
      >
        <Button variant="primary">Продовжити</Button>
        <Button variant="secondary">Деталі курсу</Button>
        <Button variant="ghost">Скасувати</Button>
        <Button variant="lime">Здати роботу</Button>
      </Specimen>
      <Specimen label="size: sm / md / lg + block" code={`<Button size="lg" block>Далі</Button>`}>
        <Button size="sm">Малий</Button>
        <Button size="md">Середній</Button>
        <Button size="lg">Великий</Button>
      </Specimen>
      <Specimen label="стани: default / disabled" code={`<Button disabled>Недоступно</Button>`}>
        <Button>Активна</Button>
        <Button disabled>Недоступно</Button>
        <Button variant="secondary" disabled>
          Недоступно
        </Button>
      </Specimen>
    </>
  );
}

function FormsDemo() {
  const [level, setLevel] = useState("junior");
  return (
    <Card padding="lg" className="w-full max-w-md">
      <form className="flex w-full flex-col gap-4">
        <Text variant="h4">Заявка на курс</Text>
        <Field label="Ім’я та прізвище" required hint="Як у документах коледжу">
          {(control) => <Input {...control} placeholder="Олена Ковальчук" />}
        </Field>
        <Field label="Пароль" error="Мінімум 8 символів">
          {(control) => <PasswordInput {...control} tone="invalid" />}
        </Field>
        <Field label="Рівень">
          {(control) => (
            <Select
              {...control}
              value={level}
              onValueChange={setLevel}
              options={[
                { value: "junior", label: "Початковий" },
                { value: "middle", label: "Середній" },
                { value: "senior", label: "Поглиблений" },
              ]}
            />
          )}
        </Field>
        <Field label="Коментар для куратора">
          {(control) => <Textarea {...control} placeholder="Що саме хочете опанувати?" />}
        </Field>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" defaultChecked />
          <Label htmlFor="terms">Погоджуюсь з правилами навчання</Label>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="digest">Тижневий дайджест</Label>
          <Switch id="digest" defaultChecked />
        </div>
        <Button type="button" block>
          Надіслати заявку
        </Button>
      </form>
    </Card>
  );
}

function sections(): { id: string; title: string; node: React.ReactNode }[] {
  return [
    { id: "button", title: "Button", node: <ButtonDemo /> },
    {
      id: "icon",
      title: "Icon",
      node: (
        <Specimen
          label="Єдина система іконок: md 20 — двохсоставна (duotone), lg 24 / xl 32 — outline зі штрихом 2px"
          code={`<Icon name="review" size="md" /> // duotone\n<Icon name="review" size="lg" /> // outline 2px`}
        >
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-end gap-6">
              {(["md", "lg", "xl"] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Icon name="review" size={size} />
                  <span className="text-caption text-ink-muted">{size}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {(Object.keys(icons) as IconName[]).map((name) => (
                <div key={name} className="flex flex-col items-center gap-2 rounded-card bg-surface-muted p-3">
                  <div className="flex items-center gap-2">
                    <Icon name={name} size="md" />
                    <Icon name={name} size="lg" />
                  </div>
                  <span className="text-caption text-ink-muted">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Specimen>
      ),
    },
    {

      id: "icon-button",
      title: "IconButton",
      node: (
        <Specimen
          label="variant: muted / solid / lime · size sm–lg · label обов’язковий"
          code={`<IconButton label="Додати урок"><Plus /></IconButton>`}
        >
          <IconButton label="Додати урок">
            <Icon name="add" size="lg" />
          </IconButton>
          <IconButton label="Надіслати" variant="solid">
            <Icon name="send" size="lg" />
          </IconButton>
          <IconButton label="Прийняти роботу" variant="lime" size="lg">
            <Icon name="review" size="lg" />
          </IconButton>
          <IconButton label="Видалити" disabled>
            <Icon name="delete" size="lg" />
          </IconButton>
        </Specimen>
      ),
    },
    {
      id: "badge",
      title: "Badge",
      node: (
        <Specimen label="variant: neutral / peach / lime / solid" code={`<Badge variant="peach">На перевірці</Badge>`}>
          <Badge>4 уроки</Badge>
          <Badge variant="peach">На перевірці</Badge>
          <Badge variant="lime">Прийнято</Badge>
          <Badge variant="solid">Новий</Badge>
        </Specimen>
      ),
    },
    {
      id: "text",
      title: "Text",
      node: (
        <Specimen label="variant: h1 / h2 / h4 / paragraph / caption / link" code={`<Text variant="h2">Модуль 1</Text>`}>
          <div className="flex flex-col gap-2">
            <Text variant="h1">Мої курси</Text>
            <Text variant="h2">Модуль 1. Основи</Text>
            <Text variant="h4">Урок 3. Сітки</Text>
            <Text>Основний текст уроку.</Text>
            <Text variant="caption">Оновлено 10 хвилин тому</Text>
          </div>
        </Specimen>
      ),
    },
    {
      id: "card",
      title: "Card",
      node: (
        <Specimen label="variant: surface / muted · padding · radius" code={`<Card variant="muted" radius="panel" padding="lg" />`}>
          <Card className="w-56">Біла картка</Card>
          <Card variant="muted" radius="panel" padding="lg" className="w-56">
            Приглушена панель
          </Card>
        </Specimen>
      ),
    },
    {
      id: "callout",
      title: "Callout",
      node: (
        <Specimen label="variant: pending / done / neutral" code={`<Callout variant="done">Прийнято</Callout>`}>
          <div className="flex w-full flex-col gap-2">
            <Callout>Робота на перевірці у куратора</Callout>
            <Callout variant="done">Домашнє завдання прийнято</Callout>
            <Callout variant="neutral">Дедлайн — 12 березня</Callout>
          </div>
        </Specimen>
      ),
    },
    {
      id: "alert",
      title: "Alert",
      node: (
        <Specimen label="variant: info / success / warning / danger" code={`<Alert variant="danger" title="Помилка" />`}>
          <div className="flex w-full flex-col gap-2">
            <Alert title="Нове завдання">Модуль 3 відкрито для вашої групи.</Alert>
            <Alert variant="success" title="Збережено">Прогрес синхронізовано.</Alert>
            <Alert variant="warning" title="Дедлайн близько">Залишилось 2 дні.</Alert>
            <Alert variant="danger" title="Не вдалося надіслати">Перевірте зʼєднання.</Alert>
          </div>
        </Specimen>
      ),
    },
    { id: "forms", title: "Форми (Field, Input, Select…)", node: <FormsDemo /> },
    {
      id: "search-input",
      title: "SearchInput",
      node: (
        <Specimen label="pill-радіус, іконка пошуку" code={`<SearchInput placeholder="Пошук уроку" />`}>
          <SearchInput placeholder="Пошук уроку" className="max-w-xs" />
        </Specimen>
      ),
    },
    {
      id: "radio-group",
      title: "RadioGroup",
      node: (
        <Specimen label="вибір одного варіанту" code={`<RadioGroup defaultValue="online"><RadioGroupItem value="online" /></RadioGroup>`}>
          <RadioGroup defaultValue="online">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="online" id="fmt-online" />
              <Label htmlFor="fmt-online">Онлайн</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="offline" id="fmt-offline" />
              <Label htmlFor="fmt-offline">У коледжі</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="mixed" id="fmt-mixed" disabled />
              <Label htmlFor="fmt-mixed">Змішаний (скоро)</Label>
            </div>
          </RadioGroup>
        </Specimen>
      ),
    },
    {
      id: "tabs",
      title: "Tabs",
      node: <TabsDemo />,
    },
    {
      id: "progress-bar",
      title: "ProgressBar",
      node: (
        <Specimen label="value 0–100, showLabel" code={`<ProgressBar value={64} />`}>
          <div className="flex w-full max-w-sm flex-col gap-4">
            <ProgressBar value={0} />
            <ProgressBar value={64} />
            <ProgressBar value={100} label="Курс пройдено" />
          </div>
        </Specimen>
      ),
    },
    {
      id: "avatar",
      title: "Avatar / UserChip",
      node: (
        <Specimen label="size: sm / md / lg · UserChip variant pill / row" code={`<UserChip name="Олена" variant="row" email="o@aem.ua" />`}>
          <Avatar name="Олена" size="sm" />
          <Avatar name="Ігор" />
          <Avatar name="Марта" size="lg" variant="surface" />
          <UserChip name="Олена Ковальчук" />
          <UserChip name="Ігор Мельник" email="ihor@aem.ua" variant="row" className="w-64" />
        </Specimen>
      ),
    },
    {
      id: "status-icon",
      title: "StatusIcon",
      node: (
        <Specimen label="status: available / completed / locked" code={`<StatusIcon status="completed" />`}>
          <StatusIcon status="available" />
          <StatusIcon status="completed" />
          <StatusIcon status="locked" />
        </Specimen>
      ),
    },
    {
      id: "lesson-row",
      title: "LessonRow",
      node: (
        <Specimen label="status + trailing" code={`<LessonRow title="Урок 1" status="completed" />`}>
          <div className="flex w-full flex-col gap-2">
            <LessonRow title="Урок 1. Знайомство" description="12 хвилин" status="completed" />
            <LessonRow title="Урок 2. Типографіка" description="24 хвилини" />
            <LessonRow title="Урок 3. Сітки" description="Відкриється 14 березня" status="locked" />
          </div>
        </Specimen>
      ),
    },
    {
      id: "module-card",
      title: "ModuleCard",
      node: (
        <Specimen label="композиція з LessonRow" code={`<ModuleCard title="Модуль 2" progress={50}>…</ModuleCard>`}>
          <ModuleCard
            title="Модуль 2. Верстка"
            description="Практика на реальних макетах"
            progress={50}
            meta={<Badge variant="peach">2 з 4</Badge>}
            className="w-full"
          >
            <LessonRow title="Урок 1. Flexbox" status="completed" />
            <LessonRow title="Урок 2. Grid" />
          </ModuleCard>
        </Specimen>
      ),
    },
    {
      id: "course-card",
      title: "CourseCard",
      node: (
        <Specimen label="cover + progress + mentors" code={`<CourseCard title="Веб-дизайн" progress={64} />`}>
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
        </Specimen>
      ),
    },
    {
      id: "submission-row",
      title: "SubmissionRow",
      node: (
        <Specimen label="status: review / accepted" code={`<SubmissionRow title="Урок 4" status="accepted" />`}>
          <div className="flex w-full flex-col gap-2">
            <SubmissionRow title="Урок 4. Лендинг" subtitle="Марта Гнатюк" timestamp="2 години тому" />
            <SubmissionRow
              title="Урок 3. Сітки"
              subtitle="Андрій Литвин"
              status="accepted"
              timestamp="вчора"
            />
          </div>
        </Specimen>
      ),
    },
    {
      id: "chat",
      title: "ChatBubble / ChatInput",
      node: (
        <Specimen label="variant: incoming / outgoing" code={`<ChatBubble author="Олена" variant="incoming">…</ChatBubble>`}>
        <div className="flex w-full max-w-lg flex-col gap-3">
          <ChatBubble author="Олена Ковальчук" time="10:24">
            Подивіться, будь ласка, відступи в другому блоці.{" "}
            <a href="#chat" className="break-all">
              https://aem.ua/lesson/3
            </a>
          </ChatBubble>
          <ChatBubble author="Ви" time="10:31" variant="outgoing">
            Дякую! Виправлю до вечора.
          </ChatBubble>
          <ChatInput />
        </div>
        </Specimen>
      ),
    },
    {
      id: "app-header",
      title: "AppHeader",
      node: (
        <Specimen label="слоти: user / brand / actions" code={`<AppHeader brand="aem" user={<UserChip name="Олена" />} />`}>
          <AppHeader
            className="w-full"
            user={<UserChip name="Олена Ковальчук" />}
            brand={<Text variant="h4">Той самий коледж!</Text>}
            actions={
              <IconButton label="На головну">
                <Icon name="home" size="lg" />
              </IconButton>
            }
          />
        </Specimen>
      ),
    },
    {
      id: "page-header",
      title: "PageHeader / Breadcrumbs",
      node: (
        <Specimen label="title + description + actions" code={`<PageHeader title="Мої курси" actions={<Button/>} />`}>
          <PageHeader
            className="w-full"
            above={
              <Breadcrumbs
                items={[
                  { label: "Головна", href: "/" },
                  { label: "Курси", href: "/components" },
                  { label: "Веб-дизайн" },
                ]}
              />
            }
            title="Веб-дизайн з нуля"
            description="6 модулів · 32 уроки · куратор Олена"
            actions={<Button variant="lime">Продовжити навчання</Button>}
          />
        </Specimen>
      ),
    },
    {
      id: "page-nav",
      title: "PageNav",
      node: (
        <Specimen
          label="back + заголовок + хлібні крихти + статус"
          code={`<PageNav onBack={...} title="Веб-дизайн" breadcrumbs={[...]} status={<Badge variant="peach">На перевірці</Badge>} />`}
        >
          <PageNav
            className="w-full"
            onBack={() => undefined}
            title="Веб-дизайн з нуля"
            breadcrumbs={[
              { label: "Головна", href: "/" },
              { label: "Курси", href: "/components" },
              { label: "Веб-дизайн" },
            ]}
            status={<Badge variant="peach">На перевірці</Badge>}
          />
        </Specimen>
      ),
    },
    {
      id: "edit-header",
      title: "EditHeader",
      node: (
        <Specimen
          label="режим редагування: inline-заголовок + перемикачі"
          code={`<EditHeader title={title} onTitleChange={setTitle} controls={<Switch />} actions={<Button>Зберегти</Button>} />`}
        >
          <EditHeaderDemo />
        </Specimen>
      ),
    },
    {
      id: "lesson-sidebar",
      title: "LessonSidebar",
      node: (
        <Specimen
          label="панель уроку: таби, статус, опис (clamped / full), стек дій"
          code={`<LessonSidebar tabs={tabs} value={tab} onValueChange={setTab} callout={<Callout variant="done">…</Callout>} actions={<Button variant="secondary" block>Наступний урок</Button>} />`}
        >
          <LessonSidebarDemo />
        </Specimen>
      ),
    },
    {
      id: "sidebar",
      title: "Sidebar / NavItem",
      node: (
        <Specimen label="active стан через aria-current" code={`<NavItem href="/courses" active>Курси</NavItem>`}>
          <Sidebar className="h-72" footer={<UserChip name="Олена Ковальчук" variant="row" />}>
            <NavItem href="#sidebar" active icon={<Icon name="home" size="lg" />}>
              Головна
            </NavItem>
            <NavItem href="#sidebar" icon={<Icon name="course" size="lg" />}>
              Мої курси
            </NavItem>
            <NavItem href="#sidebar" icon={<Icon name="review" size="lg" />}>
              Перевірка робіт
            </NavItem>
          </Sidebar>
        </Specimen>
      ),
    },
    {
      id: "stat-card",
      title: "StatCard",
      node: (
        <Specimen label="tone: neutral / peach / lime" code={`<StatCard label="На перевірці" value="12" tone="peach" />`}>
          <div className="grid w-full gap-4 sm:grid-cols-3">
            <StatCard label="Активних студентів" value="248" hint="+12 за тиждень" />
            <StatCard label="На перевірці" value="12" tone="peach" hint="очікують куратора" />
            <StatCard label="Прийнято" value="87" tone="lime" hint="за березень" />
          </div>
        </Specimen>
      ),
    },
    { id: "toolbar", title: "Toolbar", node: <ToolbarDemo /> },
    {
      id: "table",
      title: "Table / Pagination",
      node: <TableDemo />,
    },
    {
      id: "accordion",
      title: "Accordion",
      node: (
        <Specimen label="type single / multiple" code={`<AccordionRoot type="single" collapsible><AccordionItem title="…" value="1" /></AccordionRoot>`}>
          <AccordionRoot type="single" collapsible className="flex w-full flex-col gap-2">
            <AccordionItem value="1" title="Як здати домашнє завдання?">
              Відкрийте урок, прикріпіть файл або посилання й натисніть «Здати роботу».
            </AccordionItem>
            <AccordionItem value="2" title="Скільки триває перевірка?">
              Куратор перевіряє роботи протягом двох робочих днів.
            </AccordionItem>
          </AccordionRoot>
        </Specimen>
      ),
    },
    {
      id: "overlays",
      title: "Dialog / ConfirmDialog / Sheet",
      node: <OverlaysDemo />,
    },
    {
      id: "media-onboarding",
      title: "MediaDialog / OnboardingDialog",
      node: <MediaDemo />,
    },
    {
      id: "dropdown-menu",
      title: "DropdownMenu",
      node: (
        <Specimen label="item tone: default / danger" code={`<DropdownMenuItem tone="danger">Видалити</DropdownMenuItem>`}>
          <DropdownMenuRoot>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Дії з курсом</Button>
            </DropdownMenuTrigger>
            <DropdownMenu>
              <DropdownMenuItem>Редагувати опис</DropdownMenuItem>
              <DropdownMenuItem>Додати модуль</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem tone="danger">Видалити курс</DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuRoot>
        </Specimen>
      ),
    },
    {
      id: "tooltip",
      title: "Tooltip",
      node: (
        <Specimen label="потрібен TooltipProvider на рівні застосунку" code={`<TooltipRoot><TooltipTrigger asChild>…</TooltipTrigger><Tooltip>…</Tooltip></TooltipRoot>`}>
          <TooltipRoot>
            <TooltipTrigger asChild>
              <IconButton label="Додати урок">
                <Icon name="add" size="lg" />
              </IconButton>
            </TooltipTrigger>
            <Tooltip>Додати урок до модуля</Tooltip>
          </TooltipRoot>
        </Specimen>
      ),
    },
    {
      id: "toaster",
      title: "Toaster / toast",
      node: (
        <Specimen label="Toaster монтується один раз у корені" code={`toast.success("Роботу надіслано")`}>
          <Button variant="secondary" onClick={() => toast.success("Роботу надіслано на перевірку")}>
            Показати toast
          </Button>
          <Button variant="ghost" onClick={() => toast.error("Не вдалося зберегти")}>
            Показати помилку
          </Button>
        </Specimen>
      ),
    },
    {
      id: "skeleton",
      title: "Skeleton",
      node: (
        <Specimen label="radius: field / card / pill" code={`<Skeleton className="h-4 w-40" />`}>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-64" />
            <Skeleton radius="card" className="h-24 w-full" />
            <Skeleton radius="pill" className="size-10" />
          </div>
        </Specimen>
      ),
    },
    {
      id: "empty-state",
      title: "EmptyState",
      node: (
        <Specimen label="title + description + action" code={`<EmptyState title="Робіт немає" action={<Button/>} />`}>
          <EmptyState
            className="w-full"
            title="Робіт на перевірці немає"
            description="Коли студенти здадуть завдання, вони з’являться тут."
            action={<Button variant="secondary">Переглянути курси</Button>}
          />
        </Specimen>
      ),
    },
    {
      id: "separator",
      title: "Separator",
      node: (
        <Specimen label="orientation: horizontal / vertical" code={`<Separator />`}>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Text variant="caption">Модулі</Text>
            <Separator />
            <Text variant="caption">Учасники</Text>
          </div>
        </Specimen>
      ),
    },
  ];
}

function LessonSidebarDemo() {
  const [tab, setTab] = useState("info");
  const [state, setState] = useState<"clamped" | "full">("clamped");

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <LessonSidebar
        tabs={[
          { value: "info", label: "Інформація" },
          { value: "tips", label: "Рекомендації" },
        ]}
        value={tab}
        onValueChange={setTab}
        contentState={state}
        callout={<Callout variant="done">Урок пройдено! 2 вересня 2026 р. о 23:36</Callout>}
        actions={
          <>
            <Button variant="secondary" block>
              <Icon name="document" size="md" />
              Матеріали до уроку
            </Button>
            <Button variant="secondary" block>
              Наступний урок
            </Button>
          </>
        }
      >
        {tab === "info" ? (
          <div className="flex flex-col gap-3">
            <Text variant="paragraph">
              Розберемося з реєстрацією в Claude та варіантами підписок, щоб зрозуміти, який тариф
              підійде під твої задачі. Тут глянемо на різницю між безкоштовною версією, Pro та Max.
            </Text>
            <Text variant="paragraph">
              Окремо пройдемося по тому, як працює командний доступ та API, і чому для активних
              агентів вигідніше брати фіксовану підписку, ніж платити за кожен запит.
            </Text>
          </div>
        ) : (
          <Text variant="paragraph">Почни з безкоштовного тарифу, щоб перевірити свої сценарії.</Text>
        )}
      </LessonSidebar>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setState(state === "clamped" ? "full" : "clamped")}
      >
        {state === "clamped" ? "contentState=\"full\"" : "contentState=\"clamped\""}
      </Button>
    </div>
  );
}

function EditHeaderDemo() {
  const [title, setTitle] = useState("Урок 4. Модульні сітки");

  return (
    <EditHeader
      className="w-full"
      onBack={() => undefined}
      title={title}
      onTitleChange={setTitle}
      breadcrumbs={[
        { label: "Курси", href: "/components" },
        { label: "Веб-дизайн", onClick: () => undefined },
        { label: "Урок 4" },
      ]}
      status={<Badge variant="lime">Чернетка</Badge>}
      controls={<Switch aria-label="Опублікувати" />}
      actions={<Button size="sm">Зберегти</Button>}
    />
  );
}

function TabsDemo() {
  const [tab, setTab] = useState("lessons");
  return (
    <Specimen label="value + onValueChange" code={`<Tabs items={items} value={tab} onValueChange={setTab} />`}>
      <Tabs
        className="bg-surface-muted"
        value={tab}
        onValueChange={setTab}
        items={[
          { value: "lessons", label: "Уроки" },
          { value: "homework", label: "Домашні" },
          { value: "chat", label: "Чат" },
        ]}
      />
    </Specimen>
  );
}

function ToolbarDemo() {
  const [group, setGroup] = useState("all");
  return (
    <Specimen label="фільтри + дії над списком" code={`<Toolbar trailing={<Button/>}>…</Toolbar>`}>
      <Toolbar className="w-full" trailing={<Button variant="lime">Додати урок</Button>}>
        <SearchInput placeholder="Пошук студента" className="w-56" />
        <Select
          triggerLabel="Група"
          className="w-40"
          value={group}
          onValueChange={setGroup}
          options={[
            { value: "all", label: "Усі групи" },
            { value: "wd-1", label: "ВД-1" },
            { value: "wd-2", label: "ВД-2" },
          ]}
        />
      </Toolbar>
    </Specimen>
  );
}

function TableDemo() {
  const [page, setPage] = useState(1);
  return (
    <Specimen label="таблиця у Card + Pagination" code={`<Table><TableHeader>…</TableHeader></Table>`}>
      <Card padding="none" className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Студент</TableHead>
              <TableHead>Урок</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Марта Гнатюк</TableCell>
              <TableCell>Урок 4. Лендинг</TableCell>
              <TableCell>
                <Badge variant="peach">На перевірці</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Андрій Литвин</TableCell>
              <TableCell>Урок 3. Сітки</TableCell>
              <TableCell>
                <Badge variant="lime">Прийнято</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Pagination page={page} pageCount={5} onPageChange={setPage} />
    </Specimen>
  );
}

function OverlaysDemo() {
  return (
    <Specimen label="Dialog · ConfirmDialog · Sheet" code={`<DialogRoot><DialogTrigger asChild>…</DialogTrigger><Dialog title="…" /></DialogRoot>`}>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="secondary">Відкрити діалог</Button>
        </DialogTrigger>
        <Dialog
          title="Здати домашнє завдання"
          description="Прикріпіть посилання на роботу — куратор перевірить її протягом двох днів."
          footer={
            <>
              <DialogClose asChild>
                <Button variant="ghost">Скасувати</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="lime">Надіслати</Button>
              </DialogClose>
            </>
          }
        >
          <Field label="Посилання на роботу" required>
            {(control) => <Input {...control} placeholder="https://figma.com/…" />}
          </Field>
        </Dialog>
      </DialogRoot>

      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="ghost">Видалити курс</Button>
        </DialogTrigger>
        <ConfirmDialog
          title="Видалити курс?"
          description="Разом із курсом зникнуть усі модулі та здані роботи."
          confirmLabel="Видалити"
          onConfirm={() => toast.error("Курс видалено")}
        />
      </DialogRoot>

      <SheetRoot>
        <SheetTrigger asChild>
          <Button variant="secondary">Відкрити панель</Button>
        </SheetTrigger>
        <Sheet title="Фільтри">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="f-review" defaultChecked />
              <Label htmlFor="f-review">На перевірці</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="f-accepted" />
              <Label htmlFor="f-accepted">Прийняті</Label>
            </div>
          </div>
        </Sheet>
      </SheetRoot>
    </Specimen>
  );
}

function MediaDemo() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <Specimen
      label="media: image / video / embed · onboarding зі кроками"
      code={`<MediaDialog title="…" media={{ type: "image", src, alt }} primaryAction={{ label: "Зрозуміло" }} />`}
    >
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="secondary">Анонс із картинкою</Button>
        </DialogTrigger>
        <MediaDialog
          title="Новий розділ «Портфоліо»"
          description="Тепер роботи з усіх курсів збираються в одному місці — з посиланнями та відгуками куратора."
          media={{
            type: "image",
            src: "https://images.unsplash.com/photo-1523726491229-6df1ce2eb52b?auto=format&fit=crop&w=1200&q=60",
            alt: "Приклад сторінки портфоліо",
          }}
          primaryAction={{ label: "Переглянути", onClick: () => void toast.success("Відкрито портфоліо") }}
          secondaryAction={{ label: "Пізніше" }}
        />
      </DialogRoot>

      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="secondary">Попап з відео</Button>
        </DialogTrigger>
        <MediaDialog
          size="md"
          align="start"
          title="Як здавати домашні завдання"
          description="Коротке відео на дві хвилини — від прикріплення файлу до відгуку куратора."
          media={{
            type: "embed",
            src: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            alt: "Відео-інструкція",
          }}
          primaryAction={{ label: "Готово" }}
        />
      </DialogRoot>

      <Button variant="lime" onClick={() => setTourOpen(true)}>
        Онбординг (3 кроки)
      </Button>
      <OnboardingDialog
        open={tourOpen}
        onFinish={() => {
          setTourOpen(false);
          toast.success("Онбординг завершено");
        }}
        onSkip={() => setTourOpen(false)}
        steps={[
          {
            title: "Вітаємо в коледжі!",
            description: "Покажемо за три кроки, де шукати курси, уроки та відгуки куратора.",
            icon: "users",
          },
          {
            title: "Курси та модулі",
            description: "Прогрес рахується автоматично — відкривайте наступний урок, коли попередній зданий.",
            media: {
              type: "image",
              src: "https://images.unsplash.com/photo-1517245386807-bb43389510dd?auto=format&fit=crop&w=1200&q=60",
              alt: "Список курсів",
            },
          },
          {
            title: "Домашні завдання",
            description: "Здавайте роботи прямо в уроці й отримуйте відгук у чаті.",
            icon: "review",
          },
        ]}
      />
    </Specimen>
  );
}

function ComponentsPage() {
  const [query, setQuery] = useState("");
  const all = useMemo(sections, []);
  const visible = all.filter((section) =>
    section.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <ShowcaseShell>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="flex w-full flex-col gap-3 rounded-panel bg-surface p-4 shadow-card lg:sticky lg:top-24 lg:w-64">
          <SearchInput
            aria-label="Пошук компонента"
            placeholder="Пошук компонента"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <nav aria-label="Компоненти" className="flex max-h-[60vh] flex-col gap-0.5 overflow-y-auto">
            {visible.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-field px-3 py-2 text-caption text-ink-soft no-underline hover:bg-surface-muted hover:text-ink"
              >
                {section.title}
              </a>
            ))}
            {visible.length === 0 && (
              <span className="px-3 py-2 text-caption text-ink-muted">Нічого не знайдено</span>
            )}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-12">
          {visible.map((section) => (
            <section key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-4">
              <h2 className="text-h2 text-ink">{section.title}</h2>
              {section.node}
            </section>
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}