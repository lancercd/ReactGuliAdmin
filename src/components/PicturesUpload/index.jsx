import React, {Component} from 'react';
import {Upload, Modal, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {imageUrlPrefix, uploadImageUrl} from "../../config/fileUpload";


class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            // {
            //     uid: '-xxx',
            //     percent: 50,
            //     name: 'image.png',
            //     status: 'uploading',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },
            // {
            //     uid: '-5',
            //     name: 'image.png',
            //     status: 'error',
            // },
        ],
    };


    getImageUrls(fileList) {
        let urls = [];
        const len = fileList.length;
        console.log("getImageUrls", fileList);

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

    handlePreviewCancel() {
        this.setState({ previewVisible: false })
    }

    handlePreview = async file => {

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleFileUploadErr(fileListItem) {
        console.error("file upload error");
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
            file.url = imageUrlPrefix + file.response.data.url;
            this.props.onChange(this.getImageUrls(fileList));
            message.success("文件上传成功!");
        }
    }

    /**
     * 移除某个文件
     * @param file
     */
    onFileRemoved(file, fileList) {
        console.log("删除了某个文件");
        const {url} = file;
        if(!url) return;
        // TODO 发送Ajax请求 删除服务器中的图片
        console.log("发送Ajax请求, fileUrl:", url);
        this.props.onChange(this.getImageUrls(fileList));
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

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action={uploadImageUrl}
                    method="post"
                    name="image"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleFileListChange.bind(this)}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handlePreviewCancel.bind(this)}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}


export default PicturesWall;
