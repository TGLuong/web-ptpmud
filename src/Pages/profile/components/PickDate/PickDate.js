import {useState} from 'react'
import {Dropdown,Menu,Button} from 'antd'

const {Item} = Menu;

const PickDate = props => {
    const [day,setDay] = useState(1)
    const [month,setMonth] = useState(1)
    const [year,setYear] = useState(new Date().getFullYear())
    const dayOverLay = () => {
        const renderItem = () =>{
            let day = [];
            if(month==2){
                for(let i=1;i<=29;i++){
                    day.push(<Item key={i}>{i}</Item>)
                }
            }else if(month in [1,3,5,7,8,10,12]){
                for(let i=1;i<=31;i++){
                    day.push(<Item key={i}>{i}</Item>)
                }
            }else{
                for(let i=1;i<=30;i++){
                    day.push(<Item key={i}>{i}</Item>)
                }
            }
            console.log(day)
            return day
        }
        return(
            <Menu onClick={({item,key,keyPath,domEven})=>{setDay(key)}}>
                {renderItem()}
            </Menu>
        );
    }
    return(
        <>
            <Dropdown overlay={dayOverLay} trigger={['click']}><h3>{day}</h3></Dropdown>
        </>
    );
}
export default PickDate