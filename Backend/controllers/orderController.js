// import {productModel} from "../models/product.js";

// export const dummyData = async (req, res) => {
//   try {
//     console.log("controller hitting");

//     const productsData = [
//       {
//         title: "Apple iPhone 15",
//         description:
//           "Latest Apple iPhone with A16 Bionic chip and advanced dual-camera system.",
//         price: 79999,
//         image: "https://store.storeimages.cdn-apple.com/iphone15.jpg",
//       },
//       {
//         title: "Samsung Galaxy S23",
//         description:
//           "Flagship Android smartphone with Snapdragon 8 Gen 2 processor and 120Hz AMOLED display.",
//         price: 69999,
//         image: "https://images.samsung.com/galaxy-s23.jpg",
//       },
//       {
//         title: "Sony WH-1000XM5 Headphones",
//         description:
//           "Industry-leading noise-canceling headphones with 30 hours battery life.",
//         price: 24999,
//         image: "https://m.media-amazon.com/images/sony-headphones.jpg",
//       },
//       {
//         title: "HP Pavilion Laptop",
//         description:
//           "15.6-inch FHD display, Intel i5 12th Gen, 16GB RAM, 512GB SSD.",
//         price: 55999,
//         image: "https://m.media-amazon.com/images/hp-laptop.jpg",
//       },
//       {
//         title: "Nike Air Max Sneakers",
//         description:
//           "Stylish running shoes with air cushioning for all-day comfort.",
//         price: 8999,
//         image: "https://m.media-amazon.com/images/nike-airmax.jpg",
//       },
//     ];

//     // save products one by one
//     for (const singleData of productsData) {
//       const newProduct = new productModel(singleData);
//       await newProduct.save();
//       console.log("Saved:", singleData.title);
//     }

//     res.status(200).json({ message: "Dummy data inserted successfully ✅" });

//   } catch (e) {
//     console.error("Error inserting dummy data:", e.message);
//     res.status(500).json({ error: e.message });
//   }
// };
