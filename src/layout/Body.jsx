import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector , useDispatch} from 'react-redux';
import store from "../utils/store";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {addUser} from "../utils/userSlice";
const Body = () => {
    const user = useSelector((store) =>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!user){
            const response = async () =>{
                try{
                    const res = await axios.get(BASE_URL+"/profile",{withCredentials:true});
                    dispatch(addUser(res.data));
                    
                }catch(err){
                    console.log("redirecting to login");
                    if(err.status == 401){
                        return navigate("/login");
                    }
                }
            }
            response();
        }
    },[])
    return (
        <>
        <div>
            <Navbar />
            <Outlet/>
        </div>
        </>
    )
}
export default Body;