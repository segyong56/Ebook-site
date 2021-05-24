import React, { useState } from 'react'
import { Icon, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import '../MyPagePage/myPage.css'

function MyProfileEditPage() {

    const [ProfileImg, setProfileImg] = useState("")


    const onDrop = (files) => {

        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/users/image', formData, config)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setProfileImg(response.data.image)
                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div style={{ width: '1000px', margin: '2rem auto' }}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }} >

                <Form onSubmit={onSubmit} style={{ marginTop: '2rem' }}>

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
                                        {ProfileImg ? (

                                            <img src={`http://localhost:5000/${ProfileImg}`}
                                                style={{ width: '100px', height: '100px', border: '1px solid lightgray', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover' }} />
                                        ) : (
                                            <div>
                                                <img src='/img/logo.jpg' style={{ width: '100px', height: '100px', border: '1px solid lightgray', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover' }} />
                                                <Icon type="camera" className="iconCamera" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                    <br />
                    <Form.Item label="Name" >
                        <Input
                            onChange
                            defaultValue
                        />
                    </Form.Item>
                    <Button type='dashed' style={{ width: '100%' }} onClick={onSubmit}>Save</Button>
                    <br />
                    <br />
                    <a href="/"><Button type='dashed' style={{ width: '100%' }} onClick>Change Password</Button></a>
                </Form>
            </div>
        </div>
    )
}

export default MyProfileEditPage
