import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function MouseManagement() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [pageNo, setPageNo] = useState(0);
  const [mouses, setMouses] = useState([]);

  useEffect(() => {
    async function getMouses() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/mouse/get/${pageNo}`,
          {
            min: null,
            max: null,
            brand: null,
            type: null,
            dpi: null,
            name: null,
          }
        );
        setMouses(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMouses();
  }, [pageNo]);

  const handlerCurrentPage = (value) => {
    setPageNo(value);
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();
    const response = await axios.delete(
      `http://localhost:8080/api/mouse/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authContext.accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(response);
      const newMouses = mouses.filter((mouse) => mouse.id !== id);
      setMouses(newMouses);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/modifyMouse/${id}`);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Mouse</h2>
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
                  {mouses.map((mouse) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`http://localhost:8080/api/television/image/get/${mouse.imageCode}`}
                            style={{
                              width: "130px",
                              height: "130px",
                            }}
                          />
                        </td>
                        <td>{mouse.description}</td>
                        <td>{mouse.price}</td>
                        <td>
                          <btn
                            className="btn btn-danger"
                            onClick={(event) => handleDelete(event, mouse.id)}
                          >
                            delete
                          </btn>
                        </td>
                        <td>
                          <btn
                            className="btn btn-warning"
                            onClick={() => handleUpdate(mouse.id)}
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

export default MouseManagement;
