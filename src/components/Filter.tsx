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

export function FilterMenu({ setCafes }: { setCafes: Dispatch<any> }) {
  const [rating, setRating] = useState<number | number[]>(3);
  const [price, setPrice] = useState<number | number[]>([0, 2000]);
  const [deliveryTimeCode, setDeliveryTimeCode] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const filterRating = setTimeout(() => {
      const handleRatingFilter = async () => {
        try {
          const res = await fetch("/api/cafe/filter/rating", {
            method: "POST",
            body: JSON.stringify({ rating: rating }),
          });
          const data = await res.json();
          setCafes(data?.cafe);
        } catch (error) {
          console.log(error);
        }
      };
      handleRatingFilter();
    }, 250);

    filterRating;
    return () => clearTimeout(filterRating);
  }, [rating]);

  useEffect(() => {
    const filterPrice = setTimeout(() => {
      const handleDeliveryTimeFilter = async () => {
        try {
          const res = await fetch("/api/cafe/filter/price", {
            method: "POST",
            body: JSON.stringify({ price: price }),
          });
          const data = await res.json();
          setCafes(data?.cafe);
        } catch (error) {
          console.log(error);
        }
      };
      handleDeliveryTimeFilter();
    }, 250);

    filterPrice;
    return () => clearTimeout(filterPrice);
  }, [price]);

  useEffect(() => {
    const filterDeliveryTime = setTimeout(() => {
      const handleDeliveryTimeFilter = async () => {
        try {
          const res = await fetch("/api/cafe/filter/deliveryTime", {
            method: "POST",
            body: JSON.stringify({ deliveryTimeCode: deliveryTimeCode }),
          });
          const data = await res.json();
          console.log(data);

          setCafes(data?.cafe);
        } catch (error) {
          console.log(error);
        }
      };
      handleDeliveryTimeFilter();
    }, 250);

    filterDeliveryTime;
    return () => clearTimeout(filterDeliveryTime);
  }, [deliveryTimeCode]);

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
                  setRating(e);
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
                onChange={(e) => setPrice(e)}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className=" w-full">
                <h1 className="mb-2">Delivery Time (mins)</h1>
                <div className="flex flex-col justify-between space-y-5">
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => setDeliveryTimeCode(0)}
                  >
                    {"< 30"}
                  </div>
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => setDeliveryTimeCode(1)}
                  >
                    {"< 50"}
                  </div>
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => setDeliveryTimeCode(2)}
                  >
                    {"> 50"}
                  </div>
                  <div
                    className="border-2 border-slate-300 hover:bg-slate-300 font-semibold flex items-center justify-center p-2 rounded-md"
                    onClick={() => setDeliveryTimeCode(3)}
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
