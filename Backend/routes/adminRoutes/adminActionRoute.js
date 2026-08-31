import express from "express";
import { authMiddleware } from "../../middleware/authoMiddleware.js";
import { isseller } from "../../middleware/isSellerMiddleware.js";
import {
  addListing,
  adminviewallProduct,
  update,
  deleteProduct,
  getProductById,
} from "../../controllers/Admin/adminAction.js";
import { getAdminDashboard } from "../../controllers/Admin/admindashboard.js";
import { isadmin } from "../../middleware/isAdminMiddleware.js";
import { adminallOrders } from "../../controllers/Admin/adminallOrders.js";
import { upload } from "../../middleware/upload.js";
//  import { addListing,viewSellerProduct,update,deleteProduct } from "../../controllers/admin/adminAction.js";

const router = express.Router();

//admin dashboard
router.get("/adminpannel", authMiddleware, isadmin, getAdminDashboard);

//admin allorder
router.get("/adminallorders", adminallOrders);

//admin action
router.post(
  "/addproduct",
  authMiddleware,
  isadmin,
  upload.single("image"),
  addListing,
);
router.get(
  "/adminviewallproductt",
  authMiddleware,
  isadmin,
  adminviewallProduct,
);
router.get(
  "/product/:id",
  authMiddleware,
  isadmin,
  getProductById
);
router.put("/updateproduct/:id", authMiddleware, isadmin, upload.single("image"),update);
router.delete("/deleteproduct/:id", authMiddleware, isadmin, deleteProduct);

export default router;
