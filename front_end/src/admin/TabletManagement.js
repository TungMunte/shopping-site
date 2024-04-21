import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function TabletManagement() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [pageNo, setPageNo] = useState(0);
  const [tablets, setTablets] = useState([]);

  useEffect(() => {
    async function getTablets() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/tablet/get/${pageNo}`,
          {
            min: null,
            max: null,
            brand: null,
            resolution: null,
            memory: null,
          }
        );
        setTablets(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTablets();
  }, [pageNo]);

  const handlerCurrentPage = (value) => {
    setPageNo(value);
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();
    const response = await axios.delete(
      `http://localhost:8080/api/tablet/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authContext.accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(response);
      const newTablets = tablets.filter((tablet) => tablet.id !== id);
      setTablets(newTablets);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/modifyTablet/${id}`);
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Tablet</h2>
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
                  {tablets.map((tablet) => {
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
                        <td>{tablet.description}</td>
                        <td>{tablet.price}</td>
                        <td>
                          <btn
                            className="btn btn-danger"
                            onClick={(event) => handleDelete(event, tablet.id)}
                          >
                            delete
                          </btn>
                        </td>
                        <td>
                          <btn
                            className="btn btn-warning"
                            onClick={() => handleUpdate(tablet.id)}
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

export default TabletManagement;
