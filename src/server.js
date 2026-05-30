const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ADD THIS
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const { connectDB } = require("./database/connect");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

dotenv.config();

const app = express();

app.use(cors()); // ADD THIS
app.use(express.json());

connectDB();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sefa Tees API",
      version: "1.0.0",
      description: "CRUD API for Sefa Tees",
    },
    servers: [
      {
        url: "https://sefa-tees-api.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Sefa Tees API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});