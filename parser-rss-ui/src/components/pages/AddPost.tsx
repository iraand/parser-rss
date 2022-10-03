import React, { useState, ChangeEvent } from "react";

import PostDataService from "../../services/post.service";

import { Input, Button, Result } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";

import { IPostToCreate } from "../../types/posts.types";

const { TextArea } = Input;

const AddPost: React.FC = () => {
 const initialPostState = {
  title: "",
  creator: "",
  link: "",
  content: "",
  contentSnippet: "",
  categories: [],
 };
 const [post, setPost] = useState<IPostToCreate>(initialPostState);
 const [submitted, setSubmitted] = useState<boolean>(false);
 const [postId, setPostId] = useState<string>("");

 const handleInputChange = (
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
 ) => {
  const { name, value } = event.target as HTMLInputElement;
  setPost({ ...post, [name]: value });
 };

 const savePost = () => {
  var data = {
   title: post.title,
   creator: post.creator,
   link: post.link,
   content: post.content,
   contentSnippet: post.contentSnippet,
   categories: post.categories,
  };

  PostDataService.create(data)
   .then((response: any) => {
    setPostId(response.data.data.id);
    setSubmitted(true);
   })
   .catch((e: Error) => {
    console.log(e);
   });
 };

 const newPost = () => {
  setPost(initialPostState);
  setSubmitted(false);
 };

 return (
  <div className='conteiner post-conteiner max-w-2xl my-200 flex flex-col justify-center'>
   {submitted ? (
    <div>
     <Result
      status='success'
      title='Post was added successfully!'
      subTitle={`Post Id: ${postId}`}
      extra={[
       <Button type='primary' onClick={newPost} key='console'>
        Add Post
       </Button>,
      ]}
     />
    </div>
   ) : (
    <div>
     <label htmlFor='title'>Title*</label>
     <Input
      showCount
      maxLength={20}
      onChange={handleInputChange}
      value={post.title}
      required
      id='title'
      name='title'
     />
     <label htmlFor='creator'>Creator*</label>
     <Input
      showCount
      maxLength={20}
      onChange={handleInputChange}
      value={post.creator}
      required
      id='creator'
      name='creator'
     />
     <label htmlFor='link'>Link</label>
     <Input
      showCount
      maxLength={20}
      onChange={handleInputChange}
      value={post.link}
      id='link'
      name='link'
     />
     <label htmlFor='contentSnippet'>Content Snippet*</label>
     <TextArea
      id='contentSnippet'
      showCount
      maxLength={500}
      onChange={handleInputChange}
      value={post.contentSnippet}
      name='contentSnippet'
      required
     />
     <label htmlFor='content'>Content*</label>
     <TextArea
      id='content'
      required
      showCount
      maxLength={1000}
      onChange={handleInputChange}
      value={post.content}
      name='content'
     />
     <label htmlFor='categories'>Categories</label>
     <Input
      showCount
      maxLength={20}
      onChange={handleInputChange}
      value={post.categories}
      id='categories'
      name='categories'
     />
     <Button type='primary' id='button-add' onClick={savePost}>
      <FileDoneOutlined /> Add Post
     </Button>
    </div>
   )}
  </div>
 );
};

export default AddPost;
