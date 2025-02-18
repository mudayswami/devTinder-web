import React, { useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import connection from '../utils/connectionsSlice';

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    const func = async () => {
        const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
        dispatch(addConnections(res.data));
    }

    useEffect(() => {
        func();
    }, [])
    return (connections && <div className='flex flex-col items-center'>
        {connections.map((connection) => {
            console.log(connection);
            const {firstName , lastName, age, gender, about, photoUrl} = connection;
            return (<div className='flex m-4 p-4 rounded-lg bg-base-300 w-2/4' key={connection._id}>
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
            </div>);
        })}
    </div >
    )
}

export default Connections