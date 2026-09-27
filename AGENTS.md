# Architecture rules

- Modal viewport width and size caps must have framework-independent `aem-modal-*` CSS fallbacks because Tailwind v3 consumers may not scan attached design-system source files.