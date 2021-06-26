import {useState, useEffect} from 'react'
import {Row, Col, Image} from 'antd'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import '../../Style/Product.css'

import {AddTocartButton} from '../../component/Button'

import {baseUrl} from '../../config'


function DashboardProduct(props) {
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
        const detail_res = axios.get(baseUrl+'/product/'+product_id);
        detail_res.then((res)=>{
            setDetail(res.data);
            set_main_img(res.data.data.images[0])
        });
    },[])

    const numberFormat = (num) => {
        let stringfmt = num.toString();
        let mod3 = 0;
        let result=''
        for(let i = stringfmt.length-1;i>=0;i--){
            if(mod3===3){
                result+='.'
                mod3=0
            }
            mod3+=1;
            result+=stringfmt[i];
        }
        return result.split('').reverse().join('');
    }

    return(
        <>
            <Row className="product-root">
                <Col xs={24}>
                    <Row>
                        <h2>
                            <b>{detail.data.productName}</b>
                        </h2>
                    </Row>
                    <Row justify="space-between">
                        <Col md={9} className="img-section">
                            <Row align="middle" justify="center">
                                <Col className="main-img">
                                    <Image className="img" src={main_img} />
                                </Col>
                            </Row>
                            <div className="list-img" >
                                {detail.data.images.map((element,index)=>{
                                    return(
                                        <div 
                                            onClick={
                                                ()=>{set_main_img(element)}
                                            }
                                            key={index} 
                                            className="img-container"
                                        >
                                            <img  src={element} alt="abc" />
                                        </div>
                                    );
                                })}  
                            </div>
                        </Col>
                        <Col md={14} className="detail-section">
                            <Row>
                                <AddTocartButton
                                    onClick={()=>{props.addToCart(detail.data)}}
                                >
                                    <h2 
                                        style={{
                                            color:'white',
                                            margin:'0px'
                                        }}
                                    >
                                        THÊM VÀO GIỎ HÀNG
                                    </h2>
                                    <h4 style={{color:'white'}}>
                                        GIAO HÀNG NHANH CHÓNG
                                    </h4>
                                </AddTocartButton>
                            </Row>
                            <Row>
                                Kho hàng: {detail.data.quantity}
                            </Row>
                            <Row>
                                <span 
                                    style={{
                                        color:'red'
                                    }}
                                >    
                                    Giá bán: {numberFormat(detail.data.price)} VNĐ
                                </span>
                            </Row>
                            <Row>
                                <span 
                                    style={{
                                        color:'red'
                                    }}
                                >
                                    Bảo hành: {detail.data.warranty}
                                </span>
                            </Row>
                            <Row>
                                <span 
                                    style={{
                                        color:'red'
                                    }}
                                >
                                    Giao hàng miễn phí tận nơi, ưu đãi lắp đặt
                                </span>
                            </Row>
                            <Row>
                                <span 
                                    style={{
                                        color:'red'
                                    }}
                                >
                                    Bảo hành chính hãng ngay tại nhà
                                </span>
                            </Row>
                            {detail.data.productSummary.split('\n').map((element,index)=>{
                                return(
                                    <Row 
                                        style={{margin:'0px'}} 
                                        key={index}
                                    >
                                        {element}
                                    </Row>
                                );
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}
export default DashboardProduct