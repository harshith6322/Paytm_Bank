/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]); // This should be an array
  const [searchTerm, setSearchTerm] = useState(""); // Separate state for search term
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const res = axios
      .get(`http://localhost:5050/api/v1/user/bulk?filter=${searchTerm}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((res) => setUsers(res.data.user));
  }, [searchTerm, authToken]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  const nav = useNavigate();
  const id = useSearchParams();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-11 w-11 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>{user.firstName}</div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          label={"Send Money"}
          onClick={() => {
            nav("/send?id=" + user._id + "&name=" + user.firstName);
          }}
        />
      </div>
    </div>
  );
}

export default Users;
