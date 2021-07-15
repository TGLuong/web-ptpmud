import '../../../Style/Manage.css'
import { Tabs} from 'antd'
import User from './User/User'
import Bills from './Bills/Bills'
import AccessFrequence from './AccessFrequence/AccessFrequence'


const Manager = (props)=>{
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
                        billData={props.billData}
                        setBillData={props.setBillData}
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
