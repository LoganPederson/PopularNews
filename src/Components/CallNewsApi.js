import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowNews from './ShowNews';
import { useAuth0 } from '@auth0/auth0-react';
import apiKey from './local_settings.js';

const CallNewsApi = () => {
    // State to hold API response data
    const [data, setData] = useState(false);
    // State to hold user's preferred news category
    const [category, setCategory] = useState(false)

    // Use Auth0 hook to access user authentication state
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    const { isLoading } = useAuth0();

    // Function to retrieve user's preferred category from API
    

    // Effect hook to handle API request and set data state
    useEffect(() => {
    if(!isLoading){
      const getUserCategory = async () => {
        if(isAuthenticated){
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
          setCategory('general')
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
        <div className='row' id='header_row'>
          <div className='col-sm-3'/>
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
          <div className='col-sm-3'/>
          </div>
    )
}

export default CallNewsApi