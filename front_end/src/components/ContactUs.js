import React from "react";

function ContactUs() {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          background-color: #444442;
          padding-top: 85px;
          min-width: 100%;
          min-height: 100%; /* Set the minimum height to 100% of the viewport height */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .container h1 {
          font-family: "Poppins", sans-serif, "arial";
          font-weight: 600;
          font-size: 72px;
          color: white;
          text-align: center;
        }

        .container h4 {
          font-family: "Roboto", sans-serif, "arial";
          font-weight: 400;
          font-size: 20px;
          color: #9b9b9b;
          line-height: 1.5;
        }

        /* ///// inputs /////*/

        .container input:focus ~ label,
        .container textarea:focus ~ label,
        .container input:valid ~ label,
        .container textarea:valid ~ label {
          font-size: 0.75em;
          color: #999;
          top: -5px;
          -webkit-transition: all 0.225s ease;
          transition: all 0.225s ease;
        }

        .container .styled-input {
          float: left;
          width: 293px;
          margin: 1rem 0;
          position: relative;
          border-radius: 4px;
        }

        @media only screen and (max-width: 768px) {
          .container .styled-input {
            width: 100%;
          }
        }

        .container .styled-input label {
          color: #999;
          padding: 1.3rem 30px 1rem 30px;
          position: absolute;
          top: 10px;
          left: 0;
          -webkit-transition: all 0.25s ease;
          transition: all 0.25s ease;
          pointer-events: none;
        }

        .container .styled-input.wide {
          width: 650px;
          max-width: 100%;
        }

        .container input,
        .container textarea {
          padding: 30px;
          border: 0;
          width: 100%;
          font-size: 1rem;
          background-color: #2d2d2d;
          color: white;
          border-radius: 4px;
        }

        .container input:focus,
        .container textarea:focus {
          outline: 0;
        }

        .container input:focus ~ span,
        .container textarea:focus ~ span {
          width: 100%;
          -webkit-transition: all 0.075s ease;
          transition: all 0.075s ease;
        }

        .container textarea {
          width: 100%;
          min-height: 15em;
        }

        .container .input-container {
          width: 650px;
          max-width: 100%;
          margin: 20px auto 25px auto;
        }

        .container .submit-btn {
          float: right;
          padding: 7px 35px;
          border-radius: 60px;
          display: inline-block;
          background-color: #4b8cfb;
          color: white;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.06),
            0 2px 10px 0 rgba(0, 0, 0, 0.07);
          -webkit-transition: all 300ms ease;
          transition: all 300ms ease;
        }

        .container .submit-btn:hover {
          transform: translateY(1px);
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1),
            0 1px 1px 0 rgba(0, 0, 0, 0.09);
        }

        @media (max-width: 768px) {
          .container .submit-btn {
            width: 100%;
            float: none;
            text-align: center;
          }
        }

        .container input[type="checkbox"] + label {
          color: #ccc;
          font-style: italic;
        }

        .container input[type="checkbox"]:checked + label {
          color: #f00;
          font-style: normal;
        }
      `}</style>
      <div className="row">
        <h1>contact us</h1>
      </div>
      <div className="row">
        <h4 style={{ textAlign: "center" }}>We'd love to hear from you!</h4>
      </div>
      <div className="row input-container">
        <div className="col-xs-12">
          <div className="styled-input wide">
            <input type="text" required />
            <label>Name</label>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="styled-input">
            <input type="text" required />
            <label>Email</label>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="styled-input" style={{ float: "right" }}>
            <input type="text" required />
            <label>Phone Number</label>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="styled-input wide">
            <textarea required></textarea>
            <label>Message</label>
          </div>
        </div>
        <div className="col-xs-12">
          <div className="btn-lrg submit-btn">Send Message</div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
