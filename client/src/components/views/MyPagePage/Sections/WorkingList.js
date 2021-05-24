import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'antd'
import '../myPage.css'

const { Meta } = Card;

function WorkingList(props) {

    const [WorkingBooks, setWorkingBooks] = useState(null)

    useEffect(() => {

        const variable = {
            bookWriter: props.userInfo._id
        }

        axios.post('/api/book/myBook_list', variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setWorkingBooks(response.data.books)
                } else {
                    alert('정보를 찾지 못했습니다. 다시 시도해 보세요.')
                }
            })

    }, [])

    if(WorkingBooks === null) {
        return <p>loading..</p>
    }

    return (
        <div style={{ display: 'flex', overflowX: 'auto', marginTop:'2rem' }}>
            {WorkingBooks.map((book, index) => {
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

export default WorkingList
