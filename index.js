import React from 'react';
import PropTypes from 'prop-types';

const createImage = ({ srcset, sizes, onLoad }) => {
  const img = document.createElement('img');
  img.onload = () => onLoad(img.currentSrc);
  img.sizes = sizes;
  img.srcset = srcset;
};

export const makeResponsive = ({ srcset, sizes }) => Component =>
  class Responsive extends React.Component {
    static propTypes = {
      children: PropTypes.any
    };
    state = {
      src: null
    };

    onLoad = src => this.setState({ src }, () => this.forceUpdate());

    load = () => createImage({
      srcset,
      sizes,
      onLoad: this.onLoad,
    });

    componentDidMount() {
      this.load();
    }

    render() {
      const { children } = this.props;
      const { src } = this.state;

      return (
        <Component src={src} {...this.props}>
          {children}
        </Component>
      );
    }
  };

const Container = ({ src, children, ...props }) => (
  <div
    style={{
      backgroundImage: 'url(\'' + src + '\')'
    }}
    {...props}
  >
    {children}
  </div>
);

Container.propTypes = {
  src: PropTypes.any,
  children: PropTypes.any,
};

export default function Responsive(props) {
  const Component = makeResponsive(props)(Container);
  return <Component {...props}>{props.children}</Component>;
}

Responsive.propTypes = {
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  children: PropTypes.any
};