import {Row, Col} from 'antd'
import {Fragment} from 'react'
import {Link,useLocation} from 'react-router-dom'
import './ProductDisplay.css'



function LaptopRender(props) {
    const search = useLocation().search;
    const brand = new URLSearchParams(search).get('brand');
    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
        else return(string);
    }

    function toBrand () {
        if(document.getElementById(brand)!==null){
            document.getElementById(brand).scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
        }
    }

    return(
        <Fragment>
            {toBrand()}
            <div className="product-display" onLoad={toBrand}>
                {props.productData.data.map((element,index)=>{
                    return(
                        <div id={element.id} key={index} className="product-brand">
                            <div className="brand">
                                {element.brand}
                            </div>
                            <div className="wrapper">
                                {element.products.map((element,index)=>{
                                    return(
                                        <div key={index} className="item">
                                            <Link to={'/product-detail?id='+element.id}>
                                                <Row justify="center" style={{height:'65%'}}>
                                                    <img src={element.images[0]} alt="product" />
                                                </Row>
                                                <Row style={{height:'19%'}} justify="center">
                                                    <div className="name">
                                                        {convertLongString(element.productName)}
                                                    </div>
                                                </Row>
                                                <Row style={{height:'16%',backgroundColor:'#95A5A6'}}>
                                                    <Col xs={16}>
                                                        <h3 style={{color:'#C0392B',marginLeft:'5px',height:'100%',display:'flex',alignItems:'center'}}>{element.price}</h3>
                                                    </Col>
                                                    <Col  xs={8}>
                                                        <Row justify="space-between" align="middle">
                                                            <Link to="/sign-in"><img style={{width:'37px',height:'37px'}} src='./img/core-img/shopping-cart.png' alt="cart" /></Link>
                                                            <Link to="/sign-in"><img style={{width:'37px',height:'37px'}} src='./img/core-img/love.png' alt="love" /></Link>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Link>
                                        </div>
                                    );
                                })}
                                    
                            </div>    
                        </div>   
                    );
                })}
            </div>
        </Fragment>
    );
}
export default LaptopRender