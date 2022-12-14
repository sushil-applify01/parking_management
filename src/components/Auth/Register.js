import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API, config } from "../constants";
import makeToast from "../Toaster";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const organisationRef = useRef("");
  const [organisations, setOrganisations] = useState([]);
  const [number, setNumber] = useState();

  const getOrganisations = async () => {
    try {
      const res = await axios.get(API + "/api/user/all-organisations");
      setOrganisations(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrganisations();

    if (localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }, []);

  const registerAdmin = async (formData) => {
    try {
      const res = await axios.post(
        API + "/api/user/register",
        formData,
        config
      );

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
                    <div class="ltf-block-logo d-block d-lg-none text-center text-lg-start">
                      <img
                        width="120"
                        src="https://vetra.laborasyon.com/assets/images/logo.svg"
                        alt="logo"
                      />
                    </div>
                    <div class="my-5 text-center text-lg-start">
                      <h1 class="display-8">Create Account</h1>
                      <p class="text-muted">
                        You can create a free account now
                      </p>
                    </div>
                    <form class="mb-5">
                      <div class="mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter fullname"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autofocus
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="form-control"
                          placeholder="Enter email"
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
                      <div class="mb-3">
                        <input
                          type="number"
                          class="form-control"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          placeholder="Number"
                          autofocus
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          ref={organisationRef}
                          onChange={(e) => {
                            organisationRef.current = e.target.value;
                          }}
                        >
                          <option hidden>Select Organisation</option>
                          {organisations.length == 0 ? (
                            <option>No Organisations</option>
                          ) : (
                            organisations.map((item) => {
                              return (
                                <option value={item.organisation}>
                                  {item.organisation}
                                </option>
                              );
                            })
                          )}
                        </select>
                      </div>

                      <div class="text-center text-lg-start">
                        <button
                          class="btn btn-primary"
                          type="button"
                          onClick={() => {
                            registerAdmin({
                              name,
                              email,
                              password,
                              organisation: organisationRef.current,
                              number,
                            });
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                    <p class="text-center d-block d-lg-none mt-5 mt-lg-0">
                      Don't have an account? <a href="/">Sign In</a>.
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
                  <p class="lead my-5">Do you already have an account?</p>
                  <a href="/" class="btn btn-primary">
                    Sign In
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

export default Register;
