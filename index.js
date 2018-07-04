import React from 'react';
import PropTypes from 'prop-types';

const cache = {};
const getKey = props => JSON.stringify(props);
const getCached = props => cache[getKey(props)];

const createImage = ({ src, srcset, sizes, onLoad }) => {
  const img = document.createElement('img');
  img.onload = () => {
    const src = img.currentSrc || img.src;
    cache[getKey({ srcset, sizes })] = src;
    onLoad(src);
  };
  img.src = src;
  img.sizes = sizes;
  img.srcset = srcset;
};

export const makeResponsive = ({ src, srcset, sizes }) => Component =>
  class Responsive extends React.Component {
    static propTypes = {
      children: PropTypes.any
    };

    constructor(props) {
      super(props);

      const cache = getCached({ srcset, sizes });

      this.state = {
        src: cache || src,
        cached: !!cache
      };
    }

    onLoad = src => {
      if (this.mounted && src !== this.state.src) {
        this.setState({
          src
        });
      }
    };

    load = () => createImage({
      src,
      srcset,
      sizes,
      onLoad: this.onLoad,
    });

    componentDidMount() {
      this.mounted = true;
      if (!this.state.cached) {
        this.load();
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { children } = this.props;
      const { src } = this.state;

      return (
        <Component {...this.props} src={src || ''} >
          {children}
        </Component>
      );
    }
  };

function Container({ src, children, style, ...props }) {
  return (
    <div
      style={{
        backgroundImage: 'url(\'' + src + '\')',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  src: PropTypes.any,
  style: PropTypes.object,
  children: PropTypes.any,
};

export default function Responsive(props) {
  const Component = makeResponsive(props)(Container);
  return <Component {...props}>{props.children}</Component>;
}

Responsive.propTypes = {
  src: PropTypes.string,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  children: PropTypes.any
};