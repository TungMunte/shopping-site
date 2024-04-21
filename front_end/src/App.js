import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthProvider, { useAuth } from "./security/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import MainPage from "./components/MainPage";
import YourCart from "./components/YourCart";
import YourOrder from "./components/YourOrder";
import EditCard from "./cards/EditCard";
import InfoOrder from "./cards/InfoOrder";
import SmartphoneManagement from "./admin/SmartphoneManagement";
import LaptopManagement from "./admin/LaptopManagement";
import TelevisionManagement from "./admin/TelevisionManagement";
import MouseManagement from "./admin/MouseManagement";
import TabletManagement from "./admin/TabletManagement";
import PacketCheck from "./admin/PacketCheck";
import PacketManagement from "./delivery/PacketManagement";
import PacketSelect from "./delivery/PacketSelect";
import SmartphoneModification from "./admin/SmartphoneModification";
import LaptopModification from "./admin/LaptopModification";
import TelevisionModification from "./admin/TelevisionModification";
import MouseModification from "./admin/MouseModification";
import TabletModification from "./admin/TabletModification";
import LaptopPage from "./components/LaptopPage";
import TelevisionPage from "./components/TelevisionPage";
import AddSmartPhone from "./components/AddSmartPhone";
import AddLaptop from "./components/AddLaptop";
import AddTelevision from "./components/AddTelevision";
import AddMouse from "./components/AddMouse";
import AddTablet from "./components/AddTablet";
import SearchPage from "./components/SearchPage";
import MousePage from "./components/MousePage";
import TabletPage from "./components/TabletPage";
import AboutUs from "./components/AboutUs";
import CustomService from "./components/CustomService";
import ContactUs from "./components/ContactUs";
import ReportNumberPacketPerMonth from "./admin/ReportNumberPacketPerMonth";
import ReportTotalMoneyPerMonth from "./admin/ReportTotalMoneyPerMonth";
import Report from "./admin/Report";
import ReportDetailEachMonth from "./admin/ReportDetailEachMonth";
function AdminRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAdmin) return children;

  return <Navigate to="/" />;
}

function DeliverRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isDeliver) return children;

  return <Navigate to="/" />;
}

function UserRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isUser) {
    return children;
  }

  return <Navigate to="/" />;
}

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:id" element={<MainPage />} />
            <Route path="/laptop" element={<LaptopPage />} />
            <Route path="/laptop/:id" element={<LaptopPage />} />
            <Route path="/television" element={<TelevisionPage />} />
            <Route path="/television/:id" element={<TelevisionPage />} />
            <Route path="/mouse" element={<MousePage />} />
            <Route path="/mouse/:id" element={<MousePage />} />
            <Route path="/tablet" element={<TabletPage />} />
            <Route path="/tablet/:id" element={<TabletPage />} />
            <Route path="/product/:search/:id" element={<SearchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/:token" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/customService" element={<CustomService />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/report" element={<Report />} />
            <Route
              path="/detailReport/:month"
              element={
                <AdminRoute>
                  <ReportDetailEachMonth />
                </AdminRoute>
              }
            />
            <Route
              path="/yourCart"
              element={
                <UserRoute>
                  <YourCart />
                </UserRoute>
              }
            />
            <Route
              path="/yourOrder"
              element={
                <UserRoute>
                  <YourOrder />
                </UserRoute>
              }
            />
            <Route
              path="/editCart/:id"
              element={
                <UserRoute>
                  <EditCard />
                </UserRoute>
              }
            />
            <Route
              path="/infoOrder"
              element={
                <UserRoute>
                  <InfoOrder />
                </UserRoute>
              }
            />

            <Route
              path="/smartphoneManagement"
              element={<SmartphoneManagement />}
            />
            <Route
              path="/smartphoneManagement/:id"
              element={<SmartphoneManagement />}
            />
            <Route path="/laptopManagement" element={<LaptopManagement />} />
            <Route
              path="/laptopManagement/:id"
              element={<LaptopManagement />}
            />
            <Route
              path="/televisionManagement"
              element={<TelevisionManagement />}
            />
            <Route
              path="/televisionManagement/:id"
              element={<TelevisionManagement />}
            />
            <Route path="/mouseManagement" element={<MouseManagement />} />
            <Route path="/mouseManagement/:id" element={<MouseManagement />} />
            <Route path="/tabletManagement" element={<TabletManagement />} />
            <Route
              path="/tabletManagement/:id"
              element={<TabletManagement />}
            />
            <Route
              path="/packetCheck"
              element={
                <AdminRoute>
                  <PacketCheck />
                </AdminRoute>
              }
            />
            <Route
              path="/packetCheck/:id"
              element={
                <AdminRoute>
                  <PacketCheck />
                </AdminRoute>
              }
            />
            <Route
              path="/addSmartPhone"
              element={
                <AdminRoute>
                  <AddSmartPhone />
                </AdminRoute>
              }
            />
            <Route
              path="/addLaptop"
              element={
                <AdminRoute>
                  <AddLaptop />
                </AdminRoute>
              }
            />
            <Route
              path="/addTelevision"
              element={
                <AdminRoute>
                  <AddTelevision />
                </AdminRoute>
              }
            />
            <Route
              path="/addMouse"
              element={
                <AdminRoute>
                  <AddMouse />
                </AdminRoute>
              }
            />
            <Route
              path="/addTablet"
              element={
                <AdminRoute>
                  <AddTablet />
                </AdminRoute>
              }
            />
            <Route
              path="/modifySmartPhone/:id"
              element={
                <AdminRoute>
                  <SmartphoneModification />
                </AdminRoute>
              }
            />
            <Route
              path="/modifyLaptop/:id"
              element={
                <AdminRoute>
                  <LaptopModification />
                </AdminRoute>
              }
            />
            <Route
              path="/modifyTelevision/:id"
              element={
                <AdminRoute>
                  <TelevisionModification />
                </AdminRoute>
              }
            />
            <Route
              path="/modifyMouse/:id"
              element={
                <AdminRoute>
                  <MouseModification />
                </AdminRoute>
              }
            />
            <Route
              path="/modifyTablet/:id"
              element={
                <AdminRoute>
                  <TabletModification />
                </AdminRoute>
              }
            />
            <Route
              path="/reportMoneyPerMonth"
              element={
                <AdminRoute>
                  <ReportTotalMoneyPerMonth />
                </AdminRoute>
              }
            />
            <Route
              path="/reportPacketPerMonth"
              element={
                <AdminRoute>
                  <ReportNumberPacketPerMonth />
                </AdminRoute>
              }
            />
            <Route
              path="/packetManagement"
              element={
                <DeliverRoute>
                  <PacketManagement />
                </DeliverRoute>
              }
            />
            <Route
              path="/packetSelect"
              element={
                <DeliverRoute>
                  <PacketSelect />
                </DeliverRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
