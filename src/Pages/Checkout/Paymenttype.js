import {
    memo
} from 'react'
import {
    Select
} from 'antd'




const Paymenttype = props => {
    

    const optionRender = () => {
        return props.paymenttype.map((element)=>{
            return(
                <Select.Option key={element.id} value={element.id}>
                    {element.name}
                </Select.Option>
            )
        })
    }
    const changePayment = (value) => {
        if(value===2){
            props.setBankVisiable(true)
        }else {
            props.setBankVisiable(false)
        }
        props.setPayment(value)
    }

    return(
        <div
            style={{marginBottom:'50px'}}
        >
            <h1>Phương thức thanh toán</h1>
            <Select
                style={{
                    width:'400px'
                }}
                placeholder="Chọn hình thức thanh toán"
                size="large"
                onChange={(value)=>{changePayment(value)}}
            >
                {optionRender()}
            </Select>
        </div>
    )
}
export default memo(Paymenttype)