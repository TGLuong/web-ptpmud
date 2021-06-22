import '../../Style/Profile.css'
import {Row, Col, Card , Input} from 'antd'
import profileIcon from '../../img/core-img/profile-white-background.png'
import ColorCart from '../../img/core-img/color-cart.png'


const Profile = (props)=>{
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
                            <li><button>Dịa Chỉ</button></li>
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
                                <td></td>
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
                                <td className="label">Ngày Sinh</td>
                                <dt></dt>
                            </tr>
                        </table>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Profile
