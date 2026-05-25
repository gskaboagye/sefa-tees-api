const { ObjectId } = require("mongodb");
const Joi = require("joi");

const { getDB } = require("../database/connect");

const orderSchema = Joi.object({
  customerName: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  totalPrice: Joi.number().required(),
  status: Joi.string().required(),
});

const getOrders = async (req, res) => {
  try {
    const db = getDB();

    const orders = await db
      .collection("orders")
      .find()
      .toArray();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const db = getDB();

    const order = await db
      .collection("orders")
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const db = getDB();

    const result = await db
      .collection("orders")
      .insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const db = getDB();

    const result = await db
      .collection("orders")
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

const deleteOrder = async (req, res) => {
  try {
    const db = getDB();

    const result = await db
      .collection("orders")
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
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};