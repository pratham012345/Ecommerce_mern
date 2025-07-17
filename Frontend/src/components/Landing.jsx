import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Truck, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1674027392887-751d6396b710?auto=format&fit=crop&w=1200&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Welcome to Our Website Shopify
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-200">
              Discover a world of amazing products at unbeatable prices. Your
              one-stop destination for quality shopping.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold shadow-md"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Our-Shope?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 border rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                Curated selection of high-quality products from trusted brands.
              </p>
            </div>

            <div className="text-center p-8 border rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Truck className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to your doorstep.
              </p>
            </div>

            <div className="text-center p-8 border rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Safe and secure shopping experience guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
