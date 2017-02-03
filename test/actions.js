import { expect, assert } from 'chai';
import { buildOperations } from '../src/actions';

describe('Operations', () => {
  describe('build', () => {
    let operations;
    let User = { name: 'user' }
      
    before(() => {
      operations = buildOperations(User)
    })

    it('should return object of update/create/index/destroy operations', () => {
      assert.property(operations, 'update')
      assert.property(operations, 'create')
      assert.property(operations, 'index')
      assert.property(operations, 'destroy')
    });

    it('should return set deep object of flux actions', () => {
      assert.deepEqual(operations.update.tap({foo: 'bar'}), { type: 'REPO/USER/UPDATE/TAP', payload: {foo: 'bar'}})
    });
  });
});
