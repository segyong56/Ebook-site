import React, { useState } from 'react'
import { Typography, Icon, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { useHistory } from 'react-router-dom'

const { Title } = Typography;

function ProfileHead() {

    return (
        <div>
            <a href='/me/mypage/edit'><Icon type="setting" style={{ float: 'right', fontSize: '2rem', color:'gray' }} /></a>
           
                <div>
                    <div className="myPageImgarea">
                        <div className="userImg">
                            <img src="/img/logo.jpg" />
                        </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <Title level={3}>Nick Name</Title>
                    </div>
                </div> 
        </div>
    )
}

export default ProfileHead
