/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [user, setuser] = useState();
  const nav = useNavigate();
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const res = axios
      .get("http://localhost:5050/api/v1/user/data", {
        headers: {
          Authorization: authToken,
        },
      })
      .then((res) => {
        const name = res.data.userdata.firstName[0];

        setuser(name);
        console.log(name);
      });
  }, [authToken, nav]);
  return (
    <div className=" w-screen h-[60px] bg-white flex justify-between border-b-2 items-center px-8">
      <h1 className=" capitalize text-xl font-[500]">paytm app</h1>

      <div className=" flex  items-center justify-center gap-3">
        <h2>Hello</h2>
        <div className=" w-[40px] h-[40px] rounded-[50%] capitalize bg-slate-400 flex  items-center justify-center">
          {user}
        </div>
        <button
          className=" capitalize text-xl text-white px-5 py-1 bg-black"
          onClick={() => {
            localStorage.removeItem("token");
            nav("/singin");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
