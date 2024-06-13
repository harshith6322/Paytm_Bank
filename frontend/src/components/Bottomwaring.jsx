/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Bottomwaring({ lable, type }) {
  return (
    <div className=" text-center my-2 capitalize font-normal text-[16px]">
      {lable}
      <Link to={`/${type}`} className=" underline font-medium pl-2">
        {type}
      </Link>
    </div>
  );
}

export default Bottomwaring;
