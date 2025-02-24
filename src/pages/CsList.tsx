import { Link } from "react-router-dom";
import { ICsFormProps } from "../interface";
import { useState, useEffect, useCallback } from "react";
import {
  QuerySnapshot,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Pagination from "../components/Pagination";

const categories: string[] = [
  "전체",
  "차량 구매",
  "차량 정비",
  "기아멤버스",
  "기타",
];

const CsList = () => {
  const [csList, setCsList] = useState<ICsFormProps[]>([]);
  const [selectCategory, setSelectCategory] = useState<string>("전체");
  const dataCount = csList.length;

  // 문의리스트 렌더링
  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        let csRef = collection(db, "cs"); // cs의 전체 데이터
        let csQuery; // cs 필터링을 위한 쿼리문

        if (selectCategory === "전체") {
          csQuery = query(csRef, orderBy("createAt", "desc"));
        } else {
          // 카테고리 별 필터링
          csQuery = query(
            csRef,
            where("category", "==", selectCategory),
            orderBy("createAt", "desc")
          );
        }

        if (csQuery) {
          const data: QuerySnapshot = await getDocs(csQuery);
          // QuerySnapshot : getDocs를 반환하는 객체타입
          // 이 객체는 문서 데이터의 배열을 직접 포함하지 않고 docs 속성 안에 데이터가 들어있다.
          // -> 실제 데이터를 꺼내 ICsFormProps 형태로 변환해야한다.

          const csDataArray: ICsFormProps[] = data.docs.map((doc) => {
            const csData = doc.data();
            return {
              id: doc.id,
              title: csData.title,
              contents: csData.contents,
              category: csData.category,
              email: csData.email,
              createAt: csData.createAt,
              openCs: "none",
              comments: csData.comments || []
            };
          });
          setCsList(csDataArray);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    getData();
  }, [selectCategory]);

  const onToggleCs = useCallback((id: string | undefined) => {
    // csList에서 id에 해당하는 항목을 찾음
    setCsList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, openCs: item.openCs === "none" ? "block" : "none" }
          : item
      )
    );
  }, []);

  // 시작페이지
  const [startPage, setStartPage] = useState<number>(1);
    
  // 현재 페이지에 보여줄 데이터 (5)
  // ex: 1page: 1~5, 2page: 6~10, 3page: 11~15 .....
  const indexOfLastData = startPage * 5; // 3page * 5 = 15
  const indexOfFirstData = indexOfLastData - 5; // 15 - 5 = 10
  const currentDatas = csList.slice(indexOfFirstData, indexOfLastData);

  return (
    <article className="faq">
      <img src="https://d3337ehzyte0uu.cloudfront.net/static/media/logo_Black_Large.jpg" />
      <h1>faq</h1>

      <div>
        <div>
          <h2>문의하기</h2>
        </div>

        <div>
          <h5>
            찾으시는 질문이 없으신가요?
            <br />
            kia 1:1 상담에 문의해주세요.
          </h5>
          <button>
            <Link to="/cs/create">1:1 상담하기</Link>
          </button>
        </div>

        <div>
          <ul>
            {categories.map((c) => (
              <li tabIndex={0} key={c} onClick={() => setSelectCategory(c)}>
                {c}
              </li>
            ))}
          </ul>
          {csList?.length > 0 ? (
            currentDatas.map((cs) => (
              <section key={cs.id}>
                <div onClick={() => onToggleCs(cs.id)}>
                  <p>작성자: {cs.email?.split("@")[0]}</p>
                  <h5>Q. {cs.title}</h5>
                </div>
                <div className="open-qna" style={{ display: `${cs.openCs}` }}>
                  <div className="qna-box">
                    <h5>질문</h5>
                    <p>{cs.title}</p>
                    <Link to={`/cs/${cs.id}/detail`}>
                      <p>질문 자세히 보기</p>
                    </Link>
                  </div>
                  <div>
                    <h5>답변</h5>
                    {cs.comments?.length === 0 ? (
                      <p>
                        아직 질문에 답변이 달리지 않았습니다. 영업일 기준 3일
                        이내로 회신드립니다.
                      </p>
                    ) : (
                      <p>
                        {cs.comments?.[0].contents}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            ))
          ) : (
            <section className="cs-none">문의가 없습니다.</section>
          )}
        </div>
        <Pagination dataCount={dataCount} dataPerPage={5} setStartPage={setStartPage} basePath="cs"/>
      </div>
    </article>
  );
};

export default CsList;
