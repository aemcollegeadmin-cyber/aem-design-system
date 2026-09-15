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
- [x] LessonSidebar: mentor state (same tabs/info, single "Прийняти роботу" action; no return-for-rework)
- [x] Panels: adaptive viewport-bound height (bottom gap on any screen, no page scroll)
- [x] Audit and add loading/skeleton states to all DS components so LMS pages don't jump
  - Added `loading` to: ModuleCard, CourseCard, LessonRow, ContinueLessonCard, MediaPreview, LessonSidebar, ChatPanel
  - Existing loading on: ScoreCard, LeaderboardCard, Scoreboard
- [x] Diagnose missing current-student row in LMS weekly leaderboard and provide an exact consumer-side fix prompt
- [x] Scoreboard: show the student's all-time ranking alongside the weekly view
- [x] PodcastCard: own white surface independent of page background
- [x] YouTubePlayer: remove native controls and leave playback to EpisodeRow
- [x] CourseCard: keep only the reference cover proportion, with fluid container width on every device

- [ ] Надати готовий промпт для заміни локальних карток курсів у LMS на CourseCard з пропорцією 26:15.
- [x] CourseCard: own white surface, grouped mentors, and access status over a dimmed cover
- [x] CourseCard: keep access and mentorship tags only on the cover without lower duplicates
