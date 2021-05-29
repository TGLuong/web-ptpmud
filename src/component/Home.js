import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {Row, Col, Image, Badge, Pagination, Dropdown, Menu } from 'antd'
import styled from 'styled-components'
import {Link,BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NormalDisplay from './SubHome/NormalDisplay'
import ProductDisplay from './SubHome/ProductDisplay'

import logo from '../img/core-img/logo.png'


const Input = styled.input`
    padding: 0px 20px;
    width:80%;
    background-color:#F9FAFF;
    font-size:100%;
    border:none;
    height:25px;
    border-radius:15px 0px 0px 15px;
    &:focus{
        outline:none;
    }
`;
const SearchButton = styled.button`
    background-color:#E74C3C;
    border:none;
    height:25px;
    width:18%;
    border-radius:0px 15px 15px 0px;
    &:focus{
        outline:none;
    }
    &:hover{
        background-color:#F74C3C;
    }
`;



function Home(){
    const [data,setData] = useState({
        camera_brands:[],
        laptop_brands:[],
        products:{
            data:[
                {
                    brand:'',
                    brand_id:0,
                    id:0,
                    images:[''],
                    price:0.0,
                    productName:'',
                    productSummary:'',
                    quantity:0,
                    warranty:'',
                },
            ],
            paging:{
                current_page:1,
                records_in_page:0,
                total_count:0,
                total_page:0,
            }
        }
    });
    
    

    useEffect(()=>{
        const res = axios.get('http://47.254.253.64:5000/home?page='+data.products.paging.current_page)
        res.then((res)=>{
            setData(res.data.data)
        });
    },[]);

    
    function load_page(page,pageSize){
        const res = axios.get('http://47.254.253.64:5000/home?page='+page)
        res.then((res)=>{
            setData(res.data.data)
        })
    }

    
    function renderMenu(data) {
        return(
            <Menu>
                {data.map((element,index)=>{
                    return(
                        <Menu.Item key={index}>
                            <h3>{element.brand}</h3>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }
    function search() {
        const keyword = document.getElementById('search-input').value;
        const res = axios.get('http://47.254.253.64:5000/home?search='+keyword)
        res.then((res)=>{
            setData(res.data.data)
        })
    }

    return(
        <Fragment>
            
            <div className="head">
                <Row className="header-nav" align="middle" justify="space-around">
                    <Col xs={24} sm={6}>
                        <div className="header-nav-content">
                            <img className="icon" src="./img/core-img/100-icon.png" alt="img"/>
                                <Link to="/about-us">100% Chính Hãng</Link>
                        </div>
                    </Col>
                    <Col xs={24} sm={6}>
                        <div className="header-nav-content">
                            <img className="icon" src="./img/core-img/free-ship.png" alt="img"/>
                            <Link to="/guide">Miễn phí vẫn chuyển</Link>
                        </div>
                    </Col>
                    <Col xs={24} sm={6}>
                        <div className="header-nav-content">
                            <img className="icon" src="./img/core-img/repare-at-home.png" alt="img"/>
                            <Link to="/policy">Bảo hành tận nhà</Link>
                        </div>
                    </Col>
                    <Col xs={24} sm={6}>
                        <div className="header-nav-content">
                            <Link to="sign-up"><img className="icon" src="./img/core-img/sign-up-icon.png" alt="img"/> Đăng ký</Link> | <Link to="sign-in">Đăng nhập</Link>
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
                            <Input id="search-input" placeholder="Search Here"/>
                            <SearchButton  onClick={search}>
                                <h3 style={{marginLeft:'4px',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'100%',fontWeight:'590'}}>Search</h3>
                            </SearchButton>
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
                                                <img className="shopping-card-icon" src="./img/core-img/shopping-cart.png" alt="img"/>
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
                                                    <img className="heart-icon" src="./img/core-img/love.png" alt="img"/>
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
                        <Link>
                            HOME
                        </Link>
                    </Col>
                    <Col className="item">
                        <Dropdown overlay={renderMenu(data.laptop_brands)}>
                            <Link>LAPTOP</Link>
                        </Dropdown>
                    </Col>
                    <Col className="item"> 
                        <Dropdown overlay={renderMenu(data.camera_brands)}>
                            <Link>CAMERA</Link>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <Router>
                <Switch>
                    <Route path="/product"><ProductDisplay /></Route>
                    <Route path="/">
                        <NormalDisplay products={data.products}/>
                        <div style={{height:'10px'}}></div>
                        <div className="panigation">
                            <Pagination 
                                defaultCurrent={data.products.paging.current_page} 
                                showSizeChanger={false}
                                pageSize={20}
                                total={data.products.paging.total_count}
                                onChange={load_page}/>
                        </div>
                    </Route>
                </Switch>
            </Router>
            
        </Fragment>
    );
}
export default Home