
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

