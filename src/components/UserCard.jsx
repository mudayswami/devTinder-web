import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import {addFeed, removeFeed} from "../utils/feedSlice";
import { useDispatch } from 'react-redux';

const UserCard = ({ user }) => {
      const dispatch = useDispatch();

    const handleRequest = (status, userId) =>{
        try{
          const res = axios.post(BASE_URL + "/request/send/" + status +"/"+ userId , {}, {withCredentials:true});
          console.log(res);
          dispatch(removeFeed(userId));
        }catch(err){
          console.log(err.message);
        }
      }
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img className=''
                    src={user?.photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
                <p>{user.about}</p>
                <p>{user.age + ", " + user.gender}</p>
                <div className="card-actions justify-end">
                </div>
                <div className='flex justify-between'>
                    <button className="btn btn-circle btn-outline" onClick={() => handleRequest("ignored",user._id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button className="btn btn-circle btn-outline bg-base-200" onClick={() =>handleRequest("interested",user._id)}>
                        <svg fill="#ff00ae" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 471.701 471.701" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path> </g> </g></svg>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default UserCard