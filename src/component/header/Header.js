import {Row, Col, Badge, Dropdown, Image} from 'antd'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


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
const HomeButton = styled.button`
    background-color:#34495E;
    border:none;
    &:focus{
        outline:none;
    }
    &:hover{
        text-decoration: underline;
    }
`;
const LoginBtn = styled.button`
    color:white;
    background-color: #34495E;
    border:none;
    &:focus{
        outline:none;
    }
`;

function Header(props) {
    

    return(
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
                        <Link to="sign-up"><img className="icon" src="./img/core-img/sign-up-icon.png" alt="img"/> Đăng ký</Link> | <LoginBtn onClick={props.onPopup} > ĐĂNG NHẬP</LoginBtn>
                    </div>
                </Col>
            </Row>
            <Row className="header" align="bottom">
                <Col sm={3}>
                    <Row justify="start">
                        <Image height={73} width={73} src={props.logo} />
                    </Row>
                </Col>
                <Col style={{height:'74px'}} sm={13}>
                    <Row style={{height:'100%'}} justify="start" align="middle">
                        <Input onKeyPress={props.searchEnter} id="search-input" placeholder="Search Here"/>
                        <SearchButton  onClick={props.search}>
                            <Link to="/">
                            <h3 style={{marginLeft:'4px',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'100%',fontWeight:'590'}}>Search</h3>
                            </Link>
                        </SearchButton>
                    </Row>
                </Col>
                <Col sm={8}>
                    <Row>
                        <Col xs={8}></Col>
                        <Col xs={8}>
                            <Row justify="end">
                                <Col >
                                    <Link to="/sign-in">
                                        <Row justify="center">
                                            <Badge showZero size="small" count={0}>
                                                <img className="shopping-card-icon" src="./img/core-img/shopping-cart.png" alt="img"/>
                                            </Badge>
                                        </Row>        
                                        <h4 style={{marginBottom:'0px',color:'white',textAlign:'center',margin:''}}>Giỏ hàng</h4>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{height:'100%'}} xs={8}>
                            <Row justify="end" align="bottom">
                                <Col>
                                    <Link to="/sign-in">
                                        <Row justify="center">
                                            <Badge showZero size="small" count={0}>
                                                <img className="heart-icon" src="./img/core-img/love.png" alt="img"/>
                                            </Badge>
                                        </Row>
                                        <h4 style={{marginBottom:'0px',paddingBottom:'0px',color:'white',textAlign:'center'}}>Yêu Thích</h4>
                                    </Link>
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