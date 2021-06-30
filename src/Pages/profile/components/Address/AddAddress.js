import { Select, Input, Button, notification} from 'antd'
import {useState, useEffect} from 'react'
import {GoBackBtn} from '../../../../component/Button'
import {LeftOutlined,CheckOutlined,CloseCircleOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {baseUrl} from '../../../../config'



const AddAddress = props => {
    const history = useHistory()
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
    const addAdd = () => {  
        const address = document.getElementById('receiver-address').value
        const name = document.getElementById('receiver-full-name').value
        const phone = document.getElementById('receiver-phone-number').value
        const phoneRe = /[0-9]{9,10}\b/
        if(address.length<=0||address.length>=100){
            openErr('Địa chỉ không hợp lệ','độ dài địa chỉ phải lớn hơn 0 và nhỏ hơn 100')
        }else if(!phone.match(phoneRe)){
            openErr('Sai định dạng số điện thoại','')
        }else if(name.length<=0||name.length>=40){
            openErr('Tên người nhận không hợp lệ','độ dài tên phải lớn hơn 0 và nhỏ hơn 40')
        }else {
            axios({
                method:'POST',
                url:baseUrl+'/user/address/'+props.userID,
                data:{
                    full_name: name,
                    phone: phone,
                    address: address
                }
            }).then(res=>{
                openSucc('Thêm địa chỉ nhận hàng thành công')
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
            <h3>Thêm Địa Chỉ Nhận Hàng:</h3>
            <table>
                    <tbody>
                        <tr>
                            <td className="label">Địa Chỉ</td>
                            <td>
                                <Input
                                    id="receiver-address"
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
                                    id="receiver-full-name"
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
                                id="receiver-phone-number"
                                style={{
                                    width:'400px'
                                }}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><Button type="primary" onClick={addAdd}>Thêm</Button></td>
                        </tr>
                    </tbody>
                </table>
        </>
    )
}   
export default AddAddress