import '../../Style/Signin_up.css'
import axios from 'axios'
import {useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {BarLoader} from 'react-spinners'
import {Row,Col, Input, notification, Descriptions} from 'antd'
import {CloseCircleOutlined} from '@ant-design/icons'
import { CloseBtn, FacebookLoginBtn, GoogleLoginBtn, LoginBtn } from '../../component/Button'
import { Line } from '../../component/Line'
import {baseUrl} from '../../config'


function Signin(props) {
    const history = useHistory()
    const location = useLocation()
    const [loading,setLoading] = useState(false)
    const toSignup=()=>{
        props.offSignInPopup()
        props.onSignUpPopup()
    }
    const enterlogin=(event)=>{
        if(event.key === 'Enter'){
            login()
        }
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
    const login=()=>{
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if(username.length===0||password.length===0){
            openErr('Đăng nhập thất bại','Vui lòng nhập tên tài khoản và mật khẩu để đăng nhập')
        }else{
            setLoading(true)
            axios({
                method:'post',
                url:baseUrl+'/user/signin',
                data:{
                    username:username,
                    password:password,
                }
            }).then(res=>{
                const data = res.data
                if(data.message==='done'){
                    sessionStorage.setItem('userdata',JSON.stringify({
                        email:res.data.data.email,
                        id:res.data.data.id,
                        is_admin:res.data.data.is_admin,
                        phone:res.data.data.phone,
                        full_name:res.data.data.full_name,
                        username:res.data.data.username,
                        gender:res.data.data.gender,
                        date_of_birth:res.data.data.date_of_birth
                    }))
                    sessionStorage.setItem('carts',JSON.stringify(res.data.data.carts))
                    sessionStorage.setItem('favorites',JSON.stringify(res.data.data.favorites))
                    sessionStorage.setItem('addresses',JSON.stringify(res.data.data.addresses))
                    sessionStorage.setItem('banks',JSON.stringify(res.data.data.banks))
                    history.push('/dashboard'+location.pathname+location.search)
                }
            }).catch(err=>{
                    document.getElementById('login_err').style.visibility="visible"
                    setLoading(false)
            })
            
        }
    }
    return(
        <>
            <div id="signin-popup" className="popup">
                <div className="curtain"></div>
                <div className="background">
                    <div className="container">
                        <Row  
                            style={{
                                width:'100%',
                                height:'100%'
                            }}
                        >
                            <Col className="slogan" xs={11}>
                                <Row 
                                    align="middle" 
                                    style={{
                                        width:'100%',
                                        height:'100%'
                                    }}
                                >
                                    <Col>
                                        <h1>Chào Mừng Trở Lại Với Cửa Hàng Trực Tuyến</h1>
                                        <Line/>
                                        <h2>Đăng nhập để mua sắm</h2>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="contend" xs={13}>
                                <Row 
                                    style={{height:'10%'}} 
                                    align="middle" 
                                    justify="end"
                                >
                                    <CloseBtn onClick={props.offSignInPopup}>
                                        <CloseCircleOutlined 
                                            style={{
                                                fontSize:'30px',
                                                margin:'0px 15px',
                                                color:'red'
                                            }}
                                        >
                                            </CloseCircleOutlined>
                                        </CloseBtn>
                                </Row>
                                <Row 
                                    align="bottom" 
                                    style={{
                                        height:'30%',
                                        // border:'1px solid red',
                                        
                                    }}
                                >
                                    <Col 
                                        xs={24} 
                                        style={{
                                        }}
                                    >
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
                                                        top:'0px',left:'0px',
                                                        height:'30px',
                                                        margin:'7.5px 12px'
                                                    }} 
                                                    src={'./img/core-img/facebook-icon.png'} 
                                                    alt="facebook"
                                                />
                                                Đăng Nhập Với Facebook
                                            </FacebookLoginBtn>
                                        </Row>
                                        <Row 
                                            style={{
                                                width:'100%',
                                                padding:'0px 50px',
                                                marginBottom:'3px',
                                                fontWeight:'700',
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
                                                    alt="google"
                                                />
                                                Đăng Nhập Với Google
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
                                    <Col xs={24} 
                                        style={{
                                            padding:'0px 55px',
                                        }}
                                    >
                                        <Row style={{marginBottom:'10px'}}>
                                            <Input
                                                id={'username'}
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
                                                id={'password'}
                                                onKeyDown={enterlogin}
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
                                            <Link to={'/'}
                                                style={{
                                                    fontSize:'16px', 
                                                    color:'#3B5998'
                                                }}
                                            >
                                                <b>Quên mật khẩu?</b>
                                            </Link>
                                        </Row>
                                        <Row style={{margin:'10px 0px'}}>
                                            <LoginBtn onClick={login}><b>Đăng Nhập</b></LoginBtn>
                                        </Row>
                                        <Row>
                                            <BarLoader loading={loading} width={'100%'} />
                                        </Row>
                                        <Row>
                                            <h1 
                                                id="login_err" 
                                                style={{
                                                    fontSize:'16px',
                                                    color:'red',
                                                    fontWeight:'600',
                                                    visibility:'hidden'
                                                }}
                                            >
                                                Sai tên đăng nhập hoặc mật khẩu
                                            </h1>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{height:'17%',padding:'0px 55px'}}>
                                    <h1 style={{fontSize:'16px'}}>
                                        Bạn chưa có tài khoản? 
                                        <button 
                                            onClick={toSignup}
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
                                            <b>Đăng Ký</b>
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
export default Signin