/* eslint-disable no-unused-vars */
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import axios from "axios";

function Dashboad() {
  return (
    <div className=" overflow-x-hidden overflow-y-auto">
      <Navbar />
      <div className="px-10 py-3">
        <Balance value={"5000"} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboad;
