import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Card, Container, Nav, Dropdown} from 'react-bootstrap';
import NavBar from '../Components/NavBar'
import UserSettings from '../Components/UserSettings';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

function AuthCallback() {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    const { isLoading } = useAuth0();
    const history = useHistory();
    const [dropdown_selection, setDropdownSelection] = useState('')
    const [category, setCategory] = useState(false)


    useEffect(async () =>{
        if(!isLoading && isAuthenticated){
            try{
                let targetURI = `http://localhost:8000/user{}?email=${user.email}`
                let res = await axios.get(targetURI);
                let arr = res.data;
                setCategory(arr[0][5])
                console.log('Users saved category prefernce is: '+arr[0][5])
                return (arr)
                
            } catch(e) {
                console.log(e)
            }
        }

    },[isLoading, isAuthenticated]);


    const handleSelect = (event) =>{
        console.log('Event selected: '+event.target.value)
        setDropdownSelection(event.target.value)
    }

    const handleClick = async () => {
        try{
            let targetURI = `http://localhost:8000/user_category{}?email=${user.email}&category=${dropdown_selection}`
            let res = await axios.post(targetURI)
            let arr = res.data;
            return (arr)
            
        } catch(e) {
            console.log(e)
        }
    }

    // Forces page refresh, causes a flash on loading but correctly displays logged in 
    const handleGoToAuth = () => {
        history.push("/authcallback"); 
    };
    // If Auth0 not done loading, display placeholder
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if(isAuthenticated){
        return(
            <>
            <UserSettings />
            <NavBar/>
            <div className='container'>
            <div className='row'>
            <div className='col-sm-3' id='card_col'>
            <Card className="mb-3" style={{color: "#000"}} id='user_card'>
            <Card.Img src={user.picture ? user.picture : null} id='user_card_img' />
            <Card.Body>
              <Card.Title>
                {user.name ? user.name : null}
              </Card.Title>
              <Card.Text>
                Text about me here! 
              </Card.Text>
            <div className='container'>
            <div className='col-sm-12'>
                Category:
            </div>
            <div className='col-sm-12'>
            <label data-tip data-for='bldgNameTip'>
                <select className='inputBox'onChange={handleSelect}>
                    <option selected = {category === 'All' ? 'selected' : null}>All</option> 
                    <option selected = {category === 'Sports' ? 'selected' : null}>Sports</option>
                    <option selected = {category === 'Business' ? 'selected' : null}>Business</option>
                    <option selected = {category === 'Entertainment' ? 'selected' : null}>Entertainment</option>
                    <option selected = {category === 'General' ? 'selected' : null}>General</option>
                    <option selected = {category === 'Health' ? 'selected' : null}>Health</option>
                    <option selected = {category === 'Science' ? 'selected' : null}>Science</option>
                    <option selected = {category === 'Technology' ? 'selected' : null}>Technology</option>
                </select>
            </label>
            </div>
            </div>
            <Button variant='primary' style={{marginTop:20, width:'100%'}} onClick={handleClick}>Save</Button>
            </Card.Body>
          </Card>
          </div>
          </div>
          </div>
          </>
        )
    }
    if (window.location.href.includes('code')){
        handleGoToAuth();
        window.location.reload(true);
    }
    return(
        <>
        <NavBar />
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12' id='not_logged_in_div'>
                    <h6>You are not logged in!</h6>
                    <Button onClick={()=>{console.log(user) && console.log(isAuthenticated)}}></Button>
                </div>
            </div>
        </div>
        </>
    );
};

export default AuthCallback