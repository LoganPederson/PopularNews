import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import {Container, Row, Col} from 'react-bootstrap'
import "/node_modules/bootstrap/scss/bootstrap.scss";
import LoginForm from './Components/LoginForm'
import RandomImgCard from './Components/RandomImgCard';
import CallNewsApi from './Components/CallNewsApi';
import ShowNews from './Components/ShowNews';
import Navigation from './Views/Navigation';
import Main  from './Views/Main';
import AuthCallback from './Views/AuthCallback';

import { 
  NavLink,
  Link,
  createBrowserRouter,
  RouterProvider,
  Route, 
  Routes,
  Switch,
  withRouter,
  BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <header>
      <Switch>
        <Route path="/navigation" component={Navigation}/>
        <Route path='/authcallback' component={AuthCallback}/>
        <Route exact path='/' component={Main}/>
      </Switch>
    </header>
  );
}

export default App;
