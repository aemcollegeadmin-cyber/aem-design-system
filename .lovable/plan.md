# Fix LMS panel and leaderboard regressions

## Scope
- Restore `LessonSidebar` fit behavior so its bottom stays inside the visible desktop viewport and only its body scrolls.
- Make loading and loaded sidebars use the same measured-height logic.
- Extend `LeaderboardCard` so the current student is always visible in a dedicated highlighted row when absent from the top list, without requiring the LMS to manually splice that row into `entries`.
- Keep existing APIs compatible and update the showcase and consumer guidance.

## Technical details
- Replace document-position height calculations with the panel's effective sticky top offset and viewport height, recalculating on viewport/layout changes.
- Ensure the internal flex body has `min-height: 0` and owns overflow.
- Add an optional `currentEntry` to `LeaderboardCard`; deduplicate it when already present, otherwise render it after the top rows in the same card.
- Validate TypeScript, build output, and both visual states in the preview.
