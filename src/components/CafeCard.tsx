import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const CafeCard = ({
  name,
  rating,
  deliveryTime,
  costForTwo,
  reviews,
  delay,
}: {
  name: string;
  rating: number;
  deliveryTime: number;
  costForTwo: number;
  delay: number;
  reviews: number
}) => {
  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: delay,
        },
      }}
      className="flex flex-col justify-between mb-5 hover:rounded-3xl p-4 hover:shadow-2xl hover:absolute"
    >
      <img
        src="/assets/coffee.jpg"
        alt="cafe-1"
        className="h-44 md:h-52 object-cover mb-2 rounded-3xl"
      />
      <div>
        <h3 className="text-lg font-semibold relative">{name}</h3>
      </div>
      <div className="flex flex-row md:justify-between md:items-end mt-2 text-sm">
        <div>
          <h4 className="flex items-center text-lg">
            ⭐️ {rating} ·{" "}
            <span className="ml-2 text-slate-500 text-sm font-medium">
              {reviews} Reviews
            </span>
          </h4>
          <span className="flex items-center">
            <MapPin /> {deliveryTime} mins away
          </span>
        </div>
        <div>
          {" "}
          <span className="font-semibold">₹{costForTwo}/-</span> for two
        </div>
        <div></div>
      </div>
    </motion.div>
  );
};

export default CafeCard;
