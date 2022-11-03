import axios from "axios";
import React, { useEffect, useState } from "react";
import { API, authConfig, config } from "../constants";
import Sidebar from "../Sidebar/Sidebar";
import makeToast from "../Toaster";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [fees, setPrice] = useState();
  const [id, setID] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        API + "/api/admin/categories/all",
        authConfig
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addCategory = async (formData) => {
    try {
      const res = await axios.post(
        API + "/api/admin/create-category",
        formData,
        authConfig
      );
      if (res.data.statusCode == 200) {
        makeToast("success", res.data.message);
        setPrice();
        getAllCategories();
      } else {
        makeToast("error", res.data.message);
      }
    } catch (error) {
      makeToast("error", error.message);
    }
  };

  const updateCategory = async (formData) => {
    try {
      const res = await axios.put(
        API + "/api/admin/update-category/" + id,
        formData,
        authConfig
      );
      if (res.data.statusCode == 200) {
        makeToast("success", res.data.message);
        setIsUpdate(false);
        getAllCategories();
      } else {
        makeToast("error", res.data.message);
      }
    } catch (error) {
      makeToast("error", error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        API + "/api/admin/delete-category/" + id,
        authConfig
      );
      if (res.data.statusCode == 200) {
        makeToast("success", res.data.message);
        getAllCategories();
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
    getAllCategories();
  }, []);

  return (
    <body>
      <Sidebar name="Categories" />
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
          <div class="page-title">Categories</div>

          <div style={{ height: 20 }}></div>

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
                  Categories
                </li>
              </ol>
            </nav>
          </div>

          <div class="card">
            <div style={{ padding: 20 }}>
              <form class="row g-3">
                <div class="col-md-6">
                  <label for="exampleInputEmail1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      value={fees}
                      onChange={(e) => setPrice(e.target.value)}
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <div class="col-12">
                  {isUpdate ? (
                    <button
                      type="button"
                      onClick={() => {
                        updateCategory({ name, fees });
                        setPrice();
                        setName("");
                      }}
                      class="btn btn-primary"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        addCategory({ name, fees });
                        setPrice();
                        setName("");
                      }}
                      class="btn btn-primary"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <br />
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
                  <th>Name</th>
                  <th></th>
                  <th>Fees</th>
                  <th></th>
                  <th></th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length == 0 ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Categories Created!</td>
                    <td></td>
                    <td></td>
                    <td class="text-end"></td>
                  </tr>
                ) : (
                  categories.map((category) => {
                    return (
                      <tr>
                        <td>
                          <input class="form-check-input" type="checkbox" />
                        </td>
                        <td>{category.name}</td>
                        <td></td>
                        <td>{category.fees}</td>
                        <td></td>
                        <td></td>
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
                                  onClick={() => {
                                    setIsUpdate(true);
                                    setName(category.name);
                                    setPrice(category.fees);
                                    setID(category._id);
                                  }}
                                  class="dropdown-item"
                                >
                                  Edit
                                </a>
                                <a
                                  onClick={() => {
                                    deleteCategory(category._id);
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
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Category;
