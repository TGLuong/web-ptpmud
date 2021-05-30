import {Row, Col} from 'antd'
import {useState, useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ProductDisplay.css'



function LaptopRender(params) {
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
        const res = axios.get('http://47.254.253.64:5000/product/laptop')
        res.then((res)=>{
            setData(res.data)
            
        })
    },[])
    
    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
        else return(string);
    }

    return(
        <div className="product-display">
           
            {data.data.map((element,index)=>{
                return(
                    <div id={element.brand_id} key={index} className="product-brand">
                        <div className="brand">
                            {element.brand}
                        </div>
                        <div className="wrapper">
                            {element.products.map((element,index)=>{
                                return(
                                    <Link key={index} to="/">
                                        <div key={index} className="item">
                                            <Row justify="center" style={{height:'65%'}}>
                                                <img src={element.images[0]} alt="product" />
                                            </Row>
                                            <Row style={{height:'19%'}} justify="center">
                                                <div className="name">
                                                    {convertLongString(element.productName)}
                                                </div>
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
                                        </div>
                                    </Link>
                                );
                            })}
                                
                        </div>    
                    </div>   
                );
            })}
        </div>
    );
}
export default LaptopRender