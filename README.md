# react-responsive-background

![Downloads](https://img.shields.io/npm/dm/react-responsive-background.svg?maxAge=2592000)
![Version](https://img.shields.io/npm/v/react-responsive-background.svg?maxAge=2592000)

Use CSS property `background-image` with `srcset` and `size`


## Installation

`$ npm install react-responsive-background`

## Usage

All calculated image sources are cached

### Example with react-emotion
```javascript
import Responsive from 'react-responsive-background';
import { css } from 'react-emotion';

const className = css`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const srcset = `
  https://placekitten.com/800/400 1200w,
  https://placekitten.com/500/200 800w
`;

const Component = () => (
  <Responsive
    srcset={srcset}
    className={className}
  >
    hello world
  </Responsive>
);
```

### Inject in existing components
```javascript
import { makeResponsive } from 'react-responsive-background';

const srcset = `
  https://placekitten.com/800/400 2x 1200w,
  https://placekitten.com/500/200 800w
`;

// use a default src to avoid blank images on ie11
const defaultSrc = 'https://placekitten.com/1200/600';

const sizes = '';

const Component = ({ src, children }) => (
  <div
    style={{
      // set our styles
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',

      // set background image
      backgroundImage: 'url(\'' + src + '\')'
    }}
  >
   {children}
  </div>
);

const WrappedComponent = makeResponsive({
  srcset,
  sizes,
  src: defaultSrc,
})(Component);

const Container = () => (
  <WrappedComponent>
    Hello world
  </WrappedComponent>
)
```

### Using srcset object
```javascript
import Responsive from 'react-responsive-background';
import { css } from 'react-emotion';

const className = css`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const srcset = [
  {
    // this will be the default src if srcset is not supported
    url: 'https://placekitten.com/800/400',
    density: 2,
    width: 1200,
  },
  {
    url: 'https://placekitten.com/500/200',
    width: 800,
  }
]

const Component = () => (
  <Responsive
    srcset={srcset}
    className={className}
  >
    hello world
  </Responsive>
);
```