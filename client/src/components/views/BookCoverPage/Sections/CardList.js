import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function CardList(props) {


    const {bookId} = useParams();
    const [Limit, setLimit] = useState(8)
    const [CardList, setCardList] = useState([])


    useEffect(() => {

        const variable = {
            bookId : bookId,
            limit : Limit
        }

        axios.post('/api/book/cardlist', variable)
        .then(response => {
            if(response.data) {
                console.log(response.data)
                setCardList(response.data.books)
            } else {
                alert('상품을 가져오지 못했습니다.')
            }
        })

    }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {CardList.map((card, index) => {
                return (
           
                    <div key={index} style={{ display : 'flex', width: '140px', height: '180px',  marginRight: '1rem' }} >
                       <a href={`/book/getBook/${card._id}`}> <img src={`http://localhost:5000/${card.bookCoverImage}`} style={{ width: '140px', height: '200px', marginRight: '1rem'}} />  </a>  
                    </div>
              
                )
            })}
        </div>
    )
}

export default CardList
