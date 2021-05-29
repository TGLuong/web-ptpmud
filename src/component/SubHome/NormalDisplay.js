import {Row, Col} from 'antd'
import {Link} from 'react-router-dom'




function NormalDisplay(props) {

    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
        else return(string);
    }
    return(
        <Row className="product-area">
            {props.products.data.map((element,index)=>{
                return(
                    <div key={index} className="product-cell">
                        <Link className="link" >
                            <Row justify="center" style={{height:'65%'}}>
                                <img src={element.images[0]} alt="product" />
                            </Row>
                            <Row style={{height:'19%'}}>
                                <p style={{color:'black',fontSize:'15px',textAlign:'center'}}>{convertLongString(element.productName)}</p>
                            </Row>
                                
                            <Row style={{height:'16%',backgroundColor:'#95A5A6'}}>
                                <Col xs={16}>
                                    <h3 style={{color:'#C0392B',marginLeft:'5px',height:'100%',display:'flex',alignItems:'center'}}>{element.price}</h3>
                                </Col>
                                <Col  xs={8}>
                                    <Row justify="space-between" align="middle">
                                        <img style={{width:'37px',height:'37px'}} src='./img/core-img/shopping-cart.png' />
                                        <img style={{width:'37px',height:'37px'}} src='./img/core-img/love.png' />
                                    </Row>
                                </Col>
                            </Row>
                        </Link>
                    </div>    
                );
            })}
        </Row>
    );
}
export default NormalDisplay;