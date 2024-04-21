function CustomService() {
  return (
    <main>
      <style jsx>
        {`
          main {
            padding: 40px;
          }

          .services {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .services article {
            width: calc(33% - 20px);
            height: calc(33% - 20px);
            margin-bottom: 20px;
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 20px;
            padding: 20px;
            border: 2px solid #ddd;
            border-radius: 10px;
            transition: transform 0.3s ease;
          }

          .services article:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          h2 {
            color: #333;
            text-align: center;
          }

          p {
            color: #555;
            text-align: center;
          }

          .services article {
            background-color: #fff;
            color: #333;
          }

          .services article h3 {
            color: #333;
            font-size: 1.2rem;
            margin-bottom: 15px;
          }

          .services article p {
            margin-bottom: 15px;
          }

          .btn-primary {
            background-color: #343a40;
            border-color: #343a40;
          }

          .btn-primary:hover {
            background-color: #292f33;
            border-color: #292f33;
          }

          /* Policy Section Styles */
          .policy-section {
            background-color: #f8f9fa;
            padding: 40px;
            border-radius: 5px;
            margin-top: 40px;
          }

          .policy-section h2 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
          }

          .policy-section p {
            color: #555;
            text-align: left;
          }

          .policy-section ul {
            list-style-type: square;
            margin-left: 20px;
            color: #555;
          }

          .contact-section {
            background-color: #f8f9fa;
            padding: 40px;
            border-radius: 5px;
            margin-top: 40px;
          }

          .contact-section h3 {
            text-align: center;
          }

          .contact-info {
            list-style: none;
            padding-left: 0;
          }

          .contact-info li {
            margin-bottom: 10px;
          }

          .contact-info a {
            color: #007bff;
            text-decoration: none;
          }

          .contact-info a:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <h2 className="mb-5">Customer Service</h2>
      <p className="mb-5">
        We're here to help! Here are some resources to answer your questions:
      </p>

      <div className="services">
        <article className="bg-light text-dark" style={{ height: "200px" }}>
          <h3>Order Tracking</h3>
          <p>Track your recent orders and view their status.</p>
          <a className="btn btn-primary">Track My Order</a>
        </article>
        <article className="bg-light text-dark" style={{ height: "200px" }}>
          <h3>Returns & Exchanges</h3>
          <p>Learn about our return policy and how to initiate an exchange.</p>
          <a href="#returns-exchanges" className="btn btn-primary">
            Returns & Exchanges Policy
          </a>
        </article>
        <article className="bg-light text-dark" style={{ height: "200px" }}>
          <h3>Shipping Information</h3>
          <p>Get details about shipping options, costs, and delivery times.</p>
          <a className="btn btn-primary">Shipping Information</a>
        </article>
      </div>

      <div id="returns-exchanges" className="policy-section">
        <h2>Returns & Exchanges Policy</h2>
        <p>
          If you wish to return or exchange an item purchased from our store,
          please refer to the following policies:
        </p>
        <ul>
          <li>Items must be returned within 30 days of purchase.</li>
          <li>Items must be unused and in the same condition as received.</li>
          <li>Original tags and packaging must be intact.</li>
          <li>Refunds will be issued to the original payment method.</li>
          <li>Exchanges are subject to availability.</li>
          <li>
            Shipping costs for returns/exchanges are the responsibility of the
            customer.
          </li>
        </ul>
      </div>

      <div className="contact-section">
        <h3 className="mt-5">Still have questions?</h3>
        <p>
          If you can't find the answer you're looking for, feel free to contact
          us directly.
        </p>
        <ul className="contact-info">
          <li>
            {"Email : "}
            <a href="mailto : seeyouagain14012000@gmail.com">
              seeyouagain14012000@gmail.com
            </a>
          </li>
          <li>Phone: 0799449848 (Mon-Fri, 9am-5pm EST)</li>
        </ul>
      </div>
    </main>
  );
}

export default CustomService;
