export { Text, type TextProps, type TextVariant } from "./components/Text";
export { Button, type ButtonProps } from "./components/Button";
export { IconButton, type IconButtonProps } from "./components/IconButton";
export {
  Icon,
  icons,
  iconSizes,
  type IconProps,
  type IconName,
  type IconSize,
} from "./components/Icon";
export { Badge, type BadgeProps } from "./components/Badge";
export { Callout, type CalloutProps } from "./components/Callout";
export { Card, type CardProps } from "./components/Card";
export { Tabs, type TabsProps, type TabItem } from "./components/Tabs";
export { ProgressBar, type ProgressBarProps } from "./components/ProgressBar";
export { Avatar, type AvatarProps } from "./components/Avatar";
export { UserChip, type UserChipProps } from "./components/UserChip";
export { StatusIcon, type StatusIconProps, type LessonStatus } from "./components/StatusIcon";
export { LessonRow, type LessonRowProps } from "./components/LessonRow";
export { LessonSidebar, type LessonSidebarProps } from "./components/LessonSidebar";
export { ModuleCard, type ModuleCardProps } from "./components/ModuleCard";
export { CourseCard, type CourseCardProps } from "./components/CourseCard";
export {
  ScoreCard,
  type ScoreCardProps,
  type ScoreCardBar,
  type ScoreCardComparison,
} from "./components/ScoreCard";
export {
  LeaderboardCard,
  type LeaderboardCardProps,
  type LeaderboardEntry,
} from "./components/LeaderboardCard";
export { Scoreboard, type ScoreboardProps, type ScoreboardRow } from "./components/Scoreboard";
export { RankUpDialog, type RankUpDialogProps } from "./components/RankUpDialog";
export { toastPoints, type ScoreToastOptions } from "./components/ScoreToast";

export {
  MediaPreview,
  type MediaPreviewProps,
  type MediaPreviewKind,
} from "./components/MediaPreview";
export {
  ContinueLessonCard,
  type ContinueLessonCardProps,
} from "./components/ContinueLessonCard";
export { StreakChip, type StreakChipProps } from "./components/StreakChip";
export {
  SubmissionRow,
  type SubmissionRowProps,
  type SubmissionStatus,
} from "./components/SubmissionRow";
export { Textarea, type TextareaProps } from "./components/Textarea";
export { ChatBubble, type ChatBubbleProps } from "./components/ChatBubble";
export { ChatInput, type ChatInputProps } from "./components/ChatInput";
export { ChatPanel, type ChatPanelProps } from "./components/ChatPanel";
export { AppHeader, type AppHeaderProps } from "./components/AppHeader";

/* Forms */
export { Input, type InputProps } from "./components/Input";
export { Label, type LabelProps } from "./components/Label";
export { Field, type FieldProps } from "./components/Field";
export { PasswordInput, type PasswordInputProps } from "./components/PasswordInput";
export { SearchInput, type SearchInputProps } from "./components/SearchInput";
export { Checkbox, type CheckboxProps } from "./components/Checkbox";
export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps } from "./components/RadioGroup";
export { Switch, type SwitchProps } from "./components/Switch";
export { Select, SelectRoot, type SelectProps, type SelectOption } from "./components/Select";

/* Overlays & feedback */
export { Dialog, DialogRoot, DialogTrigger, DialogClose, type DialogProps } from "./components/Dialog";
export { ConfirmDialog, type ConfirmDialogProps } from "./components/ConfirmDialog";
export {
  MediaDialog,
  type MediaDialogProps,
  type MediaDialogMedia,
  type MediaDialogMediaType,
  type MediaDialogAction,
} from "./components/MediaDialog";
export {
  OnboardingDialog,
  type OnboardingDialogProps,
  type OnboardingStep,
} from "./components/OnboardingDialog";
export { Sheet, SheetRoot, SheetTrigger, SheetClose, type SheetProps } from "./components/Sheet";
export {
  DropdownMenu,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  type DropdownMenuProps,
  type DropdownMenuItemProps,
  type DropdownMenuSeparatorProps,
} from "./components/DropdownMenu";
export { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, type TooltipProps } from "./components/Tooltip";
export { Alert, type AlertProps } from "./components/Alert";
export { Toaster, toast, type ToasterProps } from "./components/Toaster";

/* Data display */
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type TableProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableSectionProps,
} from "./components/Table";
export { Pagination, type PaginationProps } from "./components/Pagination";
export { Skeleton, type SkeletonProps } from "./components/Skeleton";
export { EmptyState, type EmptyStateProps } from "./components/EmptyState";
export { Separator, type SeparatorProps } from "./components/Separator";
export { AccordionRoot, AccordionItem, type AccordionItemProps } from "./components/Accordion";

/* Navigation & layout */
export { Breadcrumbs, type BreadcrumbsProps, type BreadcrumbItem } from "./components/Breadcrumbs";
export { NavItem, type NavItemProps } from "./components/NavItem";
export { Sidebar, type SidebarProps } from "./components/Sidebar";
export { PageHeader, type PageHeaderProps } from "./components/PageHeader";
export { PageNav, type PageNavProps } from "./components/PageNav";
export { EditHeader, type EditHeaderProps } from "./components/EditHeader";
export { StatCard, type StatCardProps } from "./components/StatCard";
export { Toolbar, type ToolbarProps } from "./components/Toolbar";

export { cn } from "./lib/cn";