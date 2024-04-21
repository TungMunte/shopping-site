import "../css/Demo.css";
import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import Television from "../cards/Television";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TelevisionPage() {
  // eliminate after create television table on database
  const [checkedTechnologyList, setCheckedTechnologyList] = useState([]);
  const listTechnology = [
    { id: "1", value: "4G" },
    { id: "2", value: "4G+" },
    { id: "3", value: "5G" },
  ];
  const [checkedInternalMemoryList, setCheckedInternalMemoryList] = useState(
    []
  );
  const listInternalMemory = [
    { id: "1", value: "16" },
    { id: "2", value: "32" },
    { id: "3", value: "64" },
    { id: "4", value: "128" },
    { id: "5", value: "256" },
  ];
  const [checkedRamList, setCheckedRamList] = useState([]);
  const listRam = [
    { id: "1", value: "2" },
    { id: "2", value: "4" },
    { id: "3", value: "8" },
    { id: "4", value: "12" },
  ];
  // eliminate after create television table on database
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [televisions, setTelevisions] = useState([]); // change to laptop in future
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [checkedBrandList, setCheckedBrandList] = useState([]);
  const listBrand = [
    { id: "1", value: "Samsung" },
    { id: "2", value: "LG" },
    { id: "3", value: "Sony" },
    { id: "4", value: "Panasonic" },
  ];

  const [checkedTypeList, setCheckedTypeList] = useState([]);
  const listType = [
    { id: "1", value: "Non Smart" },
    { id: "2", value: "Smart" },
  ];

  const [checkedImageList, setCheckedImageList] = useState([]);
  const listImage = [
    { id: "1", value: "4K" },
    { id: "2", value: "Full HD" },
    { id: "3", value: "8K" },
  ];

  const [checkedScreenDimensionList, setCheckedScreenDimensionList] = useState(
    []
  );
  const listScreenDimension = [
    { id: "1", value: "80  - 110 cm" },
    { id: "2", value: "111 - 126 cm" },
    { id: "3", value: "127 - 152 cm" },
  ];

  useEffect(() => {
    async function getSmartPhones() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/television/get/${pageNo}`,
          {
            min: min,
            max: max,
            brand: checkedBrandList,
            ram: checkedRamList,
            technology: checkedTechnologyList,
            internalMemory: checkedInternalMemoryList,
            screenDimension: checkedScreenDimensionList,
          }
        );
        setTelevisions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSmartPhones();
  }, [pageNo]);

  async function getTelevisions() {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/television/get/${pageNo}`,
        {
          min: min,
          max: max,
          brand: checkedBrandList,
          ram: checkedRamList,
          technology: checkedTechnologyList,
          internalMemory: checkedInternalMemoryList,
          screenDimension: checkedScreenDimensionList,
        }
      );
      setTelevisions(response.data);
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

  const handleScreenDimensionSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedScreenDimensionList([...checkedScreenDimensionList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedScreenDimensionList.filter(
        (item) => item !== value
      );
      setCheckedScreenDimensionList(filteredList);
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

  const handleImageSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedImageList([...checkedImageList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedImageList.filter((item) => item !== value);
      setCheckedImageList(filteredList);
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
              {televisions.map((television) => (
                <Television
                  description={television.description}
                  price={television.price}
                  imageCode={television.imageCode}
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
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">
            Image Quality
          </h6>
          {listImage.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleImageSelect}
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
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">
            Screen Dimension
          </h6>
          {listScreenDimension.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleScreenDimensionSelect}
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
            onClick={getTelevisions}
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

export default TelevisionPage;
