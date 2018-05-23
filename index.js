import React from 'react';
import PropTypes from 'prop-types';

export default class Responsive extends React.Component {
  static propTypes = {
    srcset: PropTypes.string,
    sizes: PropTypes.string,
    className: PropTypes.string,
  };
  state = {
    src: null,
  };

  componentWillMount() {
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
    const { children, ...props } = this.props;
    const { src } = this.state;

    return (
      <div
        {...props}
        style={{ backgroundImage: 'url(' + this.state.src + ')'} }
      >
        {children}
      </div>
    );
  }
}