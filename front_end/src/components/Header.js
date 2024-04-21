import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const reports = [
    { value: "", text: "--Report--" },
    { value: "Report Money Per Month", text: "Report Money Per Month" },
    { value: "Report Packet Per Month", text: "Report Packet Per Month" },
    { value: "report", text: "report" },
  ];
  const [report, setReport] = useState(reports[0].value);

  function logout() {
    authContext.logout();
  }

  const handleAddProduct = (event) => {
    console.log(event.target.value);
    if (event.target.value === "Add_smartphone") {
      navigate("/addSmartphone");
    } else if (event.target.value === "Add_laptop") {
      navigate("/addLaptop");
    } else if (event.target.value === "Add_television") {
      navigate("/addTelevision");
    } else if (event.target.value === "Add_mouse") {
      navigate("/addMouse");
    } else if (event.target.value === "Add_tablet") {
      navigate("/addTablet");
    }
  };

  const handleAdminProduct = (event) => {
    console.log(event.target.value);
    if (event.target.value === "Smartphone_Admin") {
      navigate("/smartphoneManagement");
    } else if (event.target.value === "Laptop_Admin") {
      navigate("/laptopManagement");
    } else if (event.target.value === "Television_Admin") {
      navigate("/televisionManagement");
    } else if (event.target.value === "Mouse_Admin") {
      navigate("/mouseManagement");
    } else if (event.target.value === "Tablet_Admin") {
      navigate("/tabletManagement");
    }
  };

  const handleReport = (event) => {
    if (event.target.value === "Report Money Per Month") {
      navigate("/reportMoneyPerMonth");
    } else if (event.target.value === "Report Packet Per Month") {
      navigate("/reportPacketPerMonth");
    } else if (event.target.value === "report") {
      navigate("/report");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  async function handleSearch() {
    navigate(`/product/${search}/${0}`);
  }

  const handleProduct = (event) => {
    console.log(event.target.value);
    if (event.target.value === "Laptop") {
      navigate("/laptop");
    } else if (event.target.value === "Television") {
      navigate("/television");
    } else if (event.target.value === "Smartphone") {
      navigate("/");
    } else if (event.target.value === "Mouse") {
      navigate("/mouse");
    } else if (event.target.value === "Tablet") {
      navigate("/tablet");
    }
  };

  return (
    <header className="site-header">
      <div className="site-identity">
        <h3>
          <Link to="/">Tech Shop </Link>
        </h3>
      </div>
      <nav className="site-navigation">
        <ul className="nav">
          {authContext.isUser && (
            <li>
              <select
                className="form-select form-select-sm "
                aria-label=".form-select-sm example"
                onChange={handleProduct}
                value={"product"}
              >
                <option value="--product--">product</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Television">Television</option>
                <option value="Mouse">Mouse</option>
                <option value="Tablet">Tablet</option>
              </select>
            </li>
          )}
          {!authContext.isAdmin && (
            <li>
              <Link to="aboutUs">About us</Link>
            </li>
          )}

          {!authContext.isAdmin && (
            <li>
              <Link to="customService">Custom services</Link>
            </li>
          )}
          {!authContext.isAdmin && (
            <li>
              <Link to="contactUs">Contact us</Link>
            </li>
          )}
          <li>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={search}
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              data-mdb-ripple-init
              onClick={handleSearch}
            >
              search
            </button>
          </li>

          {authContext.isUser && (
            <li>
              <Link to="yourOrder">Your order</Link>
            </li>
          )}
          {authContext.isUser && (
            <li>
              <Link to="yourCart">Your cart</Link>
            </li>
          )}
          {authContext.isAdmin && (
            <li>
              <select
                className="form-select form-select-sm "
                aria-label=".form-select-sm example"
                onChange={handleAdminProduct}
                value={"---Admin_Product---"}
              >
                <option value="---Admin_Product---">---Admin_Product---</option>
                <option value="Smartphone_Admin">Smartphone_Admin</option>
                <option value="Laptop_Admin">Laptop_Admin</option>
                <option value="Television_Admin">Television_Admin</option>
                <option value="Mouse_Admin">Mouse_Admin</option>
                <option value="Tablet_Admin">Tablet_Admin</option>
              </select>
            </li>
          )}
          {authContext.isAdmin && (
            <li>
              <select
                className="form-select form-select-sm "
                aria-label=".form-select-sm example"
                onChange={handleAddProduct}
                value={"---Add_Product---"}
              >
                <option value="---Add_Product---">---Add_Product---</option>
                <option value="Add_smartphone">Add_smartphone</option>
                <option value="Add_laptop">Add_laptop</option>
                <option value="Add_television">Add_television</option>
                <option value="Add_mouse">Add_mouse</option>
                <option value="Add_tablet">Add_tablet</option>
              </select>
            </li>
          )}
          {authContext.isAdmin && (
            <li>
              <select
                className="form-select form-select-sm "
                aria-label=".form-select-sm example"
                onChange={handleReport}
                value={"---Report---"}
              >
                {reports.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </li>
          )}
          {authContext.isAdmin && (
            <li>
              <Link to="/packetCheck">Packet_Admin</Link>
            </li>
          )}

          {authContext.isDeliver && (
            <li>
              <Link to="/packetManagement">My_packet</Link>
            </li>
          )}
          {authContext.isDeliver && (
            <li>
              <Link to="/packetSelect">packet_uncompleted</Link>
            </li>
          )}
          {authContext.isUser && authContext.userType === "GOLD" && (
            <li>
              <FontAwesomeIcon
                icon={faWallet}
                size="2xl"
                style={{ color: "#FFD43B" }}
              />
            </li>
          )}
          {authContext.isUser && authContext.userType === "SILVER" && (
            <li>
              <FontAwesomeIcon
                icon={faWallet}
                size="2xl"
                style={{ color: "#333e4d" }}
              />
            </li>
          )}
        </ul>
      </nav>
      <div className="auth-links">
        <ul className="nav">
          {!authContext.isAuthenticated && (
            <li>
              <Link to="login">Login</Link>
            </li>
          )}
          {!authContext.isAuthenticated && (
            <li>
              <Link to="register">Register</Link>
            </li>
          )}
          {authContext.isAuthenticated && (
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
