const Router = require("express");

const {
    placeOrder,
    deleteOrder,
    getOrderById,
} = require("../controllers/StoreController");

const router = Router();

router.delete("/order/:orderId", deleteOrder);
router.get("/order/:orderId", getOrderById);
router.post("/order", placeOrder);


module.exports = router;
