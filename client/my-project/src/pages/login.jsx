import { Link, redirect, useNavigate } from "react-router-dom";
import {useState} from "react";

import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiUrl}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(inputs)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        toast.error(parseRes);
        throw new Error( "Email or password incorrect")
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message)
    }
  };

  return (
    <div className="flex justify-center content-center  h-dvh ">
    <div className=" container m-auto flex flex-col w-80 h-80 border-slate-500 rounded-lg shadow-white-900  "
    >
      <ToastContainer/>
      <h1 className="mt-5 text-center text-3xl">Login</h1>
      <form onSubmit={onSubmitForm} className="flex flex-col">
        <input
          type="text"
          name="email"
          placeholder="email"
          value={inputs.email}
          onChange={e => onChange(e)}
          // style={{border: "2px solid black", margin: "2.5rem", borderRadius: "10px", padding: "5px", textAlign: "center"
          // }}
          className="my-4 rounded-lg text-center"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={inputs.password}
          onChange={e => onChange(e)}
          // style={{border: "2px solid black", margin: "2.5rem", borderRadius: "10px", padding: "5px", textAlign: "center"
          // }}
          className="rounded-lg text-center"
        />
        <button className="bg-green-400 my-5">Submit</button>
      </form>
      {error && <p>{error}</p>}
      <Link className="bg-blue-400 text-center my-5" to="/register">register</Link>
    </div>
    </div>
  );
};

export default Login;
