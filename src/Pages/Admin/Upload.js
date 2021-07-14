import {
    useEffect
} from 'react'
import {
    useHistory
} from 'react-router-dom'
import { baseUrl } from '../../config'


const Upload = props => {
    const history = useHistory()
    useEffect(()=>{
        if(props.isAdmin===false){
            history.push('/dashboard')
        }
    },[])
    return(
        <div style={{paddingTop:'10%'}}>
            <form
                action={baseUrl+'/product'}
                enctype="multipart/form-data"
                method="post"
                target="_self"
            >
                <table>
                    <tr>
                        <td><input name="brand_id" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="productName" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="quantity" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="price" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="productSummary" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="warranty" type="text" /></td>
                    </tr>
                    <tr>
                        <td><input name="img_1" type="file" /></td>
                    </tr>
                    <tr>
                        <td><input name="img_2" type="file" /></td>
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