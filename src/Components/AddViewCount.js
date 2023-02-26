import { useEffect, useState} from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";





function AddViewCount() {
    const { isLoading } = useAuth0();
    const [done, setDone] = useState(false)
    const addViewCount = async()=>{
        try{
            let targetURI = `http://localhost:8000/api/add_visit_count{}`
            let res = await axios.post(targetURI);
            let arr = res.data;
            
            return (arr)
            
        } catch(e) {
            console.log(e)
        }
}
    if(!done){
        addViewCount()
        setDone(true)
    }

    return(null)
}

export default AddViewCount;