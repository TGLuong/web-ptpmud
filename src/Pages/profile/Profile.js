import '../../Style/Profile.css'
import {useEffect, useState} from 'react'
import {Row, Col, Card , Input, Radio, Button, InputNumber} from 'antd'
import profileIcon from '../../img/core-img/profile-white-background.png'
import ColorCart from '../../img/core-img/color-cart.png'

import PickDate from './components/PickDate/PickDate'

const Profile = (props)=>{
    const [gender,setGender] = useState(null)
    const changeGender = event => {
        setGender(event.target.value)
    }
    const [dateofbrith,setDateofbirth] = useState([1,1,2000])
    useEffect(()=>{
        setGender(props.userData.gender)
    },[props.userData])
    return(
        <div className="profile-root">
            <Row>
                {console.log(dateofbrith)}
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
                            <li><button>Hồ Sơ</button></li>
                            <li><button>Ngân Hàng</button></li>
                            <li><button>Địa Chỉ</button></li>
                            <li><button>Đổi Mật Khẩu</button></li>
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
                    <h1>Hồ Sơ Của Tôi</h1>
                    <Card
                        hoverable
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td className="label">Tên Đăng Nhập</td>
                                    <td>{props.userData.username}</td>
                                </tr>
                                <tr>
                                    <td className="label">Họ Tên</td>
                                    <td><Input id="ho-ten" defaultValue={props.userData.full_name}/></td>
                                </tr>
                                <tr>
                                    <td className="label">Email</td>
                                    <td><Input id="email" defaultValue={props.userData.email} /></td>
                                </tr>
                                <tr>
                                    <td className="label">Số Điện Thoại</td>
                                    <td><Input id="std" defaultValue={props.userData.phone}/></td>
                                </tr>
                                <tr>
                                    <td className="label">Giới Tính</td>
                                    <td>
                                        <Radio.Group value={gender} onChange={changeGender}>
                                            <Radio value={1}>Nam</Radio>
                                            <Radio value={2}>Nữ</Radio>
                                            <Radio value={3}>Khác</Radio>
                                        </Radio.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Ngày Sinh</td>
                                    <td><PickDate onChange={(day,month,year)=>{setDateofbirth([day,month,year])}} /></td>
                                </tr>
                                <tr>
                                    <td className="label"></td>
                                    <td><Button type="primary" style={{width:'100px'}}>Lưu</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </Col>
                
            </Row>
            <div style={{height:'200px'}}></div>
        </div>
    )
}
export default Profile
