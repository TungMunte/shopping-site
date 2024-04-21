import React from "react";

function AboutUs() {
  return (
    <section className="aboutSection">
      <style jsx>
        {`
          .aboutSection {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 100vh;
            margin: 0;
          }

          .image {
            background-color: #12192c;
            display: flex;
            border-radius: 12px 0 0 12px;
          }

          .image img {
            height: 50vh;
            margin: 50px auto;
          }

          .content {
            background-color: #12192c;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            border-radius: 0 12px 12px 0;
            color: #fff;
          }

          .content h2 {
            text-transform: uppercase;
            font-size: 36px;
            letter-spacing: 6px;
            opacity: 0.9;
            text-align: center; /* Center heading */
          }

          .content p {
            padding-bottom: 15px;
            font-weight: 300;
            opacity: 0.7;
            width: 60%;
            text-align: center;
            margin: 0 auto;
            line-height: 1.7;
            color: #ffffff;
          }

          .links {
            margin: 15px 0;
          }

          .links li {
            border: 2px solid #4158d0;
            list-style: none;
            border-radius: 5px;
            padding: 10px 15px;
            width: 160px;
            text-align: center;
          }

          .links li a {
            text-transform: uppercase;
            color: #fff;
            text-decoration: none;
          }

          .links li:hover {
            border-color: #c850c0;
          }

          .verticalLine {
            height: 30px;
            width: 3px;
            background: #c850c0;
            margin: 0 auto;
          }

          .icons {
            display: flex;
            padding: 15px 0;
          }

          .icons li {
            display: block;
            padding: 5px;
            margin: 5px;
          }

          .icons li i {
            font-size: 26px;
            opacity: 0.8;
          }

          .icons li i:hover {
            color: #c850c0;
            cursor: pointer;
          }

          /*****************/

          @media (max-width: 900px) {
            .aboutSection {
              grid-template-columns: 1fr;
              width: 100%;
              border-radius: none;
              flex-direction: column; /* Stack content vertically on smaller screens */
              align-items: center;
            }

            .image {
              height: 100vh;
              border-radius: 12px;
            }

            .image img {
              height: auto;
              width: 80%; /* Make image responsive on smaller screens */
            }

            .content {
              height: 100vh;
              border-radius: none;
              border-radius: 12px;
              padding: 20px;
              max-width: 80%; /* Limit maximum width of content on smaller screens */
            }

            .content h2 {
              font-size: 20px;
              margin-top: 50px;
            }

            .content p {
              font-size: 14px;
            }

            .links li a {
              font-size: 14px;
            }

            .links {
              margin: 5px 0;
            }

            .links li {
              padding: 6px 10px;
            }

            .icons li i {
              font-size: 15px;
            }
          }
        `}
      </style>
      <div className="image">
        <img
          src="https://cdn.pixabay.com/photo/2017/08/26/23/37/business-2684758__340.png"
          alt="About Us"
        />
      </div>

      <div className="content">
        <h2>About Us</h2>
        <p>
          At our shop, we are committed to providing an exceptional online
          shopping experience for our customers. Our journey began with a
          passion for delivering quality products and outstanding service.
          Guided by this commitment, we have curated a diverse range of products
          to cater to your every need and desire. Whether you're searching for
          the latest fashion trends, innovative gadgets, or essential everyday
          items, we strive to offer a seamless shopping experience that exceeds
          your expectations. With a focus on reliability, convenience, and
          customer satisfaction, we aim to become your trusted destination for
          all your online shopping needs. Welcome to our shop, where your
          satisfaction is our priority.
        </p>
        <ul className="links">
          <li>
            <a>work</a>
          </li>
          <div className="verticalLine"></div>
          <li>
            <a>service</a>
          </li>
          <div className="verticalLine"></div>
          <li>
            <a>contact</a>
          </li>
        </ul>
        <ul className="icons">
          <li>
            <i className="fa fa-twitter"></i>
          </li>
          <li>
            <i className="fa fa-facebook"></i>
          </li>
          <li>
            <i className="fa fa-github"></i>
          </li>
          <li>
            <i className="fa fa-pinterest"></i>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutUs;
