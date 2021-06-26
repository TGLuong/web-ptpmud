import '../../Style/Profile.css'
import {useHistory} from 'react-router-dom'
import {Row, Col} from 'antd'
import profileIcon from '../../img/core-img/profile-white-background.png'
import ColorCart from '../../img/core-img/color-cart.png'

import { Route, Switch } from 'react-router'

import UserInfo from './components/UserInfo/UserInfo'
import Bank from './components/Bank/Bank'
import Address from './components/Address/Address'
import Password from './components/Password/Password'


const Profile = (props)=>{
    const history = useHistory()
    return(
        <div className="profile-root">
            <Row>
                <Col md={6} className="profile-tabs-section">
                    <div>
                        <h2>
                            <img
                                className="profile-icon"
                                src={profileIcon}
                                alt="profileIcon"
                            />
                            Tài Khoản Của Tôi
                        </h2>
                        <ul className="profile-tabs">
                            <li>
                                <button 
                                    onClick={()=>{
                                        history.push('/dashboard/profile/userinfo')
                                    }}
                                >
                                    Hồ Sơ
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={()=>{
                                        history.push('/dashboard/profile/bank')
                                    }}
                                >
                                    Ngân Hàng
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={()=>{
                                        history.push('/dashboard/profile/address')
                                    }}
                                >
                                    Địa Chỉ
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={()=>{
                                        history.push('/dashboard/profile/password')
                                    }}
                                >
                                    Đổi Mật Khẩu
                                </button>
                            </li>
                        </ul>
                        <button
                            className="base-hover"
                            style={{
                                backgroundColor:'white',
                                transition:'100ms',
                                border:'none',
                                outline:'none',
                                fontSize:'24px'
                            }}
                        >
                            <img
                                className="profile-icon"
                                src={ColorCart}
                                alt="cart"
                            />
                            Đơn dã mua
                        </button>
                    </div>
                </Col>
                <Col md={18} className="profile-detail-section">
                    <Switch>
                        <Route path="/dashboard/profile/userinfo">
                            <UserInfo userData={props.userData}></UserInfo>
                        </Route>
                        <Route path="/dashboard/profile/bank">
                            <Bank/>
                        </Route>
                        <Route path="/dashboard/profile/address">
                            <Address/>
                        </Route>
                        <Route path="/dashboard/profile/password">
                            <Password/>
                        </Route>
                    </Switch>
                </Col>
                
            </Row>
            <div style={{height:'200px'}}></div>
        </div>
    )
}
export default Profile
