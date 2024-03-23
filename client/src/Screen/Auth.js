import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import among from "../Images/img1.jpg";
import logo from "../Images/logo-temp10.png";
import { motion, useInView } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useAuth } from "../Components/AuthContext";

const Auth = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    c_password: "",
  });
  const { setAuthToken } = useAuth();
  const [logUserusername, setLogUserUsername] = useState("");
  const [logUserpassword, setLogUserPassword] = useState("");
  let name, value;
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true });
  const toggleForm = () => {
    setShowSignUp(!showSignUp);
    setShowLogin(!showLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username: logUserusername,
        password: logUserpassword,
      });
      // console.log(res.headers["set-cookie"].value)
      const token=res.data.token
      localStorage.setItem('token', token) 
    
      if (res.status === 200) {
        setAuthToken(token)
        navigate("/home");
        setIsLoggedIn(true);
        
        return toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      return (
        toast.error("Something went wrong. Please try again later"),
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };
  
  const handleChange = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      if (user.password !== user.c_password) {
        // return alert(
        //   "Password and Confirm Password are different. Please Enter same password to proceed"
        // );
        return toast.warning("Please Enter same password to proceed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        const res = await axios.post("http://localhost:8000/auth/register", {
          email: user.email,
          username: user.username,
          password: user.password,
        });

        if (res.status === 202) {
          return toast.success(
            "Registration Successful. Please Login to continue",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        } else if (res.status === 500) {
          return toast.error("Something went wrong. Please try again later", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } catch (error) {
      return toast.error("Something went wrong. Please try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <GrandContainer>
        <Container
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.25s",
          }}
        >
          {showLogin ? (
            <Login>
              <div className="loginComp">
                <div className="info">
                  <div className="form">
                    <div className="logo">
                      <img src={logo} alt="" />
                      <div className="text">
                        <div className="up-text">Algolisted</div>
                      </div>
                    </div>
                    <form method="POST" onSubmit={handleSubmit}>
                      <div>
                        <h1>Welcome Back!</h1>
                        <h6>Please log into your account.</h6>
                      </div>
                      <input
                        type="text"
                        placeholder="username"
                        onChange={(e) => setLogUserUsername(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder=" password"
                        onChange={(e) => setLogUserPassword(e.target.value)}
                      />
                      <div className="options">
                        <div className="check">
                          <input type="checkbox" name="" id="" />
                          <label>Remember me</label>
                        </div>
                        <p>Forgot Password</p>
                      </div>
                      <div className="btt">
                        <button className="btn">Log In</button>

                        <p>OR</p>
                        <button className="btn" onClick={toggleForm}>
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="image"></div>
              </div>
              <ToastContainer />
            </Login>
          ) : null}
          {showSignUp ? (
            <SignUp>
              <div className="loginComp">
                <div className="image"></div>
                <div className="info">
                  <div className="form">
                    <div className="logo">
                      <img src={logo} alt="" />
                      <div className="text">
                        <div className="up-text">Algolisted</div>
                      </div>
                    </div>
                    <form method="POST" onSubmit={handleRegister}>
                      <div>
                        <h1>Welcome !!</h1>
                        <h6>Please Enter following details to join us.</h6>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        placeholder="Username"
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        name="c_password"
                        value={user.c_password}
                        placeholder="Confirm password"
                        onChange={handleChange}
                      />

                      <div className="btt">
                        <button className="btn">Regsiter</button>
                        <p>OR</p>
                        <button className="btn" onClick={toggleForm}>
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </SignUp>
          ) : null}
        </Container>
      </GrandContainer>
    </>
  );
};

export default Auth;

const GrandContainer = styled.div`
  margin: 0;
  padding: 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #f5f5f5;
  border: 1px solid #093e3d;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  border-radius: 10px;
  width: 50vw;

  .loginComp {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .info {
      .form {
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          /* border: 1px solid black; */
          height: 100%;
          padding: 5px 0;

          img {
            height: 40px;
            border-radius: 4px;
            margin-right: 10px;
          }

          .text {
            .up-text {
              font-size: 1.75rem;
              font-weight: 500;
            }
            .down-text {
              font-size: 0.7rem;
              font-weight: 200;
            }
          }
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: start;
          padding: 20px;
          margin: 20px;
          input {
            padding: 10px;
            border-radius: 10px;
            border: none;
          }
          h1 {
            background-color: #f3ec78;
            background-image: linear-gradient(92deg, #0066ff, #5dff00);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent;
            -moz-text-fill-color: transparent;
          }
          h6 {
            color: #093e3d;
          }
          .options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
            p {
              color: red;
            }
            .check {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .btt {
            display: flex;
            flex-direction: column;
            gap: 10px;
            p {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .btn {
              background: linear-gradient(270deg, #56f238, #c5c5ef, #56f238);
              background-size: 400% 400%;
              width: 100%;
              border-radius: 25px;
              -webkit-animation: AnimationName 10s ease infinite;
              -moz-animation: AnimationName 10s ease infinite;
              animation: AnimationName 10s ease infinite;
              border-color: transparent;
              color: #333;
              cursor: pointer;
              font-size: 0.8rem;
              padding: 10px 15px;
              margin: auto;
            }

            @-webkit-keyframes AnimationName {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            @-moz-keyframes AnimationName {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            @keyframes AnimationName {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          }
        }
      }
    }

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(${among});
      height: 80vh;
      width: 100%;
      object-fit: contain;

      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 0 5px 5px 0;
    }
  }
`;
const SignUp = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #f5f5f5;
  border: 1px solid #093e3d;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  border-radius: 10px;
  width: 50vw;

  .loginComp {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .info {
      .form {
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          /* border: 1px solid black; */
          height: 100%;
          padding: 5px 0;

          img {
            height: 40px;
            border-radius: 4px;
            margin-right: 10px;
          }

          .text {
            .up-text {
              font-size: 1.75rem;
              font-weight: 500;
            }
            .down-text {
              font-size: 0.7rem;
              font-weight: 200;
            }
          }
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: start;
          padding: 20px;
          margin: 20px;
          input {
            padding: 10px;
            border-radius: 10px;
            border: none;
          }
          h1 {
            background-color: #f3ec78;
            background-image: linear-gradient(92deg, #0066ff, #5dff00);
            background-size: 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent;
            -moz-text-fill-color: transparent;
          }
          h6 {
            color: #093e3d;
          }
          .options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
            p {
              color: red;
            }
            .check {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .btt {
            display: flex;
            flex-direction: column;
            gap: 10px;
            p {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .btn {
              background: linear-gradient(270deg, #56f238, #c5c5ef, #56f238);
              background-size: 400% 400%;
              width: 100%;
              border-radius: 25px;
              -webkit-animation: AnimationName 10s ease infinite;
              -moz-animation: AnimationName 10s ease infinite;
              animation: AnimationName 10s ease infinite;
              border-color: transparent;
              color: #333;
              cursor: pointer;
              font-size: 0.8rem;
              padding: 10px 15px;
              margin: auto;
            }

            @-webkit-keyframes AnimationName {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            @-moz-keyframes AnimationName {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            @keyframes AnimationName {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          }
        }
      }
    }

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(${among});
      height: 85vh;
      width: 100%;
      object-fit: contain;

      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 5px 0 0 5px;
    }
  }
`;
