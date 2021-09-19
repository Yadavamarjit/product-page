import React from 'react'
import { useEffect,useState } from 'react'
import './Product.css'
import {Card,Image,Row,Col} from "react-bootstrap"


function Product() {

    const [search,setSearch]=useState("")
    const [click,setClick]=useState(0)
    const [product,setProduct]=useState([])

    // clicks function will be fired when any card is clicked

    function clicks(){
        setClick(click+1)
    }

    useEffect(()=>{
        getData()
    },[])

    // getData function is responsible for fetchin data and storing data in product state

    async function getData(){
        let fetchData = await fetch(`http://localhost:3000/products`)
        let fetchedData = await fetchData.json()
        setProduct(fetchedData.Items)
    }


    return (
        <>
        {/* input bar to search product image with there respective names */}

        <input className="search-box" placeholder="Search..." type="text" onChange={event=>setSearch(event.target.value)} />

        {/* clicks components displays total clicks */}

        <span className="clicks">{click+" clicks"}</span>
        <Row className="card-container">
            {
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
                        <div mt="2" className="card" onClick={clicks}  key={item.id}>
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
