import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.css';

class AdvancedFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    event.preventDefault();

    this.setState(state => ({
      isVisible: !state.isVisible,
    }));
  }

  render() {
    const { isVisible } = this.state;
    const { children } = this.props;
    const icon = isVisible ? <i className="fa fa-chevron-up" aria-hidden="true" />
      : <i className="fa fa-chevron-down" aria-hidden="true" />;

    return (
      <div styleName="AdvancedFilters">
        <div
          styleName={cx('AdvancedFilters__Content', {
            'AdvancedFilters__Content--visible': isVisible,
          })}
        >
          {children}
        </div>
        <a
          href=""
          styleName="AdvancedFilters__Link"
          onClick={this.toggle}
        >
          {!isVisible && 'Advanced filters'}
          {icon}
        </a>
      </div>
    );
  }
}

AdvancedFilters.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdvancedFilters;
