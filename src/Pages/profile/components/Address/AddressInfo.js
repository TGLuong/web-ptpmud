import {useHistory} from 'react-router-dom'
import { Row, Col} from 'antd'
import {AddBankCartBtn, DeleteBankAccBtn, EditBankAcc} from '../../../../component/Button'
import {PlusOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons'
import axios from 'axios'
import {baseUrl} from '../../../../config'




const AddressInfo = props => {
    const history = useHistory()

    const deleteAddress = id => {
        axios({
            method:'DELETE',
            url:baseUrl+'/user/address/'+props.userID,
            data:{
                address_id:id
            }
        }).then(res=>{
            props.setAddressData(res.data.data)
        })
    }

    return(
        <>
            <Row 
                justify="space-between"
                style={{
                    borderBottom:'1px solid #B0BEC5',
                    paddingBottom:'10px',
                }}
            >
                <h2>Địa chỉ người nhận</h2>
                <AddBankCartBtn
                    onClick={()=>{history.push('/dashboard/profile/address/add')}}
                >
                    <PlusOutlined
                        style={{
                            fontSize:'15px',
                            marginRight:'5px'
                        }}
                    />
                    Thêm địa chỉ
                </AddBankCartBtn>
            </Row>
            {props.addressData.map((element,index)=>{
                return(
                    <div
                        key={index}
                        style={{
                            // height:'100px',
                            margin:'20px 0px',
                            padding:'20px',
                            borderRadius:'10px',
                            backgroundColor:'#F5F5F5'
                        }}
                    >
                        <h3>Địa chỉ người nhận : <span style={{fontWeight:600}}>{element.address}</span></h3>
                        <h3>Tên người nhận : <span style={{fontWeight:600}}>{element.full_name}</span></h3>
                        <h3>Số điện thoại : <span style={{fontWeight:600}}>{element.phone}</span></h3>
                        <Row 
                            justify="space-between"
                            style={{
                                width:'310px',
                            }}
                        >
                            <EditBankAcc
                               onClick={()=>{history.push('/dashboard/profile/address/edit')}}
                            >
                                <EditOutlined 
                                    style={{
                                        marginRight:'5px'
                                    }}
                                />
                                Sửa thông tin
                            </EditBankAcc>
                            <DeleteBankAccBtn
                                onClick={()=>{deleteAddress(element.id)}}
                            >
                                <DeleteOutlined
                                    style={{
                                        marginRight:'5px'
                                    }}
                                />
                                Xóa địa chỉ
                            </DeleteBankAccBtn>
                        </Row>
                    </div>
                );
            })}
        </>
    )
}

export default AddressInfo