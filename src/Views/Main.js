import '../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import {Container, Row, Col, Nav, Navbar, NavDropdown, Dropdown} from 'react-bootstrap'
import "/node_modules/bootstrap/scss/bootstrap.scss";
import LoginForm from '../Components/LoginForm'
import RandomImgCard from '../Components/RandomImgCard';
import CallNewsApi from '../Components/CallNewsApi';
import ShowNews from '../Components/ShowNews';
import UserSettings from '../Components/UserSettings'
import Navigation from './About';
import NavBarComponent from '../Components/NavBar';
import AddViewCount from '../Components/AddViewCount';
import { BrowserRouter, Route, Switch, Router, createRoutesFromElements } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';




function Main() {

  const [category, setCategory] = useState(false)
  const isAuthenticated = useAuth0();
  const isLoading = useAuth0();
  const user = useAuth0();

  useEffect(async () =>{
    if(!isLoading && isAuthenticated){
        try{
            let targetURI = `https://popularnews.org/api/user{}?email=${user.email}`
            let res = await axios.get(targetURI);
            let arr = res.data;
            setCategory(arr[0][5]) // Cooresponds to category in object returned from api
            return (arr)
            
        } catch(e) {
            console.log(e)
        }
    }
  },[isLoading, isAuthenticated]);

  return (
    <header>
    <UserSettings/>
    <NavBarComponent/>
    <CallNewsApi/>
    <AddViewCount/>
    </header>

  );
}

export default Main;
