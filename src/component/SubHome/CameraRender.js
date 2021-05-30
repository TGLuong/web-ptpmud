import {Row, Col} from 'antd'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ProductDisplay.css'



function CameraRender(params) {
    const [data,setData] = useState({
        data:[
            {
                brand:'',
                id:0,
                products:[
                    {
                        brand:'',
                        brand_id:0,
                        id:0,
                        images:[
                            '',
                        ],
                        price:0.0,
                        productName:'',
                        productSummary:'',
                        quantity:'',
                        warranty:''
                    },
                ]
            },
        ]
    });
    useEffect(()=>{
        const res = axios.get('http://47.254.253.64:5000/product/camera')
        res.then((res)=>{
            setData(res.data)
            
        })
    },[])
    function convertLongString(string){
        if(string.length>58) return(string.slice(0,58)+'...');
        else return(string);
    }

    return(
        <div className="product-display">
            <div className="product-brand">
                <div className="brand">

                </div>
                <div className="content">
                    <div className="cell">
                        
                        <div style={{width:'100%',height:'20%',border:'1px solid black'}}>
                        sa     
                        </div>
                        <div style={{width:'100%',height:'15%',border:'1px solid black'}}>

                        </div>
                    </div>
                    <div className="cell">

                    </div>
                    <div className="cell">

                    </div>
                    <div className="cell">

                    </div>
                    <div className="cell">

                    </div>
                    <div className="cell">

                    </div>
                    <div className="cell">

                    </div>
                    <div className="cell">

                    </div>
                    <div className="cell">

                    </div>
                </div>
            </div>   
            <div className="product-brand">
             
            </div>  
           
        
        </div>
    );
}
export default CameraRender