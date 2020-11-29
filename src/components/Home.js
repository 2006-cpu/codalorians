import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import {getAllProducts} from '../api'

import {Prod} from './index'

const HomePage = (props) => {
    const {setFetchId} = props
    const [productRender, setProductRender] = useState([])
    const [selectedId, setSelectedId] = useState('')

    useEffect(() => {
        async function fetchProducts(){
          try{
        const data = await getAllProducts()
        console.log('data array ', data)
        setProductRender(data)
        setFetchId(selectedId)
          }catch(error){
            console.log(error)
          }
        }
    fetchProducts()
      },[selectedId]);
      console.log('set render ',productRender)

    return <div>
        <div>
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://store-images.s-microsoft.com/image/apps.3780.14600436456605939.002f21b5-1ec5-42de-bb50-ad2d62814822.0e7d2807-7ad8-43bd-9039-112149dc5529"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3 style={{textShadow: '1px 1px 2px #000'}}>Browse Our Guitar Collection</h3>
      <p style={{textShadow: '1px 1px 2px #000'}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.pinimg.com/originals/de/65/00/de6500daee98e24fcf5c22c9cf15c03e.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3 style={{textShadow: '1px 1px 2px #000'}}>Browse Our Piano Collection</h3>
      <p style={{textShadow: '1px 1px 2px #000'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.wallpaperscraft.com/image/microphone_metal_device_149328_1920x1080.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3 style={{textShadow: '1px 1px 2px #000'}}>Browse Our Microphone Collection</h3>
      <p style={{textShadow: '1px 1px 2px #000'}}>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>
<div style={{paddingTop: '1rem', borderTop: '1px solid black', float:'bottom'}}><div>
     Popular Items
 </div>
 <div style={{ backgroundColor: 'lightgray', borderTop: '1px solid black',
 display: 'flex', flexDirection: 'row', flexShrink: '0', overflow: 'scroll', width: '100%', height: '100%'}}>
{productRender.map((product) => {
    return <div style={{width: '18rem', margin: '1rem'}}>
        <Prod key={product.id} product={product} setSelectedId={setSelectedId} />
        </div>
})}
    </div>
    </div>
    </div>
}

export default HomePage;