export interface IPost {
    _id: string;
    title: string;
    creator: string;
    link: string;
    content: string;
    contentSnippet: string;
    categories: string[];
    pubDate: string;
    id: string;
}

export interface IResponseData {
    docs: IPost[];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage?: any;
    nextPage: number;
}


export interface IPostToCreate {
    title: string;
    creator: string;
    link?: string;
    content: string;
    contentSnippet?: string;
    categories?: Array<string>;
}

export interface RootObject {
    data: IResponseData;
}


