const Home = () => {
  return (
    <div className="main-banner">
      <section>
        <div>
          <h4>새로운 도심 엔트리 EV</h4>
          <h1>The Kia Ray EV</h1>
          <div>
            <div>
              <button className="more-btn">자세히 보기</button>
            </div>
            <div>
              <button className="price-btn">견적 내기</button>
            </div>
          </div>
        </div>
        <div>
          <div className="mo">
            <img src="https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202308/kv_rayev_contract_mo.jpg" />
          </div>
          <div className="pc">
            <img src="https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202308/kv_rayev_contract_pc.jpg" />
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
