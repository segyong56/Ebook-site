import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { UserAddOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'

function Follower(props) {

    const [Following, setFollowing] = useState(false)
    const [FollowerNumber, setFollowerNumber] = useState(0)

    useEffect(() => {

        const variable = {
            userTo: props.userTo
        }

        axios.post('/api/follower/followerNumber', variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setFollowerNumber(response.data.followerNumber)
                } else {
                    alert('this path is wrong')
                }
            })

        const followingVariable = {
            userTo: props.userTo,
            userFrom: localStorage.userId
        }

        axios.post('/api/follower/following', followingVariable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setFollowing(response.data.following)
                } else {
                    alert('this path is wrong')
                }
            })

    }, [])

    const onFollowing = () => {

        const onFollowing = {
            userTo: props.userTo,
            userFrom: localStorage.userId
        }

        if (Following) {
            console.log(Following)
            axios.post('/api/follower/unfollowing', onFollowing)
                .then(response => {
                    if (response.data) {
                        console.log(response.data)
                        setFollowerNumber(FollowerNumber - 1)
                        setFollowing(!Following)
                    } else {
                        alert('canceling is failed')
                    }
                })
        } else {
            console.log(Following)
            axios.post('/api/follower/start_following', onFollowing)
                .then(response => {
                    if (response.data) {
                        console.log(response.data)
                        setFollowerNumber(FollowerNumber + 1)
                        setFollowing(!Following)
                    } else {
                        alert('canceling is failed')
                    }
                })

        }

    }

    return (
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', fontSize: '2rem' }}>
            <Button style={{ fontSize: '1rem', width: '150px', height: '45px' }} onClick={onFollowing}>
                {Following === true ? (<React.Fragment><UserOutlined /> Now Following</React.Fragment>)
                    : (<React.Fragment><UserAddOutlined style={{ fontSize: '1.5rem' }} /> Following </React.Fragment>)}
            </Button>
        </div>
    )
}

export default Follower
