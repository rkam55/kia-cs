import { useState, useCallback} from "react";
import { ISignFormProps } from "../interface";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignForm = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [signForm, setSignForm] = useState<ISignFormProps>({
    email: "",
    password: "",
    password2: "",
  });
  const [isValid, setIsValid] = useState<ISignFormProps>({
    email: "",
    password: "",
    password2: "",
  });

  const onChangeSignForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setSignForm({
        ...signForm,
        [name]: value,
      });

      // 이메일 검사
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (name === "email") {
        if (!value.match(emailRegex)) {
          setIsValid((prevState) => ({
            ...prevState,
            email: "이메일 형식이 올바르지 않습니다.",
          }));
        } else {
          setIsValid((prevState) => ({
            ...prevState,
            email: "",
          }));
        }
      }

      // 비밀번호 검사
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]).{8,}$/;
      if (name === "password") {
        if (!value.match(passwordRegex)) {
          setIsValid((prevState) => ({
            ...prevState,
            password:
              "비밀번호는 영문, 숫자, 특수문자 조합으로 8자 이상 입력해주세요.",
          }));
        } else {
          setIsValid((prevState) => ({
            ...prevState,
            password: "",
          }));
        }
      }

      if (name === "password2") {
        if (value !== signForm.password) {
          setIsValid((prevState) => ({
            ...prevState,
            password2: "비밀번호를 다시 확인해주세요.",
          }));
        } else {
          setIsValid((prevState) => ({
            ...prevState,
            password2: "",
          }));
        }
      }
    },
    [signForm, isValid]
  );

  const onSubmitSign = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await createUserWithEmailAndPassword(
          auth,
          signForm.email,
          signForm.password
        );

        const emailIdSplit = signForm.email.split("@");
        const emailId = emailIdSplit[0]
        alert(`${emailId}님 환영합니다. 회원가입이 완료되었습니다.`);
        navigate("/");
      } catch (e: any) {
        alert(e);
      }
    },
    [signForm]
  );

  return (
    <form className="sign-form" onSubmit={onSubmitSign}>
      <h4>회원정보 입력</h4>
      <div>
        <p>이메일</p>
        <input
          type="text"
          name="email"
          placeholder="이메일 입력"
          value={signForm.email}
          onChange={onChangeSignForm}
        />
        <p className="error-vaild">{isValid.email}</p>
      </div>
      <div>
        <p>비밀번호</p>
        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력 (영문, 숫자, 특수문자 8자 이상)"
          value={signForm.password}
          onChange={onChangeSignForm}
        />
        <p className="error-vaild">{isValid.password}</p>
      </div>
      <div>
        <p>비밀번호 확인</p>
        <input
          type="password"
          name="password2"
          placeholder="비밀번호 입력"
          value={signForm.password2}
          onChange={onChangeSignForm}
        />
        <p className="error-vaild">{isValid.password2}</p>
      </div>
      <button className="join-btn black-btn">가입하기</button>
    </form>
  );
};

export default SignForm;
