import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Col, Popover, Icon } from 'antd'

const { Meta } = Card

function CardList(props) {


    const [Books, setBooks] = useState(null)

    useEffect(() => {

        let readingList = []

        for (let i = 0; i < props.readinglist.length; i++) {
            readingList.push(props.readinglist[i].id)
        }

        const variable = {
            readinglist: readingList
        }

        axios.post('/api/book/myReading_list', variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data.books)
                    setBooks(response.data.books)
                } else {
                    alert('failed')
                }
            })

    }, [])

    if (Books === null) {
        return <h1>recieving</h1>
    }

    const content = (
        <a href="/">Delete</a>
    )

    return (
        <div>
            {Books.map((book, index) => {
                return (
                    <Col lg={6} md={8} xs={24}>
                        <Card
                            key={index}
                            hoverable
                            style={{ width: 'fit-content' }}
                            cover={<a href={`/book/getBook/${book._id}/0`} > <img src={`http://localhost:5000/${book.bookCoverImage}`} style={{ objectFit: "cover", width: '240px', height: '300px' }} /></a>}
                        
                        >
                            <Meta
                                title={[
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <div>{book.bookTitle}</div>
                                <div>
                                <Popover placement="right" content={content} trigger="click"><Icon type="more" /></Popover>
                                </div>
                                </div>]}
                            />
                        </Card>
                    </Col>
                )

            })}
        </div>
    )
}

export default CardList
