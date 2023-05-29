import React from "react";
import { Carousel } from "react-bootstrap";
const CarouselImages = () => {
  return (
    <div>
      <>
        <Carousel className="carousel">
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 box"
              src={require("../img/int1.jpg")}
              alt="First slide"
            />

            {/* <Carousel.Caption>
    <div className='carousel-caption'>
            <h3>Fruits</h3>
            <p>Fruits delivered directly from farmers!</p>
            <button type='submit' className='btn btn-cust'>
              Buy With us
            </button>
          </div>
        </Carousel.Caption>
         */}
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 box"
              src={require("../img/int 3.jpg")}
              alt="Second slide"
            />
            {/* <Carousel.Caption>
    <div className='carousel-caption'>
            <h3>Vegetables</h3>
            <p>Fresh from the farm and Hygenic!</p>
            <button
              type='submit'
              className='btn btn-cust'
            >
              Buy With us
            </button>
          </div>
        </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </>
    </div>
  );
};

export default CarouselImages;
