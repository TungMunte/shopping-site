import "../css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { v4 } from "uuid";

function AddLaptop() {
  const navigate = useNavigate();
  const authContext = useAuth();

  const [completed, setCompleted] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageLoad, setImageLoad] = useState(true);
  const [imageCode, setImageCode] = useState("");
  const [process, setProcess] = useState(true);

  const [name, setName] = useState("");
  const processors = [
    { value: "", text: "--Processor--" },
    { value: "i3", text: "i3" },
    { value: "i5", text: "i5" },
    { value: "i7", text: "i7" },
    { value: "ryzen 3", text: "ryzen 3" },
    { value: "ryzen 5", text: "ryzen 5" },
    { value: "ryzen 7", text: "ryzen 7" },
    { value: "ryzen 9", text: "ryzen 9" },
    { value: "M1", text: "M1" },
    { value: "M2", text: "M2" },
    { value: "M3", text: "M3" },
  ];
  const [processor, setProcessor] = useState(processors[0].value);

  const types = [
    { value: "", text: "--Type--" },
    { value: "Business", text: "Business" },
    { value: "Gaming", text: "Gaming" },
    { value: "Home", text: "Home" },
  ];
  const [type, setType] = useState(types[0].value);

  const screenDimensions = [
    { value: "", text: "--Screen Dimension--" },
    { value: "13", text: "13" },
    { value: "14", text: "14" },
    { value: "15", text: "15" },
    { value: "16", text: "16" },
    { value: "17", text: "17" },
  ];
  const [screenDimension, setScreenDimension] = useState(
    screenDimensions[0].value
  );

  const brands = [
    { value: "", text: "--BRANDS--" },
    { value: "Lenovo", text: "Lenovo" },
    { value: "ASUS", text: "ASUS" },
    { value: "Dell", text: "Dell" },
    { value: "Apple", text: "Apple" },
  ];
  const [brand, setBrand] = useState(brands[0].value);

  const internalMemories = [
    { value: "", text: "--Internal Memory--" },
    { value: "128", text: "128" },
    { value: "256", text: "256" },
    { value: "512", text: "512" },
  ];
  const [internalMemory, setInternalMemory] = useState(
    internalMemories[0].value
  );

  const rams = [
    { value: "", text: "--RAM--" },
    { value: "8", text: "8" },
    { value: "12", text: "12" },
    { value: "16", text: "16" },
    { value: "24", text: "24" },
  ];
  const [ram, setRam] = useState(rams[0].value);

  function handleName(event) {
    setName(event.target.value);
  }

  function handlePrice(event) {
    setPrice(Number(event.target.value));
  }

  function handleType(event) {
    setType(event.target.value);
  }

  function handleProcessor(event) {
    setProcessor(event.target.value);
  }

  function handleScreenDimension(event) {
    setScreenDimension(event.target.value);
  }

  function handleBrand(event) {
    setBrand(event.target.value);
  }

  function handleInternalMemory(event) {
    setInternalMemory(event.target.value);
  }

  function handleRam(event) {
    setRam(event.target.value);
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
      const res = await axios.post(
        `http://localhost:8080/api/laptop/image/add/${imageCode}`,
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
        const response = await axios.post(
          "http://localhost:8080/api/laptop/add",
          {
            name,
            brand,
            price,
            internalMemory,
            ram,
            processor,
            type,
            screenDimension,
            imageCode,
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
                    <h2 className="fw-bold mb-2 text-uppercase">Add Laptop</h2>
                    <p className="text-white-50 mb-5">
                      Please enter laptop's information
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
                      {processor === "" && (
                        <p className="text-white-50 mb-3">select processor</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={processor}
                        onChange={handleProcessor}
                      >
                        {processors.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Processor
                      </label>
                    </div>

                    <div className="mb-4">
                      {screenDimension === "" && (
                        <p className="text-white-50 mb-3">
                          select screen dimension
                        </p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={screenDimension}
                        onChange={handleScreenDimension}
                      >
                        {screenDimensions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typeEmailX">
                        Screen Dimension
                      </label>
                    </div>

                    <div className="mb-4">
                      {internalMemory === "" && (
                        <p className="text-white-50 mb-3">
                          select internal memory
                        </p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={internalMemory}
                        onChange={handleInternalMemory}
                      >
                        {internalMemories.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Internal Memory
                      </label>
                    </div>

                    <div className="mb-4">
                      {ram === "" && (
                        <p className="text-white-50 mb-3">select ram</p>
                      )}
                      <select
                        className="form-select form-select-sm "
                        aria-label=".form-select-sm example"
                        value={ram}
                        onChange={handleRam}
                      >
                        {rams.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" for="typePasswordX">
                        Ram
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
                          internalMemory === "" ||
                          ram === "" ||
                          screenDimension === "" ||
                          image === ""
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
                        setScreenDimension(screenDimensions[0].value);
                        setBrand(brands[0].value);
                        setInternalMemory(internalMemories[0].value);
                        setRam(rams[0].value);
                        setBrand(brands[0].value);
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

export default AddLaptop;
