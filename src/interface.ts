import { Dispatch, SetStateAction } from "react";

export interface IRouterProps {
    authentication : boolean;
}

export interface ISignFormProps {
    email: string,
    password: string,
    password2: string
}

export interface ICsFormProps {
    uid?: string,
    id?: string,
    email?: string,
    title: string,
    contents: string,
    category: string,
    createAt?: string,
    openCs?: string,
    comments?: ICommentProps[]
}

export interface ICsFormUpdateProps {
    isEdit : boolean,
}

export interface ICommentProps {
    uid?: string,
    id?: string,
    email?: string,
    contents: string,
    creatAt?: string,
}

export interface ICommentFormProps {
    detail: ICsFormProps,
    getDetailData: (id: string | undefined) => {}
}

export interface IPaginationProps {
    dataCount: number,
    dataPerPage: number,
    setStartPage: Dispatch<SetStateAction<number>>,
    basePath: string,
}