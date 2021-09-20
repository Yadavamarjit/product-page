import React from 'react'
import { useEffect,useState } from 'react'
import './Product.css'
import {Card,Image,Row,Col,Spinner} from "react-bootstrap"


function Product() {


    const [search,setSearch]=useState("")
    const [click,setClick]=useState(0)
    const [product,setProduct]=useState([])

    useEffect(()=>{
        getData()
        getClicks()
    },[])

    // getData function will fetch data and store data in product state
    async function getData(){
        let fetchData = await fetch(`https://practise-heroku.herokuapp.com/products`)
        let fetchedData = await fetchData.json()
        setProduct(fetchedData.Items)
    }

    // getClicks will fetch clicks
    async function getClicks(){
        let fetchData = await fetch(`https://practise-heroku.herokuapp.com/click`)
        let fetchedData = await fetchData.json()
        console.log(fetchedData.total_clicks)
        setClick(fetchedData.total_clicks)
    }
    // getClicks()

    // addClick will update clicks data
    async function addClick(){
        setClick(click+1)
        const requestBody = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: "0",
                clicked:1
            })
        }
        const response = await fetch(`https://practise-heroku.herokuapp.com/products`,requestBody)
        const data = await response.json()
        console.log(data)
    }

    return (
        <>
        {/* clicks nad searchbar container */}
        <Row >
            <Col sm="12">
                <input className="search-box" placeholder="Search..." type="text" onChange={event=>setSearch(event.target.value)} />
            </Col>
            <Col sm="12">
                <span className="clicks">{click+" clicks"}</span>
            </Col>
        </Row>

            {/* card container */}
            <Row className="card-container">
            {
                // product.filter filters the product card as per user input text
                product.filter(val=>{

                    if(val==="")
                    {
                        return val
                    }
                    else if(val.title.toLowerCase().includes(search.toLowerCase())){
                        return val
                    }
                    
                }).map(item=>
                    <Col  className="card-container" xs="6" md="4" lg="3">
                        <div onClick={addClick} mt="2" className="card"  key={item.id}>
                            <Image style={{height:'400px'}} fluid src={item.image} alt="" />
                            <h5 className="title">{item.title}</h5>
                            <Card.Text className="text">{item.description}</Card.Text>
                        </div>
                    </Col>
                )
            }
            </Row>
        
        </>
    )
}

export default Product
