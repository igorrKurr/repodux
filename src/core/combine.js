import React, { Component } from 'react';
import { connect as reduxConnect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux'

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export function combine (resources) {

  return function Wrapper(WrappedComponent, options = {}) {

    const { withRef = false } = options;

    class WithResource extends Component {
      getWrappedInstance() {
        if (!withRef) {
          console.error(
            'To access the wrapped instance, you need to specify ' +
            '{ withRef: true } as the second argument of the translate() call.'
          );
        }

        return this.refs.wrappedInstance;
      }

      render() {
        const extraProps = {};

        if (withRef) {
          extraProps.ref = 'wrappedInstance';
        }

        const combinedProps = resources.reduce((acc, res) => {
          const selectedProps = res.selectors

          return {
            ...acc,
            [res.name]: createStructuredSelector(selectedProps)
          }
        }, {})

        const mapStateToProps = state => Object.keys(combinedProps).reduce((acc, key) => {
          return {
            ...acc,
            [key]: combinedProps[key](state)
          }
        }, {})

        const combinedDispatch = resources.reduce((acc, res) => {
          const selectedActions = res.actions

          const actions = dispatch => Object.keys(selectedActions).reduce((acc, action) => {
            return {
              ...acc,
              [action]: bindActionCreators(selectedActions[action], dispatch)
            }
          }, {})
          return {
            ...acc,
            [res.name]: actions
          }
        }, {})

        const mapDispatchToProps = dispatch => Object.keys(combinedDispatch).reduce((acc, key) => {
          return {
            ...acc,
            [key]: combinedDispatch[key](dispatch)
          }
        }, {})

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

        const mergeProps = (stateProps, dispatchProps, ownProps) => {
          const group = Object.keys(stateProps).reduce((acc, key) => {
            return {
              ...acc,
              [key]: {
                ...stateProps[key],
                ...dispatchProps[key],
                error: {
                  message: stateProps[key].error,
                  ...dispatchProps[key].error,
                }
              }
            }
          }, {})

          return ({
            ...group,
            ...ownProps,
          })
        }

        return React.createElement(
          reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps)(WrappedComponent),
          { ...this.props, ...extraProps }
        );
      }
    }

    WithResource.WrappedComponent = WrappedComponent;

    WithResource.displayName = 'withResource(' + getDisplayName(WrappedComponent) + ')';

    return WithResource
  };
}
