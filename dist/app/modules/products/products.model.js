"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name!'],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, 'The brand of the bicycle is required.'],
        trim: true,
        enum: {
            values: [
                'Trek',
                'Giant',
                'Specialized',
                'Cannondale',
                'Scott',
                'Santa Cruz',
                'Bianchi',
                'Merida',
                'Cervélo',
                'Orbea',
                'Fuji',
                'Cube',
                'Marin',
                'Kona',
                'Raleigh',
                'GT Bicycles',
                'Polygon',
                'Norco',
                'BMC',
                'Yeti Cycles',
            ],
            message: '{VALUE} is not a valid bicycle brand.',
        },
    },
    images: {
        type: [String],
        required: [true, 'Product image is required.'],
    },
    price: {
        type: Number,
        required: [true, 'The price of the bicycle is required.'],
        min: [0, 'Price must be a positive number.'],
    },
    model: {
        type: String,
        enum: {
            values: [
                'ModelX100',
                'TrailBlazer',
                'SpeedsterPro',
                'UrbanRider',
                'EcoCruise',
                'XtremeBMX',
                'PowerPedal',
                'FoldMaster',
                'JuniorJoy',
                'TouringPro',
                'GravelGrinder',
                'FatTireX',
                'RecuRide',
                'TandemExpress',
                'TrackStar',
            ],
            message: '{VALUE} is not a valid bicycle midel.',
        },
        required: [true, 'The model of the bicycle is required.'],
    },
    category: {
        type: String,
        enum: {
            values: [
                'Mountain',
                'Road',
                'Hybrid',
                'BMX',
                'Electric',
                'Cruiser',
                'Folding',
                'Kids',
                'Touring',
                'Cyclocross',
                'Gravel',
                'Fat',
                'Recumbent',
                'Tandem',
                'Track',
            ],
            message: '{VALUE} is not a valid bicycle category.',
        },
        required: [true, 'The category of the bicycle is required.'],
    },
    description: {
        type: String,
        required: [true, 'The description of the bicycle is required.'],
    },
    quantity: {
        type: Number,
        required: [true, 'The quantity of the bicycle is required.'],
        min: [0, 'The quantity must be at least 0.'],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
// Create the product model
exports.Product = (0, mongoose_1.model)('Product', productSchema);
