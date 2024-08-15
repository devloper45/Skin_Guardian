import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/Accounts/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Accounts/Login";
import Forgotpassword from "./Components/Accounts/Forgopassword";
import Resetpassword from "./Components/Accounts/Resetpassword";

import Protect from "./Components/ProtectRoute/Protect";
import LandingPage from "./Components/LandingPage";
import CustomReport from "./Components/premiumUser/customReport.jsx";
import Pricing from "./Components/Pricing";
import Product from "./Components/Product";

import { UserProvider } from "./context/contextApi.jsx";
import UploadFile from "./Components/FreeUser/UploadFile.jsx";
import UploadFileTemplate from "./Components/UploadFileTemplate.jsx";
import PReportTemplate from "./Components/premiumUser/PReportTemplate.jsx";
import PReportTemplateOption from "./Components/premiumUser/PReportTemplateOption.jsx";
import PUploadFile from "./Components/premiumUser/PUploadFile.jsx";
import Auth from "./Components/ProtectRoute/auth.jsx";
// import PReportTemplateOption from "./Components/premiumUser/PReportTemplateOption.jsx"
// import Main from "./Components/customReport"

function App() {
  return (
    <>
      {/* <ContextApi> */}
      <UserProvider>
        <Router>
          <Routes>
            {/* <Route path='/main' element={ </>}/> */}
            <Route path="/Login" element={<Login />} />
            <Route
              path="/Dashboard"
              element={
                <Protect>
                  {" "}
                  <Dashboard />
                </Protect>
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="/FileTemplates" element={<UploadFileTemplate />} />
            <Route
              path="/CustomReportTemplate"
              element={
                <Protect>
                  <PReportTemplateOption />
                </Protect>
              }
              required
            />
            <Route
              path="/PReportTemplate/:id"
              element={
                <Protect>
                  <Auth>
                    <PReportTemplate />
                  </Auth>
                </Protect>
              }
            />
            <Route
              path="/CustomReport"
              element={
                <Protect>
                  <CustomReport />
                </Protect>
              }
            />
            <Route path="/Pricing" element={<Pricing />} />
            <Route
              path="/P/:id"
              element={
                <Protect>
                  <Auth>
                    <PUploadFile />
                  </Auth>
                </Protect>
              }
            />

            <Route path="/Product" element={<Product />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/UploadFile/:id"
              element={
                <Protect>
                  <UploadFile />
                </Protect>
              }
            />
            {/* <Route
              path="/ChangePassword"
              element={
                <Protect>
                  <UploadFile />
                </Protect>
              }
            /> */}
            <Route path="/forgot-password" element={<Forgotpassword />} />
            {/* <Route path="/subscribe" element={<Subscribe />} /> */}
            {/* <Route path='/otp' element={ <Otp length={6} onComplete={handleComplete} />}/> */}
            <Route path="/reset-password" element={<Resetpassword />} />
          </Routes>
        </Router>
      </UserProvider>
      {/* </ContextApi> */}
    </>
  );
}

export default App;
