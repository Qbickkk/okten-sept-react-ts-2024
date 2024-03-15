import {IResponse} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IPost} from "../interfaces";

const postService = {

    getAll: (): IResponse<IPost[]> => apiService.get(urls.posts.base),
    getById: (id: number): IResponse<IPost> => apiService.get(urls.posts.byId(id))
};

export {
    postService
}