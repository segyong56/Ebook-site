import React, { useState, useEffect } from 'react'
import { Typography, Input, Button, Form, message } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const { Title } = Typography
const { TextArea } = Input;
function BookCoverEditPage() {

    const { bookId } = useParams();
    const history = useHistory();

    const [Description, setDescription] = useState("")
    const [Title, setTitle] = useState("")
    const [GetBook, setGetBook] = useState(null)

    useEffect(() => {

        axios.get(`/api/book/${bookId}`)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setGetBook(response.data.book)
                } else {
                    alert('receiving failed')
                }
            })

    }, [])

    if (GetBook === null) {
        return <p>loading...</p>
    }

    const TitleHandler = (e) => {
        setTitle(e.currentTarget.value)
    }

    const DescriptionHandler = (e) => {
        setDescription(e.currentTarget.value)

    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            bookId: bookId,
            bookTitle : Title,
            bookDescription: Description
        }

        axios.put(`/api/book/edit/${bookId}`, variables)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    message.success('the book is edited')
                    setTimeout(() => {
                        history.push(`/book/bookChapter/${bookId}`)
                    }, 1500);
                } else {
                    alert('receiving failed')
                }
            })

    }

    return (
        <div style={{ width: '700px', margin: '2rem auto' }}>
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ width: '240px', height: '300px', marginLeft: '2rem' }} src={`http://localhost:5000/${GetBook.bookCoverImage}`} />
                </div>
                <label>book title</label>
                <Input
                    defaultValue={GetBook.bookTitle}
                    onChange={TitleHandler}
                />
                <label>book description</label>
                <TextArea
                    defaultValue={GetBook.bookDescription}
                    onChange={DescriptionHandler}
                    style={{ height: '200px' }}

                />
                <Button type="primary" onClick={onSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default BookCoverEditPage
