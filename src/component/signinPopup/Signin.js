import { Fragment } from "react";
import '../../css/Signin.css'
import {Row,Col} from 'antd'
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
    width:100%;
    height:45px;
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
    border: none;
    &:focus{
        outline:none;
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
                                    <CloseBtn onClick={props.offPopup}><CloseCircleOutlined style={{fontSize:'30px',margin:'0px 15px'}}></CloseCircleOutlined></CloseBtn>
                                </Row>
                                <Row align="bottom" style={{height:'30%',border:'1px solid red'}}>
                                    <Col xs={24} >
                                        <Row style={{width:'100%',padding:'0px 55px'}}>
                                            <FacebookLoginBtn> Đăng Nhập Với Facebook</FacebookLoginBtn>
                                        </Row>
                                        <Row style={{width:'100%',padding:'0px 55px'}}>
                                            <GoogleLoginBtn> Đăng Nhập Với Google</GoogleLoginBtn>
                                        </Row>
                                        <h1>or</h1>
                                    </Col>
                                </Row>
                                <Row style={{height:'60%',border:'1px solid red'}}>

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