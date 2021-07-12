import {
    useEffect,
    useState,
    useRef,
} from 'react'
import {
    Table,
    Tag,
    Button,
    Row,
    Input
} from 'antd'
import{
    SearchOutlined
}from '@ant-design/icons'
import Detail from './Detail'
import StatusOption from '../components/StatusOption'




const Bills = props => {
    const [detailContent, setDetailContent] = useState(null)
    const [fillData, setFillData] = useState([])
    const fillAddressRef = useRef()
    const fillNameRef = useRef()
    const fillPhoneRef = useRef()

    useEffect(()=>{
        setFillData(props.billData)
    },[props.billData])

    const numberFormat = (num) => {
        let stringfmt = num.toString();
        let mod3 = 0;
        let result=''
        for(let i = stringfmt.length-1;i>=0;i--){
            if(mod3===3){
                result+='.'
                mod3=0
            }
            mod3+=1;
            result+=stringfmt[i];
        }
        return result.split('').reverse().join('');
    }

    const filterClick = key => {
        switch (key) {
            case 1:{
                const a = props.billData.filter(element=>{
                    return element.address.address.toUpperCase().indexOf(fillAddressRef.current.state.value.toUpperCase())!==-1?true:false
                })
                setFillData(a)
            }
            case 2:{
                const a = props.billData.filter(element=>{
                    return element.address.full_name.toUpperCase().indexOf(fillNameRef.current.state.value.toUpperCase())!==-1?true:false
                })
                setFillData(a)
            }
            case 3:{
                const a = props.billData.filter(element=>{
                    return element.address.phone.toUpperCase().indexOf(fillPhoneRef.current.state.value.toUpperCase())!==-1?true:false
                })
                setFillData(a)
            }
            default:
                break;
        }
    }

    const filter = (key, ref) => {
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
                        <Button type="primary" onClick={()=>{filterClick(key)}}>Lọc</Button>
                        <Button 
                            onClick={()=>{
                                setFillData(props.billData)
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
            title:'Địa chỉ',
            key:1,
            width:'100px',
            render:(text, record) => {
                return(
                    record.address.address
                )
            },
            ...filter(1,fillAddressRef)
        },
        {
            title:'Người nhận',
            key:2,
            width:'150px',
            render:(text,record)=>{
                return(
                    record.address.full_name
                )
            },
            ...filter(2,fillNameRef)
        },
        {
            title:'Điện thoại',
            key:3,
            width:'120px',
            render:(text, record)=>{
                return(
                    record.address.phone
                )
            },
            ...filter(3,fillPhoneRef)
        },
        {
            title:'Ngày đặt hàng',
            key:4,
            width:'130px',
            render:(text, record)=>{
                const date = record.created_at.split(' ')[0].split('-')
                return(
                    ''+date[2]+'/'+date[1]+'/'+date[0]
                )
            }
        },
        {
            title:'Đơn giá',
            key:5,
            width:'130px',
            render:(text,record)=>{
                return(
                    <p style={{color:'red'}}>{numberFormat(record.total)}đ</p>
                )
            }
        },
        {
            title:'Trạng thái',
            key:6,
            width:'130px',
            render:(text,record)=>{
                switch(record.status){
                    case 'Chờ xác nhận':{
                        return(
                            <Tag color="red">{record.status}</Tag>
                        )
                    }
                    case 'Đang xử lý':{
                        return(
                            <Tag color="purple">{record.status}</Tag>
                        )
                    }
                    case 'Đang vận chuyển':{
                        return(
                            <Tag color="blue">{record.status}</Tag>
                        )
                    }
                    case 'Giao thành công':{
                        return(
                            <Tag color="green">{record.status}</Tag>
                        )
                    }
                    default:
                        return '- -';
                }
            }
        },
        {
            title:'Sửa trạng thái',
            key:7,
            width:'190px',
            render:(text,record)=>{
                return(
                    <StatusOption
                        record={record}
                        setBillData={props.setBillData}
                    />
                )
            }
        },
        {
            title:'',
            key:8,
            render:(text, record)=>{
                return(
                    <Row justify="center">
                        <Button 
                            type="primary" 
                            onClick={()=>{
                                setDetailContent(record)
                            }}    
                        >
                            Chi Tiết
                        </Button>
                    </Row>
                )
            }
        }
    ]

    
    return(
        <div style={{minHeight:'420px'}}>
            {detailContent?(
                <Detail
                    data={detailContent}
                    removeContent={()=>{
                        setDetailContent(null)
                    }}
                />
            ):(
                <Table
                    dataSource={fillData}
                    columns={columns}
                    pagination={false}
                    scroll={{y:350,x:false}}
                />
            )}
        </div>
    )
}
export default Bills