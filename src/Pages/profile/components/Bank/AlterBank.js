
import {useHistory} from 'react-router-dom'
import {GoBackBtn} from '../../../../component/Button'
import {LeftOutlined,CheckOutlined,CloseCircleOutlined} from '@ant-design/icons'
import {
    Row,
    Col,
    Input,
    Button,
    notification,
} from 'antd'
import axios from 'axios'
import {baseUrl} from '../../../../config'


const AlterBank = props => {
    const history = useHistory()
    const getID = () => {
        const arr = history.location.pathname.split('/')
        const id = parseInt(arr[arr.length-1])
        let data;
        props.bankData.forEach(element=>{
            if(element.bank_id===id)data=element
        })
        return data
    }
    const bankData = getID()
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
    const saveBank = ()=> {
        const bankNumRe = /[^0-9]/
        const bankNum = document.getElementById('alter-banknum-id').value
        if(bankNum.match(bankNumRe)||bankNum.length>=20||bankNum<=0){
            openErr('Sai định dạng số tài khoản')
        }else{
            axios({
                method:'PUT',
                url:baseUrl+'/user/bank/'+props.userID,
                data:{
                    bank_id:bankData.bank_id,
                    bank_number:bankNum
                }
            }).then(res=>{
                openSucc('Sửa thành công')
                props.setBankData(res.data.data)
                history.push('/dashboard/profile/bank')
            })
        }
    }
    return(
        <>
            <GoBackBtn
                onClick={()=>{history.push('/dashboard/profile/bank')}}
            >
                <LeftOutlined 
                    style={{fontSize:'18px'}}
                />
            </GoBackBtn>
            <div style={{borderBottom:'1px solid #CFD8DC',margin:'20px 0px'}}></div>
            <Row style={{marginBottom:'20px'}}>
                <Col xs={9}>
                    <h3>Tên Ngân Hàng: <span style={{fontWeight:600}}>{bankData.bank_name}</span></h3>
                </Col>
                <Col>
                    <h3>Chủ Tài Khoản: <span style={{fontWeight:600}}>{bankData.full_name}</span></h3>
                </Col>
            </Row>
            <Row style={{marginBottom:'20px'}}>
                <h3>Số tài khoản: <Input id="alter-banknum-id" defaultValue={bankData.bank_number}/></h3>
            </Row>
            <Button
                onClick={saveBank}
            >
                Lưu
            </Button>
        </>
    )
}
export default AlterBank