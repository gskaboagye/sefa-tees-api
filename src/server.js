require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const passport = require("./config/passport");
const { connectDB } = require("./database/connect");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sefa Tees API",
      version: "1.0.0",
      description: "CRUD API for Sefa Tees with GitHub OAuth Authentication",
    },

    components: {
      securitySchemes: {
        githubAuth: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: "http://localhost:3000/auth/github",
              tokenUrl: "http://localhost:3000/auth/github/callback",
              scopes: {},
            },
          },
        },
      },
    },

    servers: [
      {
        url: "https://sefa-tees-api.onrender.com",
      },
      {
        url: "http://localhost:3000",
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

// Authentication Routes
app.use("/auth", authRoutes);

// API Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Sefa Tees API Running with GitHub OAuth");
});

// Profile Route
app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  res.status(200).json(req.user);
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});