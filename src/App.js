import './App.css';
import "/node_modules/bootstrap/scss/bootstrap.scss";
import About from './Views/About';
import Main  from './Views/Main';
import AuthCallback from './Views/AuthCallback';

import { 
  Route, 
  Switch} from 'react-router-dom';


function App() {
  return (
    <header>
      <Switch>
        <Route path="/about" component={About}/>
        <Route path='/authcallback' component={AuthCallback}/>
        <Route exact path='/' component={Main}/>
      </Switch>
    </header>
  );
}

export default App;
