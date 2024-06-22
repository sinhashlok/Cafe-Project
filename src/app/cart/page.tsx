"use client";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "@/redux/features/cartSlice";
import { useEffect } from "react";
import Payment from "@/components/payment";
import { CART, UPDATE_CART } from "@/utils/interface";
import { motion } from "framer-motion";
import { RootState } from "@/redux/store";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((store: RootState) => store.cart.items);
  let totalCost = 0;
  let data: any = [];
  cartItems.map((item: CART) => {
    let index = data.findIndex((x: any) => x._id === item._id);
    if (index === -1) {
      data.push({
        ...item,
        count: 1,
      });
    } else {
      data[index].count += 1;
    }

    totalCost += parseInt(item.price);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCart() {
      const cart = await axios
        .post("/api/cafe/cart/getCart", JSON.stringify({}))
        .then((res: AxiosResponse) => {
          return res?.data?.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
          const data: any = error?.response?.data;
          toast.error(data?.message), { duration: 6000 };
        });

      dispatch(clearCart());
      cart?.map((item: CART) => {
        for (let i = item.count; i > 0; i--) {
          dispatch(
            addItem({
              _id: item._id,
              itemName: item.itemName,
              price: item.price,
              rating: item.rating,
              isVeg: item.isVeg,
              cafeId: item.cafeId,
            })
          );
        }
      });
    }
    getCart();
  }, []);

  const handleAdd = async (item: UPDATE_CART) => {
    await axios
      .post(
        "/api/cafe/cart/addItem",
        JSON.stringify({
          cafeId: item.cafeId,
          itemId: item._id,
          itemName: item.itemName,
          price: item.price,
          isVeg: item.isVeg,
        })
      )
      .then(() => {
        dispatch(addItem(item));
      })
      .catch((error: AxiosError) => {
        console.log(error);
        const data: any = error?.response?.data;
        toast.error(data?.message), { duration: 6000 };
      });
  };

  const handleRemove = async (item: UPDATE_CART) => {
    await axios
      .post("/api/cafe/cart/addItem", JSON.stringify({ itemId: item._id }))
      .then(() => {
        dispatch(
          removeItem({
            _id: item.itemId,
            itemName: item.itemName,
            price: item.price,
            rating: item.rating,
            isVeg: item.isVeg,
            cafeId: item.cafeId,
          })
        );
      })
      .catch((error: AxiosError) => {
        console.log(error);
        const data: any = error?.response?.data;
        toast.error(data?.message), { duration: 6000 };
      });
  };

  const handleClear = async () => {
    await axios
      .post("/api/cafe/cart/clearCart")
      .then(() => {
        dispatch(clearCart());
      })
      .catch((error: AxiosError) => {
        console.log(error);
        const data: any = error?.response?.data;
        toast.error(data?.message), { duration: 6000 };
      });
  };

  return (
    <motion.div
      className="flex flex-col mt-10 max-md:mt-8 mx-2 sm:mx-12 md:mx-24 lg:mx-32 xl:mx-52"
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 1,
        },
      }}
    >
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-2 max-md:text-xl">Cart</h1>
        {cartItems.length != 0 && (
          <button
            className="bg-red-400 px-4 py-2 font-semibold text-white rounded-md hover:bg-red-600 transition-all"
            onClick={handleClear}
          >
            Clear Cart
          </button>
        )}
      </div>
      <div>
        {cartItems.length === 0 ? (
          <h1 className="text-xl font-semibold text-slate-400">
            Your cart is empty
          </h1>
        ) : (
          data.map((item: CART) => {
            return (
              <div
                key={item._id}
                className="flex justify-between items-center border-b-2 border-indigo-200 last:border-0 py-4"
              >
                <div className="flex flex-col">
                  <img
                    src="/assets/coffee.jpg"
                    alt="coffee"
                    className="h-32 md:h-40 rounded-3xl mb-2"
                  />
                  <div>
                    <h1 className="text-2xl font-bold mr-5">{item.itemName}</h1>
                    <h1 className="text-lg text-slate-500">₹{item.price}</h1>
                  </div>
                </div>
                {
                  <div>
                    <button
                      className="bg-slate-500 px-4 py-2 text-white rounded-md rounded-tr-none rounded-br-none hover:bg-slate-800 transition-all"
                      onClick={() => handleRemove(item)}
                    >
                      -
                    </button>
                    <button className="bg-white font-bold py-2 mt-[-20px] w-[34px] hover:shadow-md transition-all">
                      {item.count}
                    </button>
                    <button
                      className="bg-slate-500 px-4 py-2 text-white rounded-md rounded-tl-none rounded-bl-none hover:bg-slate-800 transition-all"
                      onClick={() => handleAdd(item)}
                    >
                      +
                    </button>
                  </div>
                }
              </div>
            );
          })
        )}
      </div>
      {cartItems.length === 0 ? null : (
        <div className="border-t-2 border-red-200 mt-4 pt-4 text-xl">
          <div className="flex justify-between p-2 rounded-md">
            Total Cost: <div className="text-red-500">₹{totalCost}</div>
          </div>
        </div>
      )}
      <Payment amount={totalCost} />
    </motion.div>
  );
};

export default Cart;
