/**
 * Purpose: Shared ESLint flat configs for acamarata packages.
 * Inputs: none — import the named export you need in your eslint.config.js
 * Outputs: ESLint flat config objects (Linter.Config[]) for base, typescript, react, and node variants
 * Constraints: Requires ESLint >=9, @typescript-eslint >=8, eslint-config-prettier >=9.
 *   React and node variants are opt-in; import only what you use.
 * SPORT: packages.md — @acamarata/eslint-config
 */

import type { Linter } from 'eslint';

/** Baseline rules that apply to all JavaScript and TypeScript files. */
export const base: Linter.Config[] = [
  {
    rules: {
      // Disallow console in library code — callers decide logging strategy.
      // WHY: libraries that log unconditionally pollute user output.
      'no-console': 'warn',
      // Prefer const — immutable bindings communicate intent clearly.
      'prefer-const': 'error',
      // Disallow var — block-scoped let/const prevents hoisting bugs.
      'no-var': 'error',
      // Require === — loose equality hides type coercion bugs.
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // Curly braces for all control-flow bodies — prevents off-by-one errors.
      curly: ['error', 'all'],
      // Disallow unused variables to keep the surface clean.
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];

/**
 * Purpose: TypeScript-aware rules. Extends base + @typescript-eslint/recommended + Prettier compat.
 * Inputs: @typescript-eslint/eslint-plugin and @typescript-eslint/parser must be installed.
 * Outputs: Linter.Config[] — spread into your eslint.config.js after the parser config.
 * Constraints: Requires TypeScript project references or standalone tsconfig.json.
 *   noExplicitAny is error — every `any` cast requires an inline justification comment.
 * SPORT: packages.md — @acamarata/eslint-config
 */
export const typescript: Linter.Config[] = [
  ...base,
  {
    rules: {
      // Disable JS version; @typescript-eslint version handles TS specifics.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Ban `any` — forces intentional unsafe casts with explicit justification.
      // WHY: unchecked `any` is the #1 source of runtime type errors in TS projects.
      '@typescript-eslint/no-explicit-any': 'error',
      // Require return type annotations on exported functions.
      // WHY: public API surface should be explicitly typed; inference inside is fine.
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      // Prefer nullish coalescing over || for null/undefined checks.
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      // Prefer optional chaining over manual null checks.
      '@typescript-eslint/prefer-optional-chain': 'warn',
    },
  },
];

/**
 * Purpose: React-specific rules. Adds eslint-plugin-react and react-hooks rules.
 * Inputs: eslint-plugin-react and eslint-plugin-react-hooks must be installed (peer deps).
 * Outputs: Linter.Config[] — spread into your eslint.config.js alongside the typescript config.
 * Constraints: Optional peer deps. Import this only in React projects.
 * SPORT: packages.md — @acamarata/eslint-config
 */
export const react: Linter.Config[] = [
  ...typescript,
  {
    rules: {
      // Exhaustive deps prevent stale closure bugs in hooks.
      // WHY: missing deps in useEffect/useCallback are the most common React bug class.
      'react-hooks/exhaustive-deps': 'error',
      // Enforce hook call rules (top-level only, not inside conditionals).
      'react-hooks/rules-of-hooks': 'error',
      // JSX key prop required in lists — prevents reconciliation bugs.
      'react/jsx-key': 'error',
      // Disallow index as key — masking actual identity causes subtle UI bugs.
      'react/no-array-index-key': 'warn',
      // Prevent prop-types — projects using TypeScript do not need them.
      'react/prop-types': 'off',
    },
  },
];

/**
 * Purpose: Node.js-specific rules. Tightens rules appropriate for backend/CLI code.
 * Inputs: none — no additional peer deps beyond base.
 * Outputs: Linter.Config[] — spread into your eslint.config.js for Node-targeted files.
 * Constraints: Applies only to Node.js code; not appropriate for browser bundles.
 * SPORT: packages.md — @acamarata/eslint-config
 */
export const node: Linter.Config[] = [
  ...base,
  {
    rules: {
      // Allow console in Node CLI/server code — logging is expected.
      // WHY: base bans console; node contexts legitimately need it.
      'no-console': 'off',
      // Disallow process.exit in library code — callers control lifecycle.
      'no-process-exit': 'error',
    },
  },
];
