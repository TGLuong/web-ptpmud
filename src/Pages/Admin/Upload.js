import {
    useEffect
} from 'react'
import {
    useHistory
} from 'react-router-dom'
import { baseUrl } from '../../config'
import axios from 'axios'
import {
    notification
} from 'antd'
import {
    CheckOutlined
} from '@ant-design/icons'


const Upload = props => {
    const history = useHistory()
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
    return(
        <div style={{paddingTop:'10%'}}>
            <form
                onSubmit={(e)=>{
                    console.log('alo')
                    e.preventDefault()
                    var formData = new FormData();
                    var brand_id = document.querySelector("#brand_id")
                    var productName = document.querySelector("#productName")
                    console.log(productName)
                    var quantity = document.querySelector("#quantity")
                    var price = document.querySelector("#price")
                    var productSummary = document.querySelector("#productSummary")
                    var warranty = document.querySelector("#warranty")
                    var img_1 = document.querySelector('#img_1');
                    var img_2 = document.querySelector('#img_2')

                    formData.append("brand_id", brand_id.value)
                    formData.append("productName", productName.value)
                    formData.append("quantity", quantity.value)
                    formData.append("price", price.value)
                    formData.append("productSummary", productSummary.value)
                    formData.append("warranty", warranty.value)
                    formData.append("img_1", img_1.files[0]);
                    formData.append("img_2",img_2.files[0])
                    console.log('formdata: ',formData.keys())
                    axios.post(baseUrl+'/product', formData, {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    }).then(res=>{
                        openSucc('thêm ảnh thành công')
                    })
                }}
            >
                <table>
                    <tr>
                        <td><input name="brand_id" id="brand_id" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="productName" id="productName" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="quantity" id="quantity" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="price" id="price" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="productSummary" id="productSummary" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="warranty" id="warranty" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="img_1" id="img_1" type="file" /></td>
                    </tr>
                    <tr>
                        <td><input name="img_2" id="img_2" type="file" /></td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="submit"/></td>
                    </tr>
                </table>
            </form>
        </div>
    )
}
export default Upload