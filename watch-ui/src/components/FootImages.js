import React from "react";
import Image from 'react-bootstrap/Image'
import '../css/Values.css'

const FootImages = () => {
  return (
    <div className="container values">
      <div className="row text-center">
        <div className="col-md-4">
          <img
            className="img-circle img-responsive img-center values-img"
            src={require('../img/png.png')}
            alt="Farmer Value"
          />
          <h2>Benefits for Producers</h2>
          <p>
          Producers will get <b>30% More Revenue</b> and <b>One Stop Sale</b>{" "}
            with <b>Garuntteed payments</b> in 24 hours.
          </p>
        </div>
        <div className="col-md-4">
          <img
            className="img-circle img-responsive img-center values-img"
            src="https://firebasestorage.googleapis.com/v0/b/agricart-c7914.appspot.com/o/banners%2Ffarmer-2-min.png?alt=media&token=4a43e9f5-66dc-421f-bb83-0f88212cfc69"
            alt="Retailer Value"
          />
          <h2>Convenient for Retailers</h2>
          <p>
            Retailers are Convenient with <b>Competitive pricing</b> and{" "}
            <b>Door Delivery</b> and also it Saves their <b>Time</b>{" "}
          </p>
        </div>
        <div className="col-md-4">
          <img
            className="img-circle img-responsive img-center values-img"
            src="https://firebasestorage.googleapis.com/v0/b/agricart-c7914.appspot.com/o/banners%2Ffarmer-3-min%20(1).jpg?alt=media&token=ef9a6564-e13e-4a89-b618-9442c01279e5"
            alt="Consumers Value"
          />
          <h2>Savings for Consumers</h2>
          <p>
            Consumers are happy with <b>Pricing  </b> and{" "}
            <b>Delivered Directly from Factory</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FootImages;
