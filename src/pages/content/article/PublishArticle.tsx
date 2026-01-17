import { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  Flex,
  Input,
  Button,
  Divider,
  Checkbox,
  Form,
  Upload,
} from 'antd';
import type { FormProps, UploadProps } from 'antd';
import type { AppDispatch } from '@/store';
import { createStyles, cx } from 'antd-style';
import { messageApi } from '@/utils/globalInstance';

import { addArticle, updateArticle } from '@/api/content/article';
import type {
  TagItem,
  ArticleItem,
  AddArticleRequest,
} from '@/api/content/article/type';
import Icon from '@/components/Icon';

import { useDispatch } from 'react-redux';
import { uploadFile } from '@/store/slices/ossSlice';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import type {
  IDomEditor,
  IToolbarConfig,
  IEditorConfig,
} from '@wangeditor/editor';

const useStyles = createStyles(() => ({
  header: {
    position: 'fixed',
    width: '100%',
    height: '7rem',
    top: 0,
    left: 0,
    zIndex: 1000,
    // padding: '0 1rem',
    // margin: '1rem',
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  backButton: {
    position: 'absolute',
    top: '0.75rem',
    left: '1rem',
  },
  title: {
    height: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    // fontWeight: 'bold',
  },
  toolbar: {
    width: '100%',
    // height: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },

  content: {
    marginTop: '7rem',
    width: '100%',
    minHeight: '100vh',
    background: '#F3F4F6',
    fontSize: '1rem',
  },
  form: {
    // width: '100%',
    // minHeight: '100vh',
    // background: '#F3F4F6',
    height: 'calc(100vh - 7rem)',
    overflowY: 'scroll',
    // fontSize: '1rem',
  },
  editWrapper: {
    // marginTop: '3rem',
    width: '50%',
    minHeight: 'calc(100vh - 9rem)',
    background: '#fff',
    margin: '1rem auto',
    padding: '5rem 7rem',
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
  },
  formWrapper: {
    minHeight: 0,
    padding: '4rem 7rem',
  },
  contentInput: {
    height: '3rem',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  abstractInput: {
    height: '3rem',
    fontSize: '0.8rem',
  },
}));
interface PublishArticleProps {
  open: boolean;
  tagList: TagItem[];
  selectArticle: ArticleItem | null;
  handleModalVisible: (visible: boolean) => void;
}
const PublishArticle = ({
  open,
  tagList,
  selectArticle,
  handleModalVisible,
}: PublishArticleProps) => {
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const coverImg = Form.useWatch('cover_img', form);
  const contentHtml = Form.useWatch('content', form);
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['fullScreen'], //排除全屏按钮
  };
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        async customUpload(
          file: File,
          insertFn: (url: string, alt: string, href: string) => void
        ) {
          try {
            const action = await dispatch(
              uploadFile({ key: 'editor-image', file })
            );
            if (uploadFile.fulfilled.match(action)) {
              const { result } = action.payload as { result: any };
              const url = `https://oss.willisblog.com/${result.name}`;
              insertFn(url, file.name, url);
              messageApi.success('图片上传成功');
            } else {
              messageApi.error('图片上传失败');
            }
          } catch (error) {
            console.error('图片上传错误:', error);
            messageApi.error('图片上传失败，请重试');
          }
        },
        allowedFileTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
        maxFileSize: 2 * 1024 * 1024,
      },
    },
  };

  const checkOptions = useMemo(() => {
    return tagList.map(item => {
      return {
        label: item.tag_name,
        value: item.id,
      };
    });
  }, [tagList]);

  // 处理封面上传
  const customUploadCover: UploadProps['customRequest'] = async options => {
    const { file, onSuccess, onError } = options;
    try {
      const action = await dispatch(
        uploadFile({ key: 'article-cover', file: file as File })
      );
      if (uploadFile.fulfilled.match(action)) {
        const { result } = action.payload as { result: any };
        const url = `https://oss.willisblog.com/${result.name}`;
        form.setFieldsValue({ cover_img: url });
        onSuccess?.(result);
        messageApi.success('图片上传成功');
      } else {
        onError?.(new Error('上传失败'));
        messageApi.error('图片上传失败');
      }
    } catch (err) {
      onError?.(err as Error);
      messageApi.error('图片上传异常');
    }
  };
  //TODO 保存草稿功能
  const saveDraft = () => {
    messageApi.success('保存草稿成功');
  };
  const onFinish: FormProps<AddArticleRequest>['onFinish'] = async values => {
    console.log('Received values of form:', values);
    try {
      if (selectArticle) {
        const { code } = await updateArticle({
          id: selectArticle.id,
          ...values,
        });
        if (code === 1) {
          messageApi.success('编辑文章成功');
        } else {
          messageApi.error('编辑文章失败');
        }
      } else {
        const { code } = await addArticle(values);
        if (code === 1) {
          messageApi.success('发布文章成功');
        } else {
          messageApi.error('发布文章失败');
        }
      }
    } catch (error) {
      console.log(error);
      messageApi.error('发布文章异常');
    }
  };
  useEffect(() => {
    if (selectArticle && open) {
      form.setFieldsValue({
        title: selectArticle.title,
        abstract: selectArticle.abstract,
        content: selectArticle.content,
        cover_img: selectArticle.cover_img,
        tag: selectArticle.tag,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [selectArticle, open, form]);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  return (
    <Modal
      width="100vw"
      open={open}
      closable={false}
      centered={true}
      footer={null}
      title={
        <div className={styles.header}>
          <Button
            className={styles.backButton}
            onClick={() => handleModalVisible(false)}
          >
            <Icon name="public-back" />
            返回
          </Button>
          <div className={styles.title}>
            <span>{selectArticle ? '编辑文章' : '发布文章'}</span>
          </div>
          <Divider size="small" />
          <Toolbar
            className={styles.toolbar}
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
          />
          <Divider size="small" />
        </div>
      }
      onCancel={() => handleModalVisible(false)}
      style={{
        maxWidth: '100vw',
      }}
      styles={{
        wrapper: {
          overflow: 'hidden',
        },
        header: {
          marginBottom: 0,
        },
        body: {
          overflow: 'hidden',
        },
        container: {
          height: '100vh',
          borderRadius: 0,
          background: '#fff',
          padding: '0rem',
        },
      }}
    >
      <div className={styles.content}>
        <Form
          className={styles.form}
          name="basic"
          layout="vertical"
          form={form}
          requiredMark={false}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* 第一页 */}
          <div className={styles.editWrapper}>
            <Form.Item<AddArticleRequest>
              name="title"
              style={{ marginBottom: 0 }}
              // className={styles.formItem}
              rules={[]}
            >
              <Input
                placeholder="请输入文章标题..."
                variant="borderless"
                className={styles.contentInput}
              />
            </Form.Item>
            <Divider size="small" />
            <Form.Item<AddArticleRequest>
              name="content"
              // className={styles.formItem}
              rules={[]}
            >
              <Editor
                defaultConfig={editorConfig}
                value={contentHtml}
                onCreated={setEditor}
                onChange={editor => {
                  form.setFieldsValue({
                    content: editor.getHtml(),
                  });
                }}
                mode="default"
              />
            </Form.Item>
          </div>
          {/* 第二页 */}
          <div className={cx(styles.editWrapper, styles.formWrapper)}>
            <Form.Item<AddArticleRequest>
              name="abstract"
              label="文章摘要"
              rules={[]}
            >
              <Input.TextArea
                placeholder="请输入文章摘要..."
                maxLength={100}
                showCount
                autoSize={{ minRows: 2, maxRows: 6 }}
                className={styles.abstractInput}
              />
            </Form.Item>

            <Form.Item<AddArticleRequest>
              name="tag"
              label="文章标签"
              rules={[]}
            >
              <Checkbox.Group options={checkOptions} />
            </Form.Item>
            <Form.Item<AddArticleRequest>
              name="cover_img"
              label="文章封面"
              rules={[]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                maxCount={1}
                accept="image/*"
                customRequest={customUploadCover}
              >
                {coverImg ? (
                  <img
                    draggable={false}
                    src={coverImg}
                    alt="cover"
                    style={{ width: '100%' }}
                  />
                ) : (
                  <button
                    style={{ border: 0, background: 'none' }}
                    type="button"
                  >
                    <Icon name="table-edit" />
                    <div style={{ marginTop: 8 }}>上传封面</div>
                  </button>
                )}
              </Upload>
            </Form.Item>

            <Form.Item>
              <Flex justify="end">
                <Button style={{ marginRight: '1rem' }} onClick={saveDraft}>
                  保存草稿
                </Button>
                <Button type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Flex>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
export default PublishArticle;
