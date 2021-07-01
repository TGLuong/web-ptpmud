import {useRef} from 'react'
import {useHistory} from 'react-router-dom'
import {Card, Input, Button,notification} from 'antd'
import {
    CloseCircleOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import {baseUrl} from '../../../../config'

const Account = props => {
    const history = useHistory()
    const passRef = useRef()
    const valPass = useRef()
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
    const deleteAccount = () => {
        const pass = passRef.current.state.value;
        const valpass = valPass.current.state.value;
        if(pass!==valpass){
            openErr('Nhập lại mật khẩu sai')
        }else{
            axios({
                method:'DELETE',
                url:baseUrl+'/user/'+props.userID,
                data:{
                    password:pass
                }
            }).then(res=>{
                openSucc('Xóa tài khoản thành công')
                sessionStorage.removeItem('userdata')
                history.push('/')
            }).catch(ree=>{
                openErr('Sai mật khẩu')
            })
        }
    }
    return(
        <>
            <h1>Xóa tài khoản</h1>
            <Card
                hoverable
                style={{
                    cursor:'context-menu'
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <label>Nhập mật khẩu</label>
                            <Input.Password
                                ref={passRef}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Nhập lại mật khẩu</label>
                                <Input.Password
                                    ref={valPass}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Button type="primary" onClick={deleteAccount} >Xóa</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </>
    );
}
export default Account