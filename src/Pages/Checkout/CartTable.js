import {
    memo
} from 'react'
import {
    Table,
    Image,
    Button
} from 'antd'


const CartTable = props => {
    // console.log(props.data)
    const convertLongString=(string)=>{
        if(string.length>33) return(string.slice(0,33)+'...');
        else return(string);
    }
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
    const columns = [
        {
            title: '',
            width:'40px',
            key: '1',
            render:(text,record)=>{
                return(
                    <>
                        <Image
                            style={{width:'40px',height:'40px'}}
                            alt="img"
                            src={record.product.image}
                        />
                    </>
                )
            }
        },
        {
            title: 'Tên sản phẩm',
            width:'280px',
            key:'2',
            render:(text,record)=>{
                return(
                    <>
                        <button
                            className="name-button"
                        >
                            {convertLongString(record.product.name)}
                        </button>
                    </>
                )
            }
        },
        {
            title:'Giá',
            width:'130px',
            key:'3',
            render:(text,record)=>{
                return(
                    <h4 style={{color:'red'}}>{numberFormat(record.product.price)} Đ</h4>
                )
            }
        },
        {
            title:'Số lượng',
            width:'90px',
            key:'4',
            render:(text,record)=>{
                return(
                    <>
                    <h4>{record.amount}</h4>
                    </>
                )
            }
        },
        {
            title:'Thành tiền',
            key:'5',
            render:(text,record)=>{
                return(
                    <>
                        <h4 style={{color:'red'}}>{numberFormat(record.total_price)} Đ</h4>
                    </>
                )
            }
        },
        {
            title:'',
            key:6,
            render:(text,record)=>{
                return(
                    <>
                        <Button danger>Xóa</Button>
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
export default memo(CartTable)