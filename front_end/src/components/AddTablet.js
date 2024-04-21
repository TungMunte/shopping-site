import "../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { v4 } from "uuid";

function AddTablet() {
  const navigate = useNavigate();
  const authContext = useAuth();

  const [completed, setCompleted] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageLoad, setImageLoad] = useState(true);
  const [imageCode, setImageCode] = useState("");
  const [process, setProcess] = useState(true);

  const [name, setName] = useState("");
  const memories = [
    { value: "", text: "--MEMORIES--" },
    { value: "1 GB", text: "1 GB" },
    { value: "2 GB", text: "2 GB" },
    { value: "4 GB", text: "4 GB" },
    { value: "8 GB", text: "8 GB" },
  ];
  const [memory, setMemory] = useState(memories[0].value);

  const brands = [
    { value: "", text: "--BRANDS--" },
    { value: "Samsung", text: "Samsung" },
    { value: "Apple", text: "Apple" },
    { value: "Lenovo", text: "Lenovo" },
  ];
  const [brand, setBrand] = useState(brands[0].value);

  const resolutions = [
    { value: "", text: "--Resolutions--" },
    { value: "1280 x 900", text: "1280 x 900" },
    { value: "1920 x 1200", text: "1920 x 1200" },
    { value: "2000 x 1200", text: "peste 1500" },
  ];
  const [resolution, setResolution] = useState(resolutions[0].value);

  function handleName(event) {
    setName(event.target.value);
  }

  function handlePrice(event) {
    setPrice(Number(event.target.value));
  }

  function handleBrand(event) {
    setBrand(event.target.value);
  }

  function handleMemory(event) {
    setMemory(event.target.value);
  }

  function handleResolution(event) {
    setResolution(event.target.value);
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
        `http://localhost:8080/api/tablet/image/add/${code}`,
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
          "http://localhost:8080/api/tablet/add",
          {
            brand,
            price,
            name,
            resolution,
            memory,
            imageCode: code,
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
                    <h2 className="fw-bold mb-2 text-uppercase">Add Tablet</h2>
                    <p className="text-white-50 mb-5">
                      Please enter tablet's information
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
                      {memory === "" && (
                        <p className="text-white-50 mb-3">select memory</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={memory}
                        onChange={handleMemory}
                      >
                        {memories.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Memory
                      </label>
                    </div>

                    <div className="mb-4">
                      {resolution === "" && (
                        <p className="text-white-50 mb-3">select resolution</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={resolution}
                        onChange={handleResolution}
                      >
                        {resolutions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Memory
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
                          resolution === "" ||
                          memory === "" ||
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
                        setMemory(memories[0].value);
                        setResolution(resolutions[0].value);
                        setPrice("");
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

export default AddTablet;
