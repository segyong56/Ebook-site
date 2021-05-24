import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'antd'

const { Meta } = Card;

function MyReadingList(props) {

    const [Books, setBooks] = useState(null)

    useEffect(() => {

        let readingList = []

        for (let i = 0; i < props.userInfo.readinglist.length; i++) {
            readingList.push(props.userInfo.readinglist[i].id)
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


    return (
        <div style={{ display: 'flex', overflowX: 'auto'}}>
            {Books.map((book, index) => {
                return (
                
                        <Card
                            key={index}
                            hoverable
                            style={{ width: 'fit-content', marginRight: '1rem' }}
                            cover={<a href={`/book/getBook/${book._id}`} > <img src={`http://localhost:5000/${book.bookCoverImage}`} style={{ objectFit: "cover", width: '240px', height: '300px' }} /></a>}
                        >
                            <Meta
                                title={book.bookTitle}
                            />
                        </Card>
                
                )

            })}
        </div>
    )
}

export default MyReadingList
