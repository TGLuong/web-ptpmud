import {
    memo,
    useState,
} from 'react'
import {
    Table,
    Image,
    Button
} from 'antd'


const AddressTable = props => {
    console.log(props.data)
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
                        >
                            Chọn
                        </button>
                    </>
                )
            }
        }
    ]
    return(
        <>
            <Table
                dataSource={props.data}
                columns={columns}
            />
        </>
    )
}
export default memo(AddressTable)