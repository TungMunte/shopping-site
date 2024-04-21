import { useState, useEffect } from "react";
import "../css/Login.css";
import axios from "axios";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

function InfoOrder() {
  const authContext = useAuth();
  const publicKey = process.env.VITE_STRIPE_API_KEY;
  const navigate = useNavigate();
  const [number, setNumber] = useState();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const deliveryTypes = [
    { value: "", text: "--Delivery Type--" },
    { value: "BY_POST", text: "BY_POST     : 50  lei" },
    { value: "BY_COURIER", text: "BY_COURIER  : 100 lei" },
    { value: "AT_STORE", text: "AT_STORE    : 20  lei" },
  ];
  const [deliveryType, setDeliveryType] = useState("");
  const [orders, setOrders] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpireDate] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");

  useEffect(() => {
    async function getOrders() {
      try {
        // replace with get all order of specified user
        const response = await axios.get(
          `http://localhost:8080/api/order/get/${authContext.username}/${0}`,
          {
            headers: { Authorization: "Bearer " + authContext.accessToken },
          }
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOrders();
  }, []);

  const handleNumber = (event) => {
    setNumber(Number(event.target.value));
  };

  const handleStreet = (event) => {
    setStreet(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleDeliveryType = (event) => {
    console.log(event.target.value);
    setDeliveryType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    console.log(event.target.value);
    setCardNumber(event.target.value);
  };

  const handleCvcNumberChange = (event) => {
    console.log(event.target.value);
    setCvcNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    console.log(event.target.value);
    setExpireDate(event.target.value);
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value) => {
    return value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(\d{2})(\d{0,2})/, "$1/$2")
      .trim();
  };

  const handleClick = async () => {
    try {
      // console.log(calculateMoneyToPay());
      const money = calculateMoneyToPay();
      const response01 = await axios.post(
        `http://localhost:8080/api/packet/add/${authContext.username}`,
        {
          number: number,
          street: street,
          city: city,
          country: country,
          deliveryType: deliveryType,
          totalPrice: money,
        },
        {
          headers: { Authorization: "Bearer " + authContext.accessToken },
        }
      );
      const cleanedValue = expiryDate.replace(/[^\d]/g, "");

      const expiryMonth = cleanedValue.slice(0, 2);
      const expiryYear = cleanedValue.slice(2, 6);

      const response02 = await axios.post(
        "http://localhost:8080/api/product/checkout/integrated",
        {
          cardNumber: cardNumber,
          expMonth: expiryMonth,
          expYear: expiryYear,
          cvc: cvcNumber,
          amount: money,
        }
      );
      console.log(response01);
      console.log(response02);
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };

  function calculateMoneyToPay() {
    let money = authContext.total;
    if (deliveryType === "BY_POST") {
      money = money + 50;
    } else if (deliveryType === "BY_COURIER") {
      money = money + 100;
    } else if (deliveryType === "AT_STORE") {
      money = money + 30;
    }
    if (authContext.userType === "GOLD") {
      money = money - money * 0.1;
    } else if (authContext.userType === "SILVER") {
      money = money - money * 0.05;
    }
    return money.toFixed(2);
  }

  return (
    <div className="d-flex flex-row ">
      <div className="flex-grow-1 py-5">
        <div
          className="row"
          style={{
            "margin-right": "10px",
            "margin-left": "10px",
            "align-items": "center",
            "justify-content": "center",
          }}
        >
          <div className="col-md-16">
            <div className="table-wrap">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>image</th>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    if (order.smartPhone !== null) {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`http://localhost:8080/api/smartphone/image/get/${order.smartPhone.imageCode}`}
                              style={{
                                width: "130px",
                                height: "130px",
                              }}
                            />
                          </td>
                          <td>{order.smartPhone.name}</td>
                          <td>{order.quantity}</td>
                          <td>{order.smartPhone.price}</td>
                        </tr>
                      );
                    } else if (order.television !== null) {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`http://localhost:8080/api/television/image/get/${order.television.imageCode}`}
                              style={{
                                width: "130px",
                                height: "130px",
                              }}
                            />
                          </td>
                          <td>{order.television.name}</td>
                          <td>{order.quantity}</td>
                          <td>{order.television.price}</td>
                        </tr>
                      );
                    } else if (order.laptop !== null) {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`http://localhost:8080/api/laptop/image/get/${order.laptop.imageCode}`}
                              style={{
                                width: "130px",
                                height: "130px",
                              }}
                            />
                          </td>
                          <td>{order.laptop.name}</td>
                          <td>{order.quantity}</td>
                          <td>{order.laptop.price}</td>
                        </tr>
                      );
                    } else if (order.mouse !== null) {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`http://localhost:8080/api/mouse/image/get/${order.mouse.imageCode}`}
                              style={{
                                width: "130px",
                                height: "130px",
                              }}
                            />
                          </td>
                          <td>{order.mouse.name}</td>
                          <td>{order.quantity}</td>
                          <td>{order.mouse.price}</td>
                        </tr>
                      );
                    } else if (order.tablet !== null) {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`http://localhost:8080/api/tablet/image/get/${order.tablet.imageCode}`}
                              style={{
                                width: "130px",
                                height: "130px",
                              }}
                            />
                          </td>
                          <td>{order.tablet.name}</td>
                          <td>{order.quantity}</td>
                          <td>{order.tablet.price}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className="py-5 h-100 "
        style={{
          "margin-right": "10px",
          "margin-left": "10px",
          position: "sticky",
          top: 0,
        }}
      >
        <div
          className="card bg-dark text-white"
          style={{ borderRadius: "1rem" }}
        >
          <div className="card-body p-5 text-center ">
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">
                Information of order
              </h2>
              <p className="text-white-50 mb-5">Please enter your location</p>

              <div className="form-outline form-white mb-4">
                <input
                  type="number"
                  id="typeEmailX"
                  className="form-control form-control-lg"
                  value={number}
                  onChange={handleNumber}
                />
                <label className="form-label" for="typeEmailX">
                  street number
                </label>
              </div>

              <div className="form-outline form-white mb-4">
                <input
                  type="text"
                  id="typePasswordX"
                  className="form-control form-control-lg"
                  value={street}
                  onChange={handleStreet}
                />
                <label className="form-label" for="typePasswordX">
                  street
                </label>
              </div>

              <div className="form-outline form-white mb-4">
                <input
                  type="text"
                  id="typePasswordX"
                  className="form-control form-control-lg"
                  value={city}
                  onChange={handleCity}
                />
                <label className="form-label" for="typePasswordX">
                  city
                </label>
              </div>

              <div className="form-outline form-white mb-4">
                <input
                  type="text"
                  id="typePasswordX"
                  className="form-control form-control-lg"
                  value={country}
                  onChange={handleCountry}
                />
                <label className="form-label" for="typePasswordX">
                  country
                </label>
              </div>

              <div className="mb-4">
                {deliveryType === "" && (
                  <p className="text-white-50 mb-3">select delivery type</p>
                )}
                <select
                  className="form-select form-select-sm "
                  aria-label=".form-select-sm example"
                  value={deliveryType}
                  onChange={handleDeliveryType}
                >
                  {deliveryTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                <label className="form-label" for="typePasswordX">
                  Delivery Type
                </label>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="cardNumber"
                  className="form-control "
                  value={formatCardNumber(cardNumber)}
                  onChange={handleCardNumberChange}
                  placeholder="Enter card number"
                />
                <label className="form-label" htmlFor="cardNumber">
                  Card Number
                </label>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <input
                    type="text"
                    id="expiryDate"
                    className="form-control "
                    value={formatExpiryDate(expiryDate)}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                  />
                  <label className="form-label" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    id="cvcNumber"
                    className="form-control "
                    value={cvcNumber}
                    onChange={handleCvcNumberChange}
                    placeholder="CVC"
                  />
                  <label className="form-label" htmlFor="cvcNumber">
                    CVC
                  </label>
                </div>
              </div>
              {authContext.userType === "SILVER" && (
                <div style={{ marginBottom: "30px" }}>
                  <h3>Discount for silver user: 5%</h3>
                </div>
              )}

              {authContext.userType === "GOLD" && (
                <div style={{ marginBottom: "30px" }}>
                  <h3>Discount for gold user: 10%</h3>
                </div>
              )}

              <div style={{ marginBottom: "30px" }}>
                <h3>Total money : {calculateMoneyToPay()} RON</h3>
              </div>
              <button className="btn btn-success" onClick={() => handleClick()}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoOrder;
