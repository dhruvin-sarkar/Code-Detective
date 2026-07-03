# The Code Detective

A live, host-led multiplayer debugging party game for grades 6–12, styled as an 1890s crime gazette. The host runs the pace from their own device; every player joins on their own phone or laptop with a 5-digit case number and sees the full case. Each round is a **case file**: a real Python snippet with one seeded bug and the *actual* wrong output it produced. Read the evidence, form a theory, submit the fix — three attempts, scored on fewest attempts plus speed.

## Adding a case

Cases live in `src/game/cases.ts`, five per tier. The iron rule: **run the snippet** (both buggy and fixed, real Python) and paste the *captured* output — never hand-write outputs; crash cases carry the real traceback sanitized to `crime_scene.py`. Keep it to 10–16 lines, exactly one seeded bug, deterministic, no `input()`, with a kid-relatable story in the comments. MCQ cases need exactly 4 candidate repair lines (decoys must encode real misreadings); free-text cases need an accepted-answers list. `validateBank()` enforces the structural invariants at room creation and refuses to open a room on a malformed bank.
