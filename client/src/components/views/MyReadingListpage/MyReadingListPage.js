import React, { useEffect, useState } from 'react'
import { Row, Icon } from 'antd'
import Axios from 'axios'
import ReadingListCardList from './Sections/CardList'

function MyReadingListPage(props) {

    const [List, setList] = useState(null)

    useEffect(() => {

        const variable = {
            user: localStorage.userId
        }

        Axios.post('/api/users/myReading_list', variable)
            .then(response => {
                if (response.data) {
                    setList(response.data.userInfo.readinglist)
                    console.log(response.data)
                } else {
                    alert('정보를 못찾았습니다.')
                }
            })

    }, [])

    if(List === null) {
        return <h1>recieving</h1>
    }

    return (
        <div style={{ width: '70%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  My Reading List  <Icon type="book" />  </h2>
            </div>
            {/* {Products.length === 0 ?
            <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                <h2>No post yet...</h2>
            </div> : */}
            <br />
            <br />
            <div>
                <Row gutter={[16, 16]}>

                    <ReadingListCardList readinglist={List}/>

                </Row>

            </div>
        </div>
    )
}

export default MyReadingListPage
