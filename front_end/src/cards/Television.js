import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function Television(props) {
  const authContext = useAuth();
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (event) => setQuantity(event.target.value);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    if (authContext.isAuthenticated) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/order/add/${authContext.username}/television`,
          {
            quantity: quantity,
            imageCode: props.imageCode,
          },
          {
            headers: { Authorization: "Bearer " + authContext.accessToken },
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setShow(true);
    }
  };
  return (
    <div className="col-6 col-md-6 col-lg-4 mb-3">
      <div className="card">
        <img
          className="card-img"
          src={`http://localhost:8080/api/television/image/get/${props.imageCode}`}
          alt="Vans"
        />
        <div className="card-body">
          <h4 className="card-title">{props.description}</h4>
          <div
            className="price text-success "
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h6
              className="mt-3"
              style={{ display: "inline-block", margin: "0" }}
            >{`${props.price} RON`}</h6>
          </div>
          <div className="text-success">State : available</div>
          <div className="text-success">Deliver time : 8 days</div>
          <div className="buy d-flex justify-content-between align-items-center">
            <div className="options ">
              <label for="quantity">Quantity :</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={quantity}
                value={quantity}
                onChange={handleQuantity}
              />
            </div>
          </div>
          <>
            <btn className="btn btn-danger mt-3" onClick={handleShow}>
              Add to Cart
            </btn>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Please login</Modal.Title>
              </Modal.Header>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary">
                  <Link to="login">Login</Link>
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
}

export default Television;
