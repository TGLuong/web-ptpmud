import {
    Tabs,
    Row,
    Col
} from 'antd'
import {
    useState,
} from 'react'
import '.././../Style/Checkout.css'

import CartTable from './CartTable'
import BankTable from './BankTable'
import AddressTable from './AddressTable'

const {TabPane} = Tabs;
const Checkout = props => {
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
    return(
        <div className="checkout-root">
            <Row>
                <Col md={18}>
                    <Tabs>
                        <TabPane
                            tab={'Giỏ Hàng'}
                            key="1"
                        >
                            <CartTable
                                data={props.cartData}
                            />
                        </TabPane>
                        <TabPane
                            tab={'Ngân Hàng'}
                            key="2"
                        >
                            <BankTable
                                data={props.bankData}
                            />
                        </TabPane>
                        <TabPane
                            tab={'Địa Chỉ'}
                            key="3"
                        >
                            <AddressTable
                                data={props.addressData}
                            />
                        </TabPane>

                    </Tabs>
                </Col>
                <Col 
                    md={6}
                    style={{
                        border:'1px solid black',
                        padding:'30px 0px 0px 20px'
                    }}
                >
                    <h4>Tổng hóa đơn:</h4>
                    <h2>
                        {numberFormat(props.cartData.reduce((total, value, index, array)=>{
                            return total+value.total_price;
                        },0))} Đ
                    </h2>
                </Col>
            </Row>
        </div>
    )
}
export default Checkout