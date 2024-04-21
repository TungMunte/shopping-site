import "../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { v4 } from "uuid";

function AddMouse() {
  const navigate = useNavigate();
  const authContext = useAuth();

  const [completed, setCompleted] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageLoad, setImageLoad] = useState(true);
  const [imageCode, setImageCode] = useState("");
  const [process, setProcess] = useState(true);

  const [name, setName] = useState("");
  const types = [
    { value: "", text: "--Types--" },
    { value: "Standard", text: "Standard" },
    { value: "Gaming", text: "Gaming" },
  ];
  const [type, setType] = useState(types[0].value);

  const brands = [
    { value: "", text: "--BRANDS--" },
    { value: "Logitech", text: "Logitech" },
    { value: "Trust", text: "Trust" },
    { value: "Genius", text: "Genius" },
  ];
  const [brand, setBrand] = useState(brands[0].value);

  const dpis = [
    { value: "", text: "--DPI--" },
    { value: "600 - 1000", text: "600 - 1000" },
    { value: "1001 - 1500", text: "1001 - 1500" },
    { value: "peste 1500", text: "peste 1500" },
  ];
  const [dpi, setDpi] = useState(dpis[0].value);

  function handleName(event) {
    setName(event.target.value);
  }

  function handlePrice(event) {
    setPrice(Number(event.target.value));
  }

  function handleType(event) {
    setType(event.target.value);
  }

  function handleBrand(event) {
    setBrand(event.target.value);
  }

  function handleDpi(event) {
    setDpi(event.target.value);
  }

  function handleImage(event) {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageLoad(true);
    } else {
      setImageLoad(false);
    }
  }

  async function handleSubmit(event) {
    try {
      const code = v4();
      setImageCode(code);
      let data = new FormData();
      data.append("file", image);
      console.log(authContext.accessToken);
      const res = await axios.post(
        `http://localhost:8080/api/mouse/image/add/${code}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setImageLoad(true);
        console.log(imageCode);
        console.log(code);
        const response = await axios.post(
          "http://localhost:8080/api/mouse/add",
          {
            brand,
            price,
            name,
            type,
            dpi,
            imageCode: code,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${authContext.accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setCompleted(true);
        }
      }
    } catch (e) {
      setImageLoad(false);
      console.log(e);
    }
  }

  return (
    <div className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                {completed === false && (
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Add Mouse</h2>
                    <p className="text-white-50 mb-5">
                      Please enter mouse's information
                    </p>

                    <div className="form-outline form-white mb-4">
                      {name === "" && (
                        <p className="text-white-50 mb-3">add name</p>
                      )}
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={handleName}
                      />
                      <label className="form-label" for="typeEmailX">
                        Name
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      {(price === "" || price === 0) && (
                        <p className="text-white-50 mb-3">add price</p>
                      )}
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={price}
                        onChange={handlePrice}
                      />
                      <label className="form-label" for="typeEmailX">
                        Price
                      </label>
                    </div>

                    <div className="mb-4">
                      {brand === "" && (
                        <p className="text-white-50 mb-3">select brand</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={brand}
                        onChange={handleBrand}
                      >
                        {brands.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Brand
                      </label>
                    </div>

                    <div className="mb-4">
                      {type === "" && (
                        <p className="text-white-50 mb-3">select type</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={type}
                        onChange={handleType}
                      >
                        {types.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Type
                      </label>
                    </div>

                    <div className="mb-4">
                      {dpi === "" && (
                        <p className="text-white-50 mb-3">select dpi</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={dpi}
                        onChange={handleDpi}
                      >
                        {dpis.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        DPI
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      {image === "" && (
                        <p className="text-white-50 mb-3">add image</p>
                      )}
                      {imageLoad === "" && (
                        <p className="text-white-50 mb-5">
                          Please add image again.
                        </p>
                      )}
                      <input
                        type="file"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        onChange={handleImage}
                        name="image"
                        multiple
                      />
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={() => {
                        if (
                          price === "" ||
                          brand === "" ||
                          image === "" ||
                          type === "" ||
                          dpi === "" ||
                          name === ""
                        ) {
                          setProcess(false);
                        } else {
                          setProcess(true);
                        }
                        if (process === true) {
                          handleSubmit();
                        }
                      }}
                    >
                      {(process === true && "Add") ||
                        (process === false && "check again")}
                    </button>
                  </div>
                )}
                {completed === true && (
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Add success</h2>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={() => {
                        setCompleted(false);
                        setImage("");
                        setBrand(brands[0].value);
                        setType(types[0].value);
                        setPrice("");
                        setDpi(dpis[0].value);
                      }}
                    >
                      Continue ?
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMouse;
