/* eslint-disable no-unused-vars */
import { useState } from "react";
import Bottomwaring from "../components/Bottomwaring";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Singup() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlasttname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [dir, setdir] = useState();
  const nav = useNavigate();
  return (
    <div className=" bg-slate-500 w-screen h-screen flex flex-col justify-center items-center">
      <div className=" bg-slate-300 w-[320px] h-[520px] rounded-md px-3 py-2 overflow-hidden">
        <Heading heading={"singup"} />
        <Subheading
          Subheading={"enter your information to create an account"}
        />
        <Input
          input={"first name"}
          placeholder={"john"}
          type={"text"}
          onChange={(e) => {
            setfirstname(e.target.value);
          }}
        />
        <Input
          input={"last name"}
          placeholder={"doe"}
          type={"text"}
          onChange={(e) => {
            setlasttname(e.target.value);
          }}
        />
        <Input
          input={"username"}
          placeholder={"jhon@gmail.com"}
          type={"email"}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <Input
          input={"password"}
          placeholder={"password"}
          type={"password"}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <Button
          label={"singup"}
          onClick={() => {
            const res = axios
              .post("http://localhost:5050/api/v1/user/singup", {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
              })
              .then((res) => {
                setdir(res.data.err);
                if (!dir) return nav("/singin");
              });
          }}
        />
        <Bottomwaring lable={"aleady have an account?"} type={"singin"} />
      </div>
    </div>
  );
}

export default Singup;
