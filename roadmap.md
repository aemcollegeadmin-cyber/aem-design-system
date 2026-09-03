# Roadmap

- [x] PageNav: align status tag vertically with back button
- [x] Remove icon backgrounds/substrates inside inputs
- [x] Investigate adoption gaps in college LMS consumer project
  - [x] Confirmed design system IS attached (`aem-design-system-db4746`)
  - [x] Found root cause: consumer still ships legacy shadcn Tailwind tokens + 100+ hardcoded utility violations
  - [ ] Prepare systematic remediation plan / migration checklist for the consumer project
- [ ] Explain/close sync gap: LMS ships its own custom `LessonHomeworkSidebar` + `AppIcon` + `OnboardingDialog` instead of the system components — needs consumer-side refactor prompt (not a DS fix)
- [ ] Breadcrumbs: mobile collapse (…, previous step, current) — always one line
- [ ] SubmissionRow: mobile wrap — title/subtitle first line, badge + date on next line
