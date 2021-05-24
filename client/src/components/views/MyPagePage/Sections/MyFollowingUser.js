import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Button } from 'antd'
import '../myPage.css'

const { Meta } = Card;


function MyFollowingUser(props) {
    
    const [FollowingUserProfile, setFollowingUserProfile] = useState(null)

    useEffect(() => {

        const variable = {
            userFrom : props.userInfo._id 
        }
        
        axios.post('/api/follower/myfollowing', variable)
        .then(response => {
            if(response.data) {
                console.log(response.data)
                setFollowingUserProfile(response.data.profile)

            } else {
                alert('failed')
            }
        })

    }, [])

    if(FollowingUserProfile === null ) {
        return <p>loading...</p>
    }

    return (
        <div style={{ display: 'flex', overflowX: 'auto', marginTop:'2rem' }}>
            {FollowingUserProfile.map((profile, index) => {
                return (

                    <Card
                        
                        key={index}
                        hoverable
                        style={{ width: '200px', height: '250px', marginRight: '1rem' }}
                        cover={ 
                            profile.imageUrl ? (<img src={`http://localhost:5000/${profile.imageUrl}`} 
                            style={{ objectFit: "cover", width: '100px', height: '100px', borderRadius: '50%', border: '1px solid lightgrey' }} />)
                            : (<img src='/img/logo.jpg'  
                            style={{ objectFit: "cover", width: '100px', height: '100px', borderRadius: '50%', border: '1px solid lightgrey'}} />)
                            }
                    >
                        <Meta
                            title={<p style={{ textAlign: 'center', fontSize: '18px'}}>{profile.nickname}</p>}
                            description={<a href={`/users/userpage/${profile.userInfo}`}>
                            <Button type="dashed" style={{ width: '100%'}}>User Page</Button></a>}
                        />
                    </Card>
                )

            })} 
        </div>
    )
}

export default MyFollowingUser
