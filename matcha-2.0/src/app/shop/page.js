"use client";
import Image from "next/image";
import Nav from "../Components/Nav";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";


export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("Shop");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const { cartItems } = useCart();


  const categories = ["All Merch", "Clothing", "Stickers", "Accessories"];
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [quantity, setQuantity] = useState(1);

  const items = [
    {
      name: "DMC Sticker",
      image: "/sticker.png",
      category: "Stickers",
      bgColor: "#f5d3e4",
      imageStyle: {
        width: "32rem",
        height: "26rem",
        top: "-10rem",
        left: "-8rem",
      },
      price: "4.00",
      description: "A high-quality sticker durable and perfect for your water bottle, laptop, or car.",
      specs: [
        "3-inch diameter",
        "Weatherproof vinyl",
        "Glossy finish",
        "Made in the USA"
      ]
    },
    {
      name: "DMC Tote Bag",
      image: "/Subject.png",
      category: "Accessories",
      bgColor: "#b6d7e0",
      imageStyle: {
        width: "10rem",
        height: "10rem",
        top: "0.5rem",
        left: "3rem",
      },
      price: "15.00",
      description: "A high-quality tote bag thing or something like that. This mean girl made them so who knows.",
      specs: [
        "40-Inch",
        "dont know",
        "cardboard",
      ]
    },
    {
      name: "DMC Sticker 2",
      image: "/sticker2.png",
      category: "Stickers",
      bgColor: "#f5d3e4",
      imageStyle: {
        width: "23rem",
        height: "23rem",
        top: "-4.8rem",
        left: "-3.5rem",
      },
      price: "4.00",
      description: "A fresh variation of the DMC sticker design. Stick it anywhere you want to rep your matcha lifestyle.",
      specs: [
        "2.75-inch",
        "Scratch-resistant",
        "Waterproof adhesive"
      ]
    }
    
  ];

  const filteredItems =
    selectedCategory === "Shop"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#55825c] flex h-screen flex-col overflow-x-hidden max-w-screen">
      <div className="w-full fixed top-0 left-0 z-20">
        <Nav />
      </div>

      <div className="w-full mx-auto">
        <div className="flex mt-10 w-11/12 mx-auto">
          <div className="h-[2rem]">
            <div className="font-lazy font-bold text-3xl space-y-1 mt-40">
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category
                      ? "text-[#f5d3e4]"
                      : "text-[#b6d7e0]"
                  }`}
                >
                  {category.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          <div className="ml-auto">
            <Link href="/cart">
              <div className="w-[25rem] -mt-[16.3rem] -mb-20 -mr-40 cursor-pointer">
                <Image
                  src={"/cart.png"}
                  width={1000}
                  height={1000}
                  className="object-contain"
                  alt="Cart"
                />
                  {totalQuantity > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {totalQuantity}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="w-10/12 mx-auto flex gap-10 justify-center py-20 flex-wrap">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(item);
                setShowModal(true);
              }}
              className="w-[18rem] h-[23rem] bg-white rounded-[1rem] pt-4 pr-4 pl-4 pb-16 cursor-pointer hover:scale-[1.03] transition duration-300"
            >
              <div
                className="w-full h-full rounded-[1rem] relative"
                style={{ backgroundColor: item.bgColor }}
              >
                <div
                  className="absolute"
                  style={{
                    width: item.imageStyle?.width || "25rem",
                    height: item.imageStyle?.height || "25rem",
                    top: item.imageStyle?.top || "-7.5rem",
                    left: item.imageStyle?.left || "-4.5rem",
                  }}
                >
                  <Image
                    src={item.image}
                    width={1000}
                    height={1000}
                    className="object-contain"
                    alt={item.name}
                  />
                </div>
              </div>
              <div className="text-center mt-4 text-[#b6d7e0] font-lazy font-bold text-3xl">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-10 px-4">
          <div className="bg-[#b6d7e0] rounded-2xl flex items-center p-8 max-w-[55%] w-full h-[40rem] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 hover:text-red-700 hover:cursor-pointer text-red-500 font-lazy font-bold text-2xl"
            >
              X
            </button>
          <div className="flex my-auto">
            <div
              className="min-w-[18rem] h-[23rem] bg-white rounded-[1rem] pt-4 pr-4 pl-4 pb-16"
            >
              <div
                className="w-full h-full rounded-[1rem] relative"
                style={{ backgroundColor: selectedItem.bgColor }}
              >
                <div
                  className="absolute"
                  style={{
                    width: selectedItem.imageStyle?.width || "25rem",
                    height: selectedItem.imageStyle?.height || "25rem",
                    top: selectedItem.imageStyle?.top || "-7.5rem",
                    left: selectedItem.imageStyle?.left || "-4.5rem",
                  }}
                >
                  <Image
                    src={selectedItem.image}
                    width={1000}
                    height={1000}
                    className="object-contain"
                    alt={selectedItem.name}
                  />
                </div>
              </div>
              <div className="text-center mt-4 text-[#b6d7e0] font-lazy font-bold text-3xl">
                {selectedItem.name}
              </div>
            </div>
          <div className="w-[50%] mx-auto">
            <p className="text-white text-center font-lazy font-bold text-2xl mb-8">{selectedItem.description}</p>

            {selectedItem.specs && (
              <ul className="list-disc list-inside text-white font-lazy font-bold text-2xl space-y-1 ml-4">
                {selectedItem.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            )}
            <p className="text-3xl text-center font-bold font-lazy text-white mb-4 mt-20">
              PRICE: ${selectedItem.price}
            </p>
            <div className="w-full flex justify-center">

            <button
                onClick={() => {
                  addToCart(selectedItem, quantity);
                  setShowModal(false);
                }}
                className="p-6 bg-[#f5d3e4] font-lazy font-bold text-3xl text-white rounded-[2rem] hover:scale-[1.03] transition duration-300"
              >
                ADD TO CART
            </button>
            </div>
            <div className="flex items-center justify-center space-x-4 my-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="text-3xl px-4 py-2 bg-white rounded-full font-bold"
              >
                -
              </button>
              <span className="text-white text-3xl font-lazy font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-3xl px-4 py-2 bg-white rounded-full font-bold"
              >
                +
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
