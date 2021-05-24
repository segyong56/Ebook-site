import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Input, Form, Button, message } from 'antd'

const { TextArea } = Input;

function BookCoverEditPage() {

    const { bookId, chapter } = useParams();
    const history = useHistory();

    const [ContentTitle, setContentTitle] = useState("")
    const [Content, setContent] = useState("")
    const [BookContent, setBookContent] = useState(null)

    useEffect(() => {

        axios.get(`/api/book/${bookId}/content/${chapter}`)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setBookContent(response.data.content[0])
                } else {
                    alert('receiving is failed')
                }
            })

    }, [])

    if (BookContent === null) {
        return <p>loading...</p>
    }

    const handlerContentTitle = (e) => {
        setContentTitle(e.currentTarget.value)
    }

    const handleContent = (e) => {
        setContent(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            contentTitle: ContentTitle,
            content: Content
        }

        axios.put(`/api/book/${bookId}/content/edit/${chapter}`, variables)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    message.success('content is successfully edited')
                    history.push(`/book/bookChapter/${bookId}`)
                } else {
                    alert('recieving is failed')
                }
            })

    }

    const onDelete = (e) => {
        e.preventDefault();

        const variable = {
            chapter : chapter
        }

        axios.put(`/api/book/${bookId}/content/delete`, variable)
            .then(response => {
                if(response.data) {
                    console.log(response.data)
                    message.success('content is deleted')
                    history.push(`/book/bookChapter/${bookId}`)
                } else {
                    alert('content cannot be deleted')
                }
            })

    }

    return (
        <div style={{ width: '700px', margin: '2rem auto' }}>

            <Form onSubmit={onSubmit}>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={handlerContentTitle}
                    defaultValue={BookContent.contentTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea style={{ height: '700px' }}
                    onChange={handleContent}
                    defaultValue={BookContent.content} 
                />
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Edit
                </Button>
                <Button type="primary" size="large" onClick={onDelete} style={{ marginLeft: '10px'}}>
                    Delete
                </Button>

            </Form>

        </div>
    )
}

export default BookCoverEditPage