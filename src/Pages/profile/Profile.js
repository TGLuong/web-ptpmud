import '../../Style/Profile.css'
import {useState} from 'react'
import {Row, Col, Card , Input, Radio, Dropdown} from 'antd'
import profileIcon from '../../img/core-img/profile-white-background.png'
import ColorCart from '../../img/core-img/color-cart.png'

import PickDate from './components/PickDate/PickDate'

const Profile = (props)=>{
    const [gender,setGender] = useState(1)
    const changeGender = event => {
        setGender(event.target.value)
    }
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
                            <tr>
                                <td className="label">Tên Đăng Nhập</td>
                                <td>gialuong</td>
                            </tr>
                            <tr>
                                <td className="label">Họ Tên</td>
                                <td><Input/></td>
                            </tr>
                            <tr>
                                <td className="label">Email</td>
                                <td><Input/></td>
                            </tr>
                            <tr>
                                <td className="label">Số Điện Thoại</td>
                                <td><Input/></td>
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
                                <td><PickDate/></td>
                            </tr>
                        </table>
                    </Card>
                </Col>
                
            </Row>
            <div style={{height:'200px'}}></div>
        </div>
    )
}
export default Profile
