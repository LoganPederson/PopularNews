import '../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import {Container, Row, Col, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import "/node_modules/bootstrap/scss/bootstrap.scss";
import LoginForm from '../Components/LoginForm'
import RandomImgCard from '../Components/RandomImgCard';
import CallNewsApi from '../Components/CallNewsApi';
import ShowNews from '../Components/ShowNews';
import UserSettings from '../Components/UserSettings'
import Navigation from './About';
import NavBarComponent from '../Components/NavBar';
import AddViewCount from '../Components/AddViewCount';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';





function Main() {

  return (
    <header>
    <UserSettings/>
    <NavBarComponent/>
    <div id="navbar_top_div_spacer"></div>
    <CallNewsApi/>
    <AddViewCount/>
    </header>

  );
}

export default Main;
