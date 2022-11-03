import axios from "axios";
import React, { useEffect, useState } from "react";
import { API, authConfig } from "../constants";

const Sidebar = (props) => {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [total, setTotal] = useState();
  const [booked, setBooked] = useState();

  const getAdminDetails = async () => {
    try {
      const res = await axios.get(API + "/api/admin/me", authConfig);
      if (res.data.statusCode == 200) {
        setName(res.data.admin.name);
        setOrganisation(res.data.admin.organisation);
        setTotal(res.data.totalBooking);
        setBooked(res.data.booked);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAdminDetails();
  }, []);
  return (
    <div class="menu">
      <div class="menu-header">
        <a href="index.html" class="menu-header-logo">
          <img
            src="https://vetra.laborasyon.com/assets/images/logo.svg"
            alt="logo"
          />
        </a>
        <a href="index.html" class="btn btn-sm menu-close-btn">
          <i class="bi bi-x"></i>
        </a>
      </div>
      <div class="menu-body">
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <div class="avatar me-3">
              <img
                src="../../assets/images/user/man_avatar3.jpg"
                class="rounded-circle"
                alt="image"
              />
            </div>
            <div>
              <div class="fw-bold">{name}</div>
              <small class="text-muted">{organisation}</small>
              <br />
              <small class="text-muted">Total : {total}</small> <br />
              <small class="text-muted">Booked : {booked}</small>
            </div>
          </a>
        </div>
        <ul>
          <li class="menu-divider">ABC Parking</li>
          <li>
            <a className={props.name == "Parking" ? "active" : ""} href="/home">
              <span class="nav-link-icon">
                <i class="bi bi-truck"></i>
              </span>
              <span>Parkings</span>
            </a>
          </li>
          <li>
            <a
              href="/category"
              className={props.name == "Categories" ? "active" : ""}
            >
              <span class="nav-link-icon">
                <i class="bi bi-receipt"></i>
              </span>
              <span>Categories</span>
            </a>
          </li>

          <li>
            <a
              className={props.name == "Customers" ? "active" : ""}
              href="/customers"
            >
              <span class="nav-link-icon">
                <i class="bi bi-person-badge"></i>
              </span>
              <span>Customers</span>
            </a>
          </li>
          <li>
            <a
              className=""
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <span class="nav-link-icon">
                <i class="bi-box-arrow-right"></i>
              </span>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
