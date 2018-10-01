import React, { Component } from 'react';

function dynamic(AsyncComponent) {
  return class Componentloads extends React.Component {
    render() {
      const AsyncComponentView = AsyncComponent.default || AsyncComponent;
      return (
        <AsyncComponentView {...this.props} />
      )
    }
  }
}

export const getRouterData = () => {
  const conf = {
    '/': {
      component: dynamic(require('../layouts/BasicLayout')),
    },
    '/home': {
      component: dynamic(require('../routes/home')),
    },
  };
  return conf;
};
