import React, {useState} from 'react'
import { Card, Col, Row,  Input } from 'antd'
import axios from 'axios';
import SearchInput from './Sections/SearchInput'
import ResultPage from './Sections/ResultPage'

const { Meta } = Card;
const { Search } = Input;

const category = [
    { key: 1, value: "Romace", img: 'rabbit2.jpeg' },
    { key: 2, value: "Fantasy", img: 'rabbit2.jpeg' },
    { key: 3, value: "Adventure", img: 'rabbit2.jpeg' },
    { key: 4, value: "New Adult", img: 'rabbit2.jpeg' },
    { key: 5, value: "Non-Fiction", img: 'rabbit2.jpeg' },
    { key: 6, value: "Mystery", img: 'rabbit2.jpeg' },
    { key: 7, value: "Horror", img: 'rabbit2.jpeg' },
    { key: 8, value: "Fanfiction", img: 'rabbit2.jpeg' },
    { key: 9, value: "Historical Fiction", img: 'rabbit2.jpeg' }
]

function SearchPage(props) {

    const [SearchTerms, setSearchTerms] = useState("")
    const [Books, setBooks] = useState(null)

    const updateSearchTerm = (newSearchTerm) => {

        const variable = {
            searchTerm : newSearchTerm
        }

        setSearchTerms(newSearchTerm)

        axios.post(`/api/book/search`, variable)
        .then(response => {
            if(response.data) {
                console.log(response.data)
                setBooks(response.data.books)
            } else {
                alert('receive is failed')
            }
        })
    }

    const searchCard = category.map((value, index) => {
        return (
            <Col lg={8} xs={24} key={index}>
                <a href={`/search/${index + 1}`} key={index}>
                    <Card
                        key={value.key}
                        hoverable
                        style={{ width: 240, textAlign: "center" }}
                        cover={<img alt="example" src={`/img/${value.img}`} />}
                    >
                        <Meta title={<h2>{value.value}</h2>} />
                    </Card>
                </a>
            </Col>
        )
    })

    return (
        <div style={{ width: '800px', margin: '2rem auto' }}>
            <SearchInput refreshFunction={updateSearchTerm}/>
            {Books === null || SearchTerms === "" ? 
            <Row gutter={[16, 16]}>
                {searchCard}
            </Row> 
            : <ResultPage books={Books} />
        }
            
            
        </div>
    )
}

export default SearchPage
