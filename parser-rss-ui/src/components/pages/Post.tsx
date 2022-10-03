import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PostDataService from "../../services/post.service";
import { IPost } from "../../types/posts.types";

import { Input, Space, Button, Popconfirm, message } from "antd";
import { FileDoneOutlined, DeleteOutlined } from "@ant-design/icons";

const Post: React.FC = () => {
 let _id = useParams(); //Post ID from url
 const navigate = useNavigate();

 const initialPostState = {
  _id: "",
  title: "",
  creator: "",
  link: "",
  content: "",
  contentSnippet: "",
  categories: [],
  pubDate: "",
  id: "",
 };
 const [currentPost, setCurrentPost] = useState<IPost>(initialPostState);
 const { TextArea } = Input;

 const getPost = async (id: any) => {
  PostDataService.get(id)
   .then((response: any) => {
    setCurrentPost(response.data.data);
   })
   .catch((e: Error) => {
    console.log(e);
   });
 };

 useEffect(() => { 
  const id = _id.id?.slice(1); //Post ID to request
  if (id) getPost(id);
 }, [_id]);

 const handleInputChange = (
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
 ) => {
  const { name, value } = event.target as HTMLInputElement;
  setCurrentPost({ ...currentPost, [name]: value });
 };

 const updatePost = (id: string, post: IPost) => {
  PostDataService.update(id, post)
   .then((response: any) => {
    openMessage();

   })
   .catch((e: Error) => {
    console.log(e);
   });
 };

 const removePost = (id: string) => {
  PostDataService.remove(id)
   .then((response: any) => {
    navigate("/posts");

   })
   .catch((e: Error) => {
    console.log(e);
   });
 };

 // Click Button "Delete Post" with confirmation
 const confirm = (id: string) =>
  new Promise((resolve) => {
   setTimeout(() => {
    resolve(null);
    removePost(id);
   }, 3000);
  });

 // Post Save Massage
 const key = "updatable";
 const openMessage = () => {
  message.loading({ content: "Savening...", key });
  setTimeout(() => {
   message.success({ content: "Saved!", key, duration: 2 });
  }, 1000);
 };

 return (
  currentPost && (
   <div className='conteiner post-conteiner max-w-2xl my-200 flex flex-col justify-center'>
    <label htmlFor='title'>Title</label>
    <Input
     showCount
     maxLength={20}
     onChange={handleInputChange}
     value={currentPost.title}
     required
     id='title'
     name='title'
    />
    <label htmlFor='creator'>Creator</label>
    <Input
     showCount
     maxLength={20}
     onChange={handleInputChange}
     value={currentPost.creator}
     required
     id='creator'
     name='creator'
    />
    <label htmlFor='link'>Link</label>
    <Input
     showCount
     maxLength={20}
     onChange={handleInputChange}
     value={currentPost.link}
     id='link'
     name='link'
    />
    <label htmlFor='contentSnippet'>Content Snippet</label>
    <TextArea
     id='contentSnippet'
     showCount
     maxLength={500}
     onChange={handleInputChange}
     value={currentPost.contentSnippet}
     name='contentSnippet'
    />
    <label htmlFor='content'>Content</label>
    <TextArea
     id='content'
     required
     showCount
     maxLength={1000}
     onChange={handleInputChange}
     value={currentPost.content}
     name='content'
    />
    <label htmlFor='categories'>Categories</label>
    <Input
     showCount
     maxLength={20}
     onChange={handleInputChange}
     value={currentPost.categories}
     id='categories'
     name='categories'
    />

    <div className='justify-center flex mt-8'>
     <Space>
      <Button
       type='primary'
       onClick={() => updatePost(currentPost.id, currentPost)}>
       <FileDoneOutlined /> Save
      </Button>
      <Popconfirm
       title='Are you sure delete this Post?'
       okText='Yes'
       cancelText='Cancel'
       onConfirm={() => confirm(currentPost.id)}>
       <Button>
        <DeleteOutlined />
        Delete Post
       </Button>
      </Popconfirm>
     </Space>
    </div>
   </div>
  )
 );
};

export default Post;
