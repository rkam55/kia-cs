import { useEffect, useState, useCallback, useContext } from "react";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { ICsFormProps } from "../interface";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { AuthContext } from "../context/AuthContext";

const CsDetail = () => {
  const {user} = useContext(AuthContext);
  const { id } = useParams();
  const [detail, setDetail] = useState<ICsFormProps | null>(null);
  const navigate = useNavigate();

  const getDetailData = async (id: string | undefined) => {
    try {
      if (id) {
        const docRef = doc(db, "cs", id); // cs DB의 id
        const detailDoc = await getDoc(docRef); // id에 해당하는 doc 조회
        setDetail({
          id: detailDoc.id,
          ...(detailDoc?.data() as ICsFormProps),
          // title: detailDoc?.data()?.title,
          // contents: detailDoc?.data()?.contents,
          // email: detailDoc?.data()?.email,
          // .....
        });
        // ...detailDoc?.data()만 작성했을 때 타입 에러가 떴다.
        // 이 데이터는 title, contents, email, createAt이 포함되어 있는거 아니야?
        // 왜 사용하지 않아? 라는 질문으로 추정되는 에러가 떴는데
        // 타입스크립트를 사용한다면 타입 정의를 올바르게 하는게 중요한 것 같다.
      }
    } catch (e: any) {
      alert("문의가 존재하지 않습니다.");
    }
  };

  useEffect(() => {
    getDetailData(id);
  }, [id]);

  const goEditDetail = () => {
    if(user?.uid === detail?.uid) {
      navigate(`/cs/${id}/edit`);
    } else {
      alert("본인 글만 수정할 수 있습니다.");
    }
  }

  const onClickDelete = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    try {
      if (detail && detail.id) {
        if(user?.uid === detail?.uid){
          await deleteDoc(doc(db, "cs", detail.id));
          alert("삭제 되었습니다.");
          navigate("/cs");
        } else {
          alert("본인 글만 삭제할 수 있습니다.");
        }
      }
    } catch (e: any) {
      alert("삭제가 정상적으로 진행되지 않았습니다.");
    }
  };

  return (
    <article className="qna-board">
      <img src="https://d3337ehzyte0uu.cloudfront.net/static/media/logo_Black_Large.jpg" />
      <h1>qna</h1>

      <div>
        <div>
          <h2>문의 내용</h2>
        </div>

        {detail ? (
          <>
            <div>
              <div>
                <p>문의 유형</p>
                <div>
                  <select name="category" disabled>
                    <option value={detail?.category}>{detail?.category}</option>
                  </select>
                </div>
              </div>
              <div>
                <p>제목</p>
                <input
                  name="title"
                  value={detail?.title}
                  type="text"
                  readOnly
                />
              </div>
              <div>
                <p>문의내용</p>
                <textarea
                  name="contents"
                  value={detail?.contents}
                  rows={12}
                  readOnly
                ></textarea>
              </div>
              <button className="black-btn" onClick={goEditDetail}>
                수정하기
              </button>
              <button type="button" onClick={onClickDelete}>
                삭제하기
              </button>
            </div>
            <CommentForm detail={detail} getDetailData={getDetailData} />
            <CommentList detail={detail} getDetailData={getDetailData}/>
          </>
        ) : (
          <div>문의가 존재하지 않습니다.</div>
        )}
      </div>
    </article>
  );
};

export default CsDetail;
