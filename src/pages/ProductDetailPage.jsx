// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Star, Heart, Share2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { PRODUCTS } from '../data/mockData';
// import { useApp } from '../context/AppContext';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  
//   const product = PRODUCTS.find(p => p.id === Number(id));
//   const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
//   const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
//   const [quantity, setQuantity] = useState(1);
//   const [imageIndex, setImageIndex] = useState(0);
//   const [showNotification, setShowNotification] = useState(false);
//   const [notificationMessage, setNotificationMessage] = useState('');

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Header />
//         <div className="container py-20 text-center">
//           <h2 className="text-2xl font-bold text-gray-600">Product not found</h2>
//           <button
//             onClick={() => navigate('/')}
//             className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
//           >
//             Go Back Home
//           </button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const inWishlist = isInWishlist(product.id);
//   const discountedPrice = product.sale ? product.price : product.originalPrice;

//   const handleAddToCart = () => {
//     addToCart({ ...product, selectedColor, selectedSize });
//     setNotificationMessage('Added to cart successfully!');
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 3000);
//   };

//   const handleWishlistToggle = () => {
//     if (inWishlist) {
//       removeFromWishlist(product.id);
//       setNotificationMessage('Removed from wishlist');
//     } else {
//       addToWishlist(product);
//       setNotificationMessage('Added to wishlist!');
//     }
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 3000);
//   };

//   const handleBuyNow = () => {
//     addToCart({ ...product, selectedColor, selectedSize, quantity });
//     navigate('/cart');
//   };

//   // Simulated image gallery
//   const images = product.images || [product.image, product.image, product.image];

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />

//       <div className="container py-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-primary hover:text-secondary mb-8"
//         >
//           <ChevronLeft size={20} />
//           Back
//         </button>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {/* Product Image Gallery */}
//           <div>
//             <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-96 md:h-full">
//               <img
//                 src={images[imageIndex]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />

//               {product.sale && (
//                 <div className="absolute top-4 left-4 bg-secondary text-white px-4 py-2 rounded-full font-bold text-lg">
//                   -{product.discount}%
//                 </div>
//               )}

//               {/* Image Navigation */}
//               <button
//                 onClick={() => setImageIndex((prev) => (prev - 1 + images.length) % images.length)}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
//               >
//                 <ChevronLeft size={20} />
//               </button>
//               <button
//                 onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>

//             {/* Thumbnail Gallery */}
//             <div className="grid grid-cols-4 gap-2">
//               {images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setImageIndex(idx)}
//                   className={`h-20 rounded border-2 overflow-hidden transition ${
//                     idx === imageIndex ? 'border-secondary' : 'border-gray-300'
//                   }`}
//                 >
//                   <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{product.name}</h1>

//             {/* Rating */}
//             <div className="flex items-center gap-2 mb-4">
//               <div className="flex gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//               <span className="text-gray-600">(128 reviews)</span>
//             </div>

//             {/* Price */}
//             <div className="mb-6">
//               <div className="flex items-baseline gap-3">
//                 <span className="text-4xl font-bold text-secondary">Rs. {discountedPrice.toLocaleString()}</span>
//                 {product.sale && (
//                   <span className="text-xl text-gray-500 line-through">
//                     Rs. {product.originalPrice.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//               {product.sale && (
//                 <p className="text-green-600 font-semibold mt-2">
//                   Save Rs. {(product.originalPrice - product.price).toLocaleString()} ({product.discount}% off)
//                 </p>
//               )}
//             </div>

//             {/* Product Description */}
//             <p className="text-gray-600 mb-6">{product.description}</p>

//             {/* Fabric Info */}
//             <div className="bg-gray-50 p-4 rounded-lg mb-6">
//               <p><strong>Fabric:</strong> {product.fabric}</p>
//               <p><strong>Stock:</strong> <span className="text-green-600">In Stock</span></p>
//             </div>

//             {/* Color Selection */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3">Select Color</h3>
//               <div className="flex gap-3 flex-wrap">
//                 {product.colors.map(color => (
//                   <button
//                     key={color}
//                     onClick={() => setSelectedColor(color)}
//                     className={`px-4 py-2 border-2 rounded transition ${
//                       selectedColor === color
//                         ? 'border-secondary bg-secondary/10'
//                         : 'border-gray-300 hover:border-secondary'
//                     }`}
//                   >
//                     {color}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Size Selection */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3">Select Size</h3>
//               <div className="grid grid-cols-4 gap-2">
//                 {product.sizes.map(size => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`py-2 px-3 border-2 rounded font-medium transition ${
//                       selectedSize === size
//                         ? 'border-secondary bg-secondary/10 text-secondary'
//                         : 'border-gray-300 hover:border-secondary'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity Selection */}
//             <div className="mb-8">
//               <h3 className="font-semibold text-lg mb-3">Quantity</h3>
//               <div className="flex items-center gap-3 w-fit border border-gray-300 rounded">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="px-4 py-2 hover:bg-gray-100"
//                 >
//                   −
//                 </button>
//                 <span className="px-6 py-2 font-semibold">{quantity}</span>
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="px-4 py-2 hover:bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 mb-6">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
//               >
//                 <ShoppingCart size={20} />
//                 Add to Cart
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 className="flex-1 bg-secondary text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
//               >
//                 Buy Now
//               </button>
//             </div>

//             {/* Wishlist & Share */}
//             <div className="flex gap-4 border-t pt-6">
//               <button
//                 onClick={handleWishlistToggle}
//                 className={`flex-1 py-2 border-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
//                   inWishlist
//                     ? 'border-secondary bg-secondary/10 text-secondary'
//                     : 'border-gray-300 hover:border-secondary'
//                 }`}
//               >
//                 <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
//                 {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
//               </button>
//               <button className="flex-1 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-secondary flex items-center justify-center gap-2">
//                 <Share2 size={20} />
//                 Share
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Care Instructions */}
//         <div className="border-t pt-12">
//           <h2 className="text-2xl font-bold text-primary mb-6">Care Instructions</h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="border p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-3">Wash & Dry</h3>
//               <ul className="space-y-2 text-gray-600 text-sm">
//                 <li className="flex gap-2">
//                   <Check size={16} className="flex-shrink-0 text-green-600 mt-0.5" />
//                   Gentle hand wash with cold water
//                 </li>
//                 <li className="flex gap-2">
//                   <Check size={16} className="flex-shrink-0 text-green-600 mt-0.5" />
//                   Do not bleach or use harsh chemicals
//                 </li>
//                 <li className="flex gap-2">
//                   <Check size={16} className="flex-shrink-0 text-green-600 mt-0.5" />
//                   Air dry away from direct sunlight
//                 </li>
//               </ul>
//             </div>
//             <div className="border p-6 rounded-lg">
//               <h3 className="font-bold text-lg mb-3">Storage</h3>
//               <ul className="space-y-2 text-gray-600 text-sm">
//                 <li className="flex gap-2">
//                   <Check size={16} className="flex-shrink-0 text-green-600 mt-0.5" />
//                   Keep in cool, dry place
//                 </li>
//                 <li className="flex gap-2">
//                   <Check size={16} className="flex-shrink-0 text-green-600 mt-0.5" />
//                   Fold carefully to avoid creases
//                 </li>
//                 <li className="flex gap-2">
//                   <Check size={16} className="flex-shrink-0 text-green-600 mt-0.5" />
//                   Store away from humidity
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Notification Toast */}
//       {showNotification && (
//         <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animation-pulse">
//           {notificationMessage}
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// import { ShoppingCart } from 'lucide-react';
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { PRODUCTS } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();

  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [toast, setToast] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto py-24 text-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-lg"
          >
            Go Back Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [product.image, product.image, product.image];
  const inWishlist = isInWishlist(product.id);
  const finalPrice = product.sale ? product.price : product.originalPrice;

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ChevronLeft size={18} />
          Back to shop
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm h-[520px]">
              <img
                src={images[imageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.sale && (
                <span className="absolute top-4 left-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                  -{product.discount}%
                </span>
              )}

              <button
                onClick={() =>
                  setImageIndex(
                    (imageIndex - 1 + images.length) % images.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() =>
                  setImageIndex((imageIndex + 1) % images.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    i === imageIndex
                      ? "border-secondary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-500">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-bold text-secondary">
                  Rs. {finalPrice.toLocaleString()}
                </span>
                {product.sale && (
                  <span className="text-lg line-through text-gray-400">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.sale && (
                <p className="text-green-600 mt-2 font-medium">
                  You save Rs.{" "}
                  {(product.originalPrice - product.price).toLocaleString()}
                </p>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Options */}
            <div className="space-y-6">
              {/* Colors */}
              <div>
                <h3 className="font-semibold mb-2">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedColor === c
                          ? "border-secondary bg-secondary/10"
                          : "border-gray-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 rounded-lg border font-medium ${
                        selectedSize === s
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="inline-flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2"
                  >
                    −
                  </button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <button
                onClick={() => {
                  addToCart({
                    ...product,
                    selectedColor,
                    selectedSize,
                    quantity,
                  });
                  notify("Added to cart");
                }}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-800"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-secondary text-white py-3 rounded-xl font-bold hover:bg-red-700"
              >
                Buy Now
              </button>

              <div className="flex gap-4 pt-4 border-t">
                <button
                  onClick={() => {
                    inWishlist
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product);
                    notify(
                      inWishlist
                        ? "Removed from wishlist"
                        : "Added to wishlist"
                    );
                  }}
                  className={`flex-1 py-2 border rounded-lg flex justify-center items-center gap-2 ${
                    inWishlist
                      ? "border-secondary text-secondary"
                      : "border-gray-300"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={inWishlist ? "currentColor" : "none"}
                  />
                  Wishlist
                </button>

                <button className="flex-1 py-2 border border-gray-300 rounded-lg flex justify-center items-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Care */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Care Instructions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["Wash & Dry", "Storage"].map((title) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-semibold mb-4">{title}</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex gap-2">
                    <Check size={16} className="text-green-600" />
                    Gentle hand wash
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-green-600" />
                    No bleach
                  </li>
                  <li className="flex gap-2">
                    <Check size={16} className="text-green-600" />
                    Air dry only
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      <Footer />
    </div>
  );
}

