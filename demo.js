import React from 'react';
import ReactDOM from 'react-dom';

import Responsive from './index';

const srcset = `
  https://placekitten.com/800/400 1200w,
  https://placekitten.com/500/200 800w
`;

ReactDOM.render(
  <Responsive
    srcset={srcset}
    className="background"
  >
    Hello
  </Responsive>,
  document.getElementById('app')
);
