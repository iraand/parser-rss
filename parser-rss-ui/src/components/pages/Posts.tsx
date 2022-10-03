import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostDataService from "../../services/post.service";
import Search from "../ui/Search";

import { IPost } from "../../types/posts.types";
import {
 EditOutlined,
 DeleteOutlined,
 DoubleRightOutlined,
 SearchOutlined,
 SortAscendingOutlined,
 SortDescendingOutlined,
} from "@ant-design/icons";

import type { InputRef } from "antd";
import { Button, Tooltip, Popconfirm, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

const Posts: React.FC = () => {
 const [posts, setPosts] = useState<Array<IPost>>([]);
 const [size, setSize] = useState<number>(10);
 const [page, setPage] = useState<number>(1);
 const [totalPosts, setTotalPosts] = useState<number>(1);
 const [postsOrder, setPostsOrder] = useState<string>("");

 const navigate = useNavigate();

 type DataIndex = keyof IPost;

 useEffect(() => {
  const url = () => {
   if (postsOrder.length > 0) {
    return `/?size=${size}&page=${page}&order=${postsOrder}`;
   }
   return `/?size=${size}&page=${page}`;
  };

  retrievePosts(url());
  navigate(url());
  
 }, [page, size, navigate, postsOrder]);

 const retrievePosts = (props: string) => {
  PostDataService.getAll(props)
   .then((response: any) => {
    const allPosts = response.data.data.docs.map(
     (
      post: {
       id: any;
       pubDate: string | number | Date;
       categories: [];
      },
      i: number
     ) => ({
      ...post,
      key: post.id,
      pubDate: new Date(post.pubDate).toLocaleString(),
      num: response.data.data.pagingCounter + i,
     })
    );
    setPosts(allPosts);
    setTotalPosts(() => response.data.data.totalDocs);
    console.log(response.data.data);
   })
   .catch((e: Error) => {
    console.log(e);
   });
 };

 const sortPosts = (sort: string) => {
  setPostsOrder(sort);
 };

 const tablePagination = {
  total: totalPosts,
  pageSizeOptions: ["10", "20", "50", "100"],
  showTotal: (total: number, range: number[]) =>
   `${range[0]}-${range[1]} of ${total} items`,
  showSizeChanger: true,
  onChange: (pageNumber: number) => {
   setPage(pageNumber);
  },
  onShowSizeChange: (current: number, pageSize: number) => {
   setSize(pageSize);
  },
 };

 const removePost = (id: string) => {
  PostDataService.remove(id)
   .then((response: any) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
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

 const [searchText, setSearchText] = useState("");
 const [searchedColumn, setSearchedColumn] = useState("");
 const searchInput = useRef<InputRef>(null);

 const handleSearch = (
  selectedKeys: string[],
  confirm: (param?: FilterConfirmProps) => void,
  dataIndex: DataIndex
 ) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
 };

 const handleReset = (clearFilters: () => void) => {
  clearFilters();
  setSearchText("");
 };

 const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IPost> => ({
  filterDropdown: ({
   setSelectedKeys,
   selectedKeys,
   confirm,
   clearFilters,
  }) => (
   <div style={{ padding: 8 }}>
    <Input
     ref={searchInput}
     placeholder={`Search ${dataIndex}`}
     value={selectedKeys[0]}
     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
     onPressEnter={() =>
      handleSearch(selectedKeys as string[], confirm, dataIndex)
     }
     style={{ marginBottom: 8, display: "block" }}
    />
    <Space>
     <Button
      type='primary'
      onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
      icon={<SearchOutlined />}
      size='small'
      style={{ width: 90 }}>
      Search
     </Button>
     <Button
      onClick={() => clearFilters && handleReset(clearFilters)}
      size='small'
      style={{ width: 90 }}>
      Reset
     </Button>
     <Button
      type='link'
      size='small'
      onClick={() => {
       confirm({ closeDropdown: false });
       setSearchText((selectedKeys as string[])[0]);
       setSearchedColumn(dataIndex);
      }}>
      Filter
     </Button>
    </Space>
   </div>
  ),
  filterIcon: (filtered: boolean) => (
   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) =>
   record[dataIndex]
    .toString()
    .toLowerCase()
    .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
   if (visible) {
    setTimeout(() => searchInput.current?.select(), 100);
   }
  },
  render: (text) =>
   searchedColumn === dataIndex ? (
    <Highlighter
     highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
     searchWords={[searchText]}
     autoEscape
     textToHighlight={text ? text.toString() : ""}
    />
   ) : (
    text
   ),
 });

 const columns: ColumnsType<IPost> = [
  {
   title: "Num.",
   dataIndex: "num",
   key: "num",
   width: "1%",
  },
  Table.EXPAND_COLUMN,
  {
   title: "Title",
   dataIndex: "title",
   key: "title",
   width: "30%",
   ...getColumnSearchProps("title"),
   sorter: (a, b) => a.title.length - b.title.length,
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Categories",
   dataIndex: "categories",
   key: "age",
   ...getColumnSearchProps("categories"),
   responsive: ["lg"],
   render: (_, record) => record.categories.join(", "),
  },
  {
   title: "Link",
   dataIndex: "link",
   key: "link",
   responsive: ["md"],
   render: (_, record) => (
    <a href={record.link} target='blank' className='post-link'>
     <DoubleRightOutlined />
    </a>
   ),
  },
  {
   title: "Avtor",
   dataIndex: "creator",
   key: "creator",
   width: "0%",
   responsive: ["sm"],
   ...getColumnSearchProps("creator"),
   sorter: (a, b) => a.creator.length - b.creator.length,
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Date",
   dataIndex: "pubDate",
   key: "pubDate",
   render: (_, record) => <span className='post-link'>{record.pubDate}</span>,
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Edit / Delete",
   key: "action",
   render: (_, record) => (
    <Space id='buttons'>
     <Tooltip placement='top' title={<span>Edit Post</span>}>
      <Button onClick={() => navigate(`/posts/:${record.id}`)}>
       <EditOutlined />
      </Button>
     </Tooltip>
     <Tooltip placement='top' title={<span>Delete Post</span>}>
      <Popconfirm
       title='Are you sure delete this Post?'
       okText='Yes'
       cancelText='Cancel'
       onConfirm={() => confirm(record.id)}>
       <Button>
        <DeleteOutlined />
       </Button>
      </Popconfirm>
     </Tooltip>
    </Space>
   ),
  },
 ];

 return (
  <div className='conteiner max-w-6xl my-200 flex flex-col justify-center'>
   <Space className='top-section'>
    <Search />
    <Tooltip placement='top' title={<span>Descending order by Title</span>}>
     <Button>
      <SortDescendingOutlined
       className='icon-sort'
       onClick={() => sortPosts("desc")}
      />
     </Button>
    </Tooltip>
    <Tooltip placement='top' title={<span>Ascending order by Title</span>}>
     <Button>
      <SortAscendingOutlined
       className='icon-sort'
       onClick={() => sortPosts("asc")}
      />
     </Button>
    </Tooltip>
   </Space>
   <Table
    columns={columns}
    dataSource={posts}
    expandable={{
     expandedRowRender: (record) => (
      <>
       <span className='text-gray-400 italic'>Content Snippet:</span>
       <p>{record.contentSnippet}</p>
      </>
     ),
     rowExpandable: (record) => record.title !== "Not Expandable",
    }}
    pagination={tablePagination}
   />
  </div>
 );
};

export default Posts;
