import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'core/utils';
import { ContextTypes } from './Provider';

export const ConnectPropTypes = {
  helper: PropTypes.object.isRequired,
};

export const connect = WrappedComponent => {
  const Connect = (props, context) => (
    <WrappedComponent
      {...props}
      helper={context.algoliaHelper}
    />
  );

  Connect.displayName = getDisplayName(
    WrappedComponent,
    'connect',
  );

  Connect.contextTypes = ContextTypes;

  return Connect;
};

export default connect;
