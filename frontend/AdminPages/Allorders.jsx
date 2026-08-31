import { useEffect, useState } from "react";
import axios from "axios";
import { AdminNavbar } from "./Components/AdminNavbar";

export function Allorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/adminallorders"
      );

      setOrders(response.data.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

      case "cancelled":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";

      case "arriving":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";

      default:
        return "bg-gray-100 text-gray-700 ring-1 ring-gray-200";
    }
  };

  const getPaymentStyle = (status) => {
    return status === "completed"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                All Orders
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage and track all customer orders
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total Orders
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {orders.length}
              </p>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <div className="flex flex-col items-center gap-3">

                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />

                <p className="text-sm text-slate-500">
                  Loading orders...
                </p>

              </div>
            </div>
          ) : orders.length === 0 ? (

            /* Empty State */
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <svg
                  className="h-8 w-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0l-2.5 3.5a2 2 0 01-1.6.8H6.1a2 2 0 01-1.6-.8L2 13m18 0H4"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                No orders found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Orders will appear here once customers place them.
              </p>

            </div>
          ) : (

            /* Orders Table */
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Table Header */}
              <div className="border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Recent Orders
                    </h2>

                    <p className="text-sm text-slate-500">
                      {orders.length} orders in total
                    </p>
                  </div>

                </div>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px]">

                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        #
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Order
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Products
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Total
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Payment
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Shipping
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Date
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {orders.map((order, index) => (

                      <tr
                        key={order._id}
                        className="transition hover:bg-slate-50"
                      >

                        {/* Number */}
                        <td className="px-6 py-5 text-sm font-medium text-slate-400">
                          {index + 1}
                        </td>

                        {/* Order ID */}
                        <td className="px-6 py-5">

                          <div className="flex flex-col">

                            <span className="font-semibold text-slate-800">
                              #{order._id?.slice(-8)}
                            </span>

                            <span className="mt-1 text-xs text-slate-400">
                              Order ID
                            </span>

                          </div>

                        </td>

                        {/* Customer */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                              {order.userId?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                            </div>

                            <div>

                              <p className="font-semibold text-slate-800">
                                {order.userId?.name || "Unknown"}
                              </p>

                              <p className="text-xs text-slate-500">
                                {order.userId?.email || "No email"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Products */}
                        <td className="px-6 py-5">

                          <div className="space-y-2">

                            {order.products?.map((item, i) => (

                              <div
                                key={i}
                                className="flex items-center justify-between gap-4"
                              >

                                <div>

                                  <p className="max-w-[180px] truncate text-sm font-medium text-slate-700">
                                    {item.productId?.name || "Product"}
                                  </p>

                                  <p className="text-xs text-slate-400">
                                    Qty: {item.quantity}
                                  </p>

                                </div>

                              </div>

                            ))}

                          </div>

                        </td>

                        {/* Total */}
                        <td className="px-6 py-5">

                          <span className="font-bold text-slate-900">
                            ₹{order.totalPrice?.toLocaleString("en-IN")}
                          </span>

                        </td>

                        {/* Payment */}
                        <td className="px-6 py-5">

                          <div className="flex flex-col items-start gap-2">

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStyle(
                                order.paymentStatus
                              )}`}
                            >
                              {order.paymentStatus}
                            </span>

                            <span className="text-xs font-medium text-slate-500">
                              {order.paymentMethod}
                            </span>

                          </div>

                        </td>

                        {/* Order Status */}
                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>

                        </td>

                        {/* Shipping */}
                        <td className="px-6 py-5">

                          <div className="max-w-[180px] text-sm text-slate-600">

                            <p className="truncate font-medium">
                              {order.shippingAddress?.address}
                            </p>

                            <p className="text-xs text-slate-500">
                              {order.shippingAddress?.city},{" "}
                              {order.shippingAddress?.state}
                            </p>

                            <p className="text-xs text-slate-500">
                              {order.shippingAddress?.pincode}
                            </p>

                          </div>

                        </td>

                        {/* Date */}
                        <td className="px-6 py-5">

                          <span className="text-sm font-medium text-slate-700">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString("en-IN")}
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
    </>
  );
}