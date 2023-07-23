import { Schema, model } from "mongoose";

const Productschema = new Schema(
  {
    title: { type: String, require: true },
    comment: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Products = model("Product", Productschema);
export default Products;
