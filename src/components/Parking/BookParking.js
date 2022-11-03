import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API, authConfig } from "../constants";
import Sidebar from "../Sidebar/Sidebar";
import makeToast from "../Toaster";

const BookParking = () => {
  const [parkings, setParkings] = useState([]);
  const categoryRef = useRef("");
  const [categories, setCategories] = useState([]);
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [fees, setFees] = useState();

  const getCategoriess = async () => {
    try {
      const res = await axios.get(API + "/api/user/all-categories", authConfig);
      setCategories(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCategoriess();
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const bookSlot = async (formData) => {
    try {
      makeToast("", "Please wait while your requst is Processing...");
      const res = await axios.post(
        API + "/api/user/create-booking",
        formData,
        authConfig
      );
      if (res.data.statusCode == 200) {
        window.location.href = res.data.link;
      } else {
        makeToast("error", res.data.message);
      }
    } catch (error) {
      makeToast("error", error.message);
    }
  };

  return (
    <body>
      <Sidebar name="Parking" />
      <div class="layout-wrapper">
        <div class="header">
          <div class="menu-toggle-btn">
            <a href="#">
              <i class="bi bi-list"></i>
            </a>
          </div>
          <a href="index.html" class="logo">
            <img
              width="100"
              src="https://vetra.laborasyon.com/assets/images/logo.svg"
              alt="logo"
            />
          </a>
          <div class="page-title">Book Parking</div>

          <div class="header-bar ms-auto">
            <ul class="navbar-nav justify-content-end">
              <li class="nav-item ms-3"></li>
            </ul>
          </div>
          <div class="header-mobile-buttons">
            <a href="#" class="search-bar-btn">
              <i class="bi bi-search"></i>
            </a>
            <a href="#" class="actions-btn">
              <i class="bi bi-three-dots"></i>
            </a>
          </div>
        </div>

        <div class="content ">
          <div class="mb-4">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                  Book Parking
                </li>
              </ol>
            </nav>
          </div>

          <div class="card">
            <div style={{ padding: 20 }}>
              <form class="row g-3">
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Vehicle Category
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    ref={categoryRef}
                    onChange={(e) => {
                      categoryRef.current = e.target.value;
                      setFees(
                        categories.map((item) => {
                          if (item.name == e.target.value) {
                            return item.fees;
                          }
                        })
                      );
                    }}
                  >
                    <option hidden>Select Categories</option>
                    {categories.length == 0 ? (
                      <option>No Categories</option>
                    ) : (
                      categories.map((item) => {
                        return <option value={item.name}>{item.name}</option>;
                      })
                    )}
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">
                    Model
                  </label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputAddress" class="form-label">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    class="form-control"
                    id="inputAddress"
                    placeholder="RJ13 XXXX"
                  />
                </div>
                <div class="col-md-6"></div>
                <div class="col-md-3">
                  <label for="inputCity" class="form-label">
                    Book Start Time
                  </label>
                  <input
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    class="form-control"
                    id="inputCity"
                  />
                </div>
                <div class="col-md-3">
                  <label for="inputCity" class="form-label">
                    Book End Time
                  </label>
                  <input
                    type="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    class="form-control"
                    id="inputCity"
                  />
                </div>
                <div class="col-md-3">
                  <label for="inputCity" class="form-label">
                    Book Date
                  </label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    class="form-control"
                    id="inputCity"
                  />
                </div>

                <div class="col-12">
                  <button
                    type="button"
                    onClick={() => {
                      bookSlot({
                        slotTime: date + " ( " + start + " - " + end + " )",
                        vehicleInfo: {
                          model: model,
                          number: number,
                          category: categoryRef.current,
                        },
                      });
                    }}
                    class="btn btn-primary"
                  >
                    Pay {fees} Rs. and Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default BookParking;
