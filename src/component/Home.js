import {Fragment, useState} from 'react'
import {Row, Col, Image, Badge} from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


import logo from '../img/core-img/logo.png'
import signUpIcon from '../img/core-img/sign-up-icon.png'
import searchIcon from '../img/core-img/search.png'
import shoppingCartIcon from '../img/core-img/shopping-cart-icon.png'

const Input = styled.input`
    padding: 5px;
    width:70%;
    background-color:#F9FAFF;
    font-size:18px;
    border:none;
    height:30px;
    border-radius:10px 0px 0px 10px;
`;
const SearchButton = styled.button`
    background-color:#F9FAFF;
    border:none;
    height:30px;
    width:70px;
    border-radius:0px 10px 10px 0px;
`;


function Home(){
    let [collapsed,setCollapsed] = useState({collapsed: false})
    return(
        <Fragment>
            <Row className="header-nav" align="middle" justify="space-around">
                <Col xs={24} sm={6}><div className="header-nav-content"><img className="icon" src="./img/core-img/100-icon.png" /><Link to="/about-us">100% Chính Hãng</Link></div></Col>
                <Col xs={24} sm={6}><div className="header-nav-content"><img className="icon" src="./img/core-img/free-ship.png" /><Link to="/guide">Miễn phí vẫn chuyển</Link></div></Col>
                <Col xs={24} sm={6}><div className="header-nav-content"><img className="icon" src="./img/core-img/repare-at-home.png" /><Link to="/policy">Bảo hành tận nhà</Link></div></Col>
                <Col xs={24} sm={6}><div className="header-nav-content"><Link to="sign-up"><img className="icon" src="./img/core-img/sign-up-icon.png" /> Đăng ký</Link> | <Link to="sign-in">Đăng nhập</Link></div></Col>
            </Row>
            <Row className="header">
                <Col sm={4}>
                    <Row justify="center">
                        <Image height={100} width={100} src={logo} />
                    </Row>
                </Col>
                <Col sm={13}>
                    <Row style={{height:'100%'}} justify="center" align="middle">
                        <Input placeholder="Search Hear"/>
                        <SearchButton><img style={{width:'25px',height:'25px'}} src={searchIcon} /></SearchButton>
                    </Row>
                </Col>
                <Col sm={7}>
                    <Row style={{height:'100%'}} align="middle" justify="space-around">
                        <Badge count={1} style={{border:'1px solid white'}}>
                            <img className="icon" src="./img/core-img/shopping-cart.png" />
                            <h5 style={{color:'white',textAlign:'center',margin:'10px'}}>Giỏ hàng</h5>
                        </Badge>
                        <Badge count={1}>
                            <img className="icon" src="./img/core-img/love.png" />
                            <h5 style={{color:'white',textAlign:'center',margin:'10px'}}>Yêu Thích</h5>
                        </Badge>
                        
                    </Row>
                </Col>
            </Row>
            <Row className="nav-bar" justify="start" align="middle">
                <Col className="item">
                    <Row justify="center" align="middle">
                        home
                    </Row>
                </Col>
                <Col className="item">
                    <Row justify="center" align="middle">laptop</Row>
                </Col>
                <Col className="item"> 
                    <Row justify="center" align="middle">camera</Row>
                </Col>
            </Row>
            <Row className="product-area">
                <div className="product-cell">
                    <div className="product-content">

                    </div>
                </div>
                <div className="product-cell">
                    <div className="product-content">

                    </div>
                </div>
                <div className="product-cell">
                    <div className="product-content">

                    </div>
                </div>
                <div className="product-cell">
                    <div className="product-content">

                    </div>
                </div>
                
            </Row>
        </Fragment>
    );
}
export default Home