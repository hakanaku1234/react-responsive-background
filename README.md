# react-responsive-background

![Downloads](https://img.shields.io/npm/dm/react-responsive-background.svg?maxAge=2592000)
![Version](https://img.shields.io/npm/v/react-responsive-background.svg?maxAge=2592000)

Use CSS property `background-image` with `srcset` and `size`


## Installation

`$ npm install react-responsive-background`

## Usage

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
import Responsive from 'react-responsive-background';

// backgroundImage is set in style
const Component = ({ style, children }) => (
  <div
    style={{
      // set our styles
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',

      // add generated styles
      ...style,
    }}
  >
   {children}
  </div>
);

const Injected = () => (
  <Responsive
    component={Component}
    prop="props gets sent to wrapped element"
  >
    Hello world
  </Responsive>
)
```
