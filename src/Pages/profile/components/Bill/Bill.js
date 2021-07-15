import {
    useState,
} from 'react'
import {
    Table,
    Button
} from 'antd'
import DetailScreen from './DetailScreen'



const Bill = props => {
    const [detailScreenData,setDetailScreenData]=useState(null)
    const columns = [
        {
            title:'Ngày đặt hàng',
            key:1,
            width:'130px',
            render:(text,record)=>{
                const date = record.created_at.split(' ')[0].split('-')
                return(
                    <p>{date[2]}/{date[1]}/{date[0]}</p>
                )
            }
        },
        {
            title:'người nhận',
            key:3,
            width:'200px',
            render:(text,record)=>{
                return(
                    <p>{record.address.full_name}</p>
                )
            }
        },
        {
            title:'Số điện thoại',
            key:4,
            width:'200px',
            render:(text,record)=>{
                return(
                    <p>{record.address.phone}</p>
                )
            }
        },
        {
            title:'Trạng thái',
            key:5,
            width:'150px',
            render:(text,record)=>{
                return(
                    <p>{record.status}</p>
                )
            }
        },
        {
            title:'',
            render:(text,record)=>{
                return(
                    <Button 
                        type="primary"
                        onClick={()=>{
                            setDetailScreenData(record)
                        }}
                    >
                        Chi Tiết
                    </Button>
                )
            }
        }

    ]
    // useEffect(()=>{
    //     axios({
    //         method:'GET',
    //         url:baseUrl+'/payment/'+props.userID
    //     }).then(res=>{
    //         setBillData(res.data.data)
    //     })
    // },[])

    return(
        <>
            <h1>Các đơn đã đặt</h1>
            {detailScreenData?(
                <DetailScreen
                    data={detailScreenData}
                    setDetailScreenData={setDetailScreenData}
                />
            ):(
                <Table
                    dataSource={props.billData}
                    columns={columns}
                    pagination={{pageSize:'5'}}
                />
            )}
        </>
    )
}
export default Bill