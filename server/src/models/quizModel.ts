import mongooose, { InferSchemaType } from "mongoose";

const quizSchema = new mongooose.Schema(
  {
    author: {
      type: mongooose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    coverPhoto: {
      type: String,
      required: true,
    },
    questions: {
      type: [{ type: mongooose.Schema.Types.ObjectId, ref: "Question" }],
      required: true,
    },
  },
  { timestamps: true }
);

interface M_Quiz extends InferSchemaType<typeof quizSchema> {}

export default mongooose.model<M_Quiz>("Quiz", quizSchema);
