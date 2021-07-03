import {
    useState,
    useEffect
} from 'react'
import {
    Select
} from 'antd'
import {baseUrl} from '../../config'
import axios from 'axios'



const Paymenttype = props => {
    const [paymenttype,setPaymenttype] = useState([])

    useEffect(()=>{
        axios({
            method:'GET',
            url:baseUrl+'/paymenttype',
        }).then(res=>{
            setPaymenttype(res.data.data)
        })
    },[])

    const optionRender = () => {
        return paymenttype.map((element)=>{
            return(
                <Select.Option key={element.id} value={element.id}>
                    {element.name}
                </Select.Option>
            )
        })
    }

    return(
        <>
        {console.log(paymenttype)}
            <h1>Phương thức thanh toán</h1>
            <Select
                style={{
                    width:'400px'
                }}
                placeholder="Chọn hình thức thanh toán"
                size="large"
            >
                {optionRender()}
            </Select>
            <div style={{height:'150px'}}></div>
        </>
    )
}
export default Paymenttype