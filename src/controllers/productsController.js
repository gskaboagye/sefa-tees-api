const { ObjectId } = require("mongodb");
const Joi = require("joi");

const { getDB } = require("../database/connect");

const productSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category: Joi.string().required(),
});

const getProducts = async (req, res) => {
  try {
    const db = getDB();

    const products = await db
      .collection("products")
      .find()
      .toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const db = getDB();

    const product = await db
      .collection("products")
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const db = getDB();

    const result = await db
      .collection("products")
      .insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const db = getDB();

    const result = await db
      .collection("products")
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: req.body,
        }
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const db = getDB();

    const result = await db
      .collection("products")
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};