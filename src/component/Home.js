import {Fragment} from 'react'
import {Row, Col, Image} from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


import logo from '../img/core-img/logo.png'
import signUpIcon from '../img/core-img/sign-up-icon.png'
import searchIcon from '../img/core-img/search.png'

const Input = styled.input`
    padding: 20px;
    width:70%;
    background-color:#F9FAFF;
    font-size:18px;
    border:none;
    height:56px;
    border-radius:15px 0px 0px 15px;
`;
const Button = styled.button`
    background-color:#F9FAFF;
    border:none;
    height:56px;
    width:70px;
    border-radius:0px 15px 15px 0px;
`;

function Home(){
    return(
        <Fragment>
            <Row className="header-nav" align="middle" justify="space-around">
                <Col xs={24} sm={6}><div className="header-nav-content"><Link to="/about-us">Thông tin cửa hàng</Link></div></Col>
                <Col xs={24} sm={6}><div className="header-nav-content"><Link to="/guide">Hướng dẫn mua hàng</Link></div></Col>
                <Col xs={24} sm={6}><div className="header-nav-content"><Link to="/policy">Chính sách bảo hành</Link></div></Col>
                <Col xs={24} sm={6}><div className="header-nav-content"><Link to="sign-up"><img style={{width:'32px',height:'30px'}} src={signUpIcon} /> Đăng ký</Link> | <Link to="sign-in">Đăng nhập</Link></div></Col>
            </Row>
            <Row className="header">
                <Col sm={4}>
                    <Row justify="center">
                        <Image height={150} width={150} src={logo} />
                    </Row>
                </Col>
                <Col sm={13}>
                    <Row style={{height:'100%'}} justify="center" align="middle">
                        <Input placeholder="SEARCH"/>
                        <Button><img style={{width:'32px',height:'30px'}} src={searchIcon} /></Button>
                    </Row>
                </Col>
                <Col style={{border:'1px solid black'}} sm={7}></Col>
            </Row>
        </Fragment>
    );
}
export default Home