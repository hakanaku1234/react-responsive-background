import React from 'react';
import ReactDOM from 'react-dom';

import Responsive from './index';

const container = {
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  gridTemplateRows: '50vh 50vh'
};

const box = {
  width: '100%',
  height: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover'
};

const srcset = `
  https://placekitten.com/800/400 1200w,
  https://placekitten.com/500/200 800w
`;

function rerender(Component) {
  return class Rerenderer extends React.Component {
    state = {
      prop: 0
    };

    componentDidMount() {
      this.interval = setInterval(() =>
        this.setState(prevState => ({
          prop: prevState.prop + 1
        })
      ),
      1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return <Component prop={this.state.prop} {...this.props} />;
    }
  };
}

const Component = rerender(Responsive);

ReactDOM.render(
  <div style={container}>
    {[...Array(4)].map((s, i) => <Component key={i} srcset={srcset} style={box} />)}
  </div>,
  document.getElementById('app')
);
