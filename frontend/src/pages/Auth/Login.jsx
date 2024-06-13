import { useState } from "react";
import axiosInstance from "../../shared/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setErr("Please fill all the fields");
    } else {
      await axiosInstance
        .post("/auth/login", {
          email: email,
          password: password,
        })
        .then(() => {
          navigate("/chat");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center vh-100">
      <form className="w-50 rounded bg p-4 bg-success">
        <div className="d-flex justify-content-end">
          <h2>Login</h2>
        </div>
        <small className="form-text text-danger">{err}</small>
        <div className="form-group">
          <label htmlFor="inputEmail">Email:</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoFocus
            className="form-control"
            type="email"
            id="inputEmail"
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password:</label>
          <input
            value={password}
            onChange={(p) => setPassword(p.target.value)}
            className="form-control"
            type="password"
            id="inputEmail"
            placeholder="Your Password"
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Login
        </button>
        <div className="d-flex justify-content-end">
          <small>
            Dont have an account ? <Link to={"/register"}>Register</Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
