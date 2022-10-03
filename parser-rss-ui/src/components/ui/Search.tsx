import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AsyncSelect from "react-select/async";
import { Button, Space } from "antd";
import { useFilter } from "../../hooks/useFilter";
import { SearchOutlined } from "@ant-design/icons";

const Search: React.FC = () => {
 const navigate = useNavigate();

 const titles = useFilter({ url: `/?&title=1` });

 const titlesToSearch = titles.map((title) => ({
  label: title.title,
  value: title.id,
 }));

 interface ITitle {
  label: string;
  value: string;
 }
 //  const [loading, setLoading] =  useState(false);
 const [inputValue, setInputValue] = useState<string>("");
 const [selectedValue, setSelectedValue] = useState<ITitle>({
  label: "",
  value: "",
 });

 const filter = (inputValue: string) => {
  return titlesToSearch.filter((tile) =>
   tile.label.toLowerCase().includes(inputValue.toLowerCase())
  );
 };

 const loadOptions = (
  inputValue: string,
  callback: (options: ITitle[]) => void
 ) => {
  setTimeout(() => {
   callback(filter(inputValue));
  }, 1000);
 };

 const handleInputChange = (newValue: string) => {
  //   let inputVal = newValue.replace(/\W/g, "");
  //   setInputValue(inputVal);
  setInputValue(newValue);
  console.log(inputValue);
  return newValue;
 };

 const onChangeSelected = (selected: any) => {
  console.log(selected);
  setSelectedValue(selected);
  // setLoading(true);
  // setTimeout(() => {
  //  navigate(`/posts/:${selectedValue.value}`);
  // }, 1000);
 };

 const findPosts = () => {
  console.log(selectedValue.value);

  navigate(`/posts/:${selectedValue.value}`);
 };

 return (
  <Space className='find-section'>
   <AsyncSelect
    cacheOptions
    loadOptions={loadOptions}
    onInputChange={handleInputChange}
    onChange={onChangeSelected}
    placeholder={"Find Post by Title..."}
    className={"select"}
    defaultOptions={titlesToSearch}
   />
   <Button
    icon={<SearchOutlined />}
    shape='circle'
    type='primary'
    onClick={findPosts}
   />
  </Space>
 );
};

export default Search;
