import {
    Tabs,
    Row,
    Col
} from 'antd'
import {
    useState,
    useEffect,
} from 'react'
import '.././../Style/Checkout.css'
import {baseUrl} from '../../config'
import axios from 'axios'

import CartTable from './CartTable'
import BankTable from './BankTable'
import AddressTable from './AddressTable'
import Paymenttype from './Paymenttype'

const {TabPane} = Tabs;
const Checkout = props => {
    const [bankVisiable,setBankVisiable] = useState(false)
    const [paymenttype,setPaymenttype] = useState([])
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
    useEffect(()=>{
        axios({
            method:'GET',
            url:baseUrl+'/paymenttype',
        }).then(res=>{
            setPaymenttype(res.data.data)
        })
    },[])

    return(
        <div className="checkout-root">
            <Row>
                <Col md={18}>
                    <CartTable
                        data={props.cartData}
                    />
                    <AddressTable
                        data={props.addressData}
                        setSelectedAddress={setSelectedAddress}
                    />
                    <Paymenttype
                        setBankVisiable={setBankVisiable}
                        paymenttype={paymenttype}
                        setPayment={setPayment}
                    />
                    {bankVisiable?
                        <BankTable
                            data={props.bankData}
                            setSelectedBank={setSelectedBank}
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
                            border:'1px solid black',
                            height:'400px',
                            width:'100%',
                            padding:'30px 0px 0px 20px',
                        }}
                    >
                        <h4>Tổng hóa đơn:</h4>
                        <h2>
                            {numberFormat(props.cartData.reduce((total, value, index, array)=>{
                                return total+value.total_price;
                            },0))} Đ
                        </h2>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Checkout