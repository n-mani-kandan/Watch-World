import React, { Component } from "react";
import {
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { bookApi } from "../misc/BookApi";
import { handleLogError } from "../misc/Helpers";
import Carousel from "react-bootstrap/Carousel";
import '../../css/Home.css'
import About from '../home/About'
import Value from '../home/Values'
import Footer from "../misc/Footer";


class Home extends Component {
  state = {
    numberOfUsers: 0,
    numberOfBooks: 0,
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      let response = await bookApi.numberOfUsers();
      const numberOfUsers = response.data;

      response = await bookApi.numberOfBooks();
      const numberOfBooks = response.data;

      this.setState({ numberOfUsers, numberOfBooks });
    } catch (error) {
      handleLogError(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
          <Dimmer active inverted>
            <Loader inverted size="huge">
              Loading
            </Loader>
          </Dimmer>
        </Segment>
      );
    } else {
      const { numberOfUsers, numberOfBooks } = this.state;
      return (
        <>

          <Carousel className="carousel">
        
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100 box"
                src={require('../../img/int1.jpg')}
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
                src={require('../../img/int 3.jpg')}
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

            <About/>
            <Value/>
          
          </>
      );
    }
  }
}

export default Home;
