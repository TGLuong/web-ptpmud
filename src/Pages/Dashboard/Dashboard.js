import { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu } from 'antd'
import {useHistory} from 'react-router-dom'
import { Route, Link, Switch } from 'react-router-dom'


import InLoginHeader from '../../component/header/InLoginHeader'
import DashboardDisplay from './DashboardDisplay'
import DashboardProductDisplay from './DashboardProductDisplay'
import DashboardProduct from '../Product/DashboardProduct'
import Profile from '../profile/Profile'

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
    const [userCart,setUserCart] = useState([
        {
            amount: 0,
            id: 0,
            product: {
                image:'',
                name:'',
                price:0.0,
            },
            product_id: 0,
            total_price: 0,
            user_id: 0
        },
    ])
    const [userFavorites,setUserFavorites] = useState([
        {
            id: 0,
            product: '',
            product_id: 0,
            user_id: 0
        }
    ])
    const [userData,setUserData] = useState({
        id: 0,
        is_admin: false,
        username: ''
    })
    const history = useHistory()

    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem('userdata'))
        if(data===null){
            history.push('/')
        }else{
            axios({
                method:'post',
                url:'http://47.254.253.64:5000/user/signin',
                data:{
                    ...data
                }
            }).then(res=>{
                const data = res.data.data
                setUserCart(data.carts)
                setUserFavorites(data.favorites)
                setUserData({
                    is_admin:data.is_admin,
                    id:data.id,
                    username:data.username
                })
            })
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

    const isInCart=(id)=>{
        let check = false;
        userCart.forEach(element=>{
            if(element.product_id===id)
            {
                check=true;
            }
        })
        if(check)return true;
        else return check;
    }

    const addToCart=(element)=>{
        if(!isInCart(element.id)){
            axios({
                method:'POST',
                url:'http://47.254.253.64:5000/user/cart/'+userData.id+'/'+element.id,
                data:{
                    amount:1
                }
            }).then(res=>{
                setUserCart(res.data.carts)
                alert('Đã thêm vào giỏ hàng')
            })
        }else{
            alert('Sản phẩm đã có trong giỏ hàng, vào trong giỏ hàng để tùy chỉnh số lượng')
        }
    }

    const isInFavorites=(id)=>{
        let check = false
        userFavorites.forEach(element=>{
            if(element.product_id===id)
            {
                check=true;
            }
        })
        if(check)return true
        else return check
    }

    const addToFavorites=(element)=>{
        console.log(element)
        console.log(userFavorites)
        if(!isInFavorites(element.id)){
            axios({
                method:'POST',
                url:'http://47.254.253.64:5000/user/favorite/'+userData.id+'/'+element.id
            }).then(res=>{
                setUserFavorites(res.data)
                alert('Đã thêm sản phẩm vào mục yêu thích')
            })
        }else{
            alert('Sản phẩm đã có trong mục yêu thích')
        }
    }


    
    function load_page(page,pageSize){
        const res = axios.get('http://47.254.253.64:5000/home?page='+page)
        res.then((res)=>{
            setData(res.data.data)
        })
    }

    function renderMenu(data) {
        function item(element) {            
            if(element.is_laptop===true){
                return(<Link to={"/dashboard/laptop?brand="+element.id} >{element.brand}</Link>);
            }else{
                return(<Link to={"/dashboard/camera?brand="+element.id} >{element.brand}</Link>);
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
        history.push('/dashboard')
        const keyword = document.getElementById('search-input').value;
        const res = axios.get('http://47.254.253.64:5000/home?search='+keyword)
        res.then((res)=>{
            setData(res.data.data)
        })
    }

    function searchEnter(e) {
        if(e.key==='Enter'){
            history.push('/dashboard')
            const keyword = document.getElementById('search-input').value;
            const res = axios.get('http://47.254.253.64:5000/home?search='+keyword)
            res.then((res)=>{
                setData(res.data.data)
            })
        }
    }

    return(
        <>
            <InLoginHeader 
                searchEnter={searchEnter} 
                search={search} 
                load_page={load_page} 
                renderMenu={renderMenu} 
                data={data}
                userData={userData}
                cart={userCart}
                favorites={userFavorites}
                totalCart={userCart.length}
                totalFavirite={userFavorites.length}
            />
            <Switch>
                <Route path="/dashboard/profile">
                    <Profile/>
                </Route>
                <Route path="/dashboard/laptop">
                    <DashboardProductDisplay 
                        productData={laptopData}
                        userID={userData.id}
                    />
                </Route>
                <Route path="/dashboard/camera">
                    <DashboardProductDisplay 
                        productData={cameraData}
                        userID={userData.id}
                    />
                </Route>
                <Route path="/dashboard/product-detail">
                    <DashboardProduct/>
                </Route>
                <Route path='/dashboard'>
                    <DashboardDisplay 
                        load_page={load_page} 
                        products={data.products}
                        userID={userData.id}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                    />
                </Route> 
            </Switch>
        </>
    );
}
export default Dashboard