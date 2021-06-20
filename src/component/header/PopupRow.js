import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Row, Col, Image, InputNumber} from 'antd'


const PopupRow=prop=>{
    const history = useHistory()
    const [element,setElement] = useState({
        amount: 0,
        id: 0,
        product:{
            image: '',
            name: '',
            price: 0,
        },
        product_id: 0,
        total_price: 0.0,
    })
    useEffect(()=>{
        setElement(prop.element)
    })
    const toProduct=(id)=>{
        history.push('/dashboard/product-detail?id='+id)
    }
    const convertLongString=(string)=>{
        if(string.length>33) return(string.slice(0,33)+'...');
        else return(string);
    }
    return(
        <div className="popup-content-row">
            <Row>
                <Col 
                    md={4}
                    style={{
                        height:'70px',
                    }}
                >
                    <Image
                        style={{
                            height:'70px',
                        }}
                        src={element.product.image}
                        alt="product-img"
                    />
                </Col>
                <Col 
                    md={20}
                    style={{
                        
                        height:'70px'
                    }}
                >
                    <Row
                        style={{
                            width:'100%',
                            height:'35px',
                            display:'flex',
                            alignItems:'center',
                        }}
                    >
                        <Col md={16}>
                            <button
                                style={{
                                    border:'none',
                                    outline:'none',
                                    backgroundColor:'white',
                                }}
                                onClick={()=>{toProduct(element.product_id)}}
                            >
                                {convertLongString(element.product.name)}
                            </button>
                        </Col>
                        <Col md={8} style={{color:'red'}}>
                            <span 
                                style={{
                                    margin:'0px 4px'
                                }}
                            >
                                Tổng:
                            </span>
                            {element.total_price}
                            đ
                        </Col>
                        
                    </Row>
                    <Row
                        style={{
                            width:'100%',
                            height:'35px',
                        }}
                        align="middle"
                    >
                        <Col md={6} style={{color:'red'}}>
                            <span>Giá: {element.product.price}</span>
                        </Col>
                        <span style={{margin:'0px 5px'}}>Số Lượng:</span>
                        <div 
                            style={{
                                width:'70px',
                                overflow:'hidden',
                                border:'1px solid #B0BEC5',
                                borderRadius:'3px'
                            }}
                        >
                            <InputNumber
                                bordered={false}
                                value={element.amount}
                                
                                min={1}
                            />
                        </div>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default PopupRow