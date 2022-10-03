import React, { useState, useContext } from "react";
import AuthService from "../../services/auth.service";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { UserContext } from "../../context/user.context";
import { Button, Form, Input, Alert, Spin } from "antd";

export const Login: React.FC = () => {
 //  const validationSchema = Yup.object().shape({
 //   login: Yup.string()
 //    .required("Login is required")
 //    .min(6, "Login must be at least 6 characters")
 //    .max(20, "Login must not exceed 20 characters"),
 //   password: Yup.string()
 //    .required("Password is required")
 //    .min(6, "Password must be at least 6 characters")
 //    .max(40, "Password must not exceed 40 characters"),
 //  });

 //  const formik = useFormik({
 //   initialValues: {
 //    login: "",
 //    password: "",
 //   },
 //   validationSchema,
 //   validateOnChange: true,
 //   validateOnBlur: true,
 //   onSubmit: (data) => {
 //    console.log(JSON.stringify(data, null, 2));
 //   },
 //  });
 const { user, setUser } = useContext(UserContext);
 const [loading, setLoading] = useState<boolean>(false);
 const [message, setMessage] = useState<any>();

 const onFinish = (values: { username: string; password: string }) => {
  const { username, password } = values;
  console.log("Success:", values);

  setMessage("");
  setLoading(true);

  AuthService.login({ username, password }).then(
   (response) => {
    setUser(response);
    console.log(user);
   },
   (error) => {
    const resMessage =
     (error.response && error.response.data && error.response.data.message) ||
     error.message ||
     error.toString();

    setLoading(false);
    setMessage(resMessage);
   }
  );
 };

 const onFinishFailed = (error: any) => {
  console.log("Failed:", error);

  setLoading(false);
  setMessage(error);
 };

 const onCloseMessage = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
 ) => {
  console.log(e, "I was closed.");
 };

 return (
  <div className='conteiner max-w-6xl my-200 flex flex-col justify-center'>
   <Form
    name='basic'
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete='off'>
    <Form.Item
     label='Login'
     name='username'
     rules={[{ required: true, message: "Please input your login!" }]}>
     <Input placeholder='tom' />
    </Form.Item>

    <Form.Item
     label='Password'
     name='password'
     rules={[{ required: true, message: "Please input your password!" }]}>
     <Input.Password placeholder='123456789' />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
     <Button type='primary' htmlType='submit'>
      Submit
     </Button>
    </Form.Item>
   </Form>

   {loading && <Spin size='large' />}

   {message && (
    <div className='mx-auto min-w-[30%]'>
     <Alert
      message='Error!'
      description={message}
      type='error'
      closable
      onClose={onCloseMessage}
     />
    </div>
   )}
  </div>
 );
};
