import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function Balance({ value }) {
  const [balance, setbalance] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const res = axios
      .get("http://localhost:5050/api/v1/account/balance", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const money = res.data.balance;
        setbalance(Math.floor(money));
      });
  }, []);
  return (
    <div className="flex my-6">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
    </div>
  );
}

export default Balance;
