/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
function Navbar() {
  const [user, setuser] = useState();
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
  }, []);
  return (
    <div className=" w-screen h-[60px] bg-white flex justify-between border-b-2 items-center p-4">
      <h1 className=" capitalize text-xl font-[500]">paytm app</h1>
      <div className=" flex  items-center justify-center gap-2">
        <h2>Hello</h2>
        <div className=" w-[40px] h-[40px] rounded-[50%] capitalize bg-slate-400 flex  items-center justify-center">
          {user}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
