# Contributing to quick-data-table

Thanks for your interest in contributing! This guide explains how to set up the project locally, coding expectations, and how to submit changes.

## Development Setup

- Prerequisites: Node.js 18+ and npm
- Install dependencies:

```bash
npm install
```

- Start the local playground app:

```bash
npm run dev
```

- Build the library (ESM/CJS + type declarations):

```bash
npm run build
```

- Lint and type-check:

```bash
npm run lint
npm run typecheck
```

## Project Architecture

- Package is built in library mode via Vite; entry is `src/index.ts`.
- Types are emitted to `dist/types` using `tsconfig.types.json`.
- React, React DOM, and Tailwind CSS are peer dependencies and are not bundled.
- The table component lives in `src/components/DataTable.tsx` and public types in `src/types`.

## Coding Guidelines

- Use TypeScript throughout; keep generics accurate for `DataTableProps<T>` and `Column<T>`.
- Maintain tree-shakeability (`sideEffects: false`) and avoid bundling peer deps.
- Follow existing className and prop patterns; prefer minimal, composable APIs.
- Keep backward compatibility for existing props unless a major version change is planned.

## Before You Commit

- Ensure code compiles and types emit:
  - `npm run build`
- Ensure style and types are clean:
  - `npm run lint`
  - `npm run typecheck`
- If docs changed, verify Markdown renders well on GitHub/npm (fenced blocks with language tags).

## Pull Request Checklist

- Clear description of the change and rationale
- Examples updated in README if new props/behaviors are added
- No breaking changes to public API unless coordinated
- Builds successfully and type declarations are generated
- Lint and typecheck pass

## Commit Messages

- Prefer Conventional Commits (e.g., `feat: add loadingRows skeletons`, `fix: tfoot nesting`)

## Reporting Issues

- Include reproduction steps, current vs. expected behavior, and environment details.

## License

This project is released under the MIT License. By contributing, you agree that your contributions will be licensed under MIT.
