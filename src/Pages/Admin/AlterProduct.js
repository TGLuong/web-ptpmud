import {useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {baseUrl} from '../../config'
import {
    Form,
    Input,
    Select,
    InputNumber,
    Button,
    Popconfirm,
    notification,
} from 'antd'
import {
    CheckOutlined
} from '@ant-design/icons'
import '../../Style/AlterProduct.css'

const {Item} = Form;


const AlterProduct = props => {
    const history = useHistory()
    const id = new URLSearchParams(history.location.search).get('id')
    const [product, setProduct] = useState(null)
    const [brandValue, setBrandValue] = useState(null)
    useEffect(()=>{
        axios({
            method:'GET',
            url:baseUrl+'/product/'+id
        }).then(res=>{
            setProduct(res.data.data)
            setBrandValue(res.data.data.brand_id)
        })
    },[])
    useEffect(()=>{
        if(props.isAdmin===false){
            history.push('/dashboard')
        }
    },[history.location])
    const openSucc = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#f6ffed',
                border:'1px solid #b7eb8f'
            },
            icon:<CheckOutlined  style={{color:'#52c41a'}} />
            
        })
    }
    const deleteProduct = () =>{
        axios({
            method:'DELETE',
            url:baseUrl+'/product/'+id
        }).then(res=>{
            openSucc('Xóa thành công')
            axios({
                method:'GET',
                url:baseUrl+'/home?page=1'
            }).then(res=>{
                props.setHomeData(res.data.data)
            })
            axios({
                method:'GET',
                url:baseUrl+'/product/camera'
            }).then(res=>{
                props.setCameraData(res.data.data)
            })
            axios({
                method:'GET',
                url:baseUrl+'/product/laptop'
            }).then(res=>{
                props.setLaptopData(res.data.data)
            })
            history.push('/dashboard')
        })
    }
    const saveProduct = value => {        
        axios({
            method:'PUT',
            url:baseUrl+'/product/'+id,
            data:{
                brand_id:brandValue,
                productName:value.productName,
                quantity:value.quantity,
                price:value.price,
                productSummary:value.productSummary,
                warranty:value.warranty
            }
        }).then(res=>{
            setProduct(res.data.data)
            openSucc('Lưu Thành Công')
            axios({
                method:'GET',
                url:baseUrl+'/home?page=1'
            }).then(res=>{
                props.setHomeData(res.data.data)
            })
            axios({
                method:'GET',
                url:baseUrl+'/product/camera'
            }).then(res=>{
                props.setCameraData(res.data.data)
            })
            axios({
                method:'GET',
                url:baseUrl+'/product/laptop'
            }).then(res=>{
                props.setLaptopData(res.data.data)
            })
        })
    }

    return(
        <div
            className="alter-product"
        >
            <div
                className="board"
            >
                <h1>Sửa Thông Tin Sản Phẩm</h1>
                {product?(
                    <Form
                        onFinish={saveProduct}
                        initialValues={product}
                    >
                        <Item
                            label="Hãng"
                        >
                            <Select
                                style={{width:'100%'}}
                                onSelect={(e)=>{
                                    setBrandValue(e)
                                }}
                                value={brandValue}
                            >
                                {props.homeData.laptop_brands.map(element=>{
                                    return(
                                        <Select.Option
                                            key={element.id}
                                            value={element.id}
                                        >
                                            {element.brand}
                                        </Select.Option>
                                    )
                                })}
                                {props.homeData.camera_brands.map(element=>{
                                    return(
                                        <Select.Option
                                            key={element.id}
                                            value={element.id}
                                        >
                                            {element.brand}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        </Item>
                        <Item
                            label="Giá"
                            name="price"
                        >
                            <InputNumber
                                style={{
                                    width:"100%"
                                }}
                                // defaultValue={product.price} 

                            />
                        </Item>
                        <Item
                            label="Tên Sản Phẩm"
                            name="productName"
                        >
                            <Input 
                                
                                // defaultValue={product.productName}
                            />
                        </Item>
                        <Item
                            label="Mô Tả Sản Phẩm"
                            name="productSummary"
                        >
                            <Input.TextArea
                                rows={7}
                                
                                // defaultValue={product.productSummary}
                            />
                        </Item>
                        <Item
                            label="Số Lượng"
                            name="quantity"
                        >
                            <InputNumber 
                                style={{
                                    width:"100%"
                                }}
                                // defaultValue={product.quantity} 
                                
                            />
                        </Item>
                        <Item
                            label="Bảo Hành"
                            name="warranty"
                        >
                            <Input 
                                // defaultValue={product.warranty} 
                                
                            />
                        </Item>
                        <Item
                            label=" "
                        >
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </Item>
                        <Item
                            label=" "
                        >
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa sản phẩm không?"
                                onConfirm={deleteProduct}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <Button
                                    danger
                                    type="primary"
                                >
                                    Xóa Sản Phẩm
                                </Button>
                            </Popconfirm>,
                        </Item>
                    </Form>
                ):null}
            </div>
        </div>
    )
}
export default AlterProduct