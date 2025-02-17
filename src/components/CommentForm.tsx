import { useCallback, useState, useContext } from "react";
import { ICommentFormProps} from "../interface";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const CommentForm = ({ detail, getDetailData }: ICommentFormProps) => {
  
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState<string>("");

  const onchangeComment = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    [comment]
  );

  const onSubmitComment = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        // 어떤 게시물에 댓글을 작성하는지 알기 위해 id로 조회
        if (detail && detail.id) {
          const detailRef = doc(db, "cs", detail.id);

          // 사용자 인증이 된 유저만 댓글 작성 가능
          if (user?.uid) {
            const myComment = { // 임의 댓글 객체
              uid: user?.uid,
              email: user?.email,
              contents: comment,
              creatAt: new Date().toLocaleDateString(),
            };

            await updateDoc(detailRef, {
              comments : arrayUnion(myComment)
              // comments는 댓글 배열이기 때문에 arrayUnion을 사용해
              // 작성한 댓글 객체를 추가해준다.
            });

            await getDetailData(detail.id); // 문서 업데이트
          }
        }
        setComment("");
      } catch (e: any) {
        alert("댓글이 정상적으로 등록되지 않았습니다.");
      }
    },
    [comment]
  );

  return (
    <form onSubmit={onSubmitComment} className="cs-comment-form">
      <textarea
        placeholder="댓글을 입력하세요."
        rows={5}
        name="contents"
        onChange={onchangeComment}
      ></textarea>
      <button className="black-btn">등록하기</button>
    </form>
  );
};

export default CommentForm;
