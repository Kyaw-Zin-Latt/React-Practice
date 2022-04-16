import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer, toast } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./pages/Categories";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/category/:categoryName" element={<Categories />} />
        <Route path="/profile" element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/category/:categoryName/:listingId" element={<Listing />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
