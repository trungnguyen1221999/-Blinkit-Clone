import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  image: {
    type: Array,
    default: [],
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  SubCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  unit: {
    type: String,
    default: "",
  },
  stock: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: null,
  },
  discout: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    default: "",
  },
  more_details: {
    type: Object,
    default: {},
  },
  publish: {
    type: Boolean,
    default: false,
  },
});

export const ProductModels = mongoose.model("Product", productSchema);
