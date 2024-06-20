import mongoose, { Schema, Document } from "mongoose";

interface cartInterface extends Document {
  cafeId: Schema.Types.ObjectId;
  itemId: Schema.Types.ObjectId;
  itemName: string;
  price: string;
  isVeg: boolean;
  count: number;
}

const cartScehma: Schema<cartInterface> = new Schema({
  cafeId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart =
  (mongoose.models.Cart as mongoose.Model<cartInterface>) ||
  mongoose.model<cartInterface>("Cart", cartScehma);

export default Cart;
