# @acamarata/eslint-config

[![npm version](https://img.shields.io/npm/v/@acamarata/eslint-config)](https://www.npmjs.com/package/@acamarata/eslint-config)
[![CI](https://github.com/acamarata/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/acamarata/eslint-config/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Shared ESLint flat configs for acamarata packages. Four named exports covering common project shapes: base, TypeScript, React, and Node.js.

All configs use ESLint's flat config format (eslint.config.js). ESLint 8's legacy `.eslintrc` format is not supported.

## Install

```sh
pnpm add -D @acamarata/eslint-config eslint eslint-config-prettier
```

For TypeScript projects, also install the parser and plugin:

```sh
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

For React projects, add the React plugins as well:

```sh
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
```

## Peer dependencies

| Peer | Required for | Version |
|------|-------------|---------|
| `eslint` | all configs | `>=9.0.0` |
| `eslint-config-prettier` | all configs | `>=9.0.0` |
| `@typescript-eslint/eslint-plugin` | `typescript` config | `>=8.0.0` |
| `@typescript-eslint/parser` | `typescript` config | `>=8.0.0` |
| `eslint-plugin-react` | `react` config | `>=7.0.0` (optional) |
| `eslint-plugin-react-hooks` | `react` config | `>=5.0.0` (optional) |

## Usage

### Base (JS only)

```js
// eslint.config.js
import { base } from '@acamarata/eslint-config';

export default [...base];
```

### TypeScript

```js
// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { typescript } from '@acamarata/eslint-config';

export default [
  {
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: { parser: tsParser },
  },
  ...typescript,
];
```

### React

```js
// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { react } from '@acamarata/eslint-config';

export default [
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: { parser: tsParser },
  },
  ...react,
];
```

### Node.js

```js
// eslint.config.js
import { node } from '@acamarata/eslint-config';

export default [...node];
```

## Exported configs

| Export | Extends | Key rules |
|--------|---------|-----------|
| `base` | none | prefer-const, no-var, eqeqeq, no-unused-vars, no-console warn |
| `typescript` | base | @typescript-eslint/no-explicit-any error, explicit-module-boundary-types, prefer-optional-chain |
| `react` | typescript | react-hooks/exhaustive-deps error, react-hooks/rules-of-hooks error, jsx-key error |
| `node` | base | no-console off (server/CLI code may log), no-process-exit error |

## TypeScript strict mode

The `typescript` config sets `@typescript-eslint/no-explicit-any: 'error'`. Every `any` cast in your codebase needs an inline comment explaining why it is necessary. This is intentional: it keeps the type surface honest.

## Compatibility

- Node.js 20, 22, 24
- ESLint 9 flat config only
- TypeScript 5.x

## Related packages

- [@acamarata/tsconfig](https://github.com/acamarata/tsconfig) - shared TypeScript configs
- [@acamarata/prettier-config](https://github.com/acamarata/prettier-config) - shared Prettier config

## License

MIT. See [LICENSE](./LICENSE).
