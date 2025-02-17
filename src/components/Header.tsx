import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import { MdOutlineLogin } from "react-icons/md";

const Header = () => {
    const auth = getAuth(app);

  return (
    <header>
      {/* 로그아웃 했는데 마이페이지/문의가 뜸 */}
      <div>
        <Link to="/">
          <img src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/logo_w.svg" />
        </Link>
        <div className="header-icon display-flex">
          {auth ? (
            <>
            <Link to="/mypage">
            <img src="https://cdn-icons-png.flaticon.com/128/4674/4674426.png"/>
            </Link>
              <Link to="/cs">
              <img src="https://cdn-icons-png.flaticon.com/128/984/984199.png"/>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
              <MdOutlineLogin size={20}/>
              </Link>
              <Link to="/signup">
              <img src="https://cdn-icons-png.flaticon.com/128/4674/4674426.png"/>
              </Link>
              <Link to="/cs">
              <img src="https://cdn-icons-png.flaticon.com/128/984/984199.png"/>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
