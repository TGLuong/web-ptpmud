import {Row, Col, Badge, Dropdown, Image, Menu} from 'antd'
import {Link,useHistory} from 'react-router-dom'
import '../../Style/Header.css'
import { SearchButton , HomeButton, ProfileBtn } from '../../component/Button.js'
import { SearchInput } from '../../component/Input.js'
import { useEffect } from 'react'

const {Item} = Menu;


function InLoginHdaer(props) {
    const history = useHistory()
    const totalGood =()=>{
        let count = 0;
        props.userData.carts.forEach(element=>{
            count+=element.amount;
        })
        return count;
    }
    const totalFavorite=()=>{
        return props.userData.favorites.length;
    }
    const signOut=()=>{
        sessionStorage.removeItem('userdata');
        history.push('/')
    }
    const userOption = <Menu>
        <Item key="profile">
            Profile
        </Item>
        <Item 
            key="signout"
            onClick={signOut}>
            Sign out
        </Item>
    </Menu>
    useEffect(()=>{
        if(props.userData.is_admin){
            document.getElementById('admin_section').style.visibility = 'visible'
        }else{
            document.getElementById('admin_section').style.visibility = 'hidden'
        }
    })
    
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
                            src="./img/core-img/100-icon.png" alt="img"
                        />
                        <Link>100% Chính Hãng</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img 
                            className="icon" 
                            src="./img/core-img/free-ship.png" alt="img"
                        />
                        <Link>Miễn phí vẫn chuyển</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img 
                            className="icon" 
                            src="./img/core-img/repare-at-home.png" alt="img"
                        />
                        <Link>Bảo hành tận nhà</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6} >
                    <div className="header-nav-content" style={{display:'flex'}}>
                        <img 
                            style={{height:'18px'}} 
                            src="./img/core-img/profile-icon.png" alt="img"
                        />
                        <span style={{margin:'0px 2px'}}></span>
                        <Dropdown overlay={userOption}>
                            <ProfileBtn>
                                {props.userData.username}
                            </ProfileBtn>
                        </Dropdown>
                        <div id="admin_section" style={{display:'flex'}}>
                            <span style={{margin:'0px 4px'}}>|</span>
                            <ProfileBtn className="admin_section">
                                QUẢN LÝ
                            </ProfileBtn>
                        </div>
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
                            src={'./img/core-img/logo.png'} 
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
                                    <div style={{cursor:'pointer'}}>
                                        <Row justify="center">
                                            <Badge 
                                                showZero 
                                                size="small" 
                                                count={totalGood()}
                                            >
                                                <img 
                                                    className="shopping-card-icon" 
                                                    src="./img/core-img/shopping-cart.png" 
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
                                    <div style={{cursor:'pointer'}}>
                                        <Row justify="center">
                                            <Badge 
                                                showZero 
                                                size="small" 
                                                count={totalFavorite()}
                                            >
                                                <img 
                                                    className="heart-icon" 
                                                    src="./img/core-img/love.png" 
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
                    <Dropdown overlay={props.renderMenu(props.data.laptop_brands)}>
                        <Link to="/dashboard/laptop">LAPTOP</Link>
                    </Dropdown>
                </Col>
                <Col className="item"> 
                    <Dropdown overlay={props.renderMenu(props.data.camera_brands)}>
                        <Link to="/dashboard/camera">CAMERA</Link>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
}
export default InLoginHdaer