import React, { useEffect, useState } from 'react'
import { Icon, Typography, Button, Tabs } from 'antd'
import './myPage.css'
import axios from 'axios'
import CurrentReading from './Sections/CurrentReading'
import WorkingList from './Sections/WorkingList'
import ProfileHead from './Sections/ProfileHead'
import EditProfile from './Sections/EditProfile'
import MyFollowingUser from './Sections/MyFollowingUser'
import { useSelector } from 'react-redux'

const { Title } = Typography;
const { TabPane } = Tabs;

function MyPagePage(props) {

    const [UserInfo, setUserInfo] = useState(null)
    const [ProfileInfo, setProfileInfo] = useState(null)
    const user = useSelector(state => state.user)
   

    useEffect(() => {

       


    }, [])


    const callback = (key) => {
        console.log(key);
    }


    return (
        <div style={{ width: '1000px', margin: '2rem auto' }}>
            <br />
            <br />
            <ProfileHead />
            <br />
            <br />
            {/* <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Current Reading" key="1">
                    <CurrentReading userInfo={UserInfo}/>
                    <div style={{ marginTop: '1.5rem'}}>
                    <a href='/book/myReading_list'><Button type="dashed">
                    <Icon type="edit" /> Edit</Button></a>
                    </div>
                </TabPane>
                <TabPane tab="My Stories" key="2">
                    <WorkingList userInfo={UserInfo} />
                    <div style={{ marginTop: '1.5rem'}}>
                       <a href='/book/myBook_list'><Button type="dashed">
                           <Icon type="edit" /> Edit</Button></a> 
                    </div>
                </TabPane>
                <TabPane tab="Following" key="3">
                    <MyFollowingUser userInfo={UserInfo} />
                </TabPane>
            </Tabs> */}

        </div>
    )
}

export default MyPagePage
















