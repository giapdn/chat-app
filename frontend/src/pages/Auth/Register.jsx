import { useState } from "react";
import axiosInstance from "../../shared/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  //form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //navigate để chuyển hướng
  const navigate = useNavigate();

  //hiển thị lỗi
  const [err, setErr] = useState("");

  //handle khi submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setErr("Please fill all the fields");
    } else {
      await axiosInstance
        .post("/api/v1/auth/register", {
          name: name,
          email: email,
          password: password,
        })
        .then((result) => {
          console.log(result);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center vh-100">
      <form action="" className="w-50 rounded bg p-4 bg-success">
        <div className="d-flex justify-content-end">
          <h2>Register</h2>
        </div>
        <small className="text-danger">{err}</small>
        <div className="form-group">
          <label htmlFor="inputName">Your Name:</label>
          <input
            value={name}
            onChange={(n) => {
              setName(n.target.value);
            }}
            autoFocus
            className="form-control"
            type="text"
            id="inputName"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email:</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
          Register
        </button>
        <div className="d-flex justify-content-end">
          <small>
            Have an account ? <Link to={"/login"}>Login</Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Register;
