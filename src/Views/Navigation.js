import '../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import {Container, Row, Col, Nav} from 'react-bootstrap'
import "/node_modules/bootstrap/scss/bootstrap.scss";
import Main from './Main';
import { Link, Switch, Route, withRouter } from 'react-router-dom'

function Navigation() {
  return (
    <>
    <div>
          You made it to Navigation!
    </div>
    <Link to='/'>
    <Button type='submit'>Home</Button>
    </Link>
    </>
  );
}

export default withRouter(Navigation);
