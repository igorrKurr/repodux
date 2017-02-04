import { expect, assert } from 'chai';
import Immutable from 'seamless-immutable';
import { buildOperations, buildTypes } from '../src/actions';
import { buildReducer } from '../src/reducer';

const User = { name: 'user', id: 'id' }

describe('Reducer', () => {
  let operations;
  let reducer; 
  before(() => {
    operations = buildOperations(User)
    reducer = buildReducer(buildTypes(User), User)
  })

  describe('operations', () => {
    let state;
    beforeEach(() => {
      state = Immutable({
        items: {}
      });
    });

    it('should return the initial state', () => {
      const expectedResult = state;
      expect(reducer(undefined, {})).to.deep.equal(expectedResult);
      expect(reducer(state, null)).to.deep.equal(expectedResult);
    });

    it('should handle update success action correctly', () => {
      state = state.setIn(['items', '1'], { id: '1', bar: 'baz' })
      const item = {
        id: '1',
        foo: 'bar'
      }
      const expectedResult = Immutable({
        items: {
          '1': item
        }
      });
      expect(reducer(state, operations.update.success(item))).to.deep.equal(expectedResult);
    });

    it('should handle updateAll success action correctly', () => {
      state = state.setIn(['items', '1'], { id: '1', bar: 'baz' }).setIn(['items', '2'], { id: '1', foo: 'bar' })
      const item = {
        id: '1',
        foo: 'bar'
      }
      const items = {
        '1': {
          id: '1',
          bar: 'foo'
        },
        '2': {
          id: '2',
          foo: 'baz'
        },
      }
      const expectedResult = Immutable({ items });
      expect(reducer(state, operations.updateAll.success(items))).to.deep.equal(expectedResult);
    });

    it('should handle delete success action correctly', () => {
      const expectedResult = state;
      state = state.setIn(['items', '1'], { id: '1', bar: 'baz' })
      expect(reducer(state, operations.delete.success({ id: '1' }))).to.deep.equal(expectedResult);
    });

    it('should handle insert success action correctly', () => {
      const item = {
        id: '1',
        foo: 'bar'
      }
      const expectedResult = Immutable({
        items: {
          '1': item
        }
      });
      expect(reducer(state, operations.insert.success(item))).to.deep.equal(expectedResult);
    });

    it('should handle insertAll success action correctly', () => {
      const item = {
        id: '1',
        foo: 'bar'
      }
      const expectedResult = Immutable({
        items: {
          '1': item
        }
      });
      expect(reducer(state, operations.insertAll.success({ '1': item }))).to.deep.equal(expectedResult);
    });

    it('should handle delete success action correctly', () => {
      const expectedResult = state;
      state = state.setIn(['items', '1'], { id: '1', bar: 'baz' })
      expect(reducer(state, operations.delete.success({ id: '1' }))).to.deep.equal(expectedResult);
    });

    it('should handle deleteAll success action correctly', () => {
      const expectedResult = state;
      state = state.setIn(['items', '1'], { id: '1', bar: 'baz' }).setIn(['items', '2'], { id: '2', foo: 'bar' })
      expect(reducer(state, operations.deleteAll.success({ ids: ['1', '2'] }))).to.deep.equal(expectedResult);
    });

  });
});
