import {Row, Col, Pagination } from 'antd'
import {Link} from 'react-router-dom'
import '../../Style/HomeDisplay.css'
import {DashboardCellButton,AlterButton} from '../../component/Button'
import shoppingCart from '../../img/core-img/shopping-cart.png'
import love from '../../img/core-img/love.png'
import { useHistory } from 'react-router-dom'






function DashboardDisplay(props) {
    const history = useHistory()
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
                                    to={"/dashboard/product-detail?id="+element.id}
                                >
                                    <Row 
                                        justify="center" 
                                        style={{
                                            height:'65%',
                                            width:'100%'
                                        }}
                                    >
                                        <img 
                                            src={element.images[0]} 
                                            alt="product" 
                                        />
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
                                <Row style={{height:'16%',backgroundColor:'#95A5A6',borderRadius:'0px 0px 10px 10px'}}>
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
                                        <Row 
                                            justify="space-between" 
                                            style={{
                                                height:'100%',
                                            }} 
                                            align="middle"
                                        >
                                            {props.isAdmin?(
                                                <AlterButton
                                                    onClick={()=>{
                                                        history.push('/dashboard/alter?id='+element.id)
                                                    }}
                                                >
                                                    Sửa
                                                </AlterButton>
                                            ):
                                                <>
                                                    <DashboardCellButton
                                                        onClick={()=>{props.addToCart(element)}}
                                                    >
                                                        <img 
                                                            style={{width:'37px',height:'37px'}} 
                                                            src={shoppingCart} 
                                                            alt="cart"
                                                        />
                                                    </DashboardCellButton>
                                                    <DashboardCellButton onClick={()=>{props.addToFavorites(element)}}>
                                                        <img 
                                                            style={{width:'37px',borderRadius:'0px 10px 10px 0px',height:'37px'}} 
                                                            src={love}
                                                            alt="love" 
                                                        />
                                                    </DashboardCellButton>
                                                </>
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                    );
                })}
            </Row>
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
export default DashboardDisplay;