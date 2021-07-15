import {
    useEffect,
    useState
} from 'react'
import {
    useHistory
} from 'react-router-dom'
import { baseUrl } from '../../config'
import axios from 'axios'
import {
    notification,
    Select
} from 'antd'
import {
    CheckOutlined
} from '@ant-design/icons'
import '../../Style/Upload.css'
import {
    SyncLoader
} from 'react-spinners'
import { jsxAttribute } from '@babel/types'
import { select } from 'async'


const Upload = props => {
    const history = useHistory()
    const [selectValue, setSelectValue] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if(props.isAdmin===false){
            history.push('/dashboard')
        }
    },[])
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
    const submit=()=>{
        setLoading(true)
        var formData = new FormData();
        var productName = document.querySelector("#productName")
        var quantity = document.querySelector("#quantity")
        var price = document.querySelector("#price")
        var productSummary = document.querySelector("#productSummary")
        var warranty = document.querySelector("#warranty")
        var img_1 = document.querySelector('#img_1');
        var img_2 = document.querySelector('#img_2')

        if(selectValue===null){
            alert('vui lòng chọn hãng')
            setLoading(false)
        }else
        if(productName.value.length===0){
            alert('vui lòng nhập tên sản phẩm')
            setLoading(false)
        }else
        if(quantity.value.length===0){
            alert('vui lòng nhập số lượng')
            setLoading(false)
        }else
        if(price.value.length===0){
            alert('vui lòng nhập giá')
            setLoading(false)
        }else
        if(productSummary.value.length===0){
            alert('vui lòng nhập mô tả sản phẩm')
            setLoading(false)
        }else
        if(warranty.value.length===0){
            alert('vui lòng nhập bảo hành')
            setLoading(false)
        }else
        if(img_1.files[0]===undefined||img_2.files[0]===undefined){
            alert('vui lòng chọn ảnh')
            setLoading(false)
        }else{
            formData.append("brand_id", selectValue)
            formData.append("productName", productName.value)
            formData.append("quantity", parseInt(quantity.value))
            formData.append("price", parseFloat(price.value))
            formData.append("productSummary", productSummary.value)
            formData.append("warranty", warranty.value)
            formData.append("img_1", img_1.files[0]);
            formData.append("img_2",img_2.files[0])
            axios.post(baseUrl+'/product', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(res=>{
                openSucc('thêm ảnh thành công')
                setLoading(false)
                history.push('/dashboard/product-detail?id='+res.data.product_id)
            })
        }

        
    }
    return(
        <div className="upload">
            <div className="upload-wrap">
                <h1>Thêm sản phẩm</h1>
                <table>
                    <tr>
                        <td className="upload-table-label"><label>Hãng</label></td>
                        <td>
                            <Select
                                style={{width:'100%'}}
                                onSelect={(e)=>{
                                    setSelectValue(e)
                                }}
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
                        </td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"><label>Tên sản phẩm</label></td>
                        <td><input className="input" name="productName" id="productName" type="text" /></td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"><label>số lượng</label></td>
                        <td><input className="input" name="quantity" id="quantity" type="text" /></td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"><label>giá</label></td>
                        <td><input className="input" name="price" id="price" type="text" /></td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"><label>mô tả</label></td>
                        <td><input className="input" name="productSummary" id="productSummary" type="text" /></td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"><label>bảo hành</label></td>
                        <td><input className="input" name="warranty" id="warranty" type="text" /></td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"><label>ảnh</label></td>
                        <td><input  name="img_1" id="img_1" type="file" /></td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"><label>ảnh</label></td>
                        <td><input name="img_2" id="img_2" type="file" /></td>
                    </tr>
                    <tr>
                        <td className="upload-table-label"></td>
                        <td>
                            <button onClick={submit} disabled={loading} className={`submit ${loading?'disable':''}`}>Thêm sản phẩm</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td
                            style={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                height:'60px',
                            }}
                        >
                            <SyncLoader
                                color={'#03A9F4'}
                                width={"100%"}
                                loading={loading}
                                size={15}
                            />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default Upload