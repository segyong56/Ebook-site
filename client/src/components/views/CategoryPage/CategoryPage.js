import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { List, Avatar, Input, Space } from 'antd';
import { BarsOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons'
import './CategoryPage.css'
import SearchInput from './Sections/SearchInput'



function CategoryPage(props) {

    const { categoryKey } = useParams();
    const [Books, setBooks] = useState(null)
   

    const getBooks = (variable) => {

        axios.post(`/api/book/search/${categoryKey}`, variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setBooks(response.data.books)
                } else {
                    alert('receive is failed')
                }
            })

    }
    
    useEffect(() => {

        const variable = {
            categoryKey: categoryKey
        }

        getBooks(variable)

    }, [])

    const updateSearchTerms = (newSearchTerm) => {

        const variable = {
            categoryKey: categoryKey,
            searchTerm: newSearchTerm
        }

        getBooks(variable)
    }

    if (Books === null) {
        return <p>loading..</p>
    }
   
    const listData = [];
   
    for (let i = 0; i < Books.length; i++) {
        listData.push({
            href: `/book/${Books[i]._id}`,
            title: Books[i].bookTitle,
            avatar: Books[i].profile === undefined ? '/img/logo.jpg' : `http://localhost:5000/${Books[i].profile.imageUrl}`,
            description:
                Books[i].bookDescription,
            img: <img style={{ width: '120px', objectFit: 'cover' }} src={`http://localhost:5000/${Books[i].bookCoverImage}`} />
        });
    }

    const IconText = ({ icon, text }) => (
        <div>
            {React.createElement(icon)}
            {text}
        </div>
    );

    return (
        <div style={{ width: '800px', margin: '2rem auto' }}>

            {/* searchTerm */}
            <SearchInput refreshFunction={updateSearchTerms} />

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={listData}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        style={{ height: '220.5px', width: '100%', overflow: 'hidden' }}
                        actions={[
                            <IconText icon={EyeOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={StarOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={BarsOutlined} text="3" key="list-vertical-message" />,
                        ]}
                        extra={item.img}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} style={{ border: '1px solid lightgrey', width: '50px', height: '50px',}} /> }
                            title={<a href={item.href} style={{ fontSize : '18px' ,position: 'relative',
                            top: '10px'}}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default CategoryPage
