import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import './index.css';
import BlogsApp from './components/BlogsApp';
import BlogPage from './components/BlogPage';
import * as serviceWorker from './serviceWorker';

const AppRouter = () => {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={BlogsApp} exact={true}/>
        <Route path="/:id" component={BlogPage}/>
      </Switch>
    </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
