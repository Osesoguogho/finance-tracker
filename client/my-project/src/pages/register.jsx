import  { useState } from "react";
import { Link, redirect } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });
  const[error, setError] = useState("");


  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const {email} = inputs;
const purseInputs = {email: email, purse_balance: 0};

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiUrl}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(inputs)
        }
      );
      const purse = await fetch(
        `${apiUrl}/api/purse`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(purseInputs)
        }
      );
    
      const parseRes = await response.json();
      const purseRes = await purse.json();

      if (parseRes.status === "success" || purseRes.status === "success") {
        setAuth(true);
        toast.success("Register Successfully");
        alert("registration successful");
      } else {
        setAuth(true);
        toast.error(parseRes);
        throw new error("Registration fail")
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center content-center  h-dvh ">
    <div className=" container m-auto flex flex-col w-80 h-80 border-slate-500 rounded-lg shadow-white-900  ">
      <h1 className="mt-5 text-center font-bold text-2xl">Register</h1>
      <form onSubmit={onSubmitForm} className="flex flex-col">
        <input
          type="text"
          name="email"
          value={inputs.email}
          placeholder="email"
          onChange={e => onChange(e)}
          className=" my-3 rounded-lg text-center"
        />
        <input
          type="password"
          name="password"
          value={inputs.password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3 rounded-lg text-center"
        />
        <input
          type="text"
          name="name"
          value={inputs.name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="form-control my-3 rounded-lg text-center"
        />
        <button className="bg-green-400 my-5">Submit</button>
      </form>
      {error && <p> {error}</p>}
      <Link to="/login" className="bg-blue-400 text-center my-5">login</Link>
    </div>
    <ToastContainer/>
    </div>
  );
};

export default Register;
