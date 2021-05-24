import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Typography, Button, Avatar, Icon, message } from 'antd'
import CardList from './Sections/CardList.js'
import { useDispatch } from 'react-redux'
import { addToReadingList } from '../../../_actions/user_actions'
import './BookCoverPage.css'


const { Title } = Typography

function BookCoverPage() {

    // const bookId = props.match.params.bookId
    const { bookId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [Book, setBook] = useState("")
    const [BookWriter, setBookWriter] = useState('')
    const [ContentLen, setContentLen] = useState(0)

    useEffect(() => {

        axios.get(`/api/book/${bookId}`)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setBook(response.data.book)
                    setContentLen(response.data.book.bookContent.length)
                    // setBookWriter(response.data.book.bookWriter)
                } else {
                    alert('책정보를 찾지 못했습니다.')
                }
            })

    }, [])


    const renderContent = (e) => {

        e.preventDefault();

        if (ContentLen > 0) {
            return (
                history.push(`/book/${Book._id}/content/${Book.bookContent[0].chapter}`)
            )
        } else {
            alert('컨텐츠가 없습니다.')
        }
    }

    const addToreadingList = (bookId) => {

        dispatch(addToReadingList(Book._id))
        message.success('successfully added')
    }

    return (
        <div style={{ width: '700px', margin: '2rem auto' }}>
            <div className="coverPageHead">
                <div className="coverPageImg">
                    <img style={{ width: '240px', height: '300px', marginLeft: '2rem' }} src={`http://localhost:5000/${Book.bookCoverImage}`} />
                </div>
                <div className="coverPageInfos">
                    <div className="coverPageTitle">
                        <Title level={1} >{Book.bookTitle}</Title>
                    </div>
                    <div className="coverPageInfo">
                        <div className="iconsInfo">
                            <span style={{ padding: '8px' }}>
                                <Icon type="eye" style={{ fontSize: '20px' }} /> Reads
                                <p style={{ textAlign: 'center', marginTop: '2px', fontWeight: 'bold' }}>{ContentLen}</p>
                            </span>
                            <span style={{ padding: '8px', textAlign: 'center' }}>
                                <Icon type="star" style={{ fontSize: '20px' }} /> Votes
                                <p style={{ textAlign: 'center', marginTop: '2px', fontWeight: 'bold' }}>{ContentLen}</p>
                            </span>
                            <span style={{ padding: '8px', textAlign: 'center' }}>
                                <Icon type="bars" style={{ fontSize: '20px' }} /> Parts
                                <p style={{ textAlign: 'center', marginTop: '2px', fontWeight: 'bold' }}>{ContentLen}</p>
                            </span>
                        </div>
                        <div>
                            <Button className="readBtn" type="dashed" onClick={renderContent}>
                                <Icon type="read" />Read Book</Button>
                        </div>
                    </div>
                </div>

            </div>
            <hr />

            <div>
                <div className="coverPageBody">
                    <div className="coverPageBody_user">
                        {Book.profile === undefined ? (
                            <div>
                                <a href={`/users/userpage/${BookWriter}`}>
                                    <img src='/img/logo.jpg' className="coverPageUserImg" />
                                    <span className="userName">User</span></a>
                            </div>) : (
                            <div>
                                <a href={`/users/userpage/${BookWriter}`}>
                                    {/* <img src={`http://localhost:5000/${Book.profile.imageUrl}`} className="coverPageUserImg" /> */}
                                    <span className="userName"></span></a>
                            </div>
                        )}

                        <div>
                            <Button onClick={addToreadingList} type="dashed" ><Icon type="plus" style={{ fontSize: '1rem' }} />Add My Reading List</Button>
                        </div>
                    </div>

                </div>
                <br />
                <br />
                <div style={{ width: '700px', overflow: 'hidden', whiteSpace: 'pre-wrap' }}>
                    {Book.bookDescription}
                </div>
            </div>
            <hr />
            {/* <div style={{ marginTop: '1rem', fontSize: '1rem' }}>
                <span>Same Category Card List</span>
            </div> */}
            <div style={{ display: 'flex', overflowX: 'scroll', width: '100%', height: '250px', marginRight: '1rem' }}>

                {/* Book list */}

                {/* <CardList /> */}
            </div> 
         

        </div>
    )
}

export default BookCoverPage
