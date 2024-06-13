/* eslint-disable no-unused-vars */
import { useState } from "react";
import Bottomwaring from "../components/Bottomwaring";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Singin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const nav = useNavigate();
  return (
    <div className=" bg-slate-500 w-screen h-screen flex flex-col justify-center items-center">
      <form>
        <div className=" bg-slate-300 w-[320px] h-[360px] rounded-md px-3 py-2 overflow-hidden">
          <Heading heading={"singin"} />
          <Subheading Subheading={"enter your information  account"} />

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
            label={"singin"}
            onClick={() => {
              const ress = axios
                .post("http://localhost:5050/api/v1/user/singin", {
                  username: username,
                  password: password,
                })
                .then((ress) => {
                  if (!ress.data.err && ress.data.token) {
                    console.log("yes your login");
                    localStorage.setItem(
                      "token",
                      "Bearer" + " " + ress.data.token
                    );
                    nav("/dashboad");
                  } else {
                    console.log("you not login");
                    nav("/singin");
                    alert(ress.data.message);
                  }
                });
            }}
          />
          <Bottomwaring lable={"dont have account?"} type={"singup"} />
        </div>
      </form>
    </div>
  );
}

export default Singin;
