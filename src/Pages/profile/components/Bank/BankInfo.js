import {useHistory} from 'react-router-dom'
import { Row, Col} from 'antd'
import {AddBankCartBtn, DeleteBankAccBtn, EditBankAcc} from '../../../../component/Button'
import {PlusOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons'
import axios from 'axios'
import {baseUrl} from '../../../../config'


const BankInfo = props => {
    const history = useHistory()

    const deleteBank = id => {
        axios({
            method:'DELETE',
            url:baseUrl+'/user/bank/'+props.userID,
            data:{
                bank_id:id
            }
        }).then(res=>{
            props.setBankData(res.data.data)
        })
        
    }


    return(
        <>
            <div
                style={{
                    display:'flex',
                    justifyContent:'space-between',
                    borderBottom:'1px solid #B0BEC5',
                    paddingBottom:'10px',
                }}
            >
                <h2>Ngân Hàng Liên Kết</h2>
                <AddBankCartBtn
                    onClick={()=>{history.push('/dashboard/profile/bank/add')}}
                >
                    <PlusOutlined 
                        style={{
                            fontSize:'15px',
                            marginRight:'5px'
                        }}
                    />
                    Thêm Tài Khoản Ngân Hàng
                </AddBankCartBtn>
            </div>
            <div
                // style={{
                //     maxHeight:'400px',
                //     overflowX:'hidden',
                //     overflowY:'auto'
                // }}
            >
                {props.bankData.map((element,index)=>{
                    return(
                        <div
                            key={index}
                            style={{
                                height:'100px',
                                margin:'20px 0px',
                                padding:'20px',
                                borderRadius:'10px',
                                backgroundColor:'#F5F5F5'
                            }}
                        >
                            <Row>
                                <Col 
                                    sm={12}
                                    
                                >
                                    <h3>Tên Ngân Hàng : <span style={{fontWeight:'600'}}>{element.bank_name}</span></h3>
                                    <h3>Số Tài Khoản : <span style={{fontWeight:'600'}}>{element.bank_number}</span></h3>
                                </Col>
                                <Col sm={12}>
                                    <h3>Chủ Tài Khoản : <span style={{fontWeight:'600'}}>{element.full_name}</span></h3>
                                    <EditBankAcc>
                                        <EditOutlined 
                                            style={{
                                                marginRight:'5px'
                                            }}
                                        />
                                        Sửa Tài Khoản
                                    </EditBankAcc>
                                    <DeleteBankAccBtn
                                        onClick={()=>{deleteBank(element.bank_id)}}
                                    >
                                        <DeleteOutlined
                                            style={{
                                                marginRight:'5px'
                                            }}
                                        />
                                        Xóa Tài Khoản
                                    </DeleteBankAccBtn>
                                    
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
export default BankInfo