# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-28

### Added

- Initial package scaffold with four named flat-config exports: `base`, `typescript`, `react`, `node`.
- `base`: core rules for all JS/TS files (prefer-const, no-var, eqeqeq, no-unused-vars).
- `typescript`: extends base with @typescript-eslint/recommended rules, noExplicitAny error, explicit-module-boundary-types.
- `react`: extends typescript with react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, jsx-key.
- `node`: extends base with no-console off (appropriate for server/CLI code), no-process-exit error.
- Dual CJS/ESM distribution via tsup.
- Node.js test runner test suite validating flat-config shape for all four exports.
- CI workflow: Node 20/22/24 matrix, corepack, test, typecheck, coverage, pack-check jobs.
