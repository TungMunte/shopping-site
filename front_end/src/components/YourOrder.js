import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function YourOrder() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [packets, setPackets] = useState([]);
  const [location, setLocation] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getPackets() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/packet/get/${authContext.username}`,
          {
            headers: { Authorization: "Bearer " + authContext.accessToken },
          }
        );
        setPackets(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPackets();
  }, [pageNo, authContext.username]);

  function formatTimestampWithAdditionalDays(timestamp, additionalDays) {
    const date = new Date(timestamp);
    date.setDate(date.getDate() + additionalDays);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="container">
      {packets.map((packet, index) => {
        return (
          <>
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">{index + 1}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-wrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>image</th>
                        <th>name</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th>pruchased price</th>
                        <th>location</th>
                        <th>process</th>
                        <th>delivery type</th>
                        <th>start date</th>
                        <th>end date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packet.orders.map((order) => {
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
                              <td>{order.smartPhone.price + 40}</td>
                              <td>
                                {`${packet.location.number}` +
                                  " " +
                                  `${packet.location.street}` +
                                  " " +
                                  `${packet.location.city}` +
                                  " " +
                                  `${packet.location.country}`}
                              </td>
                              <td>
                                <btn className="btn btn-warning">
                                  {`${packet.process}`}
                                </btn>
                              </td>
                              <td>{packet.deliveryType}</td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  0
                                )}
                              </td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  packet.deliveryTime
                                )}
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
                              <td>{order.laptop.price + 40}</td>
                              <td>
                                {`${packet.location.number}` +
                                  " " +
                                  `${packet.location.street}` +
                                  " " +
                                  `${packet.location.city}` +
                                  " " +
                                  `${packet.location.country}`}
                              </td>
                              <td>
                                <btn className="btn btn-warning">
                                  {`${packet.process}`}
                                </btn>
                              </td>
                              <td>{packet.deliveryType}</td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  0
                                )}
                              </td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  packet.deliveryTime
                                )}
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
                              <td>{order.television.price + 40}</td>
                              <td>
                                {`${packet.location.number}` +
                                  " " +
                                  `${packet.location.street}` +
                                  " " +
                                  `${packet.location.city}` +
                                  " " +
                                  `${packet.location.country}`}
                              </td>
                              <td>
                                <btn className="btn btn-warning">
                                  {`${packet.process}`}
                                </btn>
                              </td>
                              <td>{packet.deliveryType}</td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  0
                                )}
                              </td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  packet.deliveryTime
                                )}
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
                              <td>{order.mouse.price + 40}</td>
                              <td>
                                {`${packet.location.number}` +
                                  " " +
                                  `${packet.location.street}` +
                                  " " +
                                  `${packet.location.city}` +
                                  " " +
                                  `${packet.location.country}`}
                              </td>
                              <td>
                                <btn className="btn btn-warning">
                                  {`${packet.process}`}
                                </btn>
                              </td>
                              <td>{packet.deliveryType}</td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  0
                                )}
                              </td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  packet.deliveryTime
                                )}
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
                              <td>{order.tablet.price + 40}</td>
                              <td>
                                {`${packet.location.number}` +
                                  " " +
                                  `${packet.location.street}` +
                                  " " +
                                  `${packet.location.city}` +
                                  " " +
                                  `${packet.location.country}`}
                              </td>
                              <td>
                                <btn className="btn btn-warning">
                                  {`${packet.process}`}
                                </btn>
                              </td>
                              <td>{packet.deliveryType}</td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  0
                                )}
                              </td>
                              <td>
                                {formatTimestampWithAdditionalDays(
                                  packet.startDate,
                                  packet.deliveryTime
                                )}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default YourOrder;
