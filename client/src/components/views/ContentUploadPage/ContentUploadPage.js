import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Typography, message } from 'antd'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const { TextArea } = Input;
const { Title } = Typography;

function ContentUploadPage() {

    const { bookId } = useParams();
    const history = useHistory();

    const [ContentTitle, setContentTitle] = useState("")
    const [Content, setContent] = useState("")
    const [Chapter, setChapter] = useState("")

    const handleChangeTitle = (event) => {
        setContentTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        setContent(event.currentTarget.value)
    }

    const handlerChapter = (event) => {
        setChapter(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            chapter: Chapter,
            contentTitle: ContentTitle,
            content: Content
        }

        axios.put(`/api/book/${bookId}/content/upload`, variables)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    message.success('content is uploaded successfully')
                    history.push(`/book/bookChapter/${bookId}`)
                } else {
                    alert('failed.')
                }
            })

    }



    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} ></Title>
            </div>

            <Form onSubmit={onSubmit}>
                <br/>
                <br/>
                <label>Chapter</label>
                <Input
                    onChange={handlerChapter}
                    value={Chapter}
                />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={ContentTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea style={{ height: '700px' }}
                    onChange={handleChangeDecsription}
                    value={Content}
                />
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default ContentUploadPage
