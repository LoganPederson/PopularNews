import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'


// We want to check the database to see if user preferences already exist
// if not, add the user to table with default preferences
// if so, pass the preferences to ShowNews

const UserSettings = () => {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    const { isLoading } = useAuth0();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    //const [email, setEmail] = useState('')
    const [data, setData] = useState(null)
    const [dataLoading, setLoading] = useState(true)

    // Check if user already in users table, if not: add them to table with default settings
    // return sql querry results ie: [null,null,null,{email},null,null,{category}]
    const fetchTable=async (email) =>{
        try{
            let targetURI = `http://localhost:8000/user{}?email=${email}`
            let res = await axios.get(targetURI);
            let arr = res.data;
            setData(JSON.stringify(arr));
            setLoading(false)
            if(arr.length === 0){ // If no user found, returns array length 0
                addUser(user.email) // adds user and sets default category of 'Any'
            }
            return (arr)
            
        } catch(e) {
            console.log(e)
        }
    }
    // User was not found in users table, thus we add them 
    const addUser = async (email) => {
        try{
            let targetURI = `http://localhost:8000/add_user{}?email=${email}`
            let res = await axios.post(targetURI);
            let arr = res.data;
            return (arr)
            
        } catch(e) {
            console.log(e)
        }
    }


    useEffect(()=>{
        if(!isLoading && isAuthenticated){
            fetchTable(user.email)
        }
    },[isLoading]);
    
    return (
        null
        )
}

export default UserSettings