import { useEffect, useState, useMemo } from 'react';
import {
  Space,
  Tooltip,
  Card,
  Switch,
  Table,
  Popconfirm,
  type TableProps,
} from 'antd';
import type { CommonListRequest } from '@/types/common';

import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import TableFunction from '@/components/TableFunction';
import HasAuth from '@/components/HasAuth';

import { timeFormatter } from '@/utils/timeFormatter';
import { type Dayjs } from 'dayjs';
import { getCommentList } from '@/api/content/comment';
import type { CommentItem } from '@/api/content/comment/type';

const CommentList = () => {
  const [commentList, setCommentList] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<CommonListRequest>({
    pageNo: 1,
    pageSize: 10,
    searchKey: '',
    dateRange: [],
  });
  const [total, setTotal] = useState(0);

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

  const columns: TableProps<CommentItem>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'article_id',
        width: '5rem',
      },
      {
        title: '评论文章',
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
        title: '用户ID',
        dataIndex: 'user_id',
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
      },
      {
        title: '父评论ID',
        dataIndex: 'parent_id',
      },
      {
        title: '评论内容',
        dataIndex: 'content',
      },
      {
        title: '评论时间',
        dataIndex: 'comment_date',
        render: comment_date => timeFormatter(comment_date, 'YYYY-MM-DD'),
      },
      {
        title: '最后编辑时间',
        dataIndex: 'edit_date',
      },
      {
        title: '点赞数',
        dataIndex: 'like_count',
      },
      {
        title: '操作',
        dataIndex: 'actions',
        width: '12rem',
        fixed: true,
        render: (_, record) => (
          <Space size={8}>
            <HasAuth code="content:comment:show">
              <Switch
                checked={record.status}
                checkedChildren="显示"
                unCheckedChildren="隐藏"
                // onChange={() => updateArticleShow(record)}
              />
            </HasAuth>
            <Popconfirm
              title="确定要删除这条评论吗？"
              // onConfirm={() => deleteArticle(record)}
              icon={null}
              okText="确定"
              cancelText="取消"
            >
              <HasAuth code="content:comment:delete">
                <Icon name="table-delete" />
              </HasAuth>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );
  // 获取评论列表
  useEffect(() => {
    let canceled = false;
    const fetchCommentList = async () => {
      setLoading(true);
      try {
        const { data, code, pagination } = await getCommentList(queryParams);
        if (code == 1 && !canceled) {
          setCommentList(data);
          setTotal(pagination.total);
        }
      } catch (error) {
        console.error('获取评论列表失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommentList();
    return () => {
      canceled = true;
    };
  }, [queryParams]);

  return (
    <>
      <PageHeader title="评论管理" desc="本页用于管理文章评论" />
      <Space size={10} orientation="vertical">
        <TableFunction
          onSearch={onSearch}
          onDateChange={onDateChange}
        ></TableFunction>
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
            dataSource={commentList}
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
    </>
  );
};
export default CommentList;
