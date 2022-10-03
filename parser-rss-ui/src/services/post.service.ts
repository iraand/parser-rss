import http from "./http-common";
import { IResponseData, IPostToCreate, IPost } from "../types/posts.types";
import authHeader from "./auth-header";


const getAll = (props: string) => {
    return http.get<IResponseData>(`/posts${props}`, { headers: authHeader() });
};

const get = (id: any) => {
    return http.get<IPost>(`/posts/${id}`, { headers: authHeader() });
};

const create = (data: IPostToCreate) => {
    return http.post<IPostToCreate>("/posts", data, { headers: authHeader() });
};

const update = (id: any, data: IPost) => {
    return http.patch<IPost>(`/posts/${id}`, data, { headers: authHeader() });
};

const remove = (id: any) => {
    return http.delete<any>(`/posts/${id}`, { headers: authHeader() });
};

// const findByTitle = (title: string) => {
//     return http.get<Array<IPost>>(`/posts?query=${title}`);
// };

const PostService = {
    getAll,
    get,
    create,
    update,
    remove,
    // findByTitle,
};

export default PostService;