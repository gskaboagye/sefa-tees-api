const express = require("express");

const router = express.Router();

const isAuthenticated = require("../middleware/authenticate");

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
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create order
 *     security:
 *       - githubAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 *       401:
 *         description: Unauthorized
 */
router.post("/", isAuthenticated, createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", isAuthenticated, updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 *     security:
 *       - githubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", isAuthenticated, deleteOrder);

module.exports = router;