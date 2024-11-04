import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/Accounts/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Accounts/Login";
import Forgotpassword from "./Components/Accounts/Forgopassword";
import Resetpassword from "./Components/Accounts/Resetpassword";

import Protect from "./Components/ProtectRoute/Protect";
import LandingPage from "./Components/LandingPage";

import Pricing from "./Components/Pricing";

import { UserProvider } from "./context/contextApi.jsx";

import Auth from "./Components/ProtectRoute/auth.jsx";
import ConsultDermatologist from "./Components/NormalUser/ConsultDermatologist.jsx";
import ConsultCancerSpecialist from "./Components/NormalUser/ConsultCancerSpecialist.jsx";
import MyProduct from "./Components/Product";
import SkinWellness from "./Components/NormalUser/SkinProducts.jsx";
import Product from "./Components/NormalUser/SkinProduct.jsx";
import UploadImage from "./Components/NormalUser/UploadImage.jsx";
import ShoppingCart from "./Components/NormalUser/ShoppingCart.jsx";
import SignUpDocter from "./Components/Accounts/SignUpDocter.jsx";
import LoginDocter from "./Components/Accounts/LoginDocter.jsx";
import DocterDashboard from "./Components/Docter/DocterDashboard.jsx";

function App() {
  return (
    <>
      {/* <ContextApi> */}
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/UploadImage" element={<UploadImage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/SkinProducts" element={<SkinWellness />} />
            <Route path="/loginDocter" element={<LoginDocter />} />
            <Route path="/DocterDashboard" element={<DocterDashboard />} />
            <Route
              path="/ConsultDermatologist"
              element={<ConsultDermatologist />}
            />
            <Route
              path="/ConsultCancerDocter"
              element={<ConsultCancerSpecialist />}
            />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/skinproduct/:id" element={<Product />} />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />

            <Route path="/Product" element={<MyProduct />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignUpDocter" element={<SignUpDocter />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/reset-password" element={<Resetpassword />} />
          </Routes>
        </Router>
      </UserProvider>
      {/* </ContextApi> */}
    </>
  );
}

export default App;
