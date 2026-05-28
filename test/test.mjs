/**
 * Test suite for @acamarata/eslint-config
 * Validates that each exported flat-config object has the correct shape.
 * A valid Linter.Config[] entry has a `rules` key (object).
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { base, typescript, react, node } from '../dist/index.mjs';

describe('@acamarata/eslint-config — flat-config shape', () => {
  it('base is an array', () => {
    assert.ok(Array.isArray(base), 'base must be an array');
  });

  it('base contains at least one config object with a rules key', () => {
    const hasRules = base.some(cfg => cfg !== null && typeof cfg === 'object' && 'rules' in cfg);
    assert.ok(hasRules, 'base must contain at least one config with rules');
  });

  it('base.rules.prefer-const is "error"', () => {
    const cfg = base.find(c => c.rules && 'prefer-const' in c.rules);
    assert.ok(cfg, 'base must define prefer-const');
    assert.strictEqual(cfg.rules['prefer-const'], 'error');
  });

  it('typescript is an array extending base', () => {
    assert.ok(Array.isArray(typescript), 'typescript must be an array');
    assert.ok(typescript.length >= base.length, 'typescript must extend base');
  });

  it('typescript config contains @typescript-eslint/no-explicit-any: "error"', () => {
    const cfg = typescript.find(c => c.rules && '@typescript-eslint/no-explicit-any' in c.rules);
    assert.ok(cfg, 'typescript must define @typescript-eslint/no-explicit-any');
    assert.strictEqual(cfg.rules['@typescript-eslint/no-explicit-any'], 'error');
  });

  it('react is an array extending typescript', () => {
    assert.ok(Array.isArray(react), 'react must be an array');
    assert.ok(react.length >= typescript.length, 'react must extend typescript');
  });

  it('react config contains react-hooks/exhaustive-deps: "error"', () => {
    const cfg = react.find(c => c.rules && 'react-hooks/exhaustive-deps' in c.rules);
    assert.ok(cfg, 'react must define react-hooks/exhaustive-deps');
    assert.strictEqual(cfg.rules['react-hooks/exhaustive-deps'], 'error');
  });

  it('node is an array extending base', () => {
    assert.ok(Array.isArray(node), 'node must be an array');
    assert.ok(node.length >= base.length, 'node must extend base');
  });

  it('node config sets no-console to "off" (final effective value)', () => {
    // node is [...base, nodeOverrides]. base sets no-console:'warn', nodeOverrides sets 'off'.
    // The last config object wins in flat config. Find the last one that defines no-console.
    const allWithNoConsole = node.filter(c => c.rules && 'no-console' in c.rules);
    assert.ok(allWithNoConsole.length > 0, 'node must define no-console');
    const last = allWithNoConsole[allWithNoConsole.length - 1];
    assert.strictEqual(last.rules['no-console'], 'off');
  });

  it('all exports are plain objects (no class instances, no functions)', () => {
    for (const [name, cfg] of [['base', base], ['typescript', typescript], ['react', react], ['node', node]]) {
      for (const entry of cfg) {
        assert.strictEqual(typeof entry, 'object', `${name}: each entry must be a plain object`);
        assert.ok(entry !== null, `${name}: each entry must not be null`);
      }
    }
  });
});
