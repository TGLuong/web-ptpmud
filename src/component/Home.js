import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {Row, Col, Image, Badge, Pagination } from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


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
`;
const NavButton = styled.button`
    background-color:#34495E;
    border:none;
    &:focus{
        outline:none;
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
    const [dropdownVisible,setDropdownVisible] = useState(['hidden','hidden']);
    

    useEffect(()=>{
        const res = axios.get('http://47.254.253.64:5000/home?page='+data.products.paging.current_page)
        res.then((res)=>{
            setData(res.data.data)
        });
    },[]);

    function changeLapDropdown(bool)
    {
        if(bool)
        {
            setDropdownVisible(['visible','hidden']);
        }else{
            setDropdownVisible(['hidden','hidden'])
        }
    }
    function changeCamDropdown(bool)
    {
        if(bool)
        {
            setDropdownVisible(['hidden','visible']);
        }else{
            setDropdownVisible(['hidden','hidden'])
        }
    }
    function load_page(page,pageSize){
        const res = axios.get('http://47.254.253.64:5000/home?page='+page)
        res.then((res)=>{
            setData(res.data.data)
        })
    }

    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
        else return(string);
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
                            <Input placeholder="Search Here"/>
                            <SearchButton><h3 style={{marginLeft:'4px',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'100%',fontWeight:'590'}}>Search</h3></SearchButton>
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
                        <NavButton>HOME</NavButton> 
                    </Col>
                    <Col className="item">
                        <NavButton onMouseEnter={()=>{changeLapDropdown(true)}} onMouseLeave={()=>{changeLapDropdown(false)}}>LAPTOP</NavButton>
                        <div style={{visibility:dropdownVisible[0]}} className="drowdown">
                            <ul className="list-dropdown">
                                {data.laptop_brands.map((element,index)=>{
                                    return(
                                        <li key={index}>{element.brand}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    </Col>
                    <Col className="item"> 
                        <NavButton onMouseEnter={()=>{changeCamDropdown(true)}} onMouseLeave={()=>{changeCamDropdown(false)}}   >CAMERA</NavButton>
                        <div style={{visibility:dropdownVisible[1]}} className="drowdown">
                            <ul className="list-dropdown">
                                {data.camera_brands.map((element,index)=>{
                                    return(
                                        <li key={index}>{element.brand}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            {console.log(data.products.data[0].images[0])}
            <Row className="product-area">
                {data.products.data.map((element,index)=>{
                    return(
                        <div key={index} className="product-cell">
                            <Link className="link" >
                                <Row justify="center" style={{height:'65%'}}>
                                    <img src={element.images[0]} alt="product" />
                                </Row>
                                <Row style={{height:'19%'}}>
                                    <p style={{color:'black',fontSize:'15px',textAlign:'center'}}>{convertLongString(element.productName)}</p>
                                </Row>
                                    
                                <Row style={{height:'16%',backgroundColor:'#95A5A6'}}>
                                    <Col xs={16}>
                                        <h3 style={{color:'#C0392B',marginLeft:'5px',height:'100%',display:'flex',alignItems:'center'}}>{element.price}</h3>
                                    </Col>
                                    <Col  xs={8}>
                                        <Row justify="space-between" align="middle">
                                            <img style={{width:'37px',height:'37px'}} src='./img/core-img/shopping-cart.png' />
                                            <img style={{width:'37px',height:'37px'}} src='./img/core-img/love.png' />
                                        </Row>
                                    </Col>
                                </Row>
                            </Link>
                        </div>    
                    );
                })}
                
                
                
            </Row>
            <div style={{height:'10px'}}>

            </div>
            <div className="panigation">
            <Pagination 
                defaultCurrent={data.products.paging.current_page} 
                showSizeChanger={false}
                pageSize={20}
                total={data.products.paging.total_count}
                onChange={load_page}/>
            </div>
        </Fragment>
    );
}
export default Home