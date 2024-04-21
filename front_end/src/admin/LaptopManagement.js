import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function LaptopManagement() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [pageNo, setPageNo] = useState(0);
  const [smartphones, setSmartPhones] = useState([]);

  useEffect(() => {
    async function getSmartPhones() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/laptop/get/${pageNo}`,
          {
            min: null,
            max: null,
            brand: null,
            ram: null,
            technology: null,
            internalMemory: null,
            screenDimension: null,
          }
        );
        setSmartPhones(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSmartPhones();
  }, [pageNo]);

  const handlerCurrentPage = (value) => {
    setPageNo(value);
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();
    const response = await axios.delete(
      `http://localhost:8080/api/laptop/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authContext.accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(response);
      const newSmartphones = smartphones.filter(
        (smartphone) => smartphone.id !== id
      );
      setSmartPhones(newSmartphones);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/modifyLaptop/${id}`);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Laptop</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-wrap">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>image</th>
                    <th>description</th>
                    <th>price</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {smartphones.map((smartphone) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`http://localhost:8080/api/laptop/image/get/${smartphone.imageCode}`}
                            style={{
                              width: "130px",
                              height: "130px",
                            }}
                          />
                        </td>
                        <td>{smartphone.description}</td>
                        <td>{smartphone.price}</td>
                        <td>
                          <btn
                            className="btn btn-danger"
                            onClick={(event) =>
                              handleDelete(event, smartphone.id)
                            }
                          >
                            delete
                          </btn>
                        </td>
                        <td>
                          <btn
                            className="btn btn-warning"
                            onClick={() => handleUpdate(smartphone.id)}
                          >
                            modify
                          </btn>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlerCurrentPage(pageNo - 1)} />
        <Pagination.Item onClick={() => handlerCurrentPage(pageNo)}>
          {pageNo}
        </Pagination.Item>
        <Pagination.Next onClick={() => handlerCurrentPage(pageNo + 1)} />
      </Pagination>
    </section>
  );
}

export default LaptopManagement;
