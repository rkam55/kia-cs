import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import CsList from "../pages/CsList";
import CsForm from "../components/CsForm";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Mypage from "../pages/Mypage";
import { IRouterProps } from "../interface";
import CsDetail from "../pages/CsDetail";

const Router = ({ authentication }: IRouterProps) => {

  return (
    <Routes>
      {authentication ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/cs" element={<CsList />} />
          <Route path="/cs/:number" element={<CsList />} />
          <Route path="/cs/:id/detail" element={<CsDetail />} />
          <Route path="/cs/:id/edit" element={<CsForm isEdit={true}/>} />
          <Route path="/cs/create" element={<CsForm isEdit={false}/>} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/:number" element={<Mypage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
