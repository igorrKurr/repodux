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

    it('should handle create success action correctly', () => {
      const item = {
        id: '1',
        foo: 'bar'
      }
      const expectedResult = Immutable({
        items: {
          '1': item
        }
      });
      expect(reducer(state, operations.create.success(item))).to.deep.equal(expectedResult);
    });

    it('should handle index success action correctly', () => {
      const item = {
        id: '1',
        foo: 'bar'
      }
      const expectedResult = Immutable({
        items: {
          '1': item
        }
      });
      expect(reducer(state, operations.index.success({ '1': item }))).to.deep.equal(expectedResult);
    });

    it('should handle destroy success action correctly', () => {
      const expectedResult = state;
      state = state.setIn(['items', '1'], { id: '1', bar: 'baz' })
      expect(reducer(state, operations.destroy.success({ id: '1' }))).to.deep.equal(expectedResult);
    });

  });
});
