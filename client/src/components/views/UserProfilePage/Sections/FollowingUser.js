import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function FollowingUser(props) {

    const { userId } = useParams();
    const [FollowingProfile, setFollowingProfile] = useState(null)

    useEffect(() => {

        const variable = {

            userFrom: userId
        }

        axios.post('/api/follower/myfollowing', variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setFollowingProfile(response.data.profile)
                } else {
                    alert('failed')
                }
            })


    }, [])

    if (FollowingProfile === null) {
        return <p>loading..</p>
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {FollowingProfile.map((profile, index) => (
                    <div>
                        <a href={`/users/userpage/${profile.userInfo}`}>
                            <img src={`http://localhost:5000/${profile.imageUrl}`} style={{ width: '70px', height: '70px', borderRadius: '50%', border: '1px solid lightgrey', objectFit: 'cover', margin: '5px' }} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FollowingUser
