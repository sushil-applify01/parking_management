import axios from "axios";
import React, { useEffect, useState } from "react";
import { API, authConfig } from "../constants";
import Sidebar from "../Sidebar/Sidebar";
import makeToast from "../Toaster";
import Moment from "react-moment";

const Parking = () => {
  const [parkings, setParkings] = useState([]);

  const getParkings = async () => {
    try {
      const res = await axios.get(API + "/api/user/all-parkings", authConfig);
      setParkings(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteParking = async (id) => {
    try {
      const res = await axios.delete(
        API + "/api/user/delete-booking/" + id,
        authConfig
      );
      if (res.data.statusCode == 200) {
        makeToast("success", res.data.message);
        window.location.reload();
      } else {
        makeToast("error", res.data.message);
      }
    } catch (error) {
      makeToast("error", error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
    getParkings();
  }, []);

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
          <div class="page-title">Parking</div>

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
                  Parking
                </li>
              </ol>
            </nav>
          </div>

          <div class="card">
            <div class="card-body">
              <div class="d-md-flex gap-4 align-items-center">
                <div class="d-none d-md-flex">All Orders</div>
                <div class="d-md-flex gap-4 align-items-center">
                  <form class="mb-3 mb-md-0">
                    <div class="row g-3">
                      <div class="col-md-3">
                        <select class="form-select">
                          <option>Sort by</option>
                          <option value="desc">Desc</option>
                          <option value="asc">Asc</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <select class="form-select">
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search"
                          />
                          <button class="btn btn-outline-light" type="button">
                            <i class="bi bi-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <button
                  onClick={() => {
                    window.location.href = "/book-parking";
                  }}
                  type="button"
                  class="btn btn-primary"
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-custom table-lg mb-0" id="orders">
              <thead>
                <tr>
                  <th>
                    <input
                      class="form-check-input select-all"
                      type="checkbox"
                      data-select-all-target="#orders"
                      id="defaultCheck1"
                    />
                  </th>
                  <th>Vehicle No.</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Receipt</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parkings.length != 0 ? (
                  parkings.map((parking) => {
                    return (
                      <tr>
                        <td>
                          <input class="form-check-input" type="checkbox" />
                        </td>
                        <td>
                          <a href="#">#{parking.vehicleInfo.number}</a>
                        </td>
                        <td>{parking.info.name}</td>
                        <td>
                          <Moment format="DD-MM-YYYY">{parking.date}</Moment>
                        </td>
                        <td>
                          <a
                            onClick={() => {
                              window.location.href = parking.slip;
                            }}
                            href={parking.slip}
                          >
                            Slip
                          </a>
                        </td>
                        <td class="text-end">
                          <div class="d-flex">
                            <div class="dropdown ms-auto">
                              <a
                                href="#"
                                data-bs-toggle="dropdown"
                                class="btn btn-floating"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i class="bi bi-three-dots"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a
                                  href="#"
                                  onClick={() => {
                                    deleteParking(parking._id);
                                  }}
                                  class="dropdown-item"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Parkings Booked</td>
                    <td></td>
                    <td></td>
                    <td class="text-end"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Parking;
