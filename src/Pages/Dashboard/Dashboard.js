import { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu } from 'antd'
import {useHistory} from 'react-router-dom'
import { Route, Link, Switch } from 'react-router-dom'


import InLoginHeader from '../../component/header/InLoginHeader'


function Dashboard(props){
    const [data,setData] = useState({
        camera_brands:[],
        laptop_brands:[],
        products:{
            data:[
                {
                    brand:'',
                    brand_id:0,
                    id:0,
                    images:[''],
                    price:0.0,
                    productName:'',
                    productSummary:'',
                    quantity:0,
                    warranty:'',
                },
            ],
            paging:{
                current_page:1,
                records_in_page:0,
                total_count:0,
                total_page:0,
            }
        }
    });

    const [laptopData,setLaptopData] = useState({
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

    const [cameraData,setCameraData] = useState({
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
    const [userData,setUserData] = useState({
        carts:[
            {
                amount: 0,
                id: 0,
                product: '',
                product_id: 0,
                total_price: 0,
                user_id: 0
            },
        ],
        favorites:[
            {
                id: 0,
                product: '',
                product_id: 0,
                user_id: 0
            }
        ],
        id: 0,
        is_admin: true,
        username: ''
    })
    const history = useHistory()

    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem('userdata'))
        if(data===null){
            history.push('/')
        }else{
            setUserData(data)
            const res = axios.get('http://47.254.253.64:5000/home?page='+1)
            res.then((res)=>{
                setData(res.data.data)
            });
            const laptopres = axios.get('http://47.254.253.64:5000/product/laptop')
            laptopres.then((res)=>{
                setLaptopData(res.data)
            })
            const camerares = axios.get('http://47.254.253.64:5000/product/camera')
            camerares.then((res)=>{
                setCameraData(res.data)
            })
        }
    },[]);

    function load_page(page,pageSize){
        const res = axios.get('http://47.254.253.64:5000/home?page='+page)
        res.then((res)=>{
            console.log(res.data)
            setData(res.data.data)
        })
    }

    function renderMenu(data) {
        function item(element) {            
            if(element.is_laptop===true){
                return(<Link to={"/laptop?brand="+element.id} >{element.brand}</Link>);
            }else{
                return(<Link to={"/camera?brand="+element.id} >{element.brand}</Link>);
            }
        }
        return(
            <Menu>
                {data.map((element,index)=>{
                    return(
                        <Menu.Item key={index}>
                            {item(element)}
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }

    function search() {
        const keyword = document.getElementById('search-input').value;
        const res = axios.get('http://47.254.253.64:5000/home?search='+keyword)
        res.then((res)=>{
            console.log(res.data)
            setData(res.data.data)
        })
    }

    function searchEnter(e) {
        if(e.key==='Enter'){
            const keyword = document.getElementById('search-input').value;
            const res = axios.get('http://47.254.253.64:5000/home?search='+keyword)
            res.then((res)=>{
                console.log(res.data)
                setData(res.data.data)
            })
        }
    }

    return(
        <>
            <InLoginHeader 
                searchEnter={searchEnter} 
                search={search} load_page={load_page} 
                renderMenu={renderMenu} 
                data={data}
                userData={userData}
            />
            <Switch>
                
            </Switch>
        </>
    );
}
export default Dashboard