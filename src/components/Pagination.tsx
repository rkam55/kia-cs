import { useEffect, useState } from "react";
import { IPaginationProps } from "../interface";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import cn from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";

const Pagination = (props: IPaginationProps) => {
  // 데이터의 개수, 시작페이지
  const { dataCount, dataPerPage, setStartPage, basePath } = props;
  const { number } = useParams();
  const navigate = useNavigate();

  // 페이지 수가 변경될 때마다 useEffect
  useEffect(() => {
    setPageCount(Math.ceil(dataCount / dataPerPage));
  }, [dataCount]);

  // 페이지-라우팅에 따른 데이터 초기화 방지
  useEffect(() => {
    const pageParam = number ? parseInt(number) : 1;
    setSelectPage(pageParam);
  }, [number]);

  // 페이지 수
  const [pageCount, setPageCount] = useState<number>(
    Math.ceil(dataCount / dataPerPage)
  );

  const [groupStartPage, setGroupStartPage] = useState<number>(1);
  const [selectPage, setSelectPage] = useState<number>(1);

  // pages 배열 추가 (5개까지만 들어가도록 )
  //   const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const pages = Array.from(
    { length: dataPerPage },
    (_, index) => index + groupStartPage
  ).filter((page) => page <= pageCount);

  const onClickPrevPage = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    setStartPage((prev: number) => {
      if (prev - dataPerPage <= 0) {
        if (prev === 1) {
          alert("첫 페이지입니다.");
          setSelectPage(prev);
          navigate(`/${basePath}/${prev}`);
          setGroupStartPage(1);
          return prev;
        }
        setSelectPage(1);
        navigate(`/${basePath}/${1}`);
        setGroupStartPage(1);
        return 1;
      } else {
        setGroupStartPage(groupStartPage - dataPerPage);
        setSelectPage(prev - dataPerPage);
        navigate(`/${basePath}/${prev - dataPerPage}`);
        return prev - dataPerPage;
      }
    });
  };

  const onClickNextPage = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    setStartPage((prev: number) => {
      console.log("prev" + prev);
      if (prev + dataPerPage - 1 >= pageCount) {
        if (prev === pageCount) {
          alert("마지막 페이지입니다.");
          return pageCount;
        }
        setSelectPage(pageCount);
        navigate(`/${basePath}/${pageCount}`);
        setGroupStartPage(
          Math.floor((pageCount - 1) / dataPerPage) * dataPerPage + 1
        ); // 마지막 그룹으로 설정
        return pageCount;
      } else {
        setGroupStartPage(groupStartPage + dataPerPage);
        setSelectPage(prev + dataPerPage);
        navigate(`/${basePath}/${prev + dataPerPage}`);
        return prev + dataPerPage;
      }
    });
  };

  const onClickPagination = (e: React.MouseEvent<HTMLSpanElement>) => {
    setStartPage(Number(e.currentTarget.id));
    setSelectPage(Number(e.currentTarget.id));
    navigate(`/${basePath}/${selectPage}`);
  };

  return (
    <div className="pagination display-flex">
      <MdNavigateBefore size={20} onClick={onClickPrevPage} />
      <div>
        {pages.map((page) => (
          <Link
            to={`/${basePath}/${page}`}
            key={page}
            id={String(page)}
            style={{ margin: "8px" }}
            onClick={onClickPagination}
            className={cn("pagination", { focus: selectPage === page })}
          >
            {page}
          </Link>
        ))}
      </div>
      <MdNavigateNext size={20} onClick={onClickNextPage} />
    </div>
  );
};

export default Pagination;
