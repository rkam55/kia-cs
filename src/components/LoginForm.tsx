import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { ISignFormProps } from "../interface";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const LoginForm = () => {
  const auth = getAuth(app);
  
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<Omit<ISignFormProps, "password2">>(
    { email: "", password: "" }
  );
  const [isValid, setIsValid] = useState<Omit<ISignFormProps, "password2">>({
    email: "",
    password: "",
  });

  const onChangeLoginForm = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setLoginForm({
        ...loginForm,
        [name]: value,
      });

      if (name === "email") {
          setIsValid((prevState) => ({
            ...prevState,
            email: "",
          }));
      }

      if (name === "password") {
        if (value) {
          setIsValid((prevState) => ({
            ...prevState,
            password: "",
          }));
        }
      }

    },
    [loginForm]
  );

  const onSubmitLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (!loginForm.email) {
          setIsValid((prevState) => ({
            ...prevState,
            email: "이메일을 입력해주세요.",
          }));
        } else {
          setIsValid((prevState) => ({
            ...prevState,
            email: "",
          }));
        }

        if(!loginForm.password){
          setIsValid((prevState) => ({
            ...prevState,
            password: "비밀번호를 입력해주세요.",
          }));
        }else {
          setIsValid((prevState) => ({
            ...prevState,
            password: "",
          }));
        }
        await signInWithEmailAndPassword(
          auth,
          loginForm.email,
          loginForm.password
        );

        const emailIdSplit = loginForm.email.split("@");
        const emailId = emailIdSplit[0];
        alert(`로그인 되었습니다. 환영합니다. ${emailId}님.`);
        navigate("/");
      } catch (e: any) {
        if(e.code === "auth/wrong-password") {
          setIsValid((prevState) => ({
            ...prevState,
            password: "비밀번호가 일치하지 않습니다.",
          }));
        } else {
          alert("정보를 바르게 입력해주세요.")
        }
      }
    },
    [loginForm]
  );

  return (
    <form className="login-form" onSubmit={onSubmitLogin}>
      <div>
        <input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={loginForm.email}
          onChange={onChangeLoginForm}
        />
        <p className="error-vaild">{isValid.email}</p>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={loginForm.password}
          onChange={onChangeLoginForm}
        />
        <p className="error-vaild">{isValid.password}</p>
      </div>
      <div className="display-flex">
        <div className="display-flex">
          <input
            type="checkbox"
            name="save-id"
            id="save-id"
            className="check"
          />
          <p>아이디 저장</p>
        </div>
        <div className="display-flex">
          <button>아이디찾기</button>
          <button>비밀번호찾기</button>
        </div>
      </div>
      <div className="display-flex-flow">
        <button type="submit" style={{cursor: "pointer"}}>로그인</button>
        <button type="button" className="black-btn">
          <Link to="/signup">회원가입</Link>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
