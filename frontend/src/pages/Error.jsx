import { Link } from "react-router-dom";

function Error() {
  return (
    <div className=" bg-slate-400 h-screen w-screen flex flex-col items-center justify-center">
      <h2 className=" text-9xl text-black tracking-wide font-semibold">404</h2>
      <p className="m-3 text-2xl">the page you trying to access is not there</p>
      <Link
        to={"/singup"}
        className=" m-1 text-2xl border-2 border-black px-5 py-1 "
      >
        <p>Back</p>
      </Link>
    </div>
  );
}

export default Error;
