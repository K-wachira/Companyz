import { Text, Center } from "@chakra-ui/layout";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import PageNotFound from "./shared/404";
import Home from "./content/Home";
import Profile from "./content/Profile";
import EditProfile from "./content/EditProfile";
import VerifyAccount from "./content/VerifyAccount";

const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Center>
    <img alt="Loading" src="/assets/Gifs/loadingdark.gif" />
  </Center>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/verify" element={<VerifyAccount />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Views;
