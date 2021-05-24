import React, { useState } from 'react'
import { Form, Button, Input, Icon, Typography } from 'antd'

const { Title } = Typography;

function ResetPassword() {

    const [Email, setEmail] = useState("")

    const emailHandler = (e) => {

        setEmail(e.currentTarget.value)
    }
    return (



        <div className="app">
            <Title level={2}>Reset Password</Title>
            <Form onSubmit style={{ width: '350px', marginTop: '2rem' }}>
                <Form.Item
                    label="Email"
                    required>
                    <Input
                        id="email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Enter your email"
                        type="email"
                        value={Email}
                        onChange={emailHandler}
                    />
                    <Button style={{ width: '100%'}}>Send Email</Button>


                </Form.Item>

            </Form>
        </div>
    )
}

export default ResetPassword
