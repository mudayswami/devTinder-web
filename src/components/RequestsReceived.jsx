import React, {useEffect} from 'react'
import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { useDispatch ,useSelector} from 'react-redux';
import {addRequests,removeRequest} from "../utils/requestsSlice";

const RequestsReceived = () => {
  
  const requests = async () =>{
      const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
      console.log(res);
      dispatch(addRequests(res.data))
    }
  
  const reviewRequest = async (e, status, id) => {
    try{const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+id , {}, {withCredentials:true});
      e.target.parentNode.parentNode.remove();
      dispatch(removeRequest(id)); 
    }catch(err){
      console.log(err.message);
    }
  };
  const dispatch = useDispatch();
  const requestsStore = useSelector((store) => store.requests);

    useEffect(() => {
      requests();
    },[])
    if(!requestsStore)return (<h3 className='text-center'>No Requests Received</h3>)
  return (requestsStore &&
    <div className='flex justify-center'>
      {
        requestsStore.map((user) =>{
          const {firstName, lastName, age, gender , skills, photoUrl, about } = user.fromUserId; 
          return (<div className='flex m-4 p-4 rounded-lg bg-base-300 ' key={user._id}>
            <div className="avatar">
                <div className="w-24 rounded-xl mr-8">
                    <img src={photoUrl} />
                </div>
            </div>
            <div>
            <h2 className="card-title">{firstName+ " "+lastName}</h2>
            <p>{age+", "+gender} </p>
            <p className='py-4 font-bold'>{about} </p>
            </div>
            <div className='flex flex-col justify-evenly ml-4 h-full'>
              <button className='my-2 btn btn-primary'onClick={(e)=>reviewRequest(e,"rejected",user._id)} >Reject</button>
              <button className='my-2 btn btn-secondary' onClick={(e)=>reviewRequest(e,"accepted",user._id)}>Accept</button>
            </div>
        </div>)
        })
      }
    </div>
  )
}

export default RequestsReceived