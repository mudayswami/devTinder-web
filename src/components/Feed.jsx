import React, { useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from "react-redux"
import store from "../utils/store";
import UserCard from "./UserCard";
import { addFeed, removeFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();
  const getFeed = async () => {
    if(feed)return;
    try {
      const res = await axios.post(BASE_URL + "/user/feed", {}, { withCredentials: true });
      console.log(res.data);
      dispatch(addFeed(res.data));
      
    } catch (err) {
      console.error(err);
    };
  }


  useEffect(() => {
    getFeed();
  }, []);
if(feed && feed.length == 0) return(<h1 className='text-center '>You've caught all the people</h1>)
  return (
    feed && (<div className="flex justify-center mt-8">
      <UserCard user={feed[0]} />
    </div>)
  )
}

export default Feed