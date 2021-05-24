import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';

const { Meta } = Card;


function LandingPage() {

    const [Books, setBooks] = useState(null)
    const [Limit, setLimit] = useState(8)
    const [Skip, setSkip] = useState(0)
    const [PostSize, setPostSize] = useState()


    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit
        }

        getBooks(variables)

    }, [])


    const getBooks = (variables) => {

        axios.post('/api/book/getBooks', variables)
            .then(response => {
                if (response.data) {

                    if (variables.loadMore) {
                        setBooks([...Books, ...response.data.books])
                    } else {
                        setBooks(response.data.books)
                    }
                    setPostSize(response.data.postSize)
                }
                else {
                    alert('정보를 찾지 못했습니다. 다시 시도해 보세요.')
                }
            })
    }

    const onLoadMore = () => {

        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getBooks(variables)
        setSkip(skip)
    }

    if(Books === null) {
        return <h1>recieving</h1>
    }


    const renderCards = Books.map((book, index) => {
      
        return (
    
            <Col lg={6} md={8} xs={24}>
                <Card
                    key={index}
                    hoverable
                    style={{ width: 'fit-content' }}
                    cover={<a href={`/book/${book._id}`} > <img src={`http://localhost:5000/${book.bookCoverImage}`} style={{ objectFit: "cover", width: '240px', height: '300px' }} /></a>}
                >
                    <Meta
                        title={book.bookTitle}
                    />
                </Card>
            </Col> 
        )
        
    })


    return (
        <div style={{ width: '70%', margin: '3rem auto' }}>
            <div style={{ width : '100%', textAlign: 'center', display:'flex', justifyContent:'center', alignItems: 'center', fontSize: '30px' }}>
                <img src="/img/logo.jpg" style={{width: '100px', height: '100px', objectFit: 'cover', marginRight: '1rem'}} /><h1>BLACK RABBIT</h1>
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
            <br />
            <br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={onLoadMore} type="primary" >Load More</Button>
                </div>
            }


        </div>
    )
}

export default LandingPage
