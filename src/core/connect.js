import React, { Component } from 'react';
import { connect as reduxConnect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux'

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export function connect (resource) {

  return function Wrapper(WrappedComponent, options = {}) {

    const { withRef = false, only, actions } = options;

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

        let mapStateToProps, mapDispatchToProps

        let selectedProps = resource.selectors
        if (only) {
          selectedProps = only.reduce((acc, p) => {
            const selector = resource.selectors[p]
            if (selector) {
              return {
                ...acc,
                [p]: selector()
              }
            } else {
              return acc
            }
          }, {})
        }

        let selectedActions = resource.actions
        if (actions) {
          selectedActions = actions.reduce((acc, p) => {
            const action = resource.actions[p]
            if (action) {
              return {
                ...acc,
                [p]: action
              }
            } else {
              return acc
            }
          }, {})
        }

        mapStateToProps = createStructuredSelector(selectedProps);

        mapDispatchToProps = (dispatch) => bindActionCreators(selectedActions, dispatch)

        return React.createElement(
          connect(mapStateToProps, mapDispatchToProps)(WrappedComponent),
          { ...this.props, ...extraProps }
        );
      }
    }

    WithResource.WrappedComponent = WrappedComponent;

    WithResource.displayName = 'withResource(' + getDisplayName(WrappedComponent) + ')';

    return WithResource
  };
}
