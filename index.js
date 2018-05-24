import React from 'react';
import PropTypes from 'prop-types';

export default class Responsive extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    srcset: PropTypes.string,
    sizes: PropTypes.string,
    component: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string
  };
  static defaultProps = {
    style: {}
  };
  state = {
    src: null
  };

  componentDidMount() {
    const img = document.createElement('img');
    img.onload = () =>
      this.setState(
        { src: img.currentSrc },
        () => this.forceUpdate()
      );
    img.sizes = this.props.sizes;
    img.srcset = this.props.srcset;
  }

  render() {
    const { children, component, style, className } = this.props;
    const { src } = this.state;

    const Component = component || 'div';

    return (
      <Component
        className={className}
        style={{
          ...style,
          backgroundImage: 'url(\'' + src + '\')'
        }}
      >
        {children}
      </Component>
    );
  }
}
