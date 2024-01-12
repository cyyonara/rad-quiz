import mongoose, { InferSchemaType } from "mongoose";

const optionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  isRightAnswer: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      reqired: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [optionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

interface M_Question extends InferSchemaType<typeof questionSchema> {}

export default mongoose.model<M_Question>("Question", questionSchema);
