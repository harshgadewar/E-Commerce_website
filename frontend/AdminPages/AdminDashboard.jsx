// import { AdminNavbar } from "./Components/AdminNavbar";

// export function AdminDashboard() {
//   return (
//     <>
//       <AdminNavbar />

//       <div className="min-h-screen py-8">
//         <div className="max-w-6xl mx-auto px-4">

//           {/* Heading */}
//           <h1 className="text-3xl font-bold text-gray-900">
//             Admin Dashboard
//           </h1>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

//             <div className="bg-white rounded-xl shadow-md p-6">
//               <p className="text-gray-500">
//                 Products
//               </p>

//               <h2 className="text-2xl font-bold mt-2">
//                 400
//               </h2>
//             </div>

//             <div className="bg-white rounded-xl shadow-md p-6">
//               <p className="text-gray-500">
//                 Orders
//               </p>

//               <h2 className="text-2xl font-bold mt-2">
//                 400
//               </h2>
//             </div>

//             <div className="bg-white rounded-xl shadow-md p-6">
//               <p className="text-gray-500">
//                 Users
//               </p>

//               <h2 className="text-2xl font-bold mt-2">
//                 400
//               </h2>
//             </div>

//           </div>

//           {/* Recent Orders */}
//           <div className="mt-10">

//             <h2 className="text-xl font-bold text-gray-900 mb-4">
//               Recent Orders
//             </h2>

//             <div className="bg-white rounded-xl shadow-md p-6">

//               <p className="text-gray-500">
//                 No recent orders
//               </p>

//             </div>

//           </div>

//         </div>
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { AdminNavbar } from "./Components/AdminNavbar";

export function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    products: 0,
    orders: 0,
    users: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/admin/adminpannel",
          {
            withCredentials: true,
          }
        );

        setDashboard(res.data.dashboard);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <AdminNavbar />

        <div className="min-h-screen flex justify-center items-center">
          <p className="text-gray-500 text-lg">
            Loading dashboard...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

            {/* Products */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">
                Products
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                {dashboard.products}
              </h2>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">
                Orders
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                {dashboard.orders}
              </h2>
            </div>

            {/* Users */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">
                Users
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                {dashboard.users}
              </h2>
            </div>

          </div>

          {/* Recent Orders */}
          <div className="mt-10">

            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Orders
            </h2>

            {dashboard.recentOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-500">
                  No recent orders
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">

                {/* Table */}
                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">
                          Order ID
                        </th>

                        <th className="text-left p-4 text-sm font-semibold text-gray-600">
                          Customer
                        </th>

                        <th className="text-left p-4 text-sm font-semibold text-gray-600">
                          Amount
                        </th>

                        <th className="text-left p-4 text-sm font-semibold text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {dashboard.recentOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b last:border-b-0 hover:bg-gray-50"
                        >

                          {/* Order ID */}
                          <td className="p-4 text-sm font-medium text-gray-800">
                            #{order._id.slice(-6)}
                          </td>

                          {/* Customer */}
                          <td className="p-4">

                            <p className="font-medium text-gray-800">
                              {order.userId?.name || "Unknown"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {order.userId?.email || ""}
                            </p>

                          </td>

                          {/* Amount */}
                          <td className="p-4 font-semibold text-green-600">
                            ₹{order.totalPrice}
                          </td>

                          {/* Status */}
                          <td className="p-4">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {order.status || "Pending"}
                            </span>

                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}