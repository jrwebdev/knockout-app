import React from 'react';
import * as ko from 'knockout';

// Higher order component for wrapping Knockout functionality
const koComponent = componentName => {

  const koBinding = `component: {name: '${componentName}', params: props}`;

  return class extends React.Component {

    constructor() {
      super();
      this.registerKo = this.registerKo.bind(this);
    }

    componentWillUpdate(props) {
      // TODO: Deep comparison between properties before updating knockout?
      // This would not be an issue if using immutable data and extending React.PureComponent
      this.koProps(props);
    }

    componentWillUnmount() {
      ko.cleanNode(this.element);
    }

    registerKo(el) {
      if (el) {
        this.element = el;
        this.koProps = ko.observable(this.props);
        ko.applyBindings({props: this.koProps}, this.element);
      }
    }

    render() {
      return <span ref={this.registerKo} data-bind={koBinding} />;
    }

  };

};

export default koComponent;
