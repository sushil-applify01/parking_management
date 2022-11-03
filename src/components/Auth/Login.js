import axios from "axios";
import React, { useEffect, useState } from "react";
import { API, config } from "../constants";
import makeToast from "../Toaster";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }, []);

  const loginUser = async (formData) => {
    try {
      const res = await axios.post(API + "/api/admin/login", formData, config);
      if (res.data.statusCode == 200) {
        makeToast("success", res.data.message);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";
      } else {
        makeToast("error", res.data.message);
      }
    } catch (error) {
      makeToast("error", error.message);
    }
  };

  return (
    <body className="auth">
      <div class="form-wrapper">
        <div class="container">
          <div class="card">
            <div class="row g-0">
              <div class="col">
                <div class="row">
                  <div class="col-md-10 offset-md-1">
                    <div class="d-block d-lg-none text-center text-lg-start">
                      <img
                        width="120"
                        src="https://vetra.laborasyon.com/assets/images/logo.svg"
                        alt="logo"
                      />
                    </div>
                    <div class="my-5 text-center text-lg-start">
                      <h1 class="display-8">Sign In</h1>
                      <p class="text-muted">Sign in to Vetra to continue</p>
                    </div>
                    <form class="mb-5">
                      <div class="mb-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="form-control"
                          placeholder="Enter email"
                          autofocus
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          class="form-control"
                          placeholder="Enter password"
                          required
                        />
                      </div>
                      <div class="text-center text-lg-start">
                        <button
                          class="btn btn-primary"
                          type="button"
                          onClick={() => {
                            loginUser({ email, password });
                          }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <p class="text-center d-block d-lg-none mt-5 mt-lg-0">
                      Don't have an account? <a href="/register">Sign up</a>.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col d-none d-lg-flex border-start align-items-center justify-content-between flex-column text-center">
                <div class="logo">
                  <img
                    width="120"
                    src="https://vetra.laborasyon.com/assets/images/logo.svg"
                    alt="logo"
                  />
                </div>
                <div>
                  <h3 class="fw-bold">Welcome to Vetra Parkings!</h3>
                  <p class="lead my-5">
                    If you don't have an account, would you like to register
                    right now?
                  </p>
                  <a href="/register" class="btn btn-primary">
                    Sign Up
                  </a>
                </div>
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
