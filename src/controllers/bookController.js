import Book from "../models/Book.js";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

const save = async (req, res) => {
  const { title, description, price, category } = req.body;
  const bookPrice = parseFloat(price);
  const { id } = req.params;
  const state = "list";

  try {
    let image = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      image = result.secure_url;
    }
    const newBook = new Book({
      userId: id,
      title,
      description,
      image,
      price: bookPrice,
      category,
      state: state,
    });
    await newBook.save();

    res.status(200).json({ success: "Book saved succesfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error });
  }
};

const list = async (req, res) => {
  try {
    const books = await Book.find({ state: "list" });

    res
      .status(200)
      .json({ success: "Book retrieved succesfully", books: books });
  } catch (error) {
    res.status(400).json({ error: "Book error", details: error });
  }
};

const recentBooks = async (req, res) => {
  try {
    const books = await Book.find({ state: "list" })
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ error: "Error in getting the books" });
  }
};

const getUsersBooks = async (req, res) => {
  const { id } = req.params;
  try {
    const books = await Book.find({ userId: id });

    res
      .status(200)
      .json({ success: "Books retrieved succesfully", books: books });
  } catch (error) {
    res.status(400).json({ error: "Book error", details: error });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const books = await Book.findByIdAndDelete(id);

    res.status(200).json({ success: "Book deleted succesfully" });
  } catch (error) {
    res.status(400).json({ error: "Book error", details: error });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;
  let image;

  try {
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      image = result.secure_url;
    }

    const updateFields = {
      title,
      description,
      price: parseFloat(price),
      category,
    };

    if (image) {
      updateFields.image = image;
    }
    const updatedBooks = await Book.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res.status(200).json({ success: true, books: updatedBooks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const bookBought = async (req, res) => {
  const { id } = req.params;
  const state = "bought";

  try {
    const book = await Book.findByIdAndUpdate(
      { _id: id },
      { state },
      { new: true }
    );
    res.status(200).json({ success: "bought succesfully", books: book });
  } catch (error) {
    res.status(500).json({ error: "Book error", details: error });
  }
};

const toggleFavorite = async (req, res) => {
  const id = req.params.id;
  const idUser = req.body.idUser;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(400).json({ message: "Libro no encontrado" });

    const isFavorited = book.favorites.includes(idUser);

    if (isFavorited) {
      book.favorites.pull(idUser);
    } else {
      book.favorites.push(idUser);
    }

    await book.save();
    res.status(200).json({
      success: true,
      message: isFavorited
        ? "Libro quitado de favoritos"
        : "Libro añadido a favoritos",
      favorites: book.favorites,
    });
  } catch (error) {
    res.status(500).json({ error: "Book error", details: error });
  }
};

const getFavorite = async (req, res) => {
  const userId = req.params.id;

  try {
    const favoriteBook = await Book.find({ favorites: userId });

    res.status(200).json({ success: "Libros favoritos", book: favoriteBook });
  } catch (error) {
    res.status(500).json({ error: "Book error", details: error });
  }
};

export {
  save,
  list,
  recentBooks,
  getUsersBooks,
  deleteBook,
  updateBook,
  bookBought,
  toggleFavorite,
  getFavorite,
};
