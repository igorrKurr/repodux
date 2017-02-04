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
      assert.deepEqual(operations.update.tap({foo: 'bar'}), {type: 'REPO/USER/UPDATE/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.update.success({foo: 'bar'}), {type: 'REPO/USER/UPDATE/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.update.failure({foo: 'bar'}), {type: 'REPO/USER/UPDATE/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.create.tap({foo: 'bar'}), {type: 'REPO/USER/CREATE/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.create.success({foo: 'bar'}), {type: 'REPO/USER/CREATE/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.create.failure({foo: 'bar'}), {type: 'REPO/USER/CREATE/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.index.tap({foo: 'bar'}), {type: 'REPO/USER/INDEX/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.index.success({foo: 'bar'}), {type: 'REPO/USER/INDEX/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.index.failure({foo: 'bar'}), {type: 'REPO/USER/INDEX/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.destroy.tap({foo: 'bar'}), {type: 'REPO/USER/DESTROY/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.destroy.success({foo: 'bar'}), {type: 'REPO/USER/DESTROY/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.destroy.failure({foo: 'bar'}), {type: 'REPO/USER/DESTROY/FAILURE', payload: {foo: 'bar'}})
    });
  });
});
