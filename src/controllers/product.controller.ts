import { Request, Response } from "express";
import { Product } from "../models/product.model";

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get all products" });
  }
};

// Get product by id
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Not found the product" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get the product" });
  }
};

// Add product
const addProduct = async (req: Request, res: Response) => {
  try {
    const { productName, productPrice } = req.body;
    const product = await Product.create({ productName, productPrice });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to add product" });
  }
};

// Update product by id
const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      res.status(404).json({ message: "Not found the product" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update product" });
  }
};

// Delete product by id
const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Not found the product" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete product" });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
