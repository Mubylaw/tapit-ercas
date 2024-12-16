const Options = ({ amount, setAmount }) => {
  const formatNumberWithCommas = (number) => {
    return number?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };
  return (
    <div className="center">
      <div className="h3">Choose a Payment type</div>
      <div className="amount">
        <input
          type="text"
          name="amount"
          placeholder="Amount to Pay"
          id=""
          onChange={(e) => handlePriceChange(e.target.value)}
          value={formatNumberWithCommas(amount)}
          min={100}
          max={100000}
        />
      </div>
      <div className="options">
        <div className="pa">
          <img src="/assets/pos.png" alt="" />
          <div className="title">POS Payment</div>
          <p>Merchant - Customer</p>
          <a href="/pos">
            <div className="btn">Start Demo</div>
          </a>
        </div>
        <div className="pa">
          <img src="/assets/online.png" alt="" />
          <div className="title">Online Payment</div>
          <p>Customer</p>
          <a href={`/onlinepayment?amount=${amount}`}>
            <div className="btn">Start Demo</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Options;
