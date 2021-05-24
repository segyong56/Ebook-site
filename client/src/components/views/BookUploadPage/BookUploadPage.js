import React, { useState } from 'react'
import { Typography, Button, Form, Input, Icon, message, Modal } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const { Title } = Typography;
const { TextArea } = Input;

const category = [
    { key: 1, value: "Romace" },
    { key: 2, value: "Fantasy" },
    { key: 3, value: "Adventure" },
    { key: 4, value: "New Adult" },
    { key: 5, value: "Non-Fiction" },
    { key: 6, value: "Mystery" },
    { key: 7, value: "Horror" },
    { key: 8, value: "Fanfiction" },
    { key: 9, value: "Historical Fiction" }
]

function BookUploadPage() {

    const history = useHistory();

    const [Booktitle, setBookTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Categories, setCategories] = useState(1)
    const [BookCoverImage, setBookCoverImage] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChangeTitle = (event) => {
        setBookTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeCategories = (event) => {
        setCategories(event.currentTarget.value)
    }


    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/book/uploadImage', formData, config)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setBookCoverImage(response.data.image)

                } else {
                    alert('failed to save the video in server')
                }
            })

    }



    const onSubmit = (event) => {
        event.preventDefault();
        setIsModalVisible(true);
    }

    const handleOk = () => {

        setIsModalVisible(false);
        const variables = {
            bookTitle: Booktitle,
            bookDescription: Description,
            category: Categories,
            bookCoverImage: BookCoverImage
        }

        
        axios.post('/api/book/upload', variables)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    message.success('book is uploaded successfully')
                    // history.push(`/book/bookChapter/${response.data.book._id}`)
                } else {
                    alert('failed')
                }

            })

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} >Writing Book</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '240px', height: '300px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>
                    {BookCoverImage ? (

                        <img style={{ width: '240px', height: '300px', marginLeft: '2rem' }} src={`http://localhost:5000/${BookCoverImage}`} />

                    ) : (
                        <div  style={{ width: '240px', height: '300px' }} ></div>
                    )}
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={Booktitle}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDecsription}
                    value={Description}
                    style={{ height: '500px', overflow: 'scroll'}}
                />
                <br />
                <br />
                <select onChange={handleChangeCategories} value={Categories}>
                    {category.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>

                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
                <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>사진은 수정하지 못합니다.</p>
                    <p>그래도 저장하시겠습니까? </p>
                </Modal>
            </Form>
        </div>
    )
}

export default BookUploadPage;

