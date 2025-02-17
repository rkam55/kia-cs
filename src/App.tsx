import Header from "./components/Header";
import Footer from "./components/Footer";
import {useState, useEffect} from "react";
import {app} from "./firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useContext} from "react";
import Router from "./components/Router";
import Loader from "./components/Loader";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const auth = getAuth(app);

  // 사용자 인증 유무 확인
  const [authentication, setAuthentication] = useState<boolean>(!! auth?.currentUser );

  // auth를 체크하기 전 (initalize 전)에 loading 띄우기
  const [load, setLoad] = useState<boolean>(false);

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setAuthentication(true)
      } else {
        setAuthentication(false);
      }
      setLoad(true);
    })
  },[auth])

  return (
    <>
      <Header />
      {load ? <Router authentication={authentication}/> : <Loader/>}
      <Footer />
    </>
  );
};

export default App;
