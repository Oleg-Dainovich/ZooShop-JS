import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Coupon', CouponSchema);