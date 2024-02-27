import Coupon from '../models/Coupon.js';

//Create Coupon
export const createCoupon = async (req, res) => {
    try {
        const {title, description, discount} = req.body;

        const newCoupon = new Coupon({
            title, description, discount,
        });
        await newCoupon.save();
        return res.json({newCoupon, message: 'Coupon added successfully.'});

    } catch (error) {
        res.json({message: "Error during creation coupon."});
        console.log(error);
    }
}

//Get All Coupons
export const getAll = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        if (!coupons){
            return res.json({message: "There is no coupons."});
        }
        res.json({coupons});
    } catch (error) {
        res.json({message: "Error during getting list of coupons."});
        console.log(error);
    }
}
