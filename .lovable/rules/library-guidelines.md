# aem-design-system — Guidelines

## Components

The design system exports these components — import them from `@ws-z801ffmckajwusxnf7ux/9a8bdf79-0a95-4e2b-aa82-e33aac8bbbfa` and compose them before building anything from scratch:

`AccordionItem`, `AccordionRoot`, `Alert`, `AppHeader`, `Avatar`, `Badge`, `Breadcrumbs`, `Button`, `Callout`, `Card`, `ChatBubble`, `ChatInput`, `Checkbox`, `ConfirmDialog`, `CourseCard`, `DialogClose`, `DialogRoot`, `DialogTrigger`, `Dialog`, `DropdownMenuItem`, `DropdownMenuRoot`, `DropdownMenuSeparator`, `DropdownMenuTrigger`, `DropdownMenu`, `EditHeader`, `EmptyState`, `Field`, `IconButton`, `Icon`, `Input`, `Label`, `LessonRow`, `LessonSidebar`, `MediaDialog`, `ModuleCard`, `NavItem`, `OnboardingDialog`, `PageHeader`, `PageNav`, `Pagination`, `PasswordInput`, `ProgressBar`, `RadioGroupItem`, `RadioGroup`, `SearchInput`, `SelectRoot`, `Select`, `Separator`, `SheetClose`, `SheetRoot`, `SheetTrigger`, `Sheet`, `Sidebar`, `Skeleton`, `StatCard`, `StatusIcon`, `SubmissionRow`, `Switch`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`, `Table`, `Tabs`, `Text`, `Textarea`, `Toaster`, `Toolbar`, `TooltipProvider`, `TooltipRoot`, `TooltipTrigger`, `Tooltip`, `UserChip`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-z801ffmckajwusxnf7ux/9a8bdf79-0a95-4e2b-aa82-e33aac8bbbfa/design-system/aem/styles/theme.css` (source — preferred import)
- `@ws-z801ffmckajwusxnf7ux/9a8bdf79-0a95-4e2b-aa82-e33aac8bbbfa/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

