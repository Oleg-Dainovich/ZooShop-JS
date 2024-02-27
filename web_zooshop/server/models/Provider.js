import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },

});

export default mongoose.model('Provider', ProviderSchema);