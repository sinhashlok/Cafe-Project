"use client";

import { useEffect, useState } from "react";
import MenuSections from "@/components/MenuSections";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { CAFE, CAFE_MENU } from "@/utils/interface";
import { MapPin } from "lucide-react";
import { CART } from "@/utils/interface";
import { useDispatch } from "react-redux";
import { addItem, clearCart } from "@/redux/features/cartSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const RestaurantMenu = () => {
  const pathname = usePathname();
  const cafeId = pathname.split("/")[1];
  const [cafe, setCafe] = useState<CAFE>();
  const [cafeMenu, setCafeMenu] = useState<CAFE_MENU>();

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
    async function fetchData() {
      await axios
        .post("/api/cafe/getCafeById", JSON.stringify({ cafeId: cafeId }))
        .then((res: AxiosResponse) => {
          setCafe(res.data?.data[0]);
          setCafeMenu(res.data?.data[1][0]);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          const data: any = error?.response?.data;
          toast.error(data?.message), { duration: 6000 };
        });
    }

    fetchData();
    getCart();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1 } }}
      >
        <div className="bg-black w-52 h-52 rounded-full absolute -bottom-20 -left-20 -z-20 hidden xl:flex" />
        <div className="bg-black w-96 h-96 rounded-full absolute -bottom-[1000px] right-[100px] -z-20 hidden xl:flex" />
        <div className="mt-10 sm:mx-12 md:mx-24 lg:mx-32 xl:mx-52">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.25,
              },
            }}
            className="z-10 w-full text-white flex flex-rows justify-center lg:justify-start mb-20"
          >
            <div className="bg-black p-10 rounded-[50px]">
              <h1 className="text-2xl font-semibold mb-5 max-md:text-center">
                {cafe?.name}
              </h1>
              <div>
                <div className="flex flex-col gap-x-20 md:flex-row justify-center md:justify-between md:items-end max-md:text-center">
                  <div className="flex flex-col justify-center">
                    <h4>⭐️ {cafe?.rating}</h4>
                    <span className="flex mx-auto">
                      <MapPin /> {cafe?.deliveryTime} mins away
                    </span>
                  </div>
                  <div>
                    {" "}
                    <span className="font-semibold">
                      ₹{cafe?.costForTwo}/-
                    </span>{" "}
                    for two
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="py-10 bg-white border-2 border-black  rounded-t-3xl md:rounded-t-[90px]">
            <MenuSections
              menuItem={cafeMenu?.recommended}
              cafeId={cafeId}
              title={"Recommended"}
            />
            <MenuSections
              menuItem={cafeMenu?.coffee}
              cafeId={cafeId}
              title={"Coffee"}
            />
            <MenuSections
              menuItem={cafeMenu?.sandwich}
              cafeId={cafeId}
              title={"Sandwich"}
            />
            <MenuSections
              menuItem={cafeMenu?.drinks}
              cafeId={cafeId}
              title={"Drinks"}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantMenu;
