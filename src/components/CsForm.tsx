import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { ICsFormProps, ICsFormUpdateProps } from "../interface";
import { useState, useCallback, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CsForm = ({ isEdit }: ICsFormUpdateProps) => {
  // 문의하기 폼 (수정, 디테일)
  // const auth = getAuth(app);
  const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  // 수정하는 id 값 가져오기
  const { id } = useParams();

  // 수정할 폼 데이터
  const [csEdit, setCsEdit] = useState<ICsFormProps | null>(null);
  const [csForm, setCsForm] = useState<ICsFormProps>({
    category: "",
    title: "",
    contents: "",
  });

  const [isValid, setIsValid] = useState<ICsFormProps>({
    category: "",
    title: "",
    contents: "",
  });

  // 수정하기를 누르면 데이터가 초기화됨
  // id가 존재하면 그 id에 대한 데이터를 가져와 csEdit에 저장
  useEffect(() => {
    const getEditData = async (id: string) => {
      if (id) {
        try {
          const csRef = doc(db, "cs", id);
          const csData = await getDoc(csRef);

          // 내가 등록했던 데이터를 state
          setCsEdit({
            id: csData.id,
            ...(csData?.data() as ICsFormProps),
          });
        } catch (e: any) {
          alert("");
        }
      }
    };
    if (id) {
      getEditData(id);
    }
  }, [id]);

  // csEdit가 변경될 때마다 기존의 csForm 값을 변경
  useEffect(() => {
    // csEdit이 있다면 (기존 입력했던 값이 있다면) state
    // -> 수정페이지 이동했을 때 데이터 유지
    setCsForm({
      title: csEdit?.title || "",
      contents: csEdit?.contents || "",
      category: csEdit?.category || "",
    });
  }, [csEdit]);

  const onChangeCsForm = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;

      setCsForm({
        ...csForm,
        [name]: value,
      });

      if (name === "title") {
        if (value) {
          setIsValid((prevState) => ({
            ...prevState,
            title: "",
          }));
        }
      }

      if (name === "contents") {
        if (value) {
          setIsValid((prevState) => ({
            ...prevState,
            contents: "",
          }));
        }
      }

      if (name === "category") {
        if (value) {
          setIsValid((prevState) => ({
            ...prevState,
            category: "",
          }));
        }
      }
    },
    [csForm]
  );

  const onSubmitCsForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (!csForm.category || !csForm.title || !csForm.contents) {
          if (!csForm.category) {
            setIsValid((prevState) => ({
              ...prevState,
              category: "문의유형을 선택해주세요.",
            }));
          } else {
            setIsValid((prevState) => ({
              ...prevState,
              category: "",
            }));
          }

          if (!csForm.title) {
            setIsValid((prevState) => ({
              ...prevState,
              title: "제목을 입력해주세요.",
            }));
          } else {
            setIsValid((prevState) => ({
              ...prevState,
              title: "",
            }));
          }

          if (!csForm.contents) {
            setIsValid((prevState) => ({
              ...prevState,
              contents: "내용을 입력해주세요.",
            }));
          } else {
            setIsValid((prevState) => ({
              ...prevState,
              contents: "",
            }));
          }
        } else {
          if (csEdit && csEdit.id) {
            // 수정
            const updateRef = doc(db, "cs", csEdit?.id);
              await updateDoc(updateRef, {
                title: csForm.title,
                contents: csForm.contents,
                category: csForm.category,
                createAt: new Date().toLocaleDateString(),
              });
              alert("문의가 정상적으로 수정되었습니다. 감사합니다.");
              navigate(`/cs/${csEdit.id}`);
          } else {
            await addDoc(collection(db, "cs"), {
              // 등록
              uid: user?.uid,
              email: user?.email,
              title: csForm.title,
              contents: csForm.contents,
              category: csForm.category,
              createAt: new Date().toLocaleDateString(),
            });
            alert("문의가 정상적으로 등록되었습니다. 감사합니다.");
            navigate("/cs");
          }
        }
      } catch (e: any) {
        alert("정보를 바르게 입력해주세요.");
      }
    },
    [csForm]
  );

  return (
    <article className="qna-board">
      <img src="https://d3337ehzyte0uu.cloudfront.net/static/media/logo_Black_Large.jpg" />
      <h1>qna</h1>

      <div>
        <div>
          <h2>1:1 상담 문의 {isEdit ? "수정" : "등록"}</h2>
          <p>
            문의사항에 대한 답변은 고객님의 이메일 계정으로 회신드리며,
            마이페이지의 1:1 문의에서도 확인하실 수 있습니다.
          </p>
        </div>

        <form onSubmit={onSubmitCsForm}>
          <div>
            <p>문의 유형</p>
            <div>
              <select
                name="category"
                onChange={onChangeCsForm}
                defaultValue={csForm.category}
              >
                <option value="">문의 유형</option>
                <option value="차량 구매">차량 구매</option>
                <option value="차량 정비">차량 정비</option>
                <option value="기아멤버스">기아멤버스</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>
          <p className="error-vaild">{isValid.category}</p>
          <div>
            <p>제목</p>
            <input
              name="title"
              type="text"
              placeholder="제목을 입력하세요."
              onChange={onChangeCsForm}
              defaultValue={csForm.title}
            />
          </div>
          <p className="error-vaild">{isValid.title}</p>
          <div>
            <p>문의내용</p>
            <textarea
              name="contents"
              placeholder="문의 내용을 입력하세요.(2000자 이내)"
              rows={12}
              onChange={onChangeCsForm}
              defaultValue={csForm.contents}
            ></textarea>
          </div>
          <p className="error-vaild">{isValid.contents}</p>
          <button type="submit" className="black-btn">
            {isEdit ? "수정하기" : "등록하기"}
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            취소하기
          </button>
        </form>
      </div>
    </article>
  );
};

export default CsForm;
