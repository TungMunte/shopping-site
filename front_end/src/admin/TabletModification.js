import "../css/Login.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { v4 } from "uuid";

function TabletModification() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { id } = useParams();

  const [completed, setCompleted] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageLoad, setImageLoad] = useState(true);
  const [imageCode, setImageCode] = useState("");
  const [process, setProcess] = useState(true);

  useEffect(() => {
    async function getTablet() {
      const response = await axios.get(
        `http://localhost:8080/api/tablet/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
        }
      );
      setPrice(response.data.price);
      setImageCode(response.data.imageCode);
      setBrand(response.data.brand);
      setName(response.data.name);
      setMemory(response.data.memory);
      setResolution(response.data.resolution);
      console.log(response.data);
    }
    getTablet();
  }, []);
  const [name, setName] = useState("");
  const brands = [
    { value: "", text: "--BRANDS--" },
    { value: "Samsung", text: "Samsung" },
    { value: "Apple", text: "Apple" },
    { value: "Lenovo", text: "Lenovo" },
  ];
  const [brand, setBrand] = useState(brands[0].value);

  const memories = [
    { value: "", text: "--MEMORIES--" },
    { value: "1 GB", text: "1 GB" },
    { value: "2 GB", text: "2 GB" },
    { value: "4 GB", text: "4 GB" },
    { value: "8 GB", text: "8 GB" },
  ];
  const [memory, setMemory] = useState(memories[0].value);

  const resolutions = [
    { value: "", text: "--Resolutions--" },
    { value: "1280 x 900", text: "1280 x 900" },
    { value: "1920 x 1200", text: "1920 x 1200" },
    { value: "2000 x 1200", text: "peste 1500" },
  ];
  const [resolution, setResolution] = useState(resolutions[0].value);

  function handlePrice(event) {
    setPrice(Number(event.target.value));
  }

  function handleBrand(event) {
    setBrand(event.target.value);
  }

  function handleName(event) {
    setName(event.target.value);
  }

  function handleMemory(event) {
    setMemory(event.target.value);
  }

  function handleResolution(event) {
    setResolution(event.target.value);
  }

  async function handleImage(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let data = new FormData();
      data.append("file", event.target.files[0]);
      const oldCode = imageCode;
      const code = v4();

      const newCode = code;
      const res = await axios.put(
        `http://localhost:8080/api/tablet/image/put/${id}/${oldCode}/${newCode}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        setImageCode(code);
      }
    }
  }

  async function handleSubmit(event) {
    try {
      console.log(id);

      const response = await axios.put(
        `http://localhost:8080/api/tablet/put/${id}`,
        {
          brand,
          price,
          imageCode,
          name,
          memory,
          resolution,
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
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Modify tablet
                    </h2>
                    <p className="text-white-50 mb-5">
                      Please enter tablet's information
                    </p>

                    <div className="form-outline form-white mb-4">
                      {(price === "" || price === 0) && (
                        <p className="text-white-50 mb-5">add price</p>
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

                    <div className="form-outline form-white mb-4">
                      {name === "" && (
                        <p className="text-white-50 mb-5">add name</p>
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

                    <div className="mb-4">
                      {brand === "" && (
                        <p className="text-white-50 mb-5">select brand</p>
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
                        <p className="text-white-50 mb-5">select memory</p>
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
                        <p className="text-white-50 mb-5">select resolution</p>
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
                        Resolution
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <img
                        src={`http://localhost:8080/api/tablet/image/get/${imageCode}`}
                        style={{
                          width: "130px",
                          height: "130px",
                        }}
                        className="mb-5"
                      />

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
                        setProcess(true);

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
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Modify success
                    </h2>
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

export default TabletModification;
