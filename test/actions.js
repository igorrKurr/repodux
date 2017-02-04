import { expect, assert } from 'chai';
import { buildOperations } from '../src/actions';

describe('Operations', () => {
  describe('build', () => {
    let operations;
    let User = { name: 'user' }
      
    before(() => {
      operations = buildOperations(User)
    })

    it('should return object of update/updateAll/insert/insertAll/delete/deleteAll operations', () => {
      assert.property(operations, 'update')
      assert.property(operations, 'updateAll')
      assert.property(operations, 'insert')
      assert.property(operations, 'insertAll')
      assert.property(operations, 'delete')
      assert.property(operations, 'deleteAll')
    });

    it('should return set deep object of flux actions', () => {
      assert.deepEqual(operations.update.tap({foo: 'bar'}), {type: 'REPO/USER/UPDATE/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.update.success({foo: 'bar'}), {type: 'REPO/USER/UPDATE/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.update.failure({foo: 'bar'}), {type: 'REPO/USER/UPDATE/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.updateAll.tap({foo: 'bar'}), {type: 'REPO/USER/UPDATE_ALL/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.updateAll.success({foo: 'bar'}), {type: 'REPO/USER/UPDATE_ALL/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.updateAll.failure({foo: 'bar'}), {type: 'REPO/USER/UPDATE_ALL/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.insert.tap({foo: 'bar'}), {type: 'REPO/USER/INSERT/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.insert.success({foo: 'bar'}), {type: 'REPO/USER/INSERT/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.insert.failure({foo: 'bar'}), {type: 'REPO/USER/INSERT/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.insertAll.tap({foo: 'bar'}), {type: 'REPO/USER/INSERT_ALL/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.insertAll.success({foo: 'bar'}), {type: 'REPO/USER/INSERT_ALL/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.insertAll.failure({foo: 'bar'}), {type: 'REPO/USER/INSERT_ALL/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.delete.tap({foo: 'bar'}), {type: 'REPO/USER/DELETE/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.delete.success({foo: 'bar'}), {type: 'REPO/USER/DELETE/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.delete.failure({foo: 'bar'}), {type: 'REPO/USER/DELETE/FAILURE', payload: {foo: 'bar'}})

      assert.deepEqual(operations.deleteAll.tap({foo: 'bar'}), {type: 'REPO/USER/DELETE_ALL/TAP', payload: {foo: 'bar'}})
      assert.deepEqual(operations.deleteAll.success({foo: 'bar'}), {type: 'REPO/USER/DELETE_ALL/SUCCESS', payload: {foo: 'bar'}})
      assert.deepEqual(operations.deleteAll.failure({foo: 'bar'}), {type: 'REPO/USER/DELETE_ALL/FAILURE', payload: {foo: 'bar'}})
    });
  });
});
