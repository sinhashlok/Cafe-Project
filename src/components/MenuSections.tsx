"use client";

import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "@/redux/features/cartSlice";
import { motion } from "framer-motion";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CART, MENU_ITEMS, UPDATE_CART } from "@/utils/interface";
import { RootState } from "@/redux/store";

const MenuSections = ({
  menuItem,
  cafeId,
  title,
}: {
  menuItem: MENU_ITEMS[] | undefined;
  cafeId: string;
  title: string;
}) => {
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCart() {
      await fetch("/api/cafe/cart/getCart")
        .then(async (res) => {
          const data = await res.json();
          const cart = data?.data;
          dispatch(clearCart());
          cart?.map((item: CART) => {
            for (let i = item.count; i > 0; i--) {
              dispatch(
                addItem({
                  _id: item.itemId,
                  itemName: item.itemName,
                  price: item.price,
                  rating: item.rating,
                  isVeg: item.isVeg,
                  cafeId: item.cafeId,
                })
              );
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCart();
  }, []);
  const handleAddItem = async (item: MENU_ITEMS) => {
    await fetch("/api/cafe/cart/addItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cafeId: cafeId,
        itemId: item._id,
        itemName: item.itemName,
        price: item.price,
        isVeg: item.isVeg,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          dispatch(addItem({ ...item, cafeId: cafeId }));
        } else {
          toast.error("Clear cart to add items from different cafe");
        }
      })
      .catch(async (err) => {
        const data = await err.json();
        console.log(data);
      });
  };
  const handleRemoveItem = async (item: MENU_ITEMS) => {
    try {
      await fetch("/api/cafe/cart/removeItem", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: item._id }),
      });
      dispatch(removeItem({ ...item, cafeId: cafeId }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 1,
        },
      }}
      className="mx-0 md:mx-6 lg:mx-12 xl:mx-32 p-2"
    >
      <Toaster />
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <div className="rounded-xl p-2 md:p-8 mb-10 bg-white text-sm md:text-lg">
        {menuItem?.map((items) => (
          <div
            key={items._id}
            className="flex flex-row justify-between items-end py-2 md:py-6 border-b-2 last:border-b-0"
          >
            <div>
              <h1 className="text-lg md:text-2xl font-medium mb-2">
                {items.itemName}
                <span>{items.isVeg ? " 🟢" : " 🔴"}</span>
              </h1>
              <h2>⭐️ {items.rating}</h2>
              <h2 className="font-bold mt-4">₹{items.price}/-</h2>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/coffee.jpg"
                alt="coffee"
                className="h-32 md:h-52 rounded-3xl"
              />
              {cartItems?.filter((cartItem: CART) => cartItem._id === items._id)
                .length === 0 ? (
                <button
                  className="bg-slate-500 h-10 font-bold w-[102px] text-white rounded-md hover:bg-slate-800 hover:shadow-md transition-all relative -top-5"
                  onClick={() => handleAddItem(items)}
                >
                  ADD +
                </button>
              ) : (
                <div>
                  <button
                    className="bg-slate-500 font-bold py-2 mt-[-20px] w-[34px] text-white rounded-md rounded-tr-none rounded-br-none hover:bg-slate-800 hover:shadow-md transition-all relative -top-4"
                    onClick={() => handleRemoveItem(items)}
                  >
                    -
                  </button>
                  <button className="bg-white font-bold py-2 mt-[-20px] w-[34px] hover:shadow-md transition-all relative -top-4">
                    {
                      cartItems?.filter(
                        (cartItem: CART) => cartItem._id === items._id
                      ).length
                    }
                  </button>
                  <button
                    className="bg-slate-500 font-bold py-2 mt-[-20px] w-[34px] text-white rounded-md rounded-tl-none rounded-bl-none hover:bg-slate-800 hover:shadow-md transition-all relative -top-4"
                    onClick={() => handleAddItem(items)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuSections;
