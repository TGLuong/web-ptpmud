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
    const addressRef = useRef()
    const full_nameRef = useRef()
    const phoneRef = useRef()
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
    const saveAddr = () => {
        const address = addressRef.current.state.value;
        const name = full_nameRef.current.state.value;
        const phone = phoneRef.current.state.value;
        const phoneRe = /[0-9]{9,10}\b/
        if(address.length<=0||address.length>=100){
            openErr('Địa chỉ không hợp lệ','độ dài địa chỉ phải lớn hơn 0 và nhỏ hơn 100')
        }else if(!phone.match(phoneRe)){
            openErr('Sai định dạng số điện thoại','')
        }else if(name.length<=0||name.length>=40){
            openErr('Tên người nhận không hợp lệ','độ dài tên phải lớn hơn 0 và nhỏ hơn 40')
        }else{
            axios({
                method:'PUT',
                url:baseUrl+'/user/address/'+props.userID,
                data:{
                    full_name: name,
                    address_id: addr.id,
                    phone: phone,
                    address:address,
                }
            }).then(res=>{
                openSucc('Sửa thành công','')
                sessionStorage.setItem('addresses',JSON.stringify(res.data.data))
                props.setAddressData(res.data.data)
                history.push('/dashboard/profile/address')
            })
        }
    }
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
            <table>
                <tbody>
                    <tr>
                        <td className="label">Địa Chỉ</td>
                        <td>
                            <Input
                                ref={addressRef}
                                defaultValue={addr.address}
                                style={{
                                    width:'400px'
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">Tên Người Nhận</td>
                        <td>
                            <Input
                                ref={full_nameRef}
                                defaultValue={addr.full_name}
                                style={{
                                    width:'400px'
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">Số Điện Thoại</td>
                        <td>
                        <Input
                            ref={phoneRef}
                            defaultValue={addr.phone}
                            style={{
                                width:'400px'
                            }}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Button type="primary" onClick={saveAddr} >Lưu</Button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default AlterAddress 