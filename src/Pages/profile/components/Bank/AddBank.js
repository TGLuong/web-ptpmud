import { Select, Input, Button, notification} from 'antd'
import {useState, useEffect} from 'react'
import {GoBackBtn} from '../../../../component/Button'
import {LeftOutlined,CheckOutlined,CloseCircleOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {baseUrl} from '../../../../config'
import '../../../../Style/Bank.css'
const AddBank = props => {
    const history = useHistory()
    const [bankSelected,setBankSelected] = useState(null)
    const [bankNumber, setBankNumber] = useState('')
    const [listBank,setListBank] = useState([
        {
            bank_name:'',
            id:'',
        },
    ])
    console.log(props.userName)

    useEffect(()=>{
        axios({
            method:'GET',
            url:baseUrl+'/bank'
        }).then(res=>{
            setListBank(res.data.data)
        })
    },[])
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
    const addBank = () => {
        const bankNum = document.getElementById('bank-number').value;
        const bankNumRe = /[^0-9]/
        if(bankNum.match(bankNumRe)||bankNum.length>=20||bankNum<=0){
            openErr('Sai định dạng số tài khoản')
        }else if(props.userName===''){
            openErr('Bạn chưa cập nhật đủ thông tin cá nhân','quay lại hồ sơ để cập nhật thông tin cá nhân')
        }else if(!bankSelected){
            openErr('Vui lòng chọn ngân hàng')
        }else{
            axios({
                method:'POST',
                url:baseUrl+'/user/bank/'+props.userID,
                data:{
                    bank_id:bankSelected,
                    bank_number:bankNum
                }
            }).then(res=>{
                if(res.data.message==='fail'){
                   openErr('Ngân hàng này đã có tài khoản')
                }else {
                    props.setBankData(res.data.data)
                    sessionStorage.setItem('banks',JSON.stringify(res.data.data))
                    openSucc('Liên Kết Thành công')
                    history.push('/dashboard/profile/bank')
                }
            })
        }

    }
    return(
        <>
            <div className="add-bank">
                <GoBackBtn
                    onClick={()=>{history.push('/dashboard/profile/bank')}}
                >
                    <LeftOutlined 
                        style={{fontSize:'18px'}}
                    />
                </GoBackBtn>
                <div style={{borderBottom:'1px solid #CFD8DC',margin:'20px 0px'}}></div>
                <h3>Thêm Tài Khoản Ngân Hàng:</h3>
                <table>
                    <tbody>
                        <tr>
                            <td className="label">Ngân Hàng</td>
                            <td>
                                <Select
                                    style={{
                                        width:'400px'
                                    }}
                                    onSelect={(value)=>{
                                        setBankSelected(value)
                                    }}
                                >
                                    {listBank.map((element,index)=>{
                                        return(
                                            <Select.Option
                                                key={index}
                                                value={element.id}
                                            >
                                                {element.bank_name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Số Tài Khoản</td>
                            <td>
                                <Input
                                    id="bank-number"
                                    style={{
                                        width:'400px'
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><Button type="primary" onClick={addBank}>Thêm</Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AddBank