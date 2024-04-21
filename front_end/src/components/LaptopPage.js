import "../css/Demo.css";
import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import Laptop from "../cards/Laptop";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LaptopPage() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [laptops, setLaptops] = useState([]); // change to television in future
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const [checkedTypeList, setCheckedTypeList] = useState([]);
  const listType = [
    { id: "1", value: "Business" },
    { id: "2", value: "Gaming" },
    { id: "3", value: "Home" },
  ];
  const [checkedProcessorList, setCheckedProcessorList] = useState([]);
  const listProcessor = [
    { id: "1", value: "i3" },
    { id: "2", value: "i5" },
    { id: "3", value: "i7" },
    { id: "4", value: "ryzen 3" },
    { id: "5", value: "ryzen 5" },
    { id: "6", value: "ryzen 7" },
    { id: "7", value: "ryzen 9" },
    { id: "8", value: "M1" },
    { id: "9", value: "M2" },
    { id: "10", value: "M3" },
  ];
  const [checkedBrandList, setCheckedBrandList] = useState([]);
  const listBrand = [
    { id: "1", value: "Lenovo" },
    { id: "2", value: "ASUS" },
    { id: "3", value: "Dell" },
    { id: "4", value: "Apple" },
  ];
  const [checkedInternalMemoryList, setCheckedInternalMemoryList] = useState(
    []
  );
  const listInternalMemory = [
    { id: "1", value: "128" },
    { id: "2", value: "256" },
    { id: "3", value: "512" },
  ];
  const [checkedRamList, setCheckedRamList] = useState([]);
  const listRam = [
    { id: "1", value: "8" },
    { id: "2", value: "12" },
    { id: "3", value: "16" },
    { id: "4", value: "24" },
  ];
  const [checkedScreenDimensionList, setCheckedScreenDimensionList] = useState(
    []
  );
  const listScreenDimension = [
    { id: "1", value: "13" },
    { id: "2", value: "14" },
    { id: "3", value: "15" },
    { id: "3", value: "16" },
    { id: "3", value: "17" },
  ];

  useEffect(() => {
    async function getSmartPhones() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/laptop/get/${pageNo}`,
          {
            min: min,
            max: max,
            type: checkedTypeList,
            processor: checkedProcessorList,
            brand: checkedBrandList,
            ram: checkedRamList,
            internalMemory: checkedInternalMemoryList,
            screenDimension: checkedScreenDimensionList,
          }
        );
        setLaptops(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSmartPhones();
  }, [pageNo]);

  async function getLaptops() {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/laptop/get/${pageNo}`,
        {
          min: min,
          max: max,
          brand: checkedBrandList,
          ram: checkedRamList,
          type: checkedTypeList,
          processor: checkedProcessorList,
          internalMemory: checkedInternalMemoryList,
          screenDimension: checkedScreenDimensionList,
        }
      );
      setLaptops(response.data);
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

  const handleProcessorSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedProcessorList([...checkedProcessorList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedProcessorList.filter(
        (item) => item !== value
      );
      setCheckedProcessorList(filteredList);
    }
  };

  const handleInternalMemorySelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedInternalMemoryList([...checkedInternalMemoryList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedInternalMemoryList.filter(
        (item) => item !== value
      );
      setCheckedInternalMemoryList(filteredList);
    }
  };

  const handleRamSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedRamList([...checkedRamList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedRamList.filter((item) => item !== value);
      setCheckedRamList(filteredList);
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
    } else if (event.target.value === "Television") {
      navigate("/television");
    } else if (event.target.value === "Laptop") {
      navigate("/laptop");
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
              {laptops.map((laptop) => (
                <Laptop
                  description={laptop.description}
                  price={laptop.price}
                  imageCode={laptop.imageCode}
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
            Processor
          </h6>
          {listProcessor.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleProcessorSelect}
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
            Internal Memory
          </h6>
          {listInternalMemory.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleInternalMemorySelect}
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
          <h6 className="text-uppercase mt-3 mb-3 font-weight-bold">Ram</h6>
          {listRam.map((item, index) => {
            return (
              <div key={item.id} className="mt-2 mb-2 pl-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="filter-size-1"
                    value={item.value}
                    onChange={handleRamSelect}
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
            onClick={getLaptops}
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

export default LaptopPage;
