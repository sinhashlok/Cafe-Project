"use client";

import { SlidersHorizontal } from "lucide-react";
import { NextUIProvider } from "@nextui-org/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@nextui-org/react";
import { Dispatch, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { CAFE } from "@/utils/interface";

export function FilterMenu({
  setCafeList,
  cafes,
}: {
  setCafeList: Dispatch<any>;
  cafes: any;
}) {
  // QUERY FROM DB
  {
    /*
  const [rating, setRating] = useState<number | number[]>(3);
  const [price, setPrice] = useState<number | number[]>([0, 2000]);
  const [deliveryTimeCode, setDeliveryTimeCode] = useState<0 | 1 | 2 | 3>(0);
  useEffect(() => {
    const filterRating = setTimeout(() => {
      const handleRatingFilter = async () => {
        await axios
          .post("/api/cafe/filter/rating", JSON.stringify({ rating: rating }))
          .then((res: AxiosResponse) => {
            // setCafes(res?.data?.cafe);

          })
          .catch((error: AxiosError) => {
            console.log(error);
            const data: any = error?.response?.data;
            toast.error(data?.message), { duration: 6000 };
          });
      };
      handleRatingFilter();
    }, 250);

    filterRating;
    return () => clearTimeout(filterRating);
  }, [rating]);

  useEffect(() => {
    const filterPrice = setTimeout(() => {
      const handleDeliveryTimeFilter = async () => {
        await axios
          .post("/api/cafe/filter/price", JSON.stringify({ price: price }))
          .then((res: AxiosResponse) => {
            setCafes(res?.data?.cafe);
          })
          .catch((error: AxiosError) => {
            console.log(error);
            const data: any = error?.response?.data;
            toast.error(data?.message), { duration: 6000 };
          });
      };
      handleDeliveryTimeFilter();
    }, 250);

    filterPrice;
    return () => clearTimeout(filterPrice);
  }, [price]);

  useEffect(() => {
    const filterDeliveryTime = setTimeout(() => {
      const handleDeliveryTimeFilter = async () => {
        await axios
          .post(
            "/api/cafe/filter/deliveryTime",
            JSON.stringify({ deliveryTimeCode: deliveryTimeCode })
          )
          .then((res: AxiosResponse) => {
            setCafes(res?.data?.cafe);
          })
          .catch((error: AxiosError) => {
            console.log(error);
            const data: any = error?.response?.data;
            toast.error(data?.message), { duration: 6000 };
          });
      };
      handleDeliveryTimeFilter();
    }, 250);

    filterDeliveryTime;
    return () => clearTimeout(filterDeliveryTime);
  }, [deliveryTimeCode]); 
  */
  }

  const handleRating = (rating: any) => {
    const cafe = cafes.filter((cafe: CAFE) => {
      return cafe.rating >= rating;
    });
    setCafeList(cafe);
  };

  const handlePrice = (price: any) => {
    const cafe = cafes.filter((cafe: CAFE) => {
      if (cafe.costForTwo >= price[0] && cafe.costForTwo <= price[1]) {
        return cafe;
      }
    });

    setCafeList(cafe);
  };

  const handleDeliveryTimeCode = (code: number) => {
    const cafe = cafes.filter((cafe: CAFE) => {
      if (code === 2) {
        return cafe.deliveryTime >= 50;
      } else if (code === 1) {
        return cafe.deliveryTime <= 50;
      } else if (code === 0) {
        return cafe.deliveryTime <= 30;
      }
    });

    if (code === 3) {
      setCafeList(cafes);
    } else {
      setCafeList(cafe);
    }
  };

  return (
    <NextUIProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <SlidersHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 p-2">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <Slider
                size="md"
                step={1}
                color="foreground"
                label="Rating above "
                showSteps={true}
                maxValue={5}
                minValue={0}
                defaultValue={3}
                className="max-w-md"
                onChange={(e) => {
                  handleRating(e);
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <Slider
                label="Price Range"
                step={100}
                minValue={100}
                maxValue={2000}
                defaultValue={[200, 1500]}
                formatOptions={{ style: "currency", currency: "INR" }}
                className="max-w-md"
                onChange={(e) => handlePrice(e)}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className=" w-full">
                <h1 className="mb-2">Delivery Time (mins)</h1>
                <div className="flex flex-col justify-between space-y-5">
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => handleDeliveryTimeCode(0)}
                  >
                    {"< 30"}
                  </div>
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => handleDeliveryTimeCode(1)}
                  >
                    {"< 50"}
                  </div>
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => handleDeliveryTimeCode(2)}
                  >
                    {"> 50"}
                  </div>
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => handleDeliveryTimeCode(3)}
                  >
                    All Delivery time
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </NextUIProvider>
  );
}
