import Provider from '../models/Provider.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

//Create Provider
export const createProvider = async (req, res) => {
    try {
        const {title, description, deliveryTime} = req.body;

        if (req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newProviderWithImage = new Provider({
                title, description, deliveryTime,
                imgUrl: fileName,
            });

            await newProviderWithImage.save();
            return res.json({newProviderWithImage, message: 'Provider added successfully.'});
        }

        const newProviderWithoutImage = new Provider({
            title, description, deliveryTime,
            imgUrl: '',
        });
        await newProviderWithoutImage.save();
        return res.json({newProviderWithoutImage, message: 'Provider added successfully.'});

    } catch (error) {
        res.json({message: "Error during creation provider."});
        console.log(error);
    }
}

//Get All Providers
export const getAll = async (req, res) => {
    try {
        const providers = await Provider.find();
        if (!providers){
            return res.json({message: "There is no providers."});
        }
        res.json({providers});
    } catch (error) {
        res.json({message: "Error during getting list of providers."});
        console.log(error);
    }
}
