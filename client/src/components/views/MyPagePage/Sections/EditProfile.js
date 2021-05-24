import React, { useState } from 'react'
import { Typography, Icon, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { useHistory } from 'react-router-dom'

const { Title } = Typography;

function EditProfile(props) {
    const history = useHistory();

    const [ShowEditProfile, setShowEditProfile] = useState(false)
    const [NickName, setNickName] = useState(null)
    const [ProfileImg, setProfileImg] = useState(null)

    

    const onSubmit = () => {

        const variable = {
            userInfo: localStorage.userId,
            nickname: NickName,
            imageUrl : ProfileImg
        }
       
        axios.post('/api/profile/edit_profil', variable)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    message.success('changeded your profile')
                    history.push('/users/mypage')
                } else {
                    alert('save is faied')
                }
            })

    }

    const onDrop = (files) => {

        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        console.log(files)
        axios.post('/api/profile/image', formData, config)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setProfileImg(response.data.image)

                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    const NicknameChange = (e) => {
        setNickName(e.currentTarget.value)
    }

    const showEditProfile = () => {
        setShowEditProfile(!ShowEditProfile)
    }

    return (
        <div>

            <Icon type="setting" style={{ float: 'right', fontSize: '2rem' }} onClick={showEditProfile} />
            {!ShowEditProfile ? (
                <div>
                    <div className="myPageImgarea">
                        <div className="userImg">
                            <img src={`http://localhost:5000/${props.profileInfo.imageUrl}`} />
                        </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <Title level={3}>{props.profileInfo.nickname}</Title>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }} >

                    <Form onSubmit={onSubmit}>

                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <div>
                                <Dropzone
                                    onDrop={onDrop}
                                    multiple={false}
                                    maxSize={800000000}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div style={{ width: '100px', height: '100px', border: '1px solid lightgray', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            {...getRootProps()}
                                        >
                                            <input {...getInputProps()} />
                                            {ProfileImg? (
                                            
                                            <img src={`http://localhost:5000/${ProfileImg}`}
                                                style={{ width: '100px', height: '100px', border: '1px solid lightgray', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover'}} />
                                            ) : (
                                            <div>
                                            <img src={`http://localhost:5000/${props.profileInfo.imageUrl}`}  style={{ width: '100px', height: '100px', border: '1px solid lightgray', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover'}} />
                                            <Icon type="camera" className="iconCamera" />
                                            </div>
                                          )}
                                                 
                                        </div>
                                    )}
                                </Dropzone>

                            </div>
                            
                        </div>

                        <br />
                        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                            <Title level={3}>
                                <Input
                                    onChange={NicknameChange}
                                    defaultValue={props.profileInfo.nickname}
                                />
                            </Title>
                        </div>
                        <Button type='dashed' style={{ width: '100%' }} onClick={onSubmit}>Save</Button>
                    </Form>
                </div>
            )}
            
            
        </div>
    )
}

export default EditProfile
