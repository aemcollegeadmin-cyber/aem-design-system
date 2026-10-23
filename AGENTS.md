# Architecture rules

- Modal viewport width and size caps must have framework-independent `aem-modal-*` CSS fallbacks because Tailwind v3 consumers may not scan attached design-system source files.
- Keep ScoreCard statistic grid geometry in both canonical themes as framework-independent CSS so attached Tailwind v3 libraries preserve the same three-column layout without source scanning.
