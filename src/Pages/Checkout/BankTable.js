import {
    memo,
    
} from 'react'
import {
    Table,
    Image,
    Button
} from 'antd'


const BankTable = props => {
    const columns = [
        {
            title:'Tên ngân hàng',
            key:'1',
            render:(text,record)=>{
                return(
                    <h4>{record.bank_name}</h4>
                )
            }
        },
        {
            title:'Số tài khoản',
            key:'2',
            render:(text,record)=>{
                return(
                    <h4>{record.bank_number}</h4>
                )
            }
        },
        {
            title:'Chủ tài khoản',
            key:'3',
            render:(text,record)=>{
                return(
                    <h4>{record.full_name}</h4>
                )
            }
        },
        {
            title:'Chọn ngân hàng',
            key:'4',
            render:(text,record)=>{
                return(
                    <>
                        <button
                            className={`checkout-selectbank-btn ${props.selectedBank===record.bank_id?"is-selected":null}`}
                            onClick={()=>{
                                props.setSelectedBank(record.bank_id)
                            }}
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
            <h1>Ngân Hàng</h1>
            <Table
                dataSource={props.data}
                columns={columns}
                pagination={false}
                scroll={{y:350}}
            />
        </div>
    )
}
export default memo(BankTable)