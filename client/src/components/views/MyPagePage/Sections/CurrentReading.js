import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import axios from 'axios'


const { Meta } = Card;

function CurrentReading(props) {

    const [ReadingBooks, setReadingBooks] = useState(null)
 
    useEffect(() => {

        let readingLists = []

        for (let i = 0; i < props.userInfo.readinglist.length; i++) {
            readingLists.push(props.userInfo.readinglist[i].id)
        }

        const variable = {
            readinglist: readingLists
        }

        axios.post('/api/book/myReading_list', variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setReadingBooks(response.data.books)
                } else {
                    alert('failed')
                }
            })
    }, [])

    if(ReadingBooks === null) {
         return <p>loading..</p>
    }

    return (
        <div style={{ display: 'flex', overflowX: 'auto', marginTop: '2rem' }}>
            {ReadingBooks.map((book, index) => {
                return (

                    <Card
                        key={index}
                        hoverable
                        style={{ width: 'fit-content', marginRight: '1rem' }}
                        cover={ 
                        book.bookCoverImage ? (<a href={`/book/getBook/${book._id}`} >
                        <img src={`http://localhost:5000/${book.bookCoverImage}`} 
                        style={{ objectFit: "cover", width: '240px', height: '300px' }} /></a>)
                        : (<img src='/img/logo.jpg'  style={{ objectFit: "cover", width: '240px', height: '300px' }} />)
                        }
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

export default CurrentReading
