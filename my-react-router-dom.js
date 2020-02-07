import React, { Component, useContext } from 'react';
import { createBrowserHistory } from 'history';
import matchPath from './matchPath';

/* 历史记录管理对象history初始化及向下传递，location变更监听 */

const RouterContext = React.createContext();

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);

    this.history = createBrowserHistory(this.props);

    this.state = { location: this.history.location };

    this.unlisten = this.history.listen(location => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  }

  render() {
    return (
      <RouterContext.Provider
        children={this.props.children || null}
        value={{ history: this.history, location: this.state.location }}
      />
    );
  }
}

// refer https://github.com/ReactTraining/react-router/blob/08662e0d164d00335f071539c68e1483fb04a13c/packages/react-router/modules/Route.js#L30

export function Route(props) {
  const ctx = useContext(RouterContext);
  const { location } = ctx;

  const { path, component, children, render } = props;
  const match = matchPath(location.pathname, props);

  const matchCurrent = match && match.isExact;
  //const matchCurrent = path === location.pathname;

  const cmpProps = { ...ctx, match };

  // order matters
  if (matchCurrent) {
    if (children) {
      return typeof children === 'function' ? children(cmpProps) : children;
    }

    if (component) {
      return React.createElement(component, cmpProps);
    }

    if (render) {
      return render(cmpProps);
    }
  } else {
    return null;
  }
}

export class Link extends Component {
  handleClick(event, history) {
    event.preventDefault(); // 防止 href 跳转
    history.push(this.props.to); // history 跳转
  }

  render() {
    const { to, children } = this.props;

    return (
      <RouterContext.Consumer>
        {context => {
          return (
            <a onClick={event => this.handleClick(event, context.history)} href={to}>
              {children}
            </a>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
