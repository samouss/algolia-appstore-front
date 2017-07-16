import flowRight from 'lodash.flowright';
import React, { Component } from 'react';
import { getDisplayName } from 'core/utils';
import connect, { ConnectPropTypes } from './connect';

export const withRefinements = WrappedComponent => {
  class WithRefinements extends Component {

    constructor(props) {
      super(props);

      this.state = {
        refinements: [],
      };

      this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
      this.props.helper.on('result', this.updateState);
    }

    componentWillUnmount() {
      this.props.helper.removeListener('result', this.updateState);
    }

    updateState(content) {
      const refinements = content.getRefinements();

      this.setState(() => ({
        refinements,
      }));
    }

    render() {
      const { helper, ...props } = this.props;

      return (
        <WrappedComponent
          {...props}
          {...this.state}
        />
      );
    }

  }

  WithRefinements.displayName = getDisplayName(
    WrappedComponent,
    'withRefinements',
  );

  WithRefinements.propTypes = ConnectPropTypes;

  return WithRefinements;
};

export default flowRight(
  connect,
  withRefinements,
);
