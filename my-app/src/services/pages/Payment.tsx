import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}
// const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGEwYThhNTY5MzdlYzk2ODAxMzc5NSIsImlhdCI6MTc3OTA0Mjk1OCwiZXhwIjoxNzc5NjQ3NzU4fQ.Cy7I6W8uPvd4QRLrD_AmRVMA4dZBThElktZ26rQmiH8";
// localStorage.getItem(
//  "token"
// );
// console.log("token",token);

const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/payment",

        {
          productId: "69216489d643b8f813eb8639",

          quantity: 2,
        },

        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGEwYThhNTY5MzdlYzk2ODAxMzc5NSIsImlhdCI6MTc3OTczNzAxMSwiZXhwIjoxNzgwMzQxODExfQ.u7QHNhh9LPFG9vS3QqiE4NoNmpQOny0Z4TQcLJ7kgJ0"}`,
          },
        },
      );

      const order = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "My Ecommerce",
        description: "Product Payment",

        handler: async function (response: any) {
          console.log("payment success");

          console.log("resopnse:",response);

          const data = await axios.post(
            "http://localhost:8080/payment/verify",
            {
              ...response,
              productId: "69216489d643b8f813eb8639",
              quantity: 2,
              shippingAddress: "harshh",
            },
            {
              headers: {
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGEwYThhNTY5MzdlYzk2ODAxMzc5NSIsImlhdCI6MTc3OTczNzAxMSwiZXhwIjoxNzgwMzQxODExfQ.u7QHNhh9LPFG9vS3QqiE4NoNmpQOny0Z4TQcLJ7kgJ0"}`,
              },
            },
          );

          console.log("data:", data);
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (e) {
      console.log(e);
      console.log(e);
    }
  };

  return <button onClick={handlePayment}>Buy Now</button>;
};

export default PaymentButton;
