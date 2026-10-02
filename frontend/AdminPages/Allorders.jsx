
import { useEffect, useState } from "react";
import axios from "axios";
import { AdminNavbar } from "./Components/AdminNavbar";

export function Allorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected product for popup
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/adminallorders`
      );

      setOrders(response.data.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}/status`,
        {
          status: newStatus,
        }
      );

      // Update UI immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (error) {
      console.log("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  // =========================
  // STATUS STYLE
  // =========================
  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

      case "cancelled":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";

      case "arriving":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";

      case "placed":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

      default:
        return "bg-gray-100 text-gray-700 ring-1 ring-gray-200";
    }
  };

  // =========================
  // PAYMENT STYLE
  // =========================
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

          {/* =========================
              HEADER
          ========================= */}
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

          {/* =========================
              LOADING
          ========================= */}
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

            /* =========================
               EMPTY STATE
            ========================= */
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

            /* =========================
               ORDERS TABLE
            ========================= */
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Table Header */}
              <div className="border-b border-slate-200 px-6 py-4">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Recent Orders
                  </h2>

                  <p className="text-sm text-slate-500">
                    {orders.length} orders in total
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">

                  {/* =========================
                      TABLE HEAD
                  ========================= */}
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

                  {/* =========================
                      TABLE BODY
                  ========================= */}
                  <tbody className="divide-y divide-slate-100">

                    {orders.map((order, index) => (

                      <tr
                        key={order._id}
                        className="transition hover:bg-slate-50"
                      >

                        {/* =========================
                            NUMBER
                        ========================= */}
                        <td className="px-6 py-5 text-sm font-medium text-slate-400">
                          {index + 1}
                        </td>

                        {/* =========================
                            ORDER ID
                        ========================= */}
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

                        {/* =========================
                            CUSTOMER
                        ========================= */}
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

                        {/* =========================
                            PRODUCTS
                        ========================= */}
                        <td className="px-6 py-5">

                          <div className="space-y-3">

                            {order.products?.map((item, i) => {

                              const product = item.productId;

                              return (
                                <button
                                  key={product?._id || i}
                                  onClick={() =>
                                    setSelectedProduct({
                                      ...product,
                                      quantity: item.quantity,
                                    })
                                  }
                                  className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-100"
                                >

                                  {/* Product Image */}
                                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">

                                    {product?.image ? (
                                      <img
                                        src={product.image}
                                        alt={product.title || "Product"}
                                        className="h-full w-full object-contain p-1"
                                      />
                                    ) : (
                                      <span className="text-xs text-slate-400">
                                        No image
                                      </span>
                                    )}

                                  </div>

                                  {/* Product Info */}
                                  <div className="min-w-0">

                                    <p className="max-w-[180px] truncate text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                                      {product?.title || "Product"}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                      Qty: {item.quantity}
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-slate-700">
                                      ₹
                                      {product?.price?.toLocaleString(
                                        "en-IN"
                                      ) || "N/A"}
                                    </p>

                                    <p className="mt-1 text-[10px] font-medium text-blue-500 opacity-0 transition group-hover:opacity-100">
                                      Click for details →
                                    </p>

                                  </div>

                                </button>
                              );
                            })}

                          </div>

                        </td>

                        {/* =========================
                            TOTAL
                        ========================= */}
                        <td className="px-6 py-5">
                          <span className="font-bold text-slate-900">
                            ₹
                            {order.totalPrice?.toLocaleString("en-IN")}
                          </span>
                        </td>

                        {/* =========================
                            PAYMENT
                        ========================= */}
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

                        {/* =========================
                            ORDER STATUS
                        ========================= */}
                        <td className="px-6 py-5">

                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value
                              )
                            }
                            className={`cursor-pointer rounded-full border-none px-3 py-1 text-xs font-semibold capitalize outline-none ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            <option value="placed">
                              Placed
                            </option>

                            <option value="arriving">
                              Arriving
                            </option>

                            <option value="delivered">
                              Delivered
                            </option>

                            <option value="cancelled">
                              Cancelled
                            </option>
                          </select>

                        </td>

                        {/* =========================
                            SHIPPING
                        ========================= */}
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

                        {/* =========================
                            DATE
                        ========================= */}
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

      {/* ==================================================
          PRODUCT DETAILS MODAL
      ================================================== */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Product Details
                </h2>

                <p className="text-xs text-slate-400">
                  Complete product information
                </p>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 transition hover:bg-slate-200"
              >
                ×
              </button>

            </div>

            {/* Product Image */}
            <div className="mx-6 mt-5 flex h-56 items-center justify-center rounded-xl bg-slate-50">

              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-full w-full object-contain p-6"
                />
              ) : (
                <span className="text-sm text-slate-400">
                  No image available
                </span>
              )}

            </div>

            {/* Product Information */}
            <div className="space-y-4 px-6 py-5">

              {/* Title */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Product
                </p>

                <p className="mt-1 text-lg font-bold text-slate-800">
                  {selectedProduct.title || "Unknown Product"}
                </p>
              </div>

              {/* Price + Quantity */}
              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Price
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    ₹
                    {selectedProduct.price?.toLocaleString(
                      "en-IN"
                    ) || "N/A"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Quantity
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {selectedProduct.quantity}
                  </p>
                </div>

              </div>

              {/* Product ID */}
              <div className="rounded-xl bg-slate-50 p-3">

                <p className="text-xs text-slate-400">
                  Product ID
                </p>

                <p className="mt-1 break-all text-xs font-medium text-slate-600">
                  {selectedProduct._id || "N/A"}
                </p>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 px-6 py-4">

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}