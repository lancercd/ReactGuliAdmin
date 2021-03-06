import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Upload, Modal, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {uploadImageUrl} from "../../config/fileUpload";


class UploadImage extends Component {

    constructor(props) {
        super(props);

        // 由Form.Item传递的initialValue 进行初始化
        let initialValue = null;
        if (props.name) initialValue = props[props.name];

        this.state = {
            preview: {
                visible: false,
                image: '',
                title: '',
            },
            fileList: this.initFileListFromProps(initialValue || props.urls),
            max: props.max || -1
        };
        this.submitValue(this.state.fileList);
    }

    /**
     * 从urls数组初始化fileList列表
     *      添加id、name、status、url
     * @param urls
     * @returns {[]}
     */
    initFileListFromProps(urls) {
        let res = [];
        if (!urls || !Array.isArray(urls)) {
            return res;
        }

        urls.forEach((url, index) => {
            res.push({
                uid: index,
                // name: 'image.png',
                status: 'done',
                url: url,
            })
        })
        return res;
    }

    submitValue(fileList) {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(this.getImageUrls(fileList));
        }
    }

    /**
     * 将fileList转换为urls数组
     * @param fileList
     * @returns {[]}
     */
    getImageUrls(fileList) {
        let urls = [];
        const len = fileList.length;

        for(let i=0; i<len; ++i) {
            const item = fileList[i];
            if (item.status === "uploading") {
                console.warn("请等待图片上传完成!");
                // throw Error("请等待图片上传完成!");
                return [];
            }else if (item.status === "done" && item.url) {
                urls.push(item.url);
            }
        }
        return urls;
    }

    /**
     * 图片预览关闭
     */
    handlePreviewCancel() {
        const preview = {...this.state.preview, visible: false};
        this.setState({ preview })
    }

    /**
     * 图片预览开启
     */
    handlePreview(file) {

        this.setState({
            preview: {
                image: file.url,
                visible: true,
                title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
            }
        });
    };

    /**
     * 文件上传失败
     * @param fileListItem
     */
    handleFileUploadErr(fileListItem) {
        fileListItem.status = "error";
        message.error(fileListItem.response.status || "文件上传失败!");
    }

    /**
     * 文件上传完成
     *      成功、失败都会调用此回调
     */
    onFileDone(file, fileList) {
        if (file.response.errno === 400) {
            this.handleFileUploadErr(file);
        }else {
            file.url = file.response.data.url;
            this.submitValue(fileList);
            message.success("文件上传成功!");
        }
    }

    /**
     * 移除某个文件
     * @param file
     * @param fileList
     */
    onFileRemoved(file, fileList) {
        const {url} = file;
        if(!url) return;
        /*
            TODO  若无表单 发送Ajax请求 删除服务器中的图片
                  若有表单 当表单提交时 发送Ajax发送请求
         */
        console.log("发送Ajax请求, fileUrl:", url);
        this.submitValue(fileList);
    }


    /**
     * 上传中、完成、失败都会调用这个函数。
     */
    handleFileListChange({file, fileList}) {
        if (file.status === "done") {
            this.onFileDone(file, fileList);
        }else if (file.status === "removed") {
            this.onFileRemoved(file, fileList);
        }

        this.setState({fileList});
    }

    /**
     * upload框
     * @returns {JSX.Element}
     */
    renderUploadButton() {
        return (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
    }

    render() {
        const { preview, fileList } = this.state;
        return (
            <>
                <Upload
                    action={uploadImageUrl}
                    method="post"
                    name="image"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview.bind(this)}
                    onChange={this.handleFileListChange.bind(this)}
                >
                    {(fileList.length >= this.state.max) ? null : this.renderUploadButton()}
                </Upload>
                <Modal
                    visible={preview.visible}
                    title={preview.title}
                    footer={null}
                    onCancel={this.handlePreviewCancel.bind(this)}
                >
                    <img alt="example" style={{ width: '100%' }} src={preview.image} />
                </Modal>
            </>
        );
    }
}


UploadImage.propTypes = {
    onChange: PropTypes.func,
    max: PropTypes.number,
    urls: PropTypes.array,
    name: PropTypes.string
};


export default UploadImage;
