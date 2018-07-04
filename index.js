import React from 'react';
import PropTypes from 'prop-types';
import { getSource } from 'from-srcset';

const lookupTable = {};
const setCached = (props, src) => lookupTable[JSON.stringify(props)] = src;
const getCached = props => lookupTable[JSON.stringify(props)];

function createImage(props, callback) {
  const existing = getCached(props);
  if (existing) {
    return existing;
  }

  getSource(props, src => {
    setCached(props, src);
    callback(src);
  });
}

export const makeResponsive = ({ src, srcset, sizes }) => Component =>
  class Responsive extends React.Component {
    static propTypes = {
      children: PropTypes.any
    };

    constructor(props) {
      super(props);

      // check our cache
      const existing = getCached({ src, srcset, sizes });

      this.state = {
        // set cached src or default src
        src: existing || src,
        cached: !!existing
      };
    }

    componentDidMount() {
      this.mounted = true;

      // if a cached result is not found, load it
      if (!this.state.cached) {
        createImage({
          src,
          srcset,
          sizes,
        }, src => this.setState({
          src,
        }));
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