import '../../../Style/Manage.css'
import {useHistory} from 'react-router-dom'
import {Row, Col, Tabs} from 'antd'

import { Route, Switch } from 'react-router'
import User from './User/User'
import Bills from './Bills/Bills'
import AccessFrequence from './AccessFrequence/AccessFrequence'


const Manager = (props)=>{
    const history = useHistory()
    return(
        <div className="mamage-root">
            <Tabs
                defaultActiveKey="1" 
            >
                <Tabs.TabPane 
                    key="1"
                    tab={
                        <button
                            className="tab-button"
                        >
                            Người dùng
                        </button>
                    }
                >
                    {console.log(props.userData)}
                    <User
                        userData={props.userData}
                        setUserData={props.setUserData}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane 
                    key="2"
                    tab={
                        <button
                            className="tab-button"
                        >
                            Đơn hàng
                        </button>
                    }
                >
                    <Bills
                    
                    />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key="3"
                    tab={
                        <button
                            className="tab-button"
                        >
                            Lưu lượng truy cập
                        </button>
                    }
                >
                    <AccessFrequence

                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
export default Manager
