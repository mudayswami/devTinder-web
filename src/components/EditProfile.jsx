import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import  {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";

const EditProfile = ({ user }) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [toast, setToast] = useState(false);
  
  const dispatch = useDispatch();
  

  const handleSave = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/user", { _id: user._id, firstName, lastName, age, gender, about, skills, photoUrl }, { withCredentials: true });
      dispatch(addUser(res.data));
      setToast(true);
      setTimeout(()=>{
        setToast(false);
      },3000);
    } catch (err) {
      console.log(err.message);
    }
  }


  return (user &&
    <div>
      <div className='flex justify-evenly '>
        <div className="card bg-base-300 w-96 shadow-xl flex p-2 flex h-full p-8">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">First Name: </span>
            </div>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Type here" className="input input-bordered w-full my-2" />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Last Name: </span>
            </div>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Type here" className="input input-bordered w-full my-2" />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">PhotoUrl</span>
            </div>
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Type here" className="input input-bordered w-full my-2" />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text"> Age</span>
            </div>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Type here" className="input input-bordered w-full my-2" />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Type here" className="input input-bordered w-full my-2" />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <textarea className="textarea" onChange={(e) => setAbout(e.target.value)} placeholder="Bio" value={about}></textarea>
          </label>
          <button className="btn btn-primary mt-4" onClick={handleSave}>Save</button>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about, skills }} />
      </div>
      {toast &&
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span> Profile Updated Successfully </span>
          </div>
        </div>}
    </div>
  )
}

export default EditProfile;