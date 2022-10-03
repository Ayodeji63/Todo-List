import React from "react";
import Header from "../components/Header";
import { Fade } from "react-reveal";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="Landing">
      <div className="header">
        <h1 className="text-3xl font-bold">UltiToDO</h1>
        <div className="Btn-div">
          <Link to="/sign">
            <Button text="Sign In" />
          </Link>
          <Link to={"/get-started"}>
            <Button text={"Get Started"} className="signUp" />
          </Link>
        </div>
      </div>

      <div className="Hero transform-50">
        <Fade top>
          <h1>Organise your work and life, finally.</h1>
        </Fade>
        <p>
          Organize your work and life, finally. Become focused, organized, and
          calm with UltiTodo. The world’s #1 task manager and to-do list app.
        </p>
        <Fade bottom>
          <Link to={"/get-started"}>
            <Button text={"Get Started"} className="signUp" />
          </Link>
        </Fade>
      </div>
    </div>
  );
};

export default Landing;
