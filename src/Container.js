import React, { Component } from 'react';
import Header from 'components/Header';
import Content from 'components/Content';

class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '<Container />',
    };
  }

  render() {
    return (
      <div style={{ width: '980px', margin: '50px auto' }}>
        <Header
          title="My React App"
        />

        <Content
          message={this.state.message}
        />
      </div>
    );
  }

}

export default Container;
