import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Card, Container, Nav, Dropdown, Modal, Row, Col} from 'react-bootstrap';
import NavBar from '../Components/NavBar'
import UserSettings from '../Components/UserSettings';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function AuthCallback() {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    const { isLoading } = useAuth0();
    const history = useHistory();
    const [dropdown_selection, setDropdownSelection] = useState('')
    const [category, setCategory] = useState(false)
    const [show, setShow] = useState(false)
    const handleClose=()=> {setShow(false)}
    const handleOpen=()=>{setShow(true)}

    useEffect(async () =>{
        if(!isLoading && isAuthenticated){
            try{
                let targetURI = `https://popularnews.org/api/user{}?email=${user.email}`
                let res = await axios.get(targetURI);
                let arr = res.data;
                setCategory(arr[0][5])
                console.log('User is: '+arr)
                console.log('Users saved category preference is: '+arr[0][5])
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
            let targetURI = `https://popularnews.org/api/user_category{}?email=${user.email}&category=${category}`
            let res = await axios.post(targetURI)
            let arr = res.data;
            handleOpen()
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
        return <div id='loading_div'>Loading ...</div>;
    }

    // Currently using bootsrap continaer/row/column, need to convert to ReactBootstrap to match rest of the site!
    if(isAuthenticated){
        return (
            <>
              <UserSettings />
              <NavBar />
              <header id='header_row'>
                <div id="navbar_top_div_spacer"></div>
                <Container>
                  <Row>
                    <Col sm={3} id='card_col'>
                      <Card className="mb-3" style={{ color: "#000" }} id='user_card'>
                        <Card.Img src={user.picture ? user.picture : null} id='user_card_img' />
                        <Card.Body>
                          <Card.Title>
                            {user.name ? user.name : null}
                          </Card.Title>
                          <Card.Text>
                            Text about me here!
                          </Card.Text>
                          <Container>
                            <Row>
                              <Col sm={12}>
                                Category:
                              </Col>
                              <Col sm={12}>
                                <Dropdown>
                                  <Dropdown.Toggle className='inputBox' id='dropdown-basic'>
                                    {category}
                                  </Dropdown.Toggle>
        
                                  <Dropdown.Menu>
                                    <Dropdown.Item active={category === 'All'} onClick={() => setCategory('All')}>All</Dropdown.Item>
                                    <Dropdown.Item active={category === 'Sports'} onClick={() => setCategory('Sports')}>Sports</Dropdown.Item>
                                    <Dropdown.Item active={category === 'Business'} onClick={() => setCategory('Business')}>Business</Dropdown.Item>
                                    <Dropdown.Item active={category === 'Entertainment'} onClick={() => setCategory('Entertainment')}>Entertainment</Dropdown.Item>
                                    <Dropdown.Item active={category === 'General'} onClick={() => setCategory('General')}>General</Dropdown.Item>
                                    <Dropdown.Item active={category === 'Health'} onClick={() => setCategory('Health')}>Health</Dropdown.Item>
                                    <Dropdown.Item active={category === 'Science'} onClick={() => setCategory('Science')}>Science</Dropdown.Item>
                                    <Dropdown.Item active={category === 'Technology'} onClick={() => setCategory('Technology')}>Technology</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </Col>
                            </Row>
                          </Container>
                          <Button variant='primary' style={{ marginTop: 20, width: '100%' }} onClick={handleClick} data-toggle="modal" >Save</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </header>
        
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Save Preferences</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your changes have been saved!</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
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
        <header id='header_row'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12' id='not_logged_in_div'>
                    <h6>You are not logged in!</h6>
                    <Button onClick={()=>{console.log(user) && console.log(isAuthenticated)}}></Button>
                </div>
            </div>
        </div>
        </header>
        </>
    );
};

export default AuthCallback