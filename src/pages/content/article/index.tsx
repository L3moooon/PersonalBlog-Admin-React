import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Image,
  Space,
  Tooltip,
  Tag,
  Card,
  Button,
  Switch,
  Table,
  Popconfirm,
  type TableProps,
} from 'antd';
import {
  getArticleList,
  getTagList,
  updateArticle,
  deleteArticle as deleteArticleApi,
} from '@/api/content/article';
import type { ArticleItem, TagItem } from '@/api/content/article/type';
import type { CommonListRequest } from '@/types/common';

import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import TableFunction from '@/components/TableFunction';
import PublishArticle from './PublishArticle';

import { timeFormatter } from '@/utils/timeFormatter';
import defaultImg from '@/assets/images/default-cover.png';
import { type Dayjs } from 'dayjs';
import { messageApi } from '@/utils/globalInstance';

const Article = () => {
  const [openModal, setOpenModal] = useState(false);
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);
  const [tagList, setTagList] = useState<TagItem[]>([]);
  const [selectArticle, setSelectArticle] = useState<ArticleItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<CommonListRequest>({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [total, setTotal] = useState(0);

  const handleModalVisible = (visible: boolean) => {
    setSelectArticle(null);
    setOpenModal(visible);
  };
  const onSearch = (value: string) => {
    console.log(value);
    setQueryParams(prev => ({
      ...prev,
      searchKey: value,
    }));
  };
  const onDateChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setQueryParams(prev => ({
        ...prev,
        dateRange: dateStrings,
      }));
    } else {
      console.log('Clear');
    }
  };
  const refreshList = useCallback(() => {
    setQueryParams(prev => ({ ...prev }));
  }, []);
  const updateArticleTop = useCallback(
    async (record: ArticleItem) => {
      console.log('置顶', record);
      try {
        const { code, msg } = await updateArticle({
          id: record.id,
          top: !record.top,
        });
        if (code === 1) {
          messageApi.success(record.top ? '已取消置顶' : '已置顶');
          refreshList();
        } else {
          messageApi.error(msg || '置顶失败');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [refreshList]
  );

  const updateArticleShow = useCallback(
    async (record: ArticleItem) => {
      console.log('展示', record);
      try {
        const { code, msg } = await updateArticle({
          id: record.id,
          status: !record.status,
        });
        if (code === 1) {
          messageApi.success(record.status ? '已公开' : '已隐藏');
          refreshList();
        } else {
          messageApi.error(msg || '展示失败');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [refreshList]
  );

  const editArticle = (record: ArticleItem) => {
    console.log('编辑', record);
    setOpenModal(true);
    setSelectArticle(record);
  };

  const deleteArticle = useCallback(
    async (record: ArticleItem) => {
      try {
        const { code, msg } = await deleteArticleApi(record.id);
        if (code === 1) {
          messageApi.success('删除成功');
          refreshList();
        } else {
          messageApi.error(msg || '删除失败');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [refreshList]
  );
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
            style={{
              width: '5rem ',
              height: '3rem',
              objectFit: 'cover',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
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
        width: '15rem',
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
        // width: '10rem',
        render: (_, { publish_date }) =>
          timeFormatter(publish_date, 'YYYY-MM-DD'),
      },
      {
        title: '最后编辑',
        dataIndex: 'last_edit_date',
        // width: '10rem',
        render: (_, { last_edit_date }) =>
          timeFormatter(last_edit_date, 'YYYY-MM-DD'),
      },
      {
        title: '访问量',
        dataIndex: 'view',
        width: '5rem',
        align: 'center',
      },
      {
        title: '点赞量',
        dataIndex: 'star',
        width: '5rem',
        align: 'center',
      },
      {
        title: '评论量',
        dataIndex: 'comment_count',
        width: '5rem',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'actions',
        width: '12rem',
        fixed: true,
        render: (_, record) => (
          <Space size={8}>
            <Switch
              checked={record.top}
              checkedChildren="置顶"
              unCheckedChildren="默认"
              onChange={() => updateArticleTop(record)}
            />
            <Switch
              checked={record.status}
              checkedChildren="公开"
              unCheckedChildren="隐藏"
              onChange={() => updateArticleShow(record)}
            />
            <Icon name="table-edit" onClick={() => editArticle(record)} />
            <Popconfirm
              title="确定要删除这篇文章吗？"
              onConfirm={() => deleteArticle(record)}
              icon={null}
              okText="确定"
              cancelText="取消"
            >
              <Icon name="table-delete" />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [tagList, updateArticleTop, updateArticleShow, deleteArticle]
  );
  //获取标签列表
  useEffect(() => {
    let canceled = false;
    const fetchTagList = async () => {
      try {
        const { data, code } = await getTagList();
        if (code == 1 && !canceled) {
          setTagList(data);
          console.log(data);
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

  // 获取文章列表
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
      <PageHeader title="文章管理" desc="本页用于管理和发布文章" />
      <Space size={10} orientation="vertical">
        <TableFunction onSearch={onSearch} onDateChange={onDateChange}>
          <Button size="middle" onClick={() => handleModalVisible(true)}>
            发布文章
          </Button>
        </TableFunction>
        <Card>
          <Table
            rowKey="id"
            styles={{
              body: {
                row: {
                  height: '1.2rem',
                  lineHeight: '1.2rem',
                  maxHeight: '1.2rem',
                  overflow: 'hidden',
                },
                cell: {
                  padding: '0.5rem',
                },
              },
            }}
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
        </Card>
      </Space>
      <PublishArticle
        open={openModal}
        handleModalVisible={handleModalVisible}
        tagList={tagList}
        selectArticle={selectArticle}
      />
    </>
  );
};
export default Article;
