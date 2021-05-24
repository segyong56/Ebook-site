import React, { useState, useEffect } from 'react'
import { Typography, Icon, Button, Popconfirm, message, Divider } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import Axios from 'axios';

const { Title } = Typography;

function BookChapterPage() {

    const { bookId } = useParams();
    const history = useHistory();

    const [Book, setBook] = useState("")
    const [Content, setContent] = useState([])

    useEffect(() => {

        Axios.get(`/api/book/${bookId}`)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setBook(response.data.book)
                    setContent(response.data.book.bookContent)
                } else {
                    alert('정보를 가져오는데 실패하였습니다.')
                }
            })
    }, [])

   
    const confirm = () => {
        Axios.delete(`/api/book/delete/${bookId}`)
            .then(response => {
                if (response.data) {
                    message.success('the book is deleted')
                    // history.push(`/book/bookChapter/${bookId}`)
                } else {
                    alert('your trying is failed ')
                }
            })
    }
 
    const cancel = (e) => {
        console.log(e)
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} >{Book.bookTitle}</Title>
            </div>
            {Book.bookCoverImage ?
                (<div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ width: '240px', height: '300px', marginLeft: '2rem' }} src={`http://localhost:5000/${Book.bookCoverImage}`} />
                </div>) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ width: '240px', height: '300px', marginLeft: '2rem' }} src='/img/logo.jpg' />
                    </div>
                )
            }

            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <a href={`/book/${Book._id}/content/upload`} >
                        <Button type="dashed" ><Icon type="plus" style={{ fontSize: '1rem', marginLeft: '1rem' }} />Add Chapter</Button>
                    </a>
                </div>
                <div>
                    <a href={`/book/bookChapter/${Book._id}/edit`}><Button type="dashed" style={{ marginRight: '1rem' }}>Book Edit</Button></a>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >

                        <Button type="dashed">Delete</Button>
                    </Popconfirm>
                </div>
            </div>

            <div style={{ width: '700px', borderTop: '1px solid lightgrey', marginTop: '2rem' }}>
                {Content.map((content, index) => (
                    <div key={index} style={{ width: '100%', borderBottom: '1px solid lightgrey', height: '50px', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Title level={3}>{index + 1}. {content.contentTitle}</Title>
                        </div>
                        <div>
                            <a href={`/book/${Book._id}/content/edit/${content.chapter}`}>
                                <Button type="dashed" style={{ marginRight: '1rem' }}>Edit</Button>
                            </a>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default BookChapterPage
