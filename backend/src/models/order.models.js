import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        title: {type: String, required: true},
        size: [ {type: String, required: true} ],
        image: { type: String, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        lastname: {
            type: String
        },
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zipcode: {
            type: String
        },
        country: {
            type: String
        },
        phone: {
            type: String
        }
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
    paymentMethod: { type: String, enum: ["stripe", "razorpay", "cash on delivery"], required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model.Order || mongoose.model("Order", orderSchema);
