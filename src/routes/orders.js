const express = require("express");

const router = express.Router();

const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 */
router.get("/", getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create order
 */
router.post("/", createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 */
router.delete("/:id", deleteOrder);

module.exports = router;