import React, { useEffect, useState } from 'react'
import { Icon, Button, Typography, Badge } from 'antd'
import MyworkList from './Sections/MyworkList'
import MyReadingList from './Sections/MyReadingList'
import FollowingUser from './Sections/FollowingUser'
import Follower from './Sections/Follower'
import axios from 'axios'
import { UserAddOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

const { Title } = Typography;

function UserMyPage(props) {

    const { userId } = useParams();

    const [User, setUser] = useState(null);
    const [Profile, setProfile] = useState(null);

    useEffect(() => {

        const variable = {
            user: userId
        }

        axios.post('/api/users/myReading_list', variable)
            .then(response => {
                if (response.data) {
                    setUser(response.data.userInfo)
                } else {
                    alert('정보를 찾지 못했습니다. 다시 시도해 보세요.')
                }
            })

        axios.post('/api/profile/userpage', variable)
            .then(response => {
                if (response.data) {
                    setProfile(response.data.profile)
                } else {
                    alert('failed')
                }
            })

    }, [])

    if (User === null) {
        return <h1>recieving</h1>
    }


    return (
        <div style={{ width: '1000px', margin: '2rem auto' }}>

            <br />
            <br />
            {Profile === null ? (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <img src="/img/logo.jpg" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid lightgrey', objectFit: 'cover' }} />
                        </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <Title level={3}>Nick Name</Title>
                    </div>
                </div>)
                : (<div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <img src={`http://localhost:5000/${Profile.imageUrl}`} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid lightgrey', objectFit: 'cover' }} />
                        </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <Title level={3}>{Profile.nickname}</Title>
                    </div>
                </div>)}

                <Follower userTo={userId}/>
            <br />
            <br />

            <div style={{ display: 'flex' }}>
                <Badge color="orange" /><Title level={4}>Following</Title>
            </div>
                <FollowingUser userInfo={User} />
            <br />
            <br />

            <div style={{ display: 'flex' }}>
                <Badge color="orange" /><Title level={4}>Working list</Title>
            </div>
                <MyworkList userInfo={User} />
            <br />

            <br />
            <br />
            <div style={{ display: 'flex' }}>
                <Badge color="orange" /><Title level={4}>Reading List</Title>
            </div>
                <MyReadingList userInfo={User} />
            <br />

        </div>
    )
}

export default UserMyPage
