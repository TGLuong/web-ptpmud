import {useHistory} from 'react-router-dom'
import {GoBackBtn} from '../../../../component/Button'
import {LeftOutlined,CheckOutlined,CloseCircleOutlined} from '@ant-design/icons'
import { useRef } from 'react'
import {
    Row,
    Col,
    Input,
    Button,
    notification,
} from 'antd'
import axios from 'axios'
import {baseUrl} from '../../../../config'


const AlterAddress = props => {
    const history = useHistory()

    const getAddress = () => {
        const arr = history.location.pathname.split('/')
        const id = parseInt(arr[arr.length-1])
        let data;
        props.addressData.forEach(element=>{
            if(element.id===id)data=element
        })
        return data
    }
    const addr = getAddress()
    console.log(addr)
    return(
        <>
            <GoBackBtn
                onClick={()=>{history.push('/dashboard/profile/address')}}
            >
                <LeftOutlined 
                    style={{fontSize:'18px'}}
                />
            </GoBackBtn>
            <div style={{borderBottom:'1px solid #CFD8DC',margin:'20px 0px'}}></div>
            <h3>Sửa thông tin địa chỉ: </h3>
        </>
    )
}
export default AlterAddress 