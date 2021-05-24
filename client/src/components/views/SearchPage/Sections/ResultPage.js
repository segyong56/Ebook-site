import React from 'react'
import { List, Icon, Avatar } from 'antd'

function ResultPage(props) {

    const books = props.books




    const listData = [];

    for (let i = 0; i < books.length; i++) {

        listData.push({
            href: `/book/${books[i]._id}`,
            title: books[i].bookTitle,
            avatar: books[i].profile === undefined ? '/img/logo.jpg' : `http://localhost:5000/${books[i].profile.imageUrl}`,
            description:
                books[i].bookDescription,
            img: <img style={{ width: '120px', objectFit: 'cover' }} src={`http://localhost:5000/${books[i].bookCoverImage}`} />
        });


    }


    return (
        <div>
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
                            <Icon type="eye" />,
                            <Icon type="star" />,
                            <Icon type="bars" />,
                        ]}
                        extra={item.img}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} style={{ border: '1px solid lightgrey', width: '50px', height: '50px', }} />}
                            title={<a href={item.href} style={{
                                fontSize: '18px', position: 'relative',
                                top: '10px'
                            }}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ResultPage
