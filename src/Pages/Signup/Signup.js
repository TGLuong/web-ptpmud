import '../../Style/Signin_up.css'
import {Link} from 'react-router-dom'
import {Row,Col, Input} from 'antd'
import {CloseCircleOutlined} from '@ant-design/icons'
import { CloseBtn, FacebookLoginBtn, GoogleLoginBtn, LoginBtn } from '../../component/Button'
import { Line } from '../../component/Line'

function Signup(props) {

    const toSignin = ()=>{
        props.offSignUpPopup()
        props.onSignInPopup()
    }


    return(
        <>
            <div id="signup-popup" className="popup">
                <div className="curtain"></div>
                <div className="background">
                    <div className="container">
                        <Row  style={{width:'100%',height:'100%'}}>
                            <Col className="slogan" xs={11}>
                                <Row align="middle" style={{width:'100%',height:'100%'}}>
                                    <Col>
                                        <h1>Chào Mừng Trở Lại Với Cửa Hàng Trực Tuyến</h1>
                                        <Line/>
                                        <h2>Đăng nhập để mua sắm</h2>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="contend" xs={13}>
                                <Row style={{height:'10%'}} align="middle" justify="end">
                                    <CloseBtn onClick={props.offSignUpPopup}>
                                        <CloseCircleOutlined 
                                            style={{
                                                fontSize:'30px',
                                                margin:'0px 15px',
                                                color:'red'
                                            }}>
                                        </CloseCircleOutlined>
                                    </CloseBtn>
                                </Row>
                                <Row align="bottom" style={{height:'30%'}}>
                                    <Col xs={24} >
                                        <Row 
                                            style={{
                                                width:'100%',
                                                fontWeight:'700',
                                                padding:'0px 50px',
                                            }}
                                        >
                                            
                                            <FacebookLoginBtn>
                                                <img 
                                                    style={{
                                                        position:'absolute',
                                                        top:'0px',
                                                        left:'0px',
                                                        height:'30px',
                                                        margin:'7.5px 12px'
                                                    }} 
                                                    src={'./img/core-img/facebook-icon.png'} 
                                                    alt={'facebook'}
                                                />
                                                Đăng Nhập Với Facebook
                                            </FacebookLoginBtn>
                                        </Row>
                                        <Row 
                                            style={{
                                                width:'100%',
                                                padding:'0px 50px',
                                                fontWeight:'700',
                                                borderRadius:'15px',
                                                marginBottom:'3px'
                                            }}
                                        >
                                            <GoogleLoginBtn>
                                                <img 
                                                    style={{
                                                        position:'absolute',
                                                        top:'0px',
                                                        left:'0px',
                                                        height:'30px',
                                                        margin:'7.5px 12px'
                                                    }} 
                                                    src={'./img/core-img/google-icon.png'} 
                                                    alt={'google'}
                                                />
                                                Đăng Nhập Với Google
                                                </GoogleLoginBtn>
                                        </Row>
                                        <h1 
                                            style={{
                                                textAlign:'center',
                                                color: 'rgba(30,30,30,0.8)'
                                            }}>
                                            <b>or</b>
                                        </h1>
                                    </Col>
                                </Row>
                                <Row style={{height:'43%'}}>
                                    <Col xs={24} style={{padding:'0px 55px'}}>
                                        <Row style={{marginBottom:'10px'}}>
                                            <Input 
                                                style={{
                                                    height:'45px',
                                                    borderRadius:'10px'
                                                }} 
                                                placeholder={'Tài Khoản'} 
                                            >
                                            </Input>
                                        </Row>
                                        <Row style={{margin:'10px 0px'}}>
                                            <Input.Password 
                                                style={{
                                                    height:'45px',
                                                    fontSize:'18px',
                                                    borderRadius:'10px'
                                                }} 
                                                placeholder={'Mật Khẩu'} 
                                            >
                                            </Input.Password>
                                        </Row>
                                        <Row style={{margin:'10px 0px'}}>
                                            <Input.Password 
                                                style={{
                                                    height:'45px',
                                                    fontSize:'18px',
                                                    borderRadius:'10px'
                                                }} 
                                                placeholder={'Nhập Lại Mật Khẩu'} 
                                            >
                                            </Input.Password>
                                        </Row>
                                        <Row style={{margin:'10px 0px'}}>
                                            <LoginBtn>
                                                <b>Đăng Ký</b>
                                            </LoginBtn>
                                        </Row>
                                        
                                    </Col>
                                </Row>
                                <Row style={{height:'17%',padding:'0px 55px'}}>
                                    <h1 style={{fontSize:'16px'}}>
                                        Bạn đẵ có tài khoản?
                                        <button 
                                            onClick={toSignin}
                                            style={{
                                                fontSize:'16px', 
                                                color:'#3B5998',
                                                backgroundColor:'white',
                                                border:'none',
                                                outline:'none'
                                            }}
                                            >
                                            <b>Đăng Nhập</b>
                                        </button>
                                    </h1>
                                </Row>
                            </Col>
                        </Row>
                    </div>  
                </div>
            </div>
        </>
    );
}
export default Signup