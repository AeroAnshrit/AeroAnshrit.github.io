import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { CAD_MODELS, getCadModelConfig, resolveModalCadModel } from './cad-models.ts';

describe('CAD Model Catalog & Lookup Logic', () => {
  test('returns valid configuration for all 4 propulsion 3D models', () => {
    const keys = ['pintle_cutaway', 'pintle_full', 'swirl', 'motor'] as const;
    for (const key of keys) {
      const spec = getCadModelConfig(key);
      assert.ok(spec, `Expected spec for ${key}`);
      assert.equal(spec.id, key);
      assert.ok(spec.src.startsWith('3D/') && spec.src.endsWith('.glb'));
      assert.ok(spec.name.length > 10);
      assert.ok(spec.orbit.includes('deg') && spec.orbit.endsWith('%'));
    }
  });

  test('trims whitespace around valid model keys', () => {
    const spec = getCadModelConfig('  pintle_full ');
    assert.deepEqual(spec, CAD_MODELS.pintle_full);
  });

  test('returns null for unknown, empty, or nullish model keys', () => {
    assert.equal(getCadModelConfig('unknown_injector'), null);
    assert.equal(getCadModelConfig(''), null);
    assert.equal(getCadModelConfig(null), null);
    assert.equal(getCadModelConfig(undefined), null);
  });

  test('resolves key project modal keys to their interactive 3D models', () => {
    assert.equal(resolveModalCadModel('kp_pintle')?.id, 'pintle_cutaway');
    assert.equal(resolveModalCadModel('kp_swirl')?.id, 'swirl');
    assert.equal(resolveModalCadModel('kp_srm')?.id, 'motor');
    assert.equal(resolveModalCadModel('exp_isro'), null);
    assert.equal(resolveModalCadModel(null), null);
  });
});
