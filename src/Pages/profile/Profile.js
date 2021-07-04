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
import Account from './components/Account/Account'
import Bill from './components/Bill/Bill'


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
                            <li>
                                <button
                                    onClick={()=>{
                                        history.push('/dashboard/profile/account')
                                    }}
                                >
                                    Xóa Tài Khoản
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
                            onClick={()=>{
                                history.push('/dashboard/profile/bill')
                            }}
                        >
                            <img
                                className="profile-icon"
                                src={ColorCart}
                                alt="cart"
                            />
                            Đơn đã mua
                        </button>
                    </div>
                </Col>
                <Col md={18} className="profile-detail-section">
                    <Switch>
                        <Route path="/dashboard/profile/userinfo">
                            <UserInfo
                                userData={props.userData} 
                                setUserData={props.setUserData}
                                setBankData={props.setBankData}
                            />
                        </Route>
                        <Route path="/dashboard/profile/bank">
                            <Bank
                                userName={props.userData.full_name}
                                userID={props.userData.id}
                                bankData={props.bankData}
                                setBankData={props.setBankData}
                            />
                        </Route>
                        <Route path="/dashboard/profile/address">
                            <Address
                                addressData={props.addressData}
                                setAddressData={props.setAddressData}
                                userID={props.userData.id}
                            />
                        </Route>
                        <Route path="/dashboard/profile/password">
                            <Password
                                userID={props.userData.id}
                            />
                        </Route>
                        <Route path="/dashboard/profile/account">
                            <Account
                                userID={props.userData.id}
                            />
                        </Route>
                        <Route path="/dashboard/profile/bill">
                            <Bill
                                userID={props.userData.id}
                            />
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </div>
    )
}
export default Profile
