import {
    useState,
    useEffect
} from 'react'
import {
    Select
} from 'antd'
import axios from 'axios'
import { baseUrl } from '../../../../config'

const StatusOption = props => {
    const [value, setValue] = useState('')
    useEffect(()=>{
        setValue(props.record.status)
    },[props.record])

    const changeStatus = value => {
        setValue(value)
        axios({
            method:'PUT',
            url:baseUrl+'/managepayment/'+props.record.id,
            data:{
                status:value
            }
        }).then(res=>{
            props.setBillData(res.data.payments)
        })
    }
    return(
        <Select 
            style={{width:'100%'}} 
            value={value}
            onSelect={changeStatus}
        >
            <Select.Option key={1} value="Chờ xác nhận">Chờ xác nhận</Select.Option>
            <Select.Option key={2} value="Đang xử lý">Đang xử lý</Select.Option>
            <Select.Option key={3} value="Đang vận chuyển">Đang vận chuyển</Select.Option>
            <Select.Option key={4} value="Giao thành công">Giao thành công</Select.Option>
        </Select>
    )
}
export default StatusOption