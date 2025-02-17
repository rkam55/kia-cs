import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <article className="login">
      <img src="https://d3337ehzyte0uu.cloudfront.net/static/media/logo_Black_Large.jpg" />
      <h1>login</h1>
      <div>
        <div>
          <h2>로그인</h2>
          <p>KIA에 오신 것을 환영합니다.</p>
        </div>
        <LoginForm/>
      </div>
    </article>
  );
};

export default Login;
