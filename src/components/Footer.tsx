const Footer = () => {
    return (
        <footer>
        <div>

            <div>
                <img
                    src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/logo_w.svg"/>
            </div>

            <ul className="display-flex-flow">
                <li>판매 네트워크
                    <ul className="pc">
                        <li>지점/대리점</li>
                        <li>영업담당</li>
                        <li>전시 차량</li>
                        <li>시승 거점</li>
                        <li>출고 센터</li>
                    </ul>
                </li>
                <li>견적 내기
                    <ul className="pc">
                        <li>EV & PBV</li>
                        <li>승용</li>
                        <li>RV</li>
                        <li>택시 & 상용</li>
                    </ul>
                </li>
                <li>구매 상담 신청</li>
                <li>시승 신청</li>
                <li>기아렌터카
                    <ul className="pc">
                        <li>기아플렉스</li>
                        <li>원하는 상품 찾기</li>
                        <li>제공 서비스</li>
                        <li>기아플렉스 모바일 앱</li>
                    </ul>
                </li>
            </ul>

            <div className="display-flex-flow mo">
                <img
                    src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_kia_members.png"/>
                <img
                    src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_facebook.svg"/>
                <img
                    src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_instagram.svg"/>
                <img
                    src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_youtube.svg"/>
            </div>

            <div>
                <h3>kia center</h3>
                <ul>
                    <li>고객센터 080-200-2000</li>
                    <li>평일 : 08:30 ~ 18:00</li>
                    <li>점심: 12:00 ~ 13:00</li>
                    <li>주말, 공휴일 휴무 입니다.</li>
                </ul>
            </div>

            <ul>
                <li><span>개인정보 처리방침</span></li>
                <li>프라이버시 센터</li>
                <li>이용약관</li>
                <li>윤리경영 사이버감사실</li>
                <li>전자공고</li>
                <li>사이트맵</li>
            </ul>
            
            <div>
                <div className="pc-flex">
                    <img
                        src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_kia_members.png"/>
                    <img
                        src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_facebook.svg"/>
                    <img
                        src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_instagram.svg"/>
                    <img
                        src="https://www.kia.com/etc.clientlibs/kwp-global/clientlibs/clientlib-site/resources/images/common/ic_youtube.svg"/>
                </div>
                <p><span>© Kia Corp</span>. All rights reserved</p>
                <div className="select-menu">
                    <div>
                        <ul className="options">
                            <li className="option">
                                <span className="option-text">현대자동차그룹</span>
                            </li>
                            <li className="option">
                                <span className="option-text">기아멤버스</span>
                            </li>
                            <li className="option">
                                <span className="option-text">기아 드라이빙 아카데미</span>
                            </li>
                            <li className="option">
                                <span className="option-text">인재채용</span>
                            </li>
                            <li className="option">
                                <span className="option-text">IR</span>
                            </li>
                        </ul>
                    </div>
                    <div className="select-btn">
                        <span className="sBtn-text active">Family site</span>
                        <img src="https://www.acebed.com/common/images/select-icon2-on.png"/>
                    </div>
                </div>
            </div>

        </div>
    </footer>
    );
};

export default Footer;