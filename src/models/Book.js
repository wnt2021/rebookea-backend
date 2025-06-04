import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    category: {
      type: String,
      required: [true, "La categoria es obligatoria"],
    },
    image: {
      type: String,
    },
    state: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
