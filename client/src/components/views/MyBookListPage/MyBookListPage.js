import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';

const { Meta } = Card;
function MyBookListPage() {

    const [Books, setBooks] = useState([])

    useEffect(() => {

        const variable = {
            bookWriter: localStorage.userId
        }

        axios.post('/api/book/myBook_list', variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setBooks(response.data.books)
                } else {
                    alert('정보를 찾지 못했습니다. 다시 시도해 보세요.')
                }
            })

    }, [])
    


    const renderCards = Books.map((book, index) => {
 
        return <Col lg={6} md={8} xs={24}>
            <Card
                key={index}
                hoverable
                style={{ width: 'fit-content'}}
                cover={ 
                    book.bookCoverImage ? (<a href={`/book/bookChapter/${book._id}`} >
                    <img src={`http://localhost:5000/${book.bookCoverImage}`} 
                    style={{ objectFit: "cover", width: '240px', height: '300px' }} /></a>)
                    : (<a href={`/book/bookChapter/${book._id}`} ><img src='/img/logo.jpg'  style={{ objectFit: "cover", width: '240px', height: '300px' }} /></a>)
                    }
            >
                <Meta
                    title={book.bookTitle}
                />
            </Card>
        </Col>
    })

    return (
        <div style={{ width: '70%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  My Book List  <Icon type="book" />  </h2>
            </div>
            {/* {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> : */}
            <br />
            <br />
            <div>
                <Row gutter={[16, 16]}>

                {renderCards}

                </Row>

            </div>
        </div>
    )
}

export default MyBookListPage
