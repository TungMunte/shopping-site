import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/YourCart.css";

function EditCard() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const param = useParams();
  const [pageNo, setPageNo] = useState(0);
  const [order, setOrder] = useState({});
  const [smartphone, setSmartphone] = useState(null);
  const [television, setTelevision] = useState(null);
  const [laptop, setLaptop] = useState(null);
  const [mouse, setMouse] = useState(null);
  const [tablet, setTablet] = useState(null);
  const [number, setNumber] = useState();
  useEffect(() => {
    async function getOrder() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/order/${param.id}`,
          {
            headers: { Authorization: "Bearer " + authContext.accessToken },
          }
        );
        console.log(response.data);
        setOrder({ id: response.data.id, quantity: response.data.quantity });
        if (response.data.smartPhone !== null) {
          setSmartphone(response.data.smartPhone);
        } else if (response.data.laptop !== null) {
          setLaptop(response.data.laptop);
        } else if (response.data.television !== null) {
          setTelevision(response.data.television);
        } else if (response.data.mouse !== null) {
          setTelevision(response.data.mouse);
        } else if (response.data.tablet !== null) {
          setTelevision(response.data.tablet);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getOrder();
  }, [pageNo, authContext.username]);

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleModify = async () => {
    try {
      console.log("demo");
      console.log(authContext.accessToken);
      const response = await axios.get(
        `http://localhost:8080/api/order/put/${param.id}/${number}`,
        {
          headers: { Authorization: "Bearer " + authContext.accessToken },
        }
      );
      if (response.status === 200) {
        navigate("/yourCart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showProduct = () => {
    try {
      if (smartphone !== null) {
        return (
          <tr>
            <td>
              <img
                src={`http://localhost:8080/api/smartphone/image/get/${smartphone.imageCode}`}
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
            </td>
            <td>{smartphone.name}</td>
            <td>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={smartphone.quantity}
                onChange={handleNumber}
              />
            </td>
            <td>{smartphone.price}</td>
            <td>{smartphone.price + 40}</td>
            <td>
              <btn className="btn btn-success" onClick={handleModify}>
                update
              </btn>
            </td>
          </tr>
        );
      } else if (laptop !== null) {
        return (
          <tr>
            <td>
              <img
                src={`http://localhost:8080/api/laptop/image/get/${laptop.imageCode}`}
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
            </td>
            <td>{laptop.name}</td>
            <td>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={laptop.quantity}
                onChange={handleNumber}
              />
            </td>
            <td>{laptop.price}</td>
            <td>{laptop.price + 40}</td>
            <td>
              <btn className="btn btn-success" onClick={handleModify}>
                update
              </btn>
            </td>
          </tr>
        );
      } else if (television !== null) {
        return (
          <tr>
            <td>
              <img
                src={`http://localhost:8080/api/television/image/get/${television.imageCode}`}
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
            </td>
            <td>{television.name}</td>
            <td>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={television.quantity}
                onChange={handleNumber}
              />
            </td>
            <td>{television.price}</td>
            <td>{television.price + 40}</td>
            <td>
              <btn className="btn btn-success" onClick={handleModify}>
                update
              </btn>
            </td>
          </tr>
        );
      } else if (mouse !== null) {
        return (
          <tr>
            <td>
              <img
                src={`http://localhost:8080/api/mouse/image/get/${mouse.imageCode}`}
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
            </td>
            <td>{mouse.name}</td>
            <td>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={mouse.quantity}
                onChange={handleNumber}
              />
            </td>
            <td>{mouse.price}</td>
            <td>{mouse.price + 40}</td>
            <td>
              <btn className="btn btn-success" onClick={handleModify}>
                update
              </btn>
            </td>
          </tr>
        );
      } else if (tablet !== null) {
        return (
          <tr>
            <td>
              <img
                src={`http://localhost:8080/api/tablet/image/get/${tablet.imageCode}`}
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
            </td>
            <td>{tablet.name}</td>
            <td>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={tablet.quantity}
                onChange={handleNumber}
              />
            </td>
            <td>{tablet.price}</td>
            <td>{tablet.price + 40}</td>
            <td>
              <btn className="btn btn-success" onClick={handleModify}>
                update
              </btn>
            </td>
          </tr>
        );
      }
    } catch (error) {
      navigate("/youCard");
      console.log(error);
    }
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
                    <th>pruchased price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{showProduct()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditCard;
