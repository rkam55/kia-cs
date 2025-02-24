import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback,useContext } from "react";
import { app, db } from "../firebase";
import {
  QuerySnapshot,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ICsFormProps } from "../interface";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Pagination from "../components/Pagination";

const Mypage = () => {
  // 나의 문의 확인 (나의 글만 확인), 로그아웃
  const navigate = useNavigate();
  const auth = getAuth(app);
  const {user} = useContext(AuthContext);

  const [csList, setCsList] = useState<ICsFormProps[]>([]);

  const onClickLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (e: any) {
      alert(e);
    }
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        let csRef = collection(db, "cs");
        let csQuery = query(
          csRef,
          where("uid", "==", user?.uid),
          orderBy("createAt", "desc")
        );

        if (csQuery) {
          const data: QuerySnapshot = await getDocs(csQuery);

          const myCsListArray: ICsFormProps[] = data.docs.map((doc) => {
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
          setCsList(myCsListArray);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const onToggleCs = useCallback((id: string | undefined) => {
    setCsList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, openCs: item.openCs === "none" ? "block" : "none" }
          : item
      )
    );
  }, []);

  const [startPage, setStartPage] = useState<number>(1);
  const dataCount = csList.length; // 29
  const indexOfLastData = startPage * 3; // 1 * 3
  const indexOfFirstData = indexOfLastData - 3;
  const currentDatas = csList.slice(indexOfFirstData, indexOfLastData);

  return (
    <>
      <article className="my-qna-list">
        <section className="display-flex">
          <img src="https://user-images.githubusercontent.com/112612653/189023768-c2387f31-2463-4198-9078-3e3eaa56f7a0.png" />
          <div>
            <p>회원 정보</p>
            <h4>{user?.email}</h4>
          </div>
          <button onClick={onClickLogout}>
            <p>로그아웃</p>
          </button>
        </section>

        <div>
          <div>
            <h2>문의 내역</h2>
          </div>

          <div>
            <h5>
              1:1 문의 내역이 <span>{csList.length}</span>건이 있습니다.
            </h5>
            <div>
              {csList ? (
                currentDatas.map((cs) => (
                  <section key={cs.uid}>
                    <div
                      className="my-qna-btn"
                      onClick={() => onToggleCs(cs.id)}
                    >
                      <button>{cs.createAt}</button>
                      <p>{cs.title}</p>
                      <img
                        src="https://www.acebed.com/common/images/select-icon2-on.png"
                        className="arrowbtn"
                      />
                    </div>
                    <div
                      className="open-qna"
                      style={{ display: `${cs.openCs}` }}
                    >
                      <div className="qna-box">
                        <h5>질문</h5>
                        <p>{cs.title}</p>
                        <Link to={`/cs/${cs.id}`}>
                          <p>질문 자세히 보기</p>
                        </Link>
                      </div>
                      <div>
                        <h5>답변</h5>
                        {cs.comments?.length === 0 ? <p>
                          아직 질문에 답변이 달리지
                          않았습니다. 영업일 기준 3일 이내로 회신드립니다.
                        </p>
                        :
                        <p>
                          {cs.comments?.[0].contents}
                        </p>
                        }
                      </div>
                    </div>
                  </section>
                ))
              ) : (
                <section></section>
              )}
            </div>
          </div>
          <Pagination dataCount={dataCount} dataPerPage={3} setStartPage={setStartPage} basePath="mypage"/>
        </div>
      </article>
    </>
  );
};

export default Mypage;
