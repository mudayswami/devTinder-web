import { useSelector } from "react-redux";
import store from "../utils/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
const Navbar = ()=>{

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate("/login");
    }catch(err){

    }

  }
    return (<>

<div className="navbar bg-base-100">
<div className="flex-1">
  <Link to="/" className="btn btn-ghost text-xl">devTinder</Link>
</div>
<div className="flex-none gap-2">
  {user && 
  <div className="dropdown dropdown-end flex">
    <p className="md:w-auto self-center" >Welcome {user.firstName}</p>
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-4">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <Link to="/profile" className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li>
        <Link to="/connections" className="justify-between">
          Connections
        </Link>
      </li>
      <li>
        <Link to="/requests/received" className="justify-between">
          Request Received
        </Link>
      </li>
      <li><a>Settings</a></li>
      <li><a onClick={handleLogout}>Logout</a></li>
    </ul>
  </div>}
</div>
</div>
    </>)
}

export default Navbar;