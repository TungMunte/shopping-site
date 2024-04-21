import "../css/Demo.css";
import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mouse from "../cards/Mouse";

function MousePage() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [mouses, setMouses] = useState([]); // change to laptop in future
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [checkedBrandList, setCheckedBrandList] = useState([]);
  const listBrand = [
    { id: "1", value: "Logitech" },
    { id: "2", value: "Trust" },
    { id: "3", value: "Genius" },
  ];

  const [checkedTypeList, setCheckedTypeList] = useState([]);
  const listType = [
    { id: "1", value: "Standard" },
    { id: "2", value: "Gaming" },
  ];

  const [checkedDpiList, setCheckedDpiList] = useState([]);
  const listDpi = [
    { id: "1", value: "600 - 1000" },
    { id: "2", value: "1001 - 1500" },
    { id: "3", value: "peste 1500" },
  ];

  useEffect(() => {
    async function getMouses() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/mouse/get/${pageNo}`,
          {
            min: min,
            max: max,
            brand: checkedBrandList,
            type: checkedTypeList,
            dpi: checkedDpiList,
          }
        );
        setMouses(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMouses();
  }, [pageNo]);

  async function getMouses() {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/mouse/get/${pageNo}`,
        {
          min: min,
          max: max,
          brand: checkedBrandList,
          type: checkedTypeList,
          dpi: checkedDpiList,
        }
      );
      setMouses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBrandSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedBrandList([...checkedBrandList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedBrandList.filter((item) => item !== value);
      setCheckedBrandList(filteredList);
    }
  };

  const handleTypeSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedTypeList([...checkedTypeList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedTypeList.filter((item) => item !== value);
      setCheckedTypeList(filteredList);
    }
  };

  const handleDpiSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedDpiList([...checkedDpiList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedDpiList.filter((item) => item !== value);
      setCheckedDpiList(filteredList);
    }
  };

  const handleMin = (event) => {
    setMin(Number(event.target.value));
  };
  const handleMax = (event) => {
    setMax(Number(event.target.value));
  };
  const handlerCurrentPage = (value) => {
    setPageNo(value);
  };

  const handleProduct = (event) => {
    console.log(event.target.value);
    if (event.target.value === "Smartphone") {
      navigate("/");
    } else if (event.target.value === "Laptop") {
      navigate("/laptop");
    } else if (event.target.value === "Television") {
      navigate("/television");
    } else if (event.target.value === "Mouse") {
      navigate("/mouse");
    } else if (event.target.value === "Tablet") {
      navigate("/tablet");
    }
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-8 order-md-2 col-lg-9">
          <div className="container-fluid">
            <div className="row">
              {mouses.map((mouse) => (
                <Mouse
                  description={mouse.description}
                  price={mouse.price}
                  imageCode={mouse.imageCode}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4 order-md-1 col-lg-3 sidebar-filter">
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">Brand</h6>
          {listBrand.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleBrandSelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">DPI</h6>
          {listDpi.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleDpiSelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">Type</h6>
          {listType.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleTypeSelect}
                  />
                  <label
                    className="custom-control-label"
                    for="filter-size-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {item.value}
                  </label>
                </div>
              </div>
            );
          })}

          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">Price</h6>
          <div className="price-filter-control">
            <input
              type="number"
              className="form-control w-50 pull-left mb-2"
              value={min}
              onChange={handleMin}
              id="price-min-control"
            />
            <input
              type="number"
              className="form-control w-50 pull-right"
              value={max}
              onChange={handleMax}
              id="price-max-control"
            />
          </div>
          <div className="divider mt-3 mb-3 border-bottom border-secondary"></div>
          <btn
            className="btn btn-lg btn-block btn-primary mt-5"
            onClick={getMouses}
          >
            Update Results
          </btn>
        </div>
      </div>
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlerCurrentPage(pageNo - 1)} />
        <Pagination.Item onClick={() => handlerCurrentPage(pageNo)}>
          {pageNo}
        </Pagination.Item>
        <Pagination.Next onClick={() => handlerCurrentPage(pageNo + 1)} />
      </Pagination>
    </div>
  );
}

export default MousePage;
