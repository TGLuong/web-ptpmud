import {useState, useEffect, Fragment} from 'react'
import {Row, Col, Image} from 'antd'
import {useLocation, Link} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import '../css/Product.css'



const AddTocartButton = styled.button`
    height: 70px;
    width:350px;
    padding: 0px 15px;
    border-radius: 18px;
    background-color: #C0392D;
    border: none;
    &:focus{
        outline: none;
    }
    &:hover{
        background-color: #E0392D;
    }
`;

function Product() {
    const [detail, setDetail] = useState({
        data:{
            brand:'',
            barnd_id:0,
            id:0,
            images:[
                '',
            ],
            price:0.0,
            productName:'',
            productSummary:'',
            quantity:0,
            warranty:'',
        }
    })
    const [main_img, set_main_img] = useState('')


    const search = useLocation().search;
    const product_id = new URLSearchParams(search).get('id');

    useEffect(()=>{
        const detail_res = axios.get('http://47.254.253.64:5000/product/'+product_id);
        detail_res.then((res)=>{
            setDetail(res.data);
            set_main_img(res.data.data.images[0])
        });
    },[])

    return(
        <Fragment>
            <Row className="product-root">
                <Col xs={24}>
                    <Row><h2><b>{detail.data.productName}</b></h2></Row>
                    <Row justify="space-between">
                        <Col md={9} className="img-section">
                            <Row style  align="middle" justify="center">
                                <Col className="main-img">
                                    <Image className="img" src={main_img} />
                                </Col>
                            </Row>
                            <div className="list-img" >
                                {detail.data.images.map((element,index)=>{
                                    return(
                                        <div onClick={()=>{set_main_img(element)}} key={index} className="img-container">
                                            <img  src={element} alt="abc" />
                                        </div>
                                    );
                                })}  
                            </div>
                        </Col>
                        <Col md={14} className="detail-section">
                            <Row>
                                <AddTocartButton>
                                    <Link to="/sign-in">
                                        <Row style={{height:'100%'}} align="middle">
                                            <Col md={18}>
                                                <h4 style={{color:'white',margin:'0px'}}>THÊM VÀO GIỎ HÀNG</h4>
                                                <h4 style={{color:'white'}}>GIAO HÀNG NHANH CHÓNG</h4>
                                            </Col>
                                            <Col md={6} >
                                                <img style={{height:'100%', width:'100%'}} src="./img/core-img/shopping-cart.png"/>
                                            </Col>
                                        </Row>
                                    </Link>
                                </AddTocartButton>
                            </Row>
                            <Row>Kho hàng: {detail.data.quantity}</Row>
                            <Row><span style={{color:'red'}}>Giá bán: {detail.data.price} VNĐ</span></Row>
                            <Row><span style={{color:'red'}}>Bảo hành: {detail.data.warranty}</span></Row>
                            <Row><span style={{color:'red'}}>Giao hàng miễn phí tận nơi, ưu đãi lắp đặt</span></Row>
                            <Row><span style={{color:'red'}}>Bảo hành chính hãng ngay tại nhà</span></Row>
                            {detail.data.productSummary.split('\n').map((element,index)=>{
                                return(
                                    <Row style={{margin:'0px'}} key={index}>{element}</Row>
                                );
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
}
export default Product