import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../utils/constants";
const Login = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    useEffect(() => {
        if (user) {
            return navigate("/");
        }
    }, [user])

    const [emailId, setEmailId] = useState("Meher@gmail.com");
    const [password, setPassword] = useState("Meher@123");
    const [err, setErr] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [gender, setGender] = useState("");
    const dispatch = useDispatch();
    const signIn = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", { email: emailId, password }, { withCredentials: true });
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setErr(err.response.data);
        }
    }

    const signUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName: firstName, lastName: lastName, age: age, emailId, password, gender })
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setErr(err.response.data);
        }
    }
    return (
        <div className=" h-full w-full bg-pink-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 justify-center items-center h-screen flex"><div className="card bg-base-100 w-96 shadow-xl  ">
            <h1 className="m-4 font-bold text-center text-xl">{isSignup ? "Sign Up" : "Login"}</h1>
            <div className="card-body">
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" onChange={(e) => { setEmailId(e.target.value) }} />
                </label>

                {isSignup && (<><label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="First Name" onChange={(e) => { setFirstName(e.target.value) }} />
                </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="Number" className="grow" placeholder="Age" onChange={(e) => { setAge(e.target.value) }} />
                    </label>
                    <div className="form-control">
                    </div>
                    <div className="form-control">
                        <span className="badge">Gender</span>
                        <label className="label cursor-pointer">
                            <span className="label-text">Female</span>
                            <input type="radio" name="gender" className="radio checked:bg-red-500" onClick={() => setGender("male")} />
                            <span className="label-text">Male</span>
                            <input type="radio" name="gender" className="radio checked:bg-blue-500" onClick={() => setGender("female")} />
                        </label>
                    </div>
                </>)}

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <p className="text-red-700" >{err}</p>
                <button className="btn" onClick={isSignup ? signUp : signIn}>{isSignup ? "Sign Up" : "Login"}</button>

                {!isSignup ? (<p className="underline mt-4" onClick={() => setIsSignup(true)}>Don't have account? SignUp</p>)
                    : (<p className="underline mt-4" onClick={() => setIsSignup(false)}>Already have an account? Login</p>)
                }
            </div>
        </div>
        </div>
    )
}

export default Login;