import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import { Menu } from 'antd'
import { Route, Link, Switch} from 'react-router-dom'
import Signin from './signinPopup/Signin'
import Product from './Product'
import HomeDisplay from './SubHome/HomeDisplay'
import Header from './header/Header'
import ProductRender from './SubHome/ProductRender'

import logo from '../img/core-img/logo.png'








function Home(){
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

    useEffect(()=>{
        const page = data.products.paging.current_page;
        const res = axios.get('http://47.254.253.64:5000/home?page='+page)
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

    function onPopup() {
        document.getElementById('popup').style.display="block"
    }
    function offPopup() {
        document.getElementById('popup').style.display="none"
    }
    function searchEnter(e) {
        console.log(e.key)
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
        <Fragment>
            <Signin offPopup={offPopup}/>
            <Header logo={logo} searchEnter={searchEnter} search={search} load_page={load_page} onPopup={onPopup} renderMenu={renderMenu} data={data} />
            <Switch>
                <Route path="/laptop"><ProductRender productData={laptopData}/></Route>
                <Route path="/camera"><ProductRender productData={cameraData}/></Route>
                <Route path="/product-detail"><Product/></Route>
                <Route path='/'>
                    <HomeDisplay load_page={load_page} products={data.products}/>
                </Route>
            </Switch>

        </Fragment>
    );
}
export default Home