import {useEffect, useState} from 'react'
import {Card , Input, Radio, Button, notification} from 'antd'
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import PickDate from '../PickDate/PickDate'
import axios from 'axios'

const UserInfo = props => {
    const [dateofbrith,setDateofbirth] = useState([1,1,2000])
    const [gender,setGender] = useState(null)
    const changeGender = event => {
        setGender(event.target.value)
    }
    useEffect(()=>{
        setGender(props.userData.gender)
    },[props.userData])
    const submitForm = () => {
        const hoTen = document.getElementById('ho-ten').value
        const email = document.getElementById('email').value
        const sdt = document.getElementById('sdt').value
        const emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const phoneRe = /[0-9]{9,10}\b/
        if(hoTen.length<1||hoTen>40){
            openErr('Sai Tên','Độ dài tên không được bé hơn 1 và lớn hơn 40')
        }else if(!email.match(emailRe)){
            openErr('Sai Định dạng email','')
        }else if(!sdt.match(phoneRe)){
            openErr('Sai định dạng số điện thoại','')
        }else{
            axios({
                method:'PUT',
                url:'http://47.254.253.64:5000/user/'+props.userData.id,
                data:{
                    email:email,
                    full_name:hoTen,
                    phone:sdt,
                    gender:gender
                }
            }).then(res=>{
                const data = res.data.user
                props.setUserData(data)
                sessionStorage.setItem('userdata',JSON.stringify({
                    email:data.email,
                    full_name:data.full_name,
                    gender:data.gender,
                    id:data.id,
                    is_admin:data.is_admin,
                    phone:data.phone,
                    username:data.username
                }))
                openSucc('Sửa thành công')
            }).catch(err=>{
                console.log(err)
            })

        }
        
        

        
    }
    const openSucc = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#f6ffed',
                border:'1px solid #b7eb8f'
            },
            icon:<CheckOutlined
                    style={{
                        backgroundColor:'#52c41a',
                        color:'white',
                        borderRadius:'50%',
                        padding:'5px',
                        fontSize:'12px' 
                    }} 
                />
            
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
            icon:<CloseOutlined
                    style={{
                        backgroundColor:'#ff4d4f',
                        color:'white',
                        borderRadius:'50%',
                        padding:'5px',
                        fontSize:'12px' 
                    }} 
                />
            
        })
    }

    return(
        <>
            <h1>Hồ Sơ Của Tôi</h1>
            <Card
                hoverable
                style={{
                    cursor:'context-menu'
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="label">Tên Đăng Nhập</td>
                            <td>{props.userData.username}</td>
                        </tr>
                        <tr>
                            <td className="label">Họ Tên</td>
                            <td><Input id="ho-ten" defaultValue={props.userData.full_name}/></td>
                        </tr>
                        <tr>
                            <td className="label">Email</td>
                            <td><Input id="email" defaultValue={props.userData.email} /></td>
                        </tr>
                        <tr>
                            <td className="label">Số Điện Thoại</td>
                            <td><Input id="sdt" defaultValue={props.userData.phone}/></td>
                        </tr>
                        <tr>
                            <td className="label">Giới Tính</td>
                            <td>
                                <Radio.Group value={gender} onChange={changeGender}>
                                    <Radio value={"Nam"}>Nam</Radio>
                                    <Radio value={"Nữ"}>Nữ</Radio>
                                    <Radio value={"Khác"}>Khác</Radio>
                                </Radio.Group>
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Ngày Sinh</td>
                            <td><PickDate onChange={(day,month,year)=>{setDateofbirth([day,month,year])}} /></td>
                        </tr>
                        <tr>
                            <td className="label"></td>
                            <td><Button type="primary" style={{width:'100px'}} onClick={()=>{submitForm()}}>Lưu</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </>
    );
}
export default UserInfo