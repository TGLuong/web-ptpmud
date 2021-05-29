import {Row, Col } from 'antd'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ProductDisplay.css'
import { render } from '@testing-library/react'


function ProductDisplay(params) {
    const [data,setData] = useState({
        data:[
            {
                brand:'',
                id:0,
                products:[
                    {
                        brand:'',
                        brand_id:0,
                        id:0,
                        images:[
                            '',
                        ],
                        price:0.0,
                        productName:'',
                        productSummary:'',
                        quantity:'',
                        warranty:''
                    },
                ]
            },
        ]
    });


    useEffect(()=>{
        const res = axios.get('http://47.254.253.64:5000/product/laptop');
        res.then((res)=>{
            setData(res.data)
        });
    },[])
    
    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
        else return(string);
    }

    return(
        <Row className="product-display">
            <Col style={{width:'100%',height:'100%'}}>
                {data.data.map((element,index)=>{
                    return(
                        <Row key={index} className="product-brand">
                            <Col style={{width:'100%',height:'100%'}}>
                                <Row className="brand">
                                    <h2 style={{color:'white',marginLeft:'10px'}}>{element.brand}</h2>
                                </Row>
                                <Row className="content">
                                    {element.products.map((element,index)=>{
                                        render(
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
                            </Col>
                        </Row>
                    );
                })}
                
               
            </Col>
        </Row>
    );
}
export default ProductDisplay