import { useState } from "react"
import {
    Button,
    notification
} from 'antd'
import {
    CheckOutlined
} from "@ant-design/icons"
import axios from 'axios'
import { baseUrl } from "../../../../config"



const DeleteButton = props => {
    const [loading, setLoading] = useState(false)
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
    return(
        <>
            <Button 
                danger
                loading={loading}
                onClick={()=>{
                    setLoading(true)
                    axios({
                        method:'DELETE',
                        url:baseUrl+'/manageuser/'+props.id
                    }).then(res=>{
                        openSucc('Xóa thành công')
                        axios({
                            method:'GET',
                            url:baseUrl+'/alluser'
                        }).then(res=>{
                            props.setUserData(res.data.users)
                            setLoading(false)
                        })
                    })
                }}
            >
                Xóa tài khoản
            </Button>
        </>
    )
}
export default DeleteButton