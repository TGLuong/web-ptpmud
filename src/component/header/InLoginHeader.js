import {Row, Col, Badge, Dropdown, Image, Menu,Button} from 'antd'
import {Link,useHistory} from 'react-router-dom'
import '../../Style/Header.css'
import { SearchButton , HomeButton, ProfileBtn } from '../../component/Button.js'
import CartRow from './CartRow'
import FavoriteRow from './FavoriteRow'
import { SearchInput } from '../../component/Input.js'
import { useEffect, useState } from 'react'
import chinhhangIcon from '../../img/core-img/100-icon.png'
import freeship from '../../img/core-img/free-ship.png'
import repareAthome from '../../img/core-img/repare-at-home.png'
import profileIcon from '../../img/core-img/profile-icon.png'
import logo from '../../img/core-img/logo.png'
import shoppingCart from '../../img/core-img/shopping-cart.png'
import love from '../../img/core-img/love.png'

const {Item} = Menu;


function InLoginHdaer(props) {
    const history = useHistory()
    const [cartTotal,setCartTotal] = useState(0)
    const [favoriteTotal,setFavoriteTotal] = useState(0)
    const [cartData,setCartData]=useState({
        carts:[
            {
                amount: 0,
                id: 0,
                product:{
                    image: '',
                    name: '',
                    price: 0,
                },
                product_id: 0,
                total_price: 0.0,
            },
        ],
        total:0
    })
    const [favoriteData,setFavoriteData] = useState([
        {
            id: 0,
            product: {
                name:'',
                image:'',
                price:0
            },
            product_id: 0,
            user_id: 0
        },
    ])

    useEffect(()=>{
        setCartData({
            carts:props.cartData,
            total:props.cartData.reduce((total,element)=>{
                return total+element.total_price
            },0)
        })
    },[props.cartData])
    useEffect(()=>{
        setFavoriteData(props.favoriteData)
    },[props.favoriteData])
    useEffect(()=>{
        setCartTotal(props.cartData.length)
    },[props.cartData])
    useEffect(()=>{
        setFavoriteTotal(props.favoriteData.length)
    },[props.favoriteData])


    
    const signOut=()=>{
        sessionStorage.removeItem('userdata');
        history.push('/')
    }
    const toProfile=()=>{
        history.push('/dashboard/profile')
    }
    
    const userOption = <Menu>
        <Item key="profile" onClick={toProfile}>
            Hồ Sơ Cá Nhân
        </Item>
        <Item 
            key="signout"
            onClick={signOut}>
            Sign out
        </Item>
    </Menu>
    
    return(
        <div className="head">
            <Row
                className="header-nav" 
                align="middle" 
                justify="space-around"
            >
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img 
                            className="icon" 
                            src={chinhhangIcon} alt="img"
                        />
                        <Link to={'/dashboard'}>100% Chính Hãng</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img 
                            className="icon" 
                            src={freeship} alt="img"
                        />
                        <Link to={'/dashboard'}>Miễn phí vẫn chuyển</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img 
                            className="icon" 
                            src={repareAthome} alt="img"
                        />
                        <Link to={'/dashboard'}>Bảo hành tận nhà</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6} >
                    <div className="header-nav-content" style={{display:'flex'}}>
                        <img 
                            style={{height:'18px'}} 
                            src={profileIcon} alt="img"
                        />
                        <span style={{margin:'0px 2px'}}></span>
                        <Dropdown overlay={userOption}>
                            <ProfileBtn onClick={toProfile}>
                                {props.userData.username}
                            </ProfileBtn>
                        </Dropdown>
                        {props.userData.is_admin?(
                            <div>
                                <span style={{margin:'0px 4px'}}>|</span>
                                <ProfileBtn className="admin_section">
                                    QUẢN LÝ
                                </ProfileBtn>
                            </div>
                        ):null}
                    </div>
                </Col>
            </Row>

            <Row 
                className="header" 
                align="bottom"
            >
                <Col sm={3}>
                    <Row justify="start">
                        <Image 
                            height={73} 
                            width={73} 
                            src={logo} 
                        />
                    </Row>
                </Col>
                <Col 
                    style={{height:'74px'}} 
                    sm={13}
                >
                    <Row 
                        style={{height:'100%'}} 
                        justify="start" 
                        align="middle"
                    >
                        <SearchInput 
                            onKeyPress={props.searchEnter} 
                            id="search-input" 
                            placeholder="Search Here"
                        />
                        <SearchButton  onClick={props.search}>
                            <h3 
                                style={{
                                    marginLeft:'4px',
                                    height:'100%',
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    color:'white',
                                    fontSize:'100%',
                                    fontWeight:'590'
                                }}
                            >
                                Search
                            </h3>
                        </SearchButton>
                    </Row>
                </Col>
                <Col sm={8}>
                    <Row>
                        <Col xs={8}></Col>
                        <Col xs={8}>
                            <Row justify="end">
                                <Col >
                                    <button 
                                        style={{
                                            cursor:'pointer',
                                            backgroundColor:'#2C3E50',
                                            border:'none',
                                            outline:'none',
                                        }}
                                        onClick={()=>{
                                            if(document.getElementById('favorite-popup').style.visibility==="visible")
                                                document.getElementById('favorite-popup').style.visibility="hidden";
                                            let visble = document.getElementById('cart-popup').style.visibility;
                                            if(visble==='visible'){
                                                document.getElementById('cart-popup').style.visibility="hidden";
                                                
                                            }else{
                                                document.getElementById('cart-popup').style.visibility="visible";
                                            }
                                        }}
                                    >
                                        <Row justify="center">
                                            <Badge 
                                                showZero 
                                                size="small" 
                                                count={cartTotal}
                                            >
                                                <img 
                                                    className="shopping-card-icon" 
                                                    src={shoppingCart}
                                                    alt="img"
                                                />
                                            </Badge>
                                        </Row>        
                                        <h4 
                                            style={{
                                                marginBottom:'0px',
                                                color:'white',
                                                textAlign:'center',
                                                margin:''
                                            }}
                                        >
                                            Giỏ hàng
                                        </h4>
                                    </button>
                                    <div id="cart-popup" className="header-popup">
                                        <div style={{position:'relative'}}>
                                            <div className="header-popup-content">
                                                {cartData.carts.map((element,index)=>{
                                                    return(
                                                        <CartRow 
                                                            key={index} 
                                                            setCartData={props.setCartData} 
                                                            userID={props.userData.id} 
                                                            element={element}
                                                        />
                                                    );
                                                })}
                                                <div className="popup-content-row"></div>
                                            </div>
                                            <div className="footer-section-header-popup">
                                                <div style={{display:'flex',flexDirection:'row'}}>
                                                    <h3>Thành tiền:</h3>
                                                    <h3 
                                                        style={{
                                                            color:'red',
                                                            padding:'0px 4px',
                                                            textDecoration:'underline'
                                                        }}
                                                    >
                                                        đ
                                                    </h3>
                                                    <h3 style={{color:'red'}}>{cartData.total}</h3>
                                                </div>
                                                <button>
                                                    Thanh Toán Hóa Đơn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col 
                            style={{height:'100%'}} 
                            xs={8}
                        >
                            <Row 
                                justify="end" 
                                align="bottom"
                            >
                                <Col>
                                    <button 
                                        style={{
                                            cursor:'pointer',
                                            backgroundColor:'#2C3E50',
                                            border:'none',
                                            outline:'none',
                                        }}
                                        onClick={()=>{
                                            if(document.getElementById('cart-popup').style.visibility==="visible")
                                                document.getElementById('cart-popup').style.visibility="hidden";
                                            let visble = document.getElementById('favorite-popup').style.visibility;
                                            if(visble==='visible'){
                                                document.getElementById('favorite-popup').style.visibility="hidden";
                                            }else{
                                                document.getElementById('favorite-popup').style.visibility="visible";
                                            }
                                        }}
                                    >
                                        <Row justify="center">
                                            <Badge 
                                                showZero 
                                                size="small" 
                                                count={favoriteTotal}
                                            >
                                                <img 
                                                    className="heart-icon" 
                                                    src={love}
                                                    alt="img"
                                                />
                                            </Badge>
                                        </Row>
                                        <h4 
                                            style={{
                                                marginBottom:'0px',
                                                paddingBottom:'0px',
                                                color:'white',
                                                textAlign:'center'
                                            }}
                                        >
                                            Yêu Thích
                                        </h4>
                                    </button>
                                    <div id="favorite-popup" className="header-popup">
                                        <div className="header-popup-content">
                                            {favoriteData.map((element,index)=>{
                                                return(
                                                    <FavoriteRow
                                                        key={index}
                                                        element={element}
                                                        userID={props.userData.id} 
                                                        setFavoriteData={props.setFavoriteData}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            <Row 
                className="nav-bar" 
                justify="start" 
                align="middle"
            >
                <Col className="item">
                    <HomeButton  
                        onClick={()=>{
                            history.push('/dashboard')
                            props.load_page(1,20)
                        }}
                    >
                        HOME
                    </HomeButton> 
                
                </Col>
                <Col className="item">
                    <Dropdown overlay={props.renderMenu(props.homeData.laptop_brands)}>
                        <Link to="/dashboard/laptop">LAPTOP</Link>
                    </Dropdown>
                </Col>
                <Col className="item"> 
                    <Dropdown overlay={props.renderMenu(props.homeData.camera_brands)}>
                        <Link to="/dashboard/camera">CAMERA</Link>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
}
export default InLoginHdaer