import { useState, useEffect } from "react";
import PostDataService from "../services/post.service";

// interface ICategories {
//  categories: Array<string>;
//  id: string;
// }

interface ITitle {
 title: string;
 id: string;
}

export const useFilter = (props:{url: string}) => {
  //const [filterCategories, setFilterCategories] = useState< ICategories[] >([]);
  const [filterTitles, setFilterTitles] = useState< ITitle[] >([])

 useEffect(() => {
  retrievePosts(props.url);
 },[props]);

 const retrievePosts = (props: string) => {
 
  PostDataService.getAll(props)
   .then((response: any) => {
    const res = response.data.data;
    setFilterTitles(res);
   })
   .catch((e: Error) => {
    console.log(e);
   });
 };

 return filterTitles;
};
