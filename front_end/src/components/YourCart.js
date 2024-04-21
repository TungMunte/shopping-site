import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function YourCart() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/order/get/${authContext.username}/${pageNo}`,
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
  }, [pageNo, authContext.username]);

  const handleCancel = async (id, index) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/order/delete/${id}/${authContext.username}`,
        {
          headers: { Authorization: "Bearer " + authContext.accessToken },
        }
      );
      const newOrders = orders.filter((orders, i) => i !== index);
      setOrders(newOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModify = (id) => {
    navigate(`/editCart/${id}`);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-16 text-center mb-5">
            <h2 className="heading-section">Your Cart</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-16">
            <div className="table-wrap">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>image</th>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th></th>
                    <th></th>
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
                          <td>
                            <btn
                              className="btn btn-success"
                              onClick={() => handleModify(order.id)}
                            >
                              modify
                            </btn>
                          </td>

                          <td>
                            <btn
                              className="btn btn-warning"
                              onClick={() => handleCancel(order.id, index)}
                            >
                              Cancel
                            </btn>
                          </td>
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
                          <td>
                            <btn
                              className="btn btn-success"
                              onClick={() => handleModify(order.id)}
                            >
                              modify
                            </btn>
                          </td>

                          <td>
                            <btn
                              className="btn btn-warning"
                              onClick={() => handleCancel(order.id, index)}
                            >
                              Cancel
                            </btn>
                          </td>
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
                          <td>
                            <btn
                              className="btn btn-success"
                              onClick={() => handleModify(order.id)}
                            >
                              modify
                            </btn>
                          </td>

                          <td>
                            <btn
                              className="btn btn-warning"
                              onClick={() => handleCancel(order.id, index)}
                            >
                              Cancel
                            </btn>
                          </td>
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
                          <td>
                            <btn
                              className="btn btn-success"
                              onClick={() => handleModify(order.id)}
                            >
                              modify
                            </btn>
                          </td>

                          <td>
                            <btn
                              className="btn btn-warning"
                              onClick={() => handleCancel(order.id, index)}
                            >
                              Cancel
                            </btn>
                          </td>
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
                          <td>
                            <btn
                              className="btn btn-success"
                              onClick={() => handleModify(order.id)}
                            >
                              modify
                            </btn>
                          </td>

                          <td>
                            <btn
                              className="btn btn-warning"
                              onClick={() => handleCancel(order.id, index)}
                            >
                              Cancel
                            </btn>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>

              <div className="d-flex justify-content-end">
                <btn
                  className="btn btn-success"
                  onClick={() => {
                    authContext.setTotal(
                      orders.reduce((accumulator, order) => {
                        if (order.smartPhone !== null) {
                          return accumulator + order.smartPhone.price;
                        } else if (order.television !== null) {
                          return accumulator + order.television.price;
                        } else if (order.laptop !== null) {
                          return accumulator + order.laptop.price;
                        } else if (order.mouse !== null) {
                          return accumulator + order.mouse.price;
                        } else if (order.tablet !== null) {
                          return accumulator + order.tablet.price;
                        }
                      }, 0)
                    );
                    navigate("/infoOrder");
                  }}
                >
                  Checkout
                </btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YourCart;
