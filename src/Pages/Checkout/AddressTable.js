import {
    memo,
    useState,
    useRef
} from 'react'
import {
    Table,
    Button,
    Modal,
    Input,
    notification
} from 'antd'
import {
    CheckOutlined,
    CloseCircleOutlined
} from '@ant-design/icons'
import axios from 'axios'
import {baseUrl} from '../../config'


const AddressTable = props => {
    const nameRef = useRef()
    const addressRef = useRef()
    const phoneRef = useRef()
    const [isModalVisible, setIsModalVisible] = useState(false);
    
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
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        const name=nameRef.current.state.value;
        const address=addressRef.current.state.value;
        const phone=phoneRef.current.state.value;
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
                setIsModalVisible(false);
            })
        }
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const columns = [
        {
            title:'Địa chỉ',
            key:'1',
            width:'400px',
            render:(text,record)=>{
                return(
                    <h4>{record.address}</h4>
                )
            }
        },
        {
            title:'Số điện thoại',
            key:'2',
            render:(text,record)=>{
                return(
                    <h4>{record.phone}</h4>
                )
            }
        },
        {
            title:'Tên người nhận',
            key:'3',
            render:(text,record)=>{
                return(
                    <h4>{record.full_name}</h4>
                )
            }
        },
        {
            title:'Chọn địa chỉ',
            key:'4',
            render:(text,record)=>{
                return(
                    <>
                        <button
                            className={`checkout-selectbank-btn ${props.selectedAddress===record.id?"is-selected":''}`}
                            onClick={()=>{props.setSelectedAddress(record.id)}}
                        >
                            Chọn
                        </button>
                    </>
                )
            }
        }
    ]
    return(
        <div
            style={{
                marginBottom:'50px'
            }}
        >
            <h1>Địa Chỉ</h1>
            <Table
                dataSource={props.data}
                columns={columns}
                pagination={false}
                scroll={{y:350}}
            />
            <div
                style={{
                    height:'70px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'flex-end',
                    padding:'0px 20px',
                }}
            >
                <Button type="primary" onClick={showModal}>
                Địa chỉ mới
                </Button>
                <Modal title="Thêm địa chỉ nhận hàng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <table style={{width:'450px'}}>
                    <tbody>
                        <tr style={{height:'50px'}}>
                            <td className="label">Họ Tên Người nhận</td>
                            <td><Input ref={nameRef}/></td>
                        </tr>
                        <tr style={{height:'50px'}}>
                            <td className="label">Địa chỉ nhận hàng</td>
                            <td><Input ref={addressRef}/></td>
                        </tr>
                        <tr style={{height:'50px'}}>
                            <td className="label">Số điện thoại</td>
                            <td><Input ref={phoneRef}/></td>
                        </tr>
                    </tbody>
                </table>
                </Modal>
            </div>
            
        </div>
    )
}
export default memo(AddressTable)