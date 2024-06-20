import mongoose, { Schema, Document } from "mongoose";

export interface restaurantInterface extends Document {
  name: string;
  rating: string;
  deliveryTime: number;
  costForTwo: number;
}

const restaurantScehma: Schema<restaurantInterface> = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: Number,
    required: true,
  },
  costForTwo: {
    type: Number,
    required: true,
  },
});

const Restaurant =
  (mongoose.models.Restaurant as mongoose.Model<restaurantInterface>) ||
  mongoose.model<restaurantInterface>("Restaurant", restaurantScehma);

export default Restaurant;
