import {
    Table
}from 'antd'
import {GoBackBtn} from '../../../../component/Button'
import {LeftOutlined} from '@ant-design/icons'

const DetailScreen = props => {
    const date = props.data.created_at.split(' ')[0].split('-')
    const columns = [
        {
            title:'Số lượng',
            key:1,
            width:'100px',
            render:(text,record)=>{
                return(
                    <p>{record.amount}</p>
                )
            }
        },
        {
            title:'Tên sản phẩm',
            key:2,
            width:'500px',
            render:(text,record)=>{
                return(
                    <p>{record.productName}</p>
                )
            }
        },
        {
            title:'Tổng',
            key:3,
            render:(text,record)=>{
                return(
                    <p>{numberFormat(record.total_price)}đ</p>
                )
            }
        }
    ]
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
    return(
        <>
        <GoBackBtn
            onClick={()=>{props.setDetailScreenData(null)}}
        >
            <LeftOutlined 
                style={{fontSize:'18px'}}
            />
        </GoBackBtn>
                <div style={{borderBottom:'1px solid #CFD8DC',margin:'20px 0px'}}></div>
        <table>
            <tbody>
                <tr style={{height:'50px'}}>
                    <td style={{width:'200px'}}>Ngày đặt hàng:</td>
                    <td style={{fontWeight:600}}>{date[2]}/{date[1]}/{date[0]}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td style={{width:'200px'}}>Địa chỉ:</td>
                    <td style={{fontWeight:600}}>{props.data.address.address}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td style={{width:'200px'}}>Tên người nhận:</td>
                    <td style={{fontWeight:600}}>{props.data.address.full_name}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td style={{width:'200px'}}>Số điện thoại:</td>
                    <td style={{fontWeight:600}}>{props.data.address.phone}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td style={{width:'200px'}}>Hình thức thanh toán:</td>
                    <td style={{fontWeight:600}}>{props.data.payment_type}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td style={{width:'200px'}}>Trạng thái:</td>
                    <td style={{fontWeight:600}}>{props.data.status}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td style={{width:'200px'}}>Thành tiền:</td>
                    <td style={{fontWeight:600}}>{numberFormat(props.data.total)}đ</td>
                </tr>
            </tbody>
        </table>

        <Table
            dataSource={props.data.products}
            columns={columns}
            pagination={{pageSize:'6'}}
        />
        </>
    )
}
export default DetailScreen