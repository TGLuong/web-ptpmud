import '../../Style/Profile.css'
import {Row, Col, Tabs} from 'antd'
import profileIcon from '../../img/core-img/profile-white-background.png'

const {TabPane} = Tabs;

const Profile = (props)=>{
    return(
        <div className="profile-root">
            <Row>
                <Col md={6} className="profile-tabs-section">
                    <div style={{height:'100px'}}></div>
                    <div>
                        <h2>
                            <img
                                className="profile-icon"
                                src={profileIcon}
                                alt="profileIcon"
                            />
                            Tài Khoản Của Tôi
                        </h2>
                        <div className="profile-tabs">
                            <button>Hồ Sơ</button>
                            <button>ascca</button>
                            <button>ascca</button>
                            <button>ascca</button>
                            <button>ascca</button>
                        </div>
                    </div>
                </Col>
                <Col md={18} className="profile-detail-section">
                
                </Col>
            </Row>
        </div>
    )
}
export default Profile
