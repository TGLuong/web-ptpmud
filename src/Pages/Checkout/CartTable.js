import {
    memo
} from 'react'
import {
    Table,
    Image,
} from 'antd'
import DeleteButton from './components/DeleteButton'
import AmountInput from './components/AmountInput'
import axios from 'axios'
import {baseUrl} from '../../config'

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
    const removeProduct=(product_id,isLoading)=>{
        axios({
            method:'DELETE',
            url:baseUrl+'/user/cart/'+props.userID+'/'+product_id
        }).then(res=>{
            isLoading(false)
            sessionStorage.setItem('carts',JSON.stringify(res.data.carts))
            props.setCartData(res.data.carts)
        })
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
                    <AmountInput
                        setCartData={props.setCartData}
                        product={record}
                        userID={props.userID}
                    />
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
                        <DeleteButton
                            text="Xóa"
                            onClick={(isLoading)=>{removeProduct(record.product_id,isLoading)}}
                        />
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
            <h1>Giỏ Hàng</h1>
            <Table
                dataSource={props.data}
                columns={columns}
                pagination={false}
                scroll={{y:350}}
            />
        </div>
    )
}
export default memo(CartTable)