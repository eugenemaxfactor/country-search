# Country Search

RS School learning project about asynchronous JavaScript, request cancellation,
error handling, and test-driven development in TypeScript.

The application searches countries by name through the public `countries.dev`
API. It debounces user input, cancels stale requests, handles timeouts and HTTP
errors, and renders accessible country details without a UI framework.

## Quick Start

```bash
npm install
npm run build
python3 -m http.server 3000
```

Open `http://localhost:3000` in a browser.

After changing TypeScript files, run `npm run build` again. The generated
`dist/` directory is intentionally excluded from Git.

## Commands

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run build`        | Compile browser ES modules into `dist/`     |
| `npm run type-check`   | Check TypeScript without emitting files     |
| `npm test`             | Run the Vitest test suite once              |
| `npm run test:watch`   | Run tests in watch mode                     |
| `npm run lint`         | Check TypeScript and JavaScript with ESLint |
| `npm run format`       | Format project files with Prettier          |
| `npm run format:check` | Check formatting without changing files     |

## Features

- live search with a 300 ms debounce;
- real cancellation of stale requests through `AbortController`;
- a 10-second request timeout;
- separate handling of 404, cancellation, timeout, HTTP, and network errors;
- retry of the current query after a real error;
- responsive country cards with native keyboard-accessible details;
- loading, empty, success, and error states.

## Architecture

Request logic, response mapping, error classification, coordination, and DOM
rendering are kept in separate small modules. Required logic is covered by
unit tests, including a race-condition test whose fetch mock reacts to abort.

See [DESIGN.md](./DESIGN.md) for the decisions, trade-offs, complexity analysis,
and concrete clean-code examples.
