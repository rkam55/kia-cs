import SignForm from '../components/SignForm';

const Signup = () => {
    return (
        <article className="join">
        <img src="https://d3337ehzyte0uu.cloudfront.net/static/media/logo_Black_Large.jpg"/>
        <h1>join us</h1>
        <div>
            <div>
                <h2>회원가입</h2>
                <p><span>KIA</span>의 다양한 서비스를 만나보세요.</p>
            </div>
            <SignForm/>
        </div>
    </article>
    );
};

export default Signup;