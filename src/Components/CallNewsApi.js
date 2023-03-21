import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowNews from './ShowNews';
import { useAuth0 } from '@auth0/auth0-react';
import apiKey from './local_settings.js';
import { Dropdown, Row, Col, Container } from 'react-bootstrap'

const CallNewsApi = () => {

    // State to hold API response data
    const [data, setData] = useState(false);
    // State to hold user's preferred news category
    const [category, setCategory] = useState(false)

    // Use Auth0 hook to access user authentication state
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    const { isLoading } = useAuth0();
    const [override, setOverride] = useState(false);
    // Effect hook to handle API request and set data state
    useEffect(() => {
    if(!isLoading){
      const getUserCategory = async () => {
        if(isAuthenticated && !override){
          try {
              // API endpoint for user data based on email
              let targetURI = `https://popularnews.org/api/user{}?email=${user.email}`
              let res = await axios.get(targetURI)
              let arr = res.data;
              console.log(arr+' arr')
              setCategory(arr[0][5]) // cooresponds to category
  
              return (arr)
              
          } catch(e) {
              console.log(e)
          }
        }
        else{
          if (!override){
            setCategory('General')
          }
        }
      }
      // Retrieve user's preferred category
      getUserCategory()
      if(category){
          // API endpoint based on user's preferred category
          var targetURI = `https://popularnews.org/api/get_articles{}?category=${category}`
          axios
              .get(targetURI)
              .then((response) => response.data)
              .then((json) => {
              console.log('json', json);

              setData(json);
              })
              .catch((error) => {
              console.log(error);
              });
        }
      }
        },[isLoading,category]);

        
    // Return null while authentication state is still loading
    if(isLoading || !data){
      return(null)
    }


    // Consider passing prop containing article number,
    // first must filter articles array to contain only complete listings -
    // some by default are missing image or description is wrong etc. 
    return(
      <>
        <Container style={{minWidth:'100%', margin:0,padding:0, backgroundColor:'dimgray'}}>
          <Row className='justify-content-center' style={{paddingLeft:0,paddingRight:0,paddingBottom:10,margin:0}}>
              <Col xs='6' md='2' style={{textAlign:'center', margin:'0', fontSize:'20px', color:'white', padding:0}}>Article Category</Col>
              <Col xs='4' md='1' style={{textAlign:'center', margin:'0', fontSize:'20px', color:'white',padding:0}}>
                <Dropdown style={{padding:'0px', width:'fit-content', margin:'0', display:'inline-block'}}>
                  <Dropdown.Toggle style={{borderRadius:'0px,0px,15px,15px'}} className='inputBox' id='dropdown-basic'>
                    {category ? category : 'General'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item active={category === 'All'} onClick={() => {setCategory('All'); setOverride(true)}}>All</Dropdown.Item>
                    <Dropdown.Item active={category === 'Sports'} onClick={() => {setCategory('Sports'); setOverride(true)}}>Sports</Dropdown.Item>
                    <Dropdown.Item active={category === 'Business'} onClick={() => {setCategory('Business'); setOverride(true);}}>Business</Dropdown.Item>
                    <Dropdown.Item active={category === 'Entertainment'} onClick={() => {setCategory('Entertainment'); setOverride(true)}}>Entertainment</Dropdown.Item>
                    <Dropdown.Item active={category === 'General' || category === false} onClick={() => {setCategory('General'); setOverride(true)}}>General</Dropdown.Item>
                    <Dropdown.Item active={category === 'Health'} onClick={() => {setCategory('Health'); setOverride(true)}}>Health</Dropdown.Item>
                    <Dropdown.Item active={category === 'Science'} onClick={() => {setCategory('Science'); setOverride(true)}}>Science</Dropdown.Item>
                    <Dropdown.Item active={category === 'Technology'} onClick={() => {setCategory('Technology'); setOverride(true)}}>Technology</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs='4' md='2'></Col>
          </Row>
        </Container>
        
            
        <div className='row' id='header_row'>
          <div className='col-sm-3' style={{textAlign: 'center'}}/>

            <div className='col-sm-3' id='card_col'>
              <ShowNews data={data} number={0}/>   
              <ShowNews data={data} number={1}/>
              <ShowNews data={data} number={2}/>
              <ShowNews data={data} number={3}/>
              <ShowNews data={data} number={4}/>   
              <ShowNews data={data} number={5}/>
              <ShowNews data={data} number={6}/>
              <ShowNews data={data} number={7}/>
              <ShowNews data={data} number={8}/>   
              <ShowNews data={data} number={9}/>
              </div>

              <div className='col-sm-3' id='card_col'>
              <ShowNews data={data} number={10}/>
              <ShowNews data={data} number={11}/>
              <ShowNews data={data} number={12}/>
              <ShowNews data={data} number={13}/>
              <ShowNews data={data} number={14}/>
              <ShowNews data={data} number={15}/>
              <ShowNews data={data} number={16}/>
              <ShowNews data={data} number={17}/>
              <ShowNews data={data} number={18}/>
              <ShowNews data={data} number={19}/>
              </div>

            <div className='col-sm-3' style={{textAlign:'center'}}/>
        </div>
      </>
    )
}

export default CallNewsApi