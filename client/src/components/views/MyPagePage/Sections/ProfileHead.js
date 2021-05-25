import React, { useState } from 'react'
import { Typography, Icon, Form, Input, Button, message } from 'antd'

const { Title } = Typography;

function ProfileHead(props) {

    return (
        <div>
            <a href='/me/mypage/edit'><Icon type="setting" style={{ float: 'right', fontSize: '2rem', color:'gray' }} /></a>
           
                <div>
                    <div className="myPageImgarea">
                        <div className="userImg">
                            <img src={`http://localhost:5000/${props.profile.profileImg}`} />
                        </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <Title level={3}>{props.profile.userName}</Title>
                    </div>
                </div> 
        </div>
    )
}

export default ProfileHead
