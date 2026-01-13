import React, { useEffect, useState, useMemo } from 'react';
import { Image, Flex, Space, Table, Tooltip, Tag, type TableProps } from 'antd';
import { createStyles } from 'antd-style';

import { getArticleList, getTagList } from '@/api/content/article';
import type { ArticleItem, TagItem } from '@/api/content/article/type';

import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import { timeFormatter } from '@/utils/timeFormatter';
import defaultImg from '@/assets/images/default-cover.png';

const useStyles = createStyles(({ token }) => ({
  cover: {
    width: '6rem',
    height: '4rem',
    objectFit: 'cover',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  tableRow: {
    // height: '1rem',
    // minHeight: '1rem',
    // padding: '0',
  },
}));

const Article = () => {
  const { styles } = useStyles();
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);
  const [tagList, setTagList] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [total, setTotal] = useState(0);

  const columns: TableProps<ArticleItem>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        width: '5rem',
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: '15rem',
        ellipsis: {
          showTitle: false,
        },
        render: title => (
          <Tooltip placement="topLeft" title={title}>
            {title}
          </Tooltip>
        ),
      },
      {
        title: '封面',
        dataIndex: 'cover_img',
        render: (cover_img: string) => (
          <Image
            className={styles.cover}
            src={cover_img ? cover_img : defaultImg}
          />
        ),
      },
      {
        title: '简介',
        dataIndex: 'abstract',
        width: '15rem',
        ellipsis: {
          showTitle: false,
        },
        render: abstract => (
          <Tooltip placement="topLeft" title={abstract}>
            {abstract ? abstract : '暂无简介'}
          </Tooltip>
        ),
      },
      {
        title: '标签',
        dataIndex: 'tag',
        // width: '15rem',
        render: (tags: number[]) => (
          <Space size={8} wrap>
            {tags &&
              tags.map(item => (
                <Tag color="blue" key={item}>
                  {tagList.find(tag => tag.id == item)?.tag_name || '加载中...'}
                </Tag>
              ))}
          </Space>
        ),
      },
      {
        title: '发布时间',
        dataIndex: 'publish_date',
        width: '10rem',
        render: (_, { publish_date }) => timeFormatter(publish_date),
      },
      {
        title: '最后更新时间',
        dataIndex: 'last_edit_date',
        width: '10rem',
        render: (_, { last_edit_date }) => timeFormatter(last_edit_date),
      },
      {
        title: '访问量',
        dataIndex: 'view',
        width: '5rem',
      },
      {
        title: '点赞量',
        dataIndex: 'star',
        width: '5rem',
      },
      {
        title: '评论量',
        dataIndex: 'comment_count',
        width: '5rem',
      },
      {
        title: '操作',
        dataIndex: 'actions',
        width: '12rem',
        fixed: true,
        render: (_, record) => (
          <Space size={8}>
            <Icon
              name={record.top ? 'table-cancel-top' : 'table-top'}
              onClick={() => updateArticleTop(record)}
            />
            <Icon
              name={record.status ? 'table-hide' : 'table-show'}
              onClick={() => updateArticleShow(record)}
            />
            <Icon name="table-edit" onClick={() => editArticle(record)} />
            <Icon name="table-delete" onClick={() => deleteArticle(record)} />
          </Space>
        ),
      },
    ],
    [tagList, styles]
  );

  const updateArticleTop = (record: ArticleItem) => {
    console.log('置顶', record);
  };
  const updateArticleShow = (record: ArticleItem) => {
    console.log('展示', record);
  };
  const editArticle = (record: ArticleItem) => {
    console.log('编辑', record);
  };
  const deleteArticle = (record: ArticleItem) => {
    console.log('删除', record);
  };
  //获取标签列表
  useEffect(() => {
    let canceled = false;
    const fetchTagList = async () => {
      try {
        const { data, code } = await getTagList();
        if (code == 1 && !canceled) {
          setTagList(data);
        }
      } catch (error) {
        console.error('获取标签列表失败:', error);
      }
    };
    fetchTagList();
    return () => {
      canceled = true;
    };
  }, []);
  //获取文章列表
  useEffect(() => {
    let canceled = false;
    const fetchArticleList = async () => {
      setLoading(true);
      try {
        const { data, code, pagination } = await getArticleList(queryParams);
        if (code == 1 && !canceled) {
          setArticleList(data);
          setTotal(pagination.total);
        }
      } catch (error) {
        console.error('获取文章列表失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticleList();
    return () => {
      canceled = true;
    };
  }, [queryParams]);

  return (
    <>
      <PageHeader title="文章管理" desc="本页用于管理前台所有文章" />
      <Table
        rowKey="id"
        rowClassName={styles.tableRow}
        loading={loading}
        columns={columns}
        scroll={{ y: 'calc(100vh - 20rem)' }}
        // bordered
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
    </>
  );
};
export default Article;
