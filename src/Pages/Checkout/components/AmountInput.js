import {
    InputNumber
} from 'antd'
import {
    useEffect,
    useState
} from 'react'
import axios from 'axios'
import {baseUrl} from '../../../config'

const AmountInput = props => {
    const [changeAmount,setChangeAmount] = useState(1)
    const [displayAmount,setDisplayAmount] = useState(1)

    useEffect(()=>{
        setChangeAmount(props.product.amount)
        setDisplayAmount(props.product.amount)
    },[props.product])
    const updateValue = value => {
        if(value>=1&&value!==null){
            setChangeAmount(value)
        }
    }
    const summitValue=(e)=>{
        if(changeAmount!==displayAmount){
            setDisplayAmount(changeAmount)
            axios({
                method:'PUT',
                url:baseUrl+'/user/cart/'+props.userID+'/'+props.product.product_id,
                data:{
                    amount:changeAmount
                }
            }).then(res=>{
                props.setCartData(res.data.carts)
            })
        }
    }
    return(
        <div
            style={{
                width:'100%',
                overflow:'hidden',
                border:'1px solid #B0BEC5',
                borderRadius:'5px'
            }}
        >
            <InputNumber
                onPressEnter={summitValue}
                bordered={false}
                onChange={updateValue}
                value={displayAmount}
                min={1}
            />
        </div>
    )
}
export default AmountInput