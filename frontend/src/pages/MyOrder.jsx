

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Navbar } from "../components/Navbar";

// export function MyOrder() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchorder = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8080/useraction/myorders",
//           {
//             withCredentials: true,
//           }
//         );

//         setOrders(res.data.data);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     fetchorder();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen py-10">
//         <div className="max-w-6xl mx-auto px-4">

//           <h1 className="text-3xl font-bold text-gray-800 mb-8">
//             My Orders
//           </h1>

//           {orders.length === 0 ? (
//             <div className="bg-white rounded-xl shadow p-10 text-center">
//               <h2 className="text-2xl font-semibold text-gray-700">
//                 No Orders Found
//               </h2>

//               <p className="text-gray-500 mt-2">
//                 Looks like you haven't ordered anything yet.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-8">

//               {orders.map((order) => (
//                 <div
//                   key={order._id}
//                   className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
//                 >

//                   {/* Products */}
//                   <div className="p-6 space-y-5">

//                     {order.products.map((item) => (
//                       <div
//                         key={item._id}
//                         className="flex justify-between items-center border-b pb-5"
//                       >

//                         {/* Product */}
//                         <div className="flex justify-between item-center">
//                           {/* <img src={item.productId.image} className="object-contain"/> */}
//                             <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
//                     <img
//                       src={item.productId.image}
//                       alt={item.productId.title}
//                       className="h-32 object-contain"
//                     />
//                   </div>
//                           <h3 className="text-lg font-bold text-gray-800">
//                             {item.productId.title} ({item.quantity} piece)
//                           </h3>

//                           <p className="text-gray-500">
//                             Price:{" "}
//                             <span className="font-semibold text-green-600">
//                               ₹{item.productId.price}
//                             </span>
//                           </p>
//                         </div>

//                       </div>
//                     ))}

//                     {/* Order Status + Total */}
//                     <div className="flex justify-between items-center pt-3">

//                       {/* Status */}
//                       <div>
//                         <span
//                           className={`px-4 py-1 rounded-full text-sm font-semibold
//                             ${
//                               order.status === "Delivered"
//                                 ? "bg-green-500 text-white"
//                                 : order.status === "Pending"
//                                 ? "bg-red-500 text-white"
//                                 : "bg-yellow-500 text-black"
//                             }`}
//                         >
//                           {order.status}
//                         </span>
//                       </div>

//                       {/* Amount */}
//                       <div className="text-right">
//                         <h2 className="text-lg font-semibold text-gray-700">
//                           Total Amount
//                         </h2>

//                         <h2 className="text-2xl font-bold text-green-600">
//                           ₹{order.totalPrice}
//                         </h2>
//                       </div>

//                     </div>

//                   </div>
//                 </div>
//               ))}

//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";

export function MyOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchorder = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/useraction/myorders",
          {
            withCredentials: true,
          }
        );

        setOrders(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchorder();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            My Orders
          </h1>

          {/* No Orders */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                No Orders Found
              </h2>

              <p className="text-gray-500 mt-2">
                Looks like you haven't ordered anything yet.
              </p>
            </div>
          ) : (
            <div className="space-y-8">

              {/* Orders */}
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                >

                  {/* Products */}
                  <div className="p-6 space-y-5">

                    {order.products.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-6 border-b pb-5"
                      >

                        {/* Product Image */}
                        <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.productId.image}
                            alt={item.productId.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">

                          <h3 className="text-lg font-bold text-gray-800">
                            {item.productId.title}
                          </h3>

                          <p className="text-gray-500 mt-2">
                            Quantity:{" "}
                            <span className="font-semibold text-gray-700">
                              {item.quantity}
                            </span>
                          </p>

                          <p className="text-gray-500 mt-1">
                            Price:{" "}
                            <span className="font-semibold text-green-600">
                              ₹{item.productId.price}
                            </span>
                          </p>

                        </div>

                      </div>
                    ))}

                    {/* Order Bottom Section */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 pt-3">

                      {/* Status */}
                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Order Status
                        </p>

                        <span
                          className={`inline-block px-4 py-1 rounded-full text-sm font-semibold
                            ${
                              order.status === "Delivered"
                                ? "bg-green-500 text-white"
                                : order.status === "Pending"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-500 text-black"
                            }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Amount */}
                      <div className="text-left sm:text-right">
                        <h2 className="text-sm font-semibold text-gray-500">
                          Total Amount
                        </h2>

                        <h2 className="text-2xl font-bold text-green-600">
                          ₹{order.totalPrice}
                        </h2>
                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </>
  );
}