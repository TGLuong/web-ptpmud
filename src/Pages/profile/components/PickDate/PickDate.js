import {useState} from 'react'
import {Dropdown,Menu,Button,Row,Col} from 'antd'
import {DownOutlined} from '@ant-design/icons'
const {Item} = Menu;

const PickDate = props => {
    const [day,setDay] = useState(1)
    const [month,setMonth] = useState(1)
    const [year,setYear] = useState(new Date().getFullYear())
    const dayOverLay = () => {
        const renderItem = () =>{
            let day = [];
            if(month==2){
                let maxDay = 0
                if(year%4==0&&year%100!=0){
                    maxDay = 29
                } else maxDay = 28

                for(let i=1;i<=maxDay;i++){
                    day.push(<Item key={i}>{i}</Item>)
                }
            }else if(['1','3','5','7','8','10','12'].includes(month)){
                for(let i=1;i<=31;i++){
                    day.push(<Item key={i}>{i}</Item>)
                }
            }else{
                for(let i=1;i<=30;i++){
                    day.push(<Item key={i}>{i}</Item>)
                }
            }
            return day
        }
        return(
            <Menu onClick={({item,key,keyPath,domEven})=>{setDay(key)}}>
                {renderItem()}
            </Menu>
        );
    }
    const monthOverLay = () => {
        const monthRender = () => {
            let month = [];
            for(let i=1;i<=12;i++){
                month.push(<Item key={i}>{i}</Item>);
            }
            return(month)
        }
        return(
            <Menu 
                onClick={({item,key,keyPath,domEven})=>{
                    if(key===2&&day>29){
                        setMonth(key);
                        setDay(29);
                    }else if(key in [4,6,9,11]&&day>30){
                        setMonth(key);
                        setDay(30)
                    }else{
                        setMonth(key)
                    }
                    
                }}
            >
                {monthRender()}
            </Menu>
        )
    }
    const yearOverLay = () => {
        const yearRender = () =>{
            let year = []
            for(let i=new Date().getFullYear();i>=new Date().getFullYear()-50;i--){
                year.push(<Item key={i}>{i}</Item>)
            }
            return year
        }
        return(
            <Menu onClick={({item,key,keyPath,domEven})=>{setYear(key)}}>
                {yearRender()}
            </Menu>
        )
    }
    return(
        <>
            <Row>
                <Col sm={5}>
                    <Dropdown
                        overlay={dayOverLay} 
                        trigger={['click']} 
                        overlayStyle={{
                            border:'1px solid #CFD8DC',
                            position:'absolute',
                            maxHeight:'200px',
                            width:'100px',
                            overflowX:'hidden',
                            overflowY:'auto',
                        }}
                    >
                        <Button style={{width:'100px'}}>
                            {day}<DownOutlined style={{marginLeft:'50px'}} />
                        </Button>
                    </Dropdown>
                </Col>
                <Col md={5}>
                    <Dropdown
                        overlay={monthOverLay} 
                        trigger={['click']} 
                        overlayStyle={{
                            border:'1px solid #CFD8DC',
                            position:'absolute',
                            maxHeight:'200px',
                            width:'100px',
                            overflowX:'hidden',
                            overflowY:'auto',
                        }}
                    >
                        <Button style={{width:'100px'}}>
                            {month}<DownOutlined style={{marginLeft:'50px'}} />
                        </Button>
                    </Dropdown>
                </Col>
                <Col md={5}>
                    <Dropdown
                        overlay={yearOverLay} 
                        trigger={['click']} 
                        overlayStyle={{
                            border:'1px solid #CFD8DC',
                            position:'absolute',
                            maxHeight:'200px',
                            width:'100px',
                            overflowX:'hidden',
                            overflowY:'auto',
                        }}
                    >
                        <Button style={{width:'100px'}}>
                            {year}<DownOutlined style={{marginLeft:'30px'}} />
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
            
            
        </>
    );
}
export default PickDate
