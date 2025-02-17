import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ICommentFormProps, ICommentProps } from "../interface";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const CommentList = ({ detail, getDetailData }: ICommentFormProps) => {
  const { user } = useContext(AuthContext);

  const onClickDelete = async (data: ICommentProps): Promise<void> => {
    try {
      alert("댓글을 삭제하시겠습니까?");
      if (detail && detail.id) {
        const detailRef = doc(db, "cs", detail.id);

        // 본인 댓글만 삭제 가능
        if (user?.uid === data.uid) {
          await updateDoc(detailRef, { comments: arrayRemove(data) });
          await getDetailData(detail.id); // 문서 업데이트
        } else {
            alert("본인 댓글만 삭제할 수 있습니다.")
        }
      }
    } catch (e: any) {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="cs-comment">
      <h5>댓글 {detail.comments ? detail.comments?.length : "0"}개</h5>
      {detail.comments ? (
        detail.comments?.map((comment) => (
          <section key={comment.id}>
            <img src="https://user-images.githubusercontent.com/112612653/189023768-c2387f31-2463-4198-9078-3e3eaa56f7a0.png" />
            <div>
              <h5>{comment.email?.split("@")[0]}</h5>
              <p>{comment.contents}</p>
            </div>
            <img
              src="https://user-images.githubusercontent.com/112612653/189023767-c8fd2d91-9928-41bd-a758-b94befaafe23.png"
              onClick={() => onClickDelete(comment)}
            />
          </section>
        ))
      ) : (
        <section><p>댓글이 없습니다.</p></section>
      )}
    </div>
  );
};

export default CommentList;
