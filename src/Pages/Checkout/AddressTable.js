import {
    memo,
    useState,
} from 'react'
import {
    Table,
    Button
} from 'antd'


const AddressTable = props => {
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
            title:'Chọn địa',
            key:'4',
            render:(text,record)=>{
                return(
                    <>
                        <button
                            className="checkout-selectbank-btn"
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
                <Button type="primary">Địa Chỉ Mới</Button>
            </div>
            <div
                
            >

            </div>
        </div>
    )
}
export default memo(AddressTable)