import mongoose, { Schema, Document } from "mongoose";

export interface mennuInterface {
  id: number;
  itemName: string;
  price: string;
  rating: string;
  isVeg: boolean;
  description: string;
}

export interface restaurantItemsInterface extends Document {
  cafeId: Schema.Types.ObjectId;
  recommended: mennuInterface[];
  coffee: mennuInterface[];
  sandwich: mennuInterface[];
  drinks: mennuInterface[];
}

const restaurantItemsScehma: Schema<restaurantItemsInterface> = new Schema({
  cafeId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  recommended: {
    type: [
      {
        id: Number,
        itemName: String,
        price: String,
        rating: String,
        isVeg: Boolean,
        description: String,
      },
    ],
    required: true,
  },
  coffee: {
    type: [
      {
        id: Number,
        itemName: String,
        price: String,
        rating: String,
        isVeg: Boolean,
        description: String,
      },
    ],
    required: true,
  },
  sandwich: {
    type: [
      {
        id: Number,
        itemName: String,
        price: String,
        rating: String,
        isVeg: Boolean,
        description: String,
      },
    ],
    required: true,
  },
  drinks: {
    type: [
      {
        id: Number,
        itemName: String,
        price: String,
        rating: String,
        isVeg: Boolean,
        description: String,
      },
    ],
    required: true,
  },
});

const RestaurantItems =
  (mongoose.models
    .RestaurantItems as mongoose.Model<restaurantItemsInterface>) ||
  mongoose.model<restaurantItemsInterface>(
    "RestaurantItems",
    restaurantItemsScehma
  );

  export default RestaurantItems;