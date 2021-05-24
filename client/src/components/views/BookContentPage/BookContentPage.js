import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Typography, Drawer, Button, Icon, PageHeader } from 'antd'

const { Title, Paragraph } = Typography;

function BookContentPage() {

    const { bookId, chapter } = useParams();
    const history = useHistory();

    const [visible, setVisible] = useState(false)
    const [Content, setContent] = useState([])
    const [bookContents, setbookContents] = useState([])
    const [Book, setBook] = useState([])

    useEffect(() => {

        axios.get(`/api/book/${bookId}`)
            .then(response => {
                if(response.data) {
                    console.log(response.data)
                    setBook(response.data.book)
                    setbookContents(response.data.book.bookContent)
                } else {
                    alert('cannot be found book')
                }
            })

        axios.get(`/api/book/${bookId}/content/${chapter}`)
            .then(response => {
                if(response.data) {
                    console.log(response.data)
                    setContent(response.data.content[0])
                }
            })

    }, [])
    
    console.log(bookContents)

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <PageHeader
                style={{ borderBottom: "1px solid lightgray" }}
                className="site-page-header"
                onBack={() => history.push(`/book/${bookId}`)}
                title={Book.bookTitle}
                extra={[
                    <Button onClick={showDrawer} style={{ float: 'right' }}><Icon type="menu" /></Button>
                ]}
            />

            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <div style={{ display: 'block' }}>
                    {bookContents.map((chapter, index) => (


                        <div style={{ margin: '2rem auto' }}>
                            <a href={`/book/${bookId}/content/${chapter.chapter}`}>
                                {index + 1}. {chapter.contentTitle}
                            </a>
                        </div>

                    ))}
                </div>

            </Drawer>
            <div style={{ textAlign: 'center', width: '100%', fontSize: '2rem' }}>
                {Content.contentTitle}
            </div>
            <div style={{ width: '100%', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                {Content.content}
            </div>
        </div>
    )
}

export default BookContentPage
