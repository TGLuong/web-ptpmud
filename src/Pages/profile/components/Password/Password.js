import {
    useRef
} from 'react'
import {
    useHistory
} from 'react-router-dom'
import {
    Card,
    Input,
    Button,
    notification,
} from 'antd'
import {
    CloseCircleOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import { baseUrl } from '../../../../config'



const Password = props => {
    const history = useHistory()
    const oldPassRef = useRef()
    const newPassRef = useRef()
    const valNewPassRef = useRef()

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
    const changePass = () => {
        const oldPass = oldPassRef.current.state.value;
        const newPass = newPassRef.current.state.value;
        const valNewPass = valNewPassRef.current.state.value;
        if(oldPass.length===0||newPass.length===0||valNewPass.length===0){
            openErr('Độ dài mật khẩu phải lớn hơn 1','')
        }else if(
            !oldPass.match(/[a-z]/)||!oldPass.match(/[0-9]/)
            ||!newPass.match(/[a-z]/)||!newPass.match(/[0-9]/)
            ||!valNewPass.match(/[a-z]/)||!valNewPass.match(/[0-9]/)
            ){
            openErr('Sai quy chuẩn','mật khẩu phải có chữ và số')
        }else if(newPass!==valNewPass){
            openErr('Nhập lại mật khẩu không đúng','')
        }else {
            axios({
                method:'PUT',
                url:baseUrl+'/user/'+props.userID,
                data:{
                    current_password: oldPass,
                    new_password: newPass
                }
            }).then(res=>{
                openSucc('Đổi mật khẩu thành công')
                history.push('/dashboard/profile/userinfo')
            }).catch(err=>{
                openErr('Sai mật khẩu')
            })
        }
    }
    return(
        <>
            <h1>Đổi Mật Khẩu</h1>
            <Card
                hoverable
                style={{
                    cursor:'context-menu'
                }}
            >
                <table style={{width:'600px'}}>
                    <tbody >
                        <tr>
                            <td>
                                <label>Mật Khẩu <span style={{color:'red'}}>*</span></label>
                                <Input.Password
                                    ref={oldPassRef}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Mật Khẩu Mới <span style={{color:'red'}}>*</span></label>
                                <Input.Password
                                    ref={newPassRef}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Nhập Lại Mật Khẩu <span style={{color:'red'}}>*</span></label>
                                <Input.Password
                                    ref={valNewPassRef}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button type="primary" onClick={changePass}>Lưu</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </>
    );
}
export default Password