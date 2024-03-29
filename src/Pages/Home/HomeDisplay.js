import {Row, Col, Pagination } from 'antd'
import {Link} from 'react-router-dom'
import '../../Style/HomeDisplay.css'
import {SigninBtn} from '../../component/Button'








function HomeDisplay(props) {

    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
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
    return(
        <>
            <Row className="product-area">
                {props.products.data.map((element,index)=>{
                    return(
                            <div 
                                key={index} 
                                className="product-cell"
                            >
                                <Link 
                                    className="link" 
                                    to={"/product-detail?id="+element.id}
                                >
                                    <Row justify="center" style={{height:'65%',width:'100%'}}>
                                        <img src={element.images[0]} alt="product" />
                                    </Row>
                                    <Row style={{height:'19%'}}>
                                        <p 
                                            style={{
                                                color:'black',
                                                fontSize:'15px',
                                                textAlign:'center'
                                            }}
                                        >
                                            {convertLongString(element.productName)}
                                        </p>
                                    </Row>
                                </Link>
                                <Row style={{height:'16%',borderRadius:'0px 0px 10px 10px',backgroundColor:'#95A5A6'}}>
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
                                    <Col  xs={8}>
                                        <Row justify="space-between" align="middle">
                                            <SigninBtn onClick={props.onSignInPopup}>
                                                <img 
                                                    style={{width:'37px',height:'37px'}} 
                                                    src='./img/core-img/shopping-cart.png' 
                                                    alt="cart"
                                                />
                                            </SigninBtn>
                                            <SigninBtn onClick={props.onSignInPopup}>
                                                <img 
                                                    style={{width:'37px',height:'37px'}} 
                                                    src='./img/core-img/love.png' 
                                                    alt="love" 
                                                />
                                            </SigninBtn>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                    );
                })}
            </Row>
            <div style={{height:'10px'}}></div>
            <div className="panigation">
                <Pagination
                    current={props.products.paging.current_page}
                    defaultCurrent={1} 
                    showSizeChanger={false}
                    pageSize={20}
                    total={props.products.paging.total_count}
                    onChange={props.load_page}
                />
            </div>
        </>
    );
}
export default HomeDisplay;