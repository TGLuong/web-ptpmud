import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {Row, Col, Image, InputNumber,Button} from 'antd'
import '../../Style/Header.css'
import { baseUrl } from '../../config'

const CartRow=props=>{
    const history = useHistory()
    const [changeAmount,setChangeAmount] = useState(1)
    const [displayAmount,setDisplayAmount] = useState(1)
    const [removeDisable,setRemoveDisable] = useState(false)
    useEffect(()=>{
        setDisplayAmount(props.element.amount)
        setChangeAmount(props.element.amount)
    },[props.element])

    const toProduct=(id)=>{
        history.push('/dashboard/product-detail?id='+id)
    }
    const convertLongString=(string)=>{
        if(string.length>33) return(string.slice(0,33)+'...');
        else return(string);
    }
    const updateValue=(value)=>{
        if(value!==null&&value>=1){
            setChangeAmount(value)
        }
    }
    const summitValue=(e)=>{
        if(changeAmount!==displayAmount){
            setDisplayAmount(changeAmount)
            axios({
                method:'PUT',
                url:baseUrl+'/user/cart/'+props.userID+'/'+props.element.product_id,
                data:{
                    amount:changeAmount
                }
            }).then(res=>{
                props.setCartData(res.data.carts)
            })
        }
    }
    const removeProduct=()=>{
        setRemoveDisable(true)
        axios({
            method:'DELETE',
            url:baseUrl+'/user/cart/'+props.userID+'/'+props.element.product_id
        }).then(res=>{
            sessionStorage.setItem('carts',JSON.stringify(res.data.carts))
            props.setCartData(res.data.carts)
            setRemoveDisable(false)
        })
    }
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
                        src={props.element.product.image}
                        alt="product-img"
                    />
                </Col>
                <Col 
                    md={20}
                    style={{
                        paddingLeft:'10px',
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
                                className="name-button"
                                onClick={()=>{toProduct(props.element.product_id)}}
                            >
                                {convertLongString(props.element.product.name)}
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
                            {numberFormat(props.element.total_price)}
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
                            <span>Giá: {numberFormat(props.element.product.price)}</span>
                        </Col>
                        <Col md={11}>
                            <Row align="middle">
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
                                        className="deleteTransition"
                                        style={{width:'100px'}}
                                        bordered={false}
                                        value={displayAmount}
                                        onChange={updateValue}
                                        onPressEnter={summitValue}
                                        min={1}
                                    />
                                </div>
                            </Row>
                        </Col>
                        <Col md={7}>
                            <Button
                                className="deleteTransition"
                                disabled={removeDisable}
                                onClick={removeProduct}
                                danger
                            >
                                Xóa
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default CartRow