import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {Row, Col, Image, InputNumber,Button} from 'antd'
import '../../Style/Header.css'
import { baseUrl } from '../../config'



const FavoriteRow = props =>{
    const history = useHistory()
    const [removeDisable,setRemoveDisable] = useState(false)
    const convertLongString=(string)=>{
        if(string.length>40) return(string.slice(0,40)+'...');
        else return(string);
    }
    const toProduct=(id)=>{
        history.push('/dashboard/product-detail?id='+id)
    }
    const removeFavorite=()=>{
        setRemoveDisable(true)
        axios({
            method:'DELETE',
            url:baseUrl+'/user/favorite/'+props.userID+'/'+props.element.product_id
        }).then(res=>{
            sessionStorage.setItem('favorites',JSON.stringify(res.data))
            props.setFavoriteData(res.data)
            setRemoveDisable(false)
        })
    }
    return(
        <>
        <Row
            className="popup-content-row"
        >
            <Col md={4} style={{height:'70px'}}>
                <Image 
                    style={{height:'70px'}}
                    alt="img"
                    src={props.element.product.image}
                />
            </Col>

            <Col md={20} style={{paddingLeft:'10px'}}>
                <Row>
                    <button
                        className="name-button"
                        onClick={()=>{toProduct(props.element.product_id)}}
                    >
                        {convertLongString(props.element.product.name)}
                    </button>
                </Row>
                <Row>
                    <Button
                        className="deleteTransition"
                        disabled={removeDisable}
                        onClick={removeFavorite}
                        danger
                    >
                        Xóa
                    </Button>
                </Row>
            </Col>
        </Row>
        </>
    );
}
export default FavoriteRow