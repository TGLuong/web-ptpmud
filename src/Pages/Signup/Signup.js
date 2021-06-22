import '../../Style/Signin_up.css'
import {Row,Col, Input, notification} from 'antd'
import axios from 'axios'
import {CloseCircleOutlined, CheckOutlined} from '@ant-design/icons'
import { CloseBtn, FacebookLoginBtn, GoogleLoginBtn, LoginBtn } from '../../component/Button'
import { Line } from '../../component/Line'

import {baseUrl} from '../../config'

function Signup(props) {

    const toSignin = ()=>{
        props.offSignUpPopup()
        props.onSignInPopup()
    }
    const openErr = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#fff2f0',
                border:'1px solid #ffccc7'
            },
            icon:<CloseCircleOutlined style={{color:'red'}} />
            
        })
    }
    const openSucc = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#f6ffed',
                border:'1px solid #b7eb8f'
            },
            icon:<CheckOutlined  style={{color:'#52c41a'}} />
            
        })
    }
    const signup=()=>{
        const username = document.getElementById('signup_username').value;
        const password = document.getElementById('signup_password').value;
        const val_password = document.getElementById('signup_val_password').value;
        
        if(username===''||password===''||val_password===''){
            openErr('Thiếu thông tin','Vui lòng nhập đầy đủ thông tin để đăng ký')
        }else if(username.match(/[^a-z0-9]/)){
            openErr('Sai quy chuẩn','tên người dùng không được có chữ hoa, ký tự đặc biệt và dấu')
        }else if(!password.match(/[a-z]/)||!password.match(/[0-9]/)){
            openErr('Sai quy chuẩn','mật khẩu phải có chữ và số')
        }else if(password.localeCompare(val_password)!==0){
            openErr('Mật khẩu xác thực sai','Vui lòng nhập đúng mật khẩu xác thực')
        }else{
            axios({
                method:'post',
                url:baseUrl+'/user/signup',
                data:{
                    username:username,
                    password:password
                }
            }).then(res=>{
                openSucc('đăng ký thành công','')
                toSignin()
            }).catch(err=>{
                document.getElementById('sign_up_err').style.visibility="visible";
                setTimeout(
                    ()=>{document.getElementById('sign_up_err').style.visibility="hidden"}
                    ,3000
                )
            })
        }
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
                                        <h1>Chào Mừng Đến<br></br> Với Cửa Hàng<br></br> Trực Tuyến</h1>
                                        <Line/>
                                        <h2>Đăng ký để mua sắm</h2>
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
                                                Đăng Ký Với Facebook
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
                                                Đăng Ký Với Google
                                                </GoogleLoginBtn>
                                        </Row>
                                        <h1 
                                            style={{
                                                display:'flex',
                                                justifyContent:'center',
                                                alignItems:'center',
                                                fontSize:'20px',
                                                height:'45px',
                                            }}
                                        >
                                            <b>or</b>
                                        </h1>
                                    </Col>
                                </Row>
                                <Row style={{height:'43%'}}>
                                    <Col xs={24} style={{padding:'0px 55px'}}>
                                        <Row style={{marginBottom:'10px'}}>
                                            <Input 
                                                id={'signup_username'}
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
                                                id={'signup_password'}
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
                                                id={'signup_val_password'}
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
                                            <LoginBtn onClick={signup}>
                                                <b>Đăng Ký</b>
                                            </LoginBtn>
                                        </Row>
                                        <Row>
                                            <h1 
                                                id="sign_up_err" 
                                                style={{
                                                    fontSize:'14px',
                                                    color:'red',
                                                    fontWeight:'600',
                                                    visibility:'hidden'
                                                }}
                                            >
                                                Tài khoản đã tồn tại
                                            </h1>
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
                                                outline:'none',
                                                margin:'0px 7px',
                                                cursor:'pointer'
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