import { Fragment } from "react";
import '../../css/Signin.css'
import {Link} from 'react-router-dom'
import {Row,Col, Input} from 'antd'
import styled from 'styled-components'
import {CloseCircleOutlined} from '@ant-design/icons'

const Line = styled.div`
    width: 200px;
    margin:30px 0px;
    padding:0px;
    height: 10px;
    border-radius:15px;
    background-color: #00F318;
`;
const FacebookLoginBtn = styled.button`
    position: relative;
    cursor: pointer;
    width:100%;
    height:45px;
    margin:5px;
    color:white;
    font-size:18px;
    background-color:#3B5998;
    border: none;
    border-darius:15px;
    &:focus{
        outline:none;
    }
`;
const GoogleLoginBtn = styled.button`
    position: relative;
    width:100%;
    height:45px;
    cursor: pointer;
    margin:5px;
    color:black;
    font-size:18px;
    background-color:#fffff;
    border: none;
    border-darius:15px;
    &:focus{
        outline:none;
    }
`;
const CloseBtn = styled.button`
    background-color: white;
    cursor: pointer;
    border: none;
    &:focus{
        outline:none;
    }
`;
const LoginBtn = styled.button`
    width:100%;
    cursor: pointer;
    height:45px;
    font-size:18px;
    fontWeight:700;
    background-color: #00F318;
    border: none;
    &:focus{
        outline: none;
    }
    &:hover{
        background-color: #00F358;
    }
`;

function Signin(props) {
    return(
        <Fragment>
            <div id="popup" className="popup">
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
                                    <CloseBtn onClick={props.offPopup}><CloseCircleOutlined style={{fontSize:'30px',margin:'0px 15px',color:'red'}}></CloseCircleOutlined></CloseBtn>
                                </Row>
                                <Row align="bottom" style={{height:'30%'}}>
                                    <Col xs={24} >
                                        <Row style={{width:'100%',fontWeight:'700',padding:'0px 55px'}}>
                                            <FacebookLoginBtn>
                                                <img style={{position:'absolute',top:'0px',left:'0px',height:'30px',margin:'7.5px 12px'}} src={'./img/core-img/facebook-icon.png'} />
                                                Đăng Nhập Với Facebook
                                            </FacebookLoginBtn>
                                        </Row>
                                        <Row style={{width:'100%',padding:'0px 55px',fontWeight:'700'}}>
                                            <GoogleLoginBtn>
                                                <img style={{position:'absolute',top:'0px',left:'0px',height:'30px',margin:'7.5px 12px'}} src={'./img/core-img/google-icon.png'} />
                                                Đăng Nhập Với Google
                                                </GoogleLoginBtn>
                                        </Row>
                                        <h1 style={{textAlign:'center'}}><b>or</b></h1>
                                    </Col>
                                </Row>
                                <Row style={{height:'43%'}}>
                                    <Col xs={24} style={{padding:'0px 55px'}}>
                                        <Row style={{margin:'10px 0px'}}>
                                            <Input style={{height:'45px'}} placeholder={'Tài Khoản'} ></Input>
                                        </Row>
                                        <Row style={{margin:'10px 0px'}}>
                                            <Input.Password style={{height:'45px',fontSize:'18px'}} placeholder={'Mật Khẩu'} ></Input.Password>
                                        </Row>
                                        <Row style={{margin:'10px 0px'}}>
                                            <Link style={{fontSize:'16px', color:'#3B5998'}}><b>Quên mật khẩu?</b></Link>
                                        </Row>
                                        <Row style={{margin:'10px 0px'}}>
                                            <LoginBtn><b>Đăng Nhập</b></LoginBtn>
                                        </Row>
                                        
                                    </Col>
                                </Row>
                                <Row style={{height:'17%',padding:'0px 55px'}}>
                                    <h1 style={{fontSize:'16px'}}>Bạn chưa có tài khoản? <Link style={{fontSize:'16px', color:'#3B5998'}}><b>Đăng Ký</b></Link> </h1>
                                </Row>
                            </Col>
                        </Row>
                    </div>  
                </div>
            </div>
        </Fragment>
    );
}
export default Signin