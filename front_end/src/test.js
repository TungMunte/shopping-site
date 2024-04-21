function test() {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-8 order-md-2 col-lg-9">
          <div className="container-fluid">
            <div className="row">
              {smartphones.map((smartphone) => (
                <SmartPhone
                  description={smartphone.description}
                  price={smartphone.price}
                  imageCode={smartphone.imageCode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
