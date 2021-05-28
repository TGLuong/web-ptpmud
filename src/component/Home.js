import {Fragment, useState} from 'react'
import {Row, Col, Image, Badge} from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


import logo from '../img/core-img/logo.png'
import signUpIcon from '../img/core-img/sign-up-icon.png'
import searchIcon from '../img/core-img/search.png'
import shoppingCartIcon from '../img/core-img/shopping-cart-icon.png'

const Input = styled.input`
    padding: 0px 20px;
    width:80%;
    background-color:#F9FAFF;
    font-size:18px;
    border:none;
    height:30px;
    
    border-radius:10px 0px 0px 10px;
`;
const SearchButton = styled.button`
    background-color:red;
    border:none;
    height:30px;
    width:18%;
    border-radius:0px 10px 10px 0px;
`;


function Home(){

    return(
        <Fragment>
            <Row className="header-nav" align="middle" justify="space-around">
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img className="icon" src="./img/core-img/100-icon.png" />
                            <Link to="/about-us">100% Chính Hãng</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img className="icon" src="./img/core-img/free-ship.png" />
                        <Link to="/guide">Miễn phí vẫn chuyển</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img className="icon" src="./img/core-img/repare-at-home.png" />
                        <Link to="/policy">Bảo hành tận nhà</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <Link to="sign-up"><img className="icon" src="./img/core-img/sign-up-icon.png" /> Đăng ký</Link> | <Link to="sign-in">Đăng nhập</Link>
                    </div>
                </Col>
            </Row>
            <Row className="header" align="bottom">
                <Col sm={3}>
                    <Row justify="start">
                        <Image height={73} width={73} src={logo} />
                    </Row>
                </Col>
                <Col style={{height:'74px'}} sm={13}>
                    <Row style={{height:'100%'}} justify="start" align="middle">
                        <Input placeholder="Search Here"/>
                        <SearchButton><h2 style={{color:'white'}}><b>Search</b></h2></SearchButton>
                    </Row>
                </Col>
                <Col sm={8}>
                    <Row>
                        <Col xs={8}></Col>
                        <Col xs={8}>
                            <Row justify="end">
                                <Col >                                   
                                    <Row justify="center">
                                        <Badge showZero size="small" count={0}>
                                            <img className="shopping-card-icon" src="./img/core-img/shopping-cart.png" />
                                        </Badge>
                                    </Row>        
                                    <h4 style={{marginBottom:'0px',color:'white',textAlign:'center',margin:''}}>Giỏ hàng</h4>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{height:'100%'}} xs={8}>
                            <Row justify="end" align="bottom">
                                <Col>
                                    <Row justify="center">
                                        <Badge showZero size="small" count={0}>
                                                <img className="heart-icon" src="./img/core-img/love.png" />
                                        </Badge>
                                    </Row>
                                    <h4 style={{marginBottom:'0px',paddingBottom:'0px',color:'white',textAlign:'center'}}>Yêu Thích</h4>
                                </Col>
                            </Row>
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
            <Row className="nav-bar" justify="start" align="middle">
                <Col className="item">
                    home 
                </Col>
                <Col className="item">
                    laptop
                </Col>
                <Col className="item"> 
                    camera
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