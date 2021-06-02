import {useState, useEffect, Fragment} from 'react'
import {Row, Col} from 'antd'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import '../css/Product.css'


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
            quantity:'',
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
                    <Row><h1>{detail.data.productName}</h1></Row>
                    <Row>
                        <Col md={10} className="img-section">
                            <Row  align="middle" justify="center">
                                <Col className="main-img">
                                    <img src={main_img} alt="main img" />
                                </Col>
                            </Row>
                            <div className="list-img" >
                            
                                {detail.data.images.map((element,index)=>{
                                    return(
                                        <div key={index} className="img-container">
                                            <img src={element} alt="adsd" />
                                        </div>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col md={14} className="detail-section">
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
}
export default Product