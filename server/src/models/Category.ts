import mongoose, { InferSchemaType } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

interface M_Category extends InferSchemaType<typeof categorySchema> {}

export default mongoose.model<M_Category>("Category", categorySchema);
