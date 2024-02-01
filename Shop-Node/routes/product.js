const express = require("express");
const router = express.Router();

const {
    getProductById, 
    createProduct, 
    getProduct, 
    photo,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");


// All of params
router.param("userId", getUserById);
router.param("productId", getProductById);

// All of actual routes
// create route
router.post(
    "/product/create/:userId",
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createProduct
);

// Read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Delete route
router.delete(
    "/product/:productId/:userId",
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    deleteProduct
);

// Update route
router.put(
    "/product/:productId/:userId",
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    updateProduct
);

// Listing route
router.get("/products", getAllProducts);

router.get("products/categories", getAllUniqueCategories);

module.exports = router;