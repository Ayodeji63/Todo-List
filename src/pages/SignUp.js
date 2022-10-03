import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import {useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const SignUp = () => {
  const {createUser, signWithGoogle} = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(data.email, data.password)
      navigate('/todoPage')
    } catch(e) {
      alert(e.message)
    }
  };

  const withGoogle = async () => {
    try {
      await signWithGoogle()
      navigate('/todoPage')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="Sign">
      <div className="sign-in">
        <div className="google" onClick={withGoogle}>
          <img src="../googicon.webp" alt="" width={35} />
          <p className="ml-2">Sign Up with Gmail</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="input-div">
            <label className="mt-6">Full Name</label>
            <input
            placeholder="Full Name"
            name="fullname"
            type="name"
            value={data.fullname}
            className="input-fields"
            onChange={(event) => handleInputs(event)}
            />
          </div>

          <div className="input-div">
            <label className="label">Email</label>
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={data.email}
              className="input-fields"
              onChange={(event) => handleInputs(event)}
            />
          </div>

          <div className="input-div">
            <label className="label">Password</label>
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={data.password}
              className="input-fields"
              onChange={(event) => handleInputs(event)}
            />
          </div>

          <Button text={"Sign Up"} className={"sign-btn"} click = {handleSubmit} />
        </form>

       <div className="link">
       <p>Already have an account ?</p>
        <Link to={"/sign"}>
          <p className="cursor-pointer  text-[#c058f3] ml-2"> Sign-In</p>
        </Link>
       </div>
      </div>
    </div>
  );
};

export default SignUp;
