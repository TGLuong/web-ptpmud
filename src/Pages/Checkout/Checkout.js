import {
    Row,
    Col,
    notification
} from 'antd'
import {
    CloseCircleOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import {
    useState,
    useEffect,
    memo
} from 'react'
import {useHistory} from 'react-router-dom'
import '.././../Style/Checkout.css'
import {baseUrl} from '../../config'
import axios from 'axios'
import {CheckoutButton} from '../../component/Button'

import CartTable from './CartTable'
import BankTable from './BankTable'
import AddressTable from './AddressTable'
import Paymenttype from './Paymenttype'

const Checkout = props => {
    const history = useHistory()
    const [bankVisiable,setBankVisiable] = useState(false)
    // const [paymenttype,setPaymenttype] = useState([])
    const [payment,setPayment] = useState(null)
    const [selectedBank,setSelectedBank]=useState(null)
    const [selectedAddress,setSelectedAddress]=useState(null)
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
    const openErr = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#fff2f0',
                border:'1px solid #ffccc7'
            },
            icon:<CloseCircleOutlined style={{color:'red'}} />
            
        })
    }
    const openSucc = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#f6ffed',
                border:'1px solid #b7eb8f'
            },
            icon:<CheckOutlined  style={{color:'#52c41a'}} />
            
        })
    }
    // useEffect(()=>{
    //     axios({
    //         method:'GET',
    //         url:baseUrl+'/paymenttype',
    //     }).then(res=>{
    //         setPaymenttype(res.data.data)
    //     })
    // },[])
    useEffect(()=>{
        if(props.cartData.length===0)history.push('/dashboard')
    })
    const checkout = () => {
        if(selectedAddress===null){
            openErr('Bạn chưa chọn địa chỉ giao hàng')
        }else if (payment===null){
            openErr('Bạn chưa chọn phương thức thanh toán')
        }else if(payment===2&&selectedBank===null){
            openErr('Bạn chưa chọn tài khoản Ngân hàng thanh toán')
        }else {
            axios({
                method:'POST',
                url:baseUrl+'/payment/'+props.userID,
                data:{
                    address_id:selectedAddress,
                    payment_type_id:payment
                }
            }).then(res=>{
                props.setBillData(res.data.data)
                axios({
                    method:'GET',
                    url:baseUrl+'/user/cart/'+props.userID
                }).then(res=>{
                    openSucc('Thanh toán thành công','vào chi tiết đơn đã mua để xem lại hóa đơn')
                    props.setCartData(res.data.carts)
                    sessionStorage.setItem('carts',JSON.stringify(res.data.carts))
                })
                axios({
                    method:'GET',
                    url:baseUrl+'/payment/'+props.userID
                }).then(res=>{
                    props.setBillData(res.data.data)
                })
            })
        }
    }

    return(
        <div className="checkout-root">
            <Row>
                <Col md={18}>
                    <CartTable
                        userID={props.userID}
                        data={props.cartData}
                        setCartData={props.setCartData}
                    /> 
                    <AddressTable
                        userID={props.userID}
                        data={props.addressData}
                        setSelectedAddress={setSelectedAddress}
                        selectedAddress={selectedAddress}
                        setAddressData ={props.setAddressData}
                    />
                    <Paymenttype
                        setBankVisiable={setBankVisiable}
                        paymenttype={props.paymenttype}
                        setPayment={setPayment}
                    />
                    {bankVisiable?
                        <BankTable
                            data={props.bankData}
                            setSelectedBank={setSelectedBank}
                            selectedBank={selectedBank}
                        />:
                        null
                    }
                </Col>
                <Col
                    md={6}
                >
                    <div
                        style={{
                            position:'fixed',
                            height:'450px',
                            borderLeft:'1px solid #607D8B',
                            marginLeft:'20px',
                            width:'330px',
                            padding:'0px 0px 0px 20px',
                        }}
                    >
                        <h3>Chi tiết hóa đơn:</h3>
                        <h2 style={{color:'#EF5350',margin:'0px'}}>
                            {numberFormat(props.cartData.reduce((total, value, index, array)=>{
                                return total+value.total_price;
                            },0))} Đ
                        </h2>
                        <h4>Địa chỉ:</h4>
                        <h2 style={{color:'#EF5350',margin:'0px'}}>
                            {props.addressData.reduce((result,value)=>{
                                return value.id===selectedAddress?value.address:result
                            },'')}
                        </h2>
                        <h4>Tên người nhận:</h4>
                        <h2 style={{color:'#EF5350',margin:'0px'}}>
                            {props.addressData.reduce((result,value)=>{
                                return value.id===selectedAddress?value.full_name:result
                            },'')}
                        </h2>
                        <h4>Số điện thoại:</h4>
                        <h2 style={{color:'#EF5350',margin:'0px'}}>
                            {props.addressData.reduce((result,value)=>{
                                return value.id===selectedAddress?value.phone:result
                            },'')}
                        </h2>
                        <h4>Phương thức thanh toán đã chọn:</h4>
                        <h2 style={{color:'#EF5350',margin:'0px'}}>
                            {props.paymenttype.reduce((result,value)=>{
                                return value.id===payment?value.name:result
                            },'')}
                        </h2>
                        {
                            bankVisiable?
                            (
                                <>
                                <h4>Ngân hàng:</h4>
                                <h2 style={{color:'#EF5350',margin:'0px'}}>
                                    {props.bankData.reduce((result,value)=>{
                                        return selectedBank===value.bank_id?value.bank_name:result
                                    },'')}
                                </h2>
                                </>
                            ):
                            null
                        }
                        <CheckoutButton
                            onClick={checkout}
                        >
                            Đặt Hàng
                        </CheckoutButton>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default memo(Checkout)