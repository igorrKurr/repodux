'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.combine = combine;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselect = require('reselect');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

function combine(resources) {

  return function Wrapper(WrappedComponent) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$withRef = options.withRef,
        withRef = _options$withRef === undefined ? false : _options$withRef;

    var WithResource = function (_Component) {
      _inherits(WithResource, _Component);

      function WithResource() {
        _classCallCheck(this, WithResource);

        return _possibleConstructorReturn(this, (WithResource.__proto__ || Object.getPrototypeOf(WithResource)).apply(this, arguments));
      }

      _createClass(WithResource, [{
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          if (!withRef) {
            console.error('To access the wrapped instance, you need to specify ' + '{ withRef: true } as the second argument of the translate() call.');
          }

          return this.refs.wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var extraProps = {};

          if (withRef) {
            extraProps.ref = 'wrappedInstance';
          }

          var combinedProps = resources.reduce(function (acc, res) {
            var selectedProps = res.selectors;

            return _extends({}, acc, _defineProperty({}, res.name, (0, _reselect.createStructuredSelector)(selectedProps)));
          }, {});

          var mapStateToProps = function mapStateToProps(state) {
            return Object.keys(combinedProps).reduce(function (acc, key) {
              return _extends({}, acc, _defineProperty({}, key, combinedProps[key](state)));
            }, {});
          };

          var combinedDispatch = resources.reduce(function (acc, res) {
            var selectedActions = res.actions;

            var actions = function actions(dispatch) {
              return Object.keys(selectedActions).reduce(function (acc, action) {
                return _extends({}, acc, _defineProperty({}, action, (0, _redux.bindActionCreators)(selectedActions[action], dispatch)));
              }, {});
            };
            return _extends({}, acc, _defineProperty({}, res.name, actions));
          }, {});

          var mapDispatchToProps = function mapDispatchToProps(dispatch) {
            return Object.keys(combinedDispatch).reduce(function (acc, key) {
              return _extends({}, acc, _defineProperty({}, key, combinedDispatch[key](dispatch)));
            }, {});
          };

          // const connections = resources.reduce((acc, res) => {
          //   const selectedProps = res.selectors
          //   const selectedActions = res.actions

          //   const mapStateToProps = state => ({ [res.name]: createStructuredSelector(selectedProps)(state) })
          //   const mapDispatchToProps = (dispatch) => {
          //     const actions = Object.keys(selectedActions).reduce((acc, action) => {
          //       return {
          //         ...acc,
          //         [action]: bindActionCreators(selectedActions[action], dispatch)
          //       }
          //     }, {})
          //     return {
          //       [res.name]: actions
          //     }
          //   }
          // }, { props: {}, dispatch: {} })

          var mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
            var group = Object.keys(stateProps).reduce(function (acc, key) {
              return _extends({}, acc, _defineProperty({}, key, _extends({}, stateProps[key], dispatchProps[key], {
                error: _extends({
                  message: stateProps[key].error
                }, dispatchProps[key].error)
              })));
            }, {});

            return _extends({}, group, ownProps);
          };

          return _react2.default.createElement((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(WrappedComponent), _extends({}, this.props, extraProps));
        }
      }]);

      return WithResource;
    }(_react.Component);

    WithResource.WrappedComponent = WrappedComponent;

    WithResource.displayName = 'withResource(' + getDisplayName(WrappedComponent) + ')';

    return WithResource;
  };
}