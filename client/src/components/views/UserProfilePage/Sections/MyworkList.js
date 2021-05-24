import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Button } from 'antd'

const { Meta } = Card;

function MyworkList(props) {

    const [Books, setBooks] = useState(null)

    useEffect(() => {

        const variable = {
            bookWriter: props.userInfo._id
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

    if( Books === null ){
        return <p>loading...</p>
    }

    return (
        <div style={{ display: 'flex', overflowX: 'auto' }}>
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

export default MyworkList
