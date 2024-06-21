"use client";

import Link from "next/link";
import CafeCard from "@/components/CafeCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItem, clearCart } from "@/redux/features/cartSlice";
import { CAFE, CART } from "@/utils/interface";

const Page = () => {
  const [cafes, setCafes] = useState<any>([]);
  const [searchText, setSearchText] = useState<any>("");
  const dispatch = useDispatch();
  let time: number = 0;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/cafe/getAllCafe");
      const data = await res.json();

      setCafes(data?.data);
    }
    async function getCart() {
      const res = await fetch("/api/cafe/cart/getCart");
      const data = await res.json();
      const cart = data?.data;
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
    fetchData();
    getCart();
  }, []);

  useEffect(() => {
    // Debouncing - 500ms
    const getData = setTimeout(() => {
      const handleSearch = async () => {
        try {
          const res = await fetch("/api/cafe/search", {
            method: "POST",
            body: JSON.stringify({ search: searchText }),
          });
          const data = await res.json();
          setCafes(data?.cafe);
        } catch (error) {
          console.log(error);
        }
      };
      handleSearch();
    }, 500);
    getData;

    return () => clearTimeout(getData);
  }, [searchText]);

  return (
    <div className="px-8 py-8 font">
      <motion.div
        initial={{ y: "20vh", opacity: 0 }}
        animate={{
          y: "0vh",
          opacity: 1,
          transition: { duration: 0.25, delay: 1 },
        }}
        className="flex flex-col items-center justify-center mb-10"
      >
        <div className="flex flex-row items-center">
          <input
            type="text"
            className="appearance-none border border-slate-500 rounded-xl mr-2 py-3 px-5 text-gray-700 leading-tight"
            value={searchText}
            placeholder="Search for Cafe"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      </motion.div>
      {cafes.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          No Cafe Found
        </div>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-14 lg:gap-10 xl:gap-x-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.75, delay: 0.24 } }}
        >
          {cafes.map((cafe: CAFE) => {
            time += 0.25;
            return (
              <div
                key={cafe?._id}
                className="hover:scale-[115%] transition-all ease-in-out"
              >
                <Link
                  href={`/${cafe?._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <CafeCard
                    name={cafe?.name}
                    rating={cafe?.rating}
                    deliveryTime={cafe?.deliveryTime}
                    costForTwo={cafe?.costForTwo}
                    reviews={cafe?.reviews}
                    delay={time}
                  />
                </Link>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Page;
