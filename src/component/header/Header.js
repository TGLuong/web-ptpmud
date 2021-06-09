import {Row, Col, Badge, Dropdown, Image} from 'antd'
import {Link} from 'react-router-dom'
import '../../Style/Header.css'
import { ToSigninBtn, ToSignupBtn , SearchButton , HomeButton } from '../../component/Button.js'
import { SearchInput } from '../../component/Input.js'




function Header(props) {
    

    return(
        <div className="head">
            <Row className="header-nav" align="middle" justify="space-around">
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img className="icon" src="./img/core-img/100-icon.png" alt="img"/>
                            <Link to="/">100% Chính Hãng</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img className="icon" src="./img/core-img/free-ship.png" alt="img"/>
                        <Link to="/">Miễn phí vẫn chuyển</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img className="icon" src="./img/core-img/repare-at-home.png" alt="img"/>
                        <Link to="/">Bảo hành tận nhà</Link>
                    </div>
                </Col>
                <Col xs={24} sm={6}>
                    <div className="header-nav-content">
                        <img className="icon"  src="./img/core-img/sign-up-icon.png" alt="img"/>
                        <ToSignupBtn onClick={props.onSignUpPopup} > ĐĂNG KÝ</ToSignupBtn> | <ToSigninBtn onClick={props.onSignInPopup} > ĐĂNG NHẬP</ToSigninBtn>
                    </div>
                </Col>
            </Row>
            <Row className="header" align="bottom">
                <Col sm={3}>
                    <Row justify="start">
                        <Image height={73} width={73} src={'./img/core-img/logo.png'} />
                    </Row>
                </Col>
                <Col style={{height:'74px'}} sm={13}>
                    <Row style={{height:'100%'}} justify="start" align="middle">
                        <SearchInput onKeyPress={props.searchEnter} id="search-input" placeholder="Search Here"/>
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
                                    <div onClick={props.onSignInPopup} style={{cursor:'pointer'}}>
                                        <Row justify="center">
                                            <Badge showZero size="small" count={0}>
                                                <img className="shopping-card-icon" src="./img/core-img/shopping-cart.png" alt="img"/>
                                            </Badge>
                                        </Row>        
                                        <h4 style={{marginBottom:'0px',color:'white',textAlign:'center',margin:''}}>Giỏ hàng</h4>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{height:'100%'}} xs={8}>
                            <Row justify="end" align="bottom">
                                <Col>
                                    <div onClick={props.onSignInPopup} style={{cursor:'pointer'}}>
                                        <Row justify="center">
                                            <Badge showZero size="small" count={0}>
                                                <img className="heart-icon" src="./img/core-img/love.png" alt="img"/>
                                            </Badge>
                                        </Row>
                                        <h4 style={{marginBottom:'0px',paddingBottom:'0px',color:'white',textAlign:'center'}}>Yêu Thích</h4>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
            <Row className="nav-bar" justify="start" align="middle">
                <Col className="item">
                <Link to="/"  >
                    <HomeButton  onClick={()=>{props.load_page(1,20)}}>
                        HOME
                    </HomeButton>
                        
                </Link>
                
                    
                </Col>
                <Col className="item">
                    <Dropdown overlay={props.renderMenu(props.data.laptop_brands)}>
                        <Link to="/laptop">LAPTOP</Link>
                        
                    </Dropdown>
                </Col>
                <Col className="item"> 
                    <Dropdown overlay={props.renderMenu(props.data.camera_brands)}>
                        <Link to="/camera">CAMERA</Link>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
}
export default Header