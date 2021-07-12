import {
    Table,
    Button,
    Input,
    notification
} from 'antd'
import {
    SearchOutlined,
    CheckOutlined
} from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../../config'
import DeleteButton from '../components/DeleteButton'



const User = props => {
    const fillUsernameRef = useRef()
    const fillNameRef = useRef()
    const fillPhoneRef = useRef()
    const fillMailRef = useRef()
    const [fillData, setFillData] = useState([])

    useEffect(()=>{
        setFillData(props.userData)
    },[props.userData])
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
    const fillClick = key => {
        switch (key) {
            case 1:
                setFillData(
                    props.userData.filter((element)=>{
                        return element.username.toUpperCase().indexOf(fillUsernameRef.current.state.value.toUpperCase())!==-1?true:false
                    })
                )
                break;
            case 2:
                setFillData(
                    props.userData.filter((element)=>{
                        return element.full_name.toUpperCase().indexOf(fillNameRef.current.state.value.toUpperCase())!==-1?true:false
                    })
                )
                break;
            case 4:
            setFillData(
                props.userData.filter((element)=>{
                    return element.phone.toUpperCase().indexOf(fillPhoneRef.current.state.value.toUpperCase())!==-1?true:false
                })
            )
            break;
            case 5:
            setFillData(
                props.userData.filter((element)=>{
                    return element.email.toUpperCase().indexOf(fillMailRef.current.state.value.toUpperCase())!==-1?true:false
                })
            )
            break;
            default:
                break;
        }
    }

    const fill = (key, ref) => {
        return {
            filterDropdown:()=>{
                return(
                    <div style={{
                        padding:'10px'
                    }}>
                        <Input
                            ref={ref}
                            style={{
                                marginBottom:'10px'
                            }}
                        />
                        <Button type="primary" onClick={()=>{fillClick(key)}}>Lọc</Button>
                        <Button 
                            onClick={()=>{
                                setFillData(props.userData)
                            }}
                            style={{marginLeft:'20px'}}
                        >
                            Reset
                        </Button>
                    </div>
                )
            },
            filterIcon:()=><SearchOutlined style={{fontSize:'18px'}}/>
        }
    }
    
    const columns = [
        {
            title:'Tên đăng nhập',
            width:'110px',
            key:'1',
            dataIndex:'username',
            render:text=>{
                return text?text:'- -'
            },
            sorter:{
                compare:(a,b)=>{
                    return b.username.localeCompare(a.username)
                }
            },
            ...fill(1,fillUsernameRef)
        },
        {
            title:'Họ tên',
            key:'2',
            width:'120px',
            dataIndex:'full_name',
            render:text=>{
                return text?text:'- -'
            },
            ...fill(2,fillNameRef)
        },
        {
            title:'Giới tính',
            key:'3',
            width:'85px',
            dataIndex:'gender',
            render:text=>{
                return text?text:'- -'
            },
        },
        {
            title:'Số điện thoại',
            key:'4',
            width:'100px',
            dataIndex:'phone',
            render:text=>{
                return text?text:'- -'
            },
            ...fill(4,fillPhoneRef)
        },
        {
            title:'Email',
            key:'5',
            width:'150px',
            dataIndex:'email',
            render:text=>{
                return text?text:'- -'
            },
            ...fill(5,fillMailRef)
        },
        {
            title:'',
            key:'6',
            width:'100px',
            render:(text, record)=>{
                return(
                    <>
                        <Button
                            onClick={()=>{
                                axios({
                                    method:"PUT",
                                    url:baseUrl+'/manageuser/'+record.id
                                }).then(res=>{
                                    openSucc('Reset thành công')
                                })
                            }}
                        >
                            Reset Mật khẩu
                        </Button>
                    </>
                )
            }
        },
        {
            title:'',
            width:'100px',
            key:'6',
            render:(text, record)=>{
                return(
                    <>
                        <DeleteButton 
                            id={record.id}
                            setUserData={props.setUserData}
                        />
                    </>
                )
            }
        },
    ]
    return(
        <div style={{height:'420px'}}>
            <Table
                dataSource={fillData}
                columns={columns}
                pagination={false}
                scroll={{y:350,x:false}}
            />
        </div>
    )
}
export default User