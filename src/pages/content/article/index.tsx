import React, { useEffect } from 'react';
import { Flex, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { getArticleList } from '@/api/content/article';
import { useState } from 'react';
import type { ArticleItem } from '@/api/content/article/type';
import timeFormatter from '@/utils/timeFormatter';
const Article = () => {
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(false);
  // 合并查询参数到一个状态中，便于管理
  const [queryParams, setQueryParams] = useState({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  // 分离“结果状态”（total）和“入参状态”（queryParams）
  const [total, setTotal] = useState(0);

  // 定义组件内稳定的 columns 渲染配置
  const columns: TableProps<ArticleItem>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '封面',
      dataIndex: 'cover_img',
    },
    {
      title: '简介',
      dataIndex: 'abstract',
    },
    {
      title: '标签',
      dataIndex: 'tag',
      // render: (_, { tag }) => (
      //   <Space size={2} wrap>
      //     {tag &&
      //       tag.map((item: string) => (
      //         <Tag color="blue" key={item}>
      //           {item.toUpperCase()}
      //         </Tag>
      //       ))}
      //   </Space>
      // ),
    },
    {
      title: '发布时间',
      dataIndex: 'publish_date',
      render: (_, { publish_date }) => timeFormatter(publish_date),
    },
    {
      title: '最后更新时间',
      dataIndex: 'last_edit_date',
      render: (_, { last_edit_date }) => timeFormatter(last_edit_date),
    },
    {
      title: '访问量',
      dataIndex: 'view',
    },
    {
      title: '点赞量',
      dataIndex: 'star',
    },
    {
      title: '评论量',
      dataIndex: 'comment_count',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      render: () => (
        <Space size={2}>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  // 使用 useCallback 包装加载数据的函数
  // 仅当 queryParams 变化时该函数才会更新
  const fetchArticleList = async () => {
    setLoading(true);
    try {
      const { data, code, pagination } = await getArticleList(queryParams);
      if (code === 1) {
        setArticleList(data);
        setTotal(pagination.total);
      }
    } catch (error) {
      console.error('获取文章列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 在 useEffect 中调用获取数据的函数
  // 依赖项只包含 queryParams，这样仅在查询参数变化时触发
  useEffect(() => {
    fetchArticleList();
  }, [queryParams]);

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={articleList}
      pagination={{
        current: queryParams.pageNo,
        pageSize: queryParams.pageSize,
        total: total,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: (page, pageSize) => {
          setQueryParams(prev => ({
            ...prev,
            pageNo: page,
            pageSize: pageSize,
          }));
        },
      }}
    />
  );
};
export default Article;
