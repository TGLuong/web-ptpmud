import {Row, Col} from 'antd'
import {Link,useLocation} from 'react-router-dom'
import '../../Style/ProductDisplay.css'
import {DashboardCellButton} from '../../component/Button'
import shoppingCart from '../../img/core-img/shopping-cart.png'
import love from '../../img/core-img/love.png'
import { useEffect } from 'react'





function DashboardProductDisplay(props) {
    const search = useLocation().search;
    const brand = new URLSearchParams(search).get('brand');

    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
        else return(string);
    }

    function toBrand () {
        if(document.getElementById(brand)!==null){
            document.getElementById(brand).scrollIntoView({
                behavior:'smooth',
                block:'center',
                inline:'nearest'
            });
        }
    }
    useEffect(()=>{
        toBrand()
    },[brand])
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
            <div className="product-display" onLoad={toBrand}>
                {props.productData.data.map((element,index)=>{
                    return(
                        <div 
                            id={element.id} 
                            key={index} 
                            className="product-brand"
                        >
                            <div className="brand">
                                {element.brand}
                            </div>
                            <div className="wrapper">
                                {element.products.map((element,index)=>{
                                    return(
                                        <div 
                                            key={index} 
                                            className="item"
                                        >
                                            <Link to={'/dashboard/product-detail?id='+element.id}>
                                                <Row justify="center" style={{height:'65%'}}>
                                                    <img 
                                                        src={element.images[0]} 
                                                        alt="product" 
                                                    />
                                                </Row>
                                                <Row style={{height:'19%'}} justify="center">
                                                    <div className="name">
                                                        {convertLongString(element.productName)}
                                                    </div>
                                                </Row>
                                            </Link>
                                            <Row 
                                                style={{
                                                    height:'16%',
                                                    backgroundColor:'#95A5A6',
                                                    borderRadius:'0px 0px 10px 10px'
                                                }}>
                                                <Col xs={16}>
                                                    <h3 
                                                        style={{
                                                            color:'#C0392B',
                                                            marginLeft:'5px',
                                                            height:'100%',
                                                            display:'flex',
                                                            alignItems:'center'
                                                        }}
                                                    >
                                                        {numberFormat(element.price)}
                                                    </h3>
                                                </Col>
                                                <Col xs={8}>
                                                    <Row justify="space-between" align="middle">
                                                        <DashboardCellButton 
                                                            onClick={()=>{props.addToCart(element)}}
                                                        >
                                                            <img 
                                                                style={{
                                                                    width:'37px',
                                                                    height:'37px'
                                                                }} 
                                                                src={shoppingCart}
                                                                alt="cart" 
                                                            />
                                                        </DashboardCellButton>
                                                        <DashboardCellButton 
                                                            onClick={()=>{props.addToFavorites(element)}}
                                                        >
                                                            <img 
                                                                style={{
                                                                    width:'37px',
                                                                    height:'37px'
                                                                }} 
                                                                src={love}
                                                                alt="love" 
                                                            />
                                                        </DashboardCellButton>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })}
                            </div>    
                        </div>   
                    );
                })}
            </div>
            <div style={{height:'50px'}}>

            </div>
        </>
    );
}
export default DashboardProductDisplay