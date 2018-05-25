import React from 'react';
import PropTypes from 'prop-types';

const createImage = ({ src, srcset, sizes, onLoad }) => {
  const img = document.createElement('img');
  img.onload = () => onLoad(img.currentSrc || img.src);
  img.src = src;
  img.sizes = sizes;
  img.srcset = srcset;
};

export const makeResponsive = ({ src, srcset, sizes }) => Component =>
  class Responsive extends React.Component {
    static propTypes = {
      children: PropTypes.any
    };
    state = {
      src: null
    };

    onLoad = src => this.setState({ src }, () => this.forceUpdate());

    load = () => createImage({
      src,
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
        <Component {...this.props} src={src} >
          {children}
        </Component>
      );
    }
  };

function Container({ src, children, ...props }) {
  const newProps = { ...props };
  delete newProps.src;
  delete newProps.srcset;
  delete newProps.sizes;
  return (
    <div
      style={{
        backgroundImage: 'url(\'' + src + '\')'
      }}
      {...newProps}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  src: PropTypes.any,
  children: PropTypes.any,
};

export default function Responsive(props) {
  const Component = makeResponsive(props)(Container);

  const newProps = { ...props };
  delete newProps.src;
  delete newProps.srcset;
  delete newProps.sizes;

  return <Component {...newProps}>{props.children}</Component>;
}

Responsive.propTypes = {
  src: PropTypes.string,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  children: PropTypes.any
};