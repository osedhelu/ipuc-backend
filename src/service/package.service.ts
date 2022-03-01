import { MessageResponse } from '@interfaces/httpResponse';
import { Injectable } from '@nestjs/common';
import { product } from '@routes/productos/productos.schema';

@Injectable()
export class PackageService {
    constructor() {

    }
    getPackages(): MessageResponse {
        const timestamp = Number(new Date());
        const data: product[] = [{
            ID: 1,
            Favorite: false,
            name: 'package 100',
            status: false,
            Price: 100,
            img: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gallery/1.jpg',
            Features: 'Dishwasher, Disposal, Separate laundry room, 3/4 bath downstairs, Formal dining room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Hardwood flooring in kitchen, Kitchen island, Solid surface countertops in kitchen, Entry foyer, Front living room, Ceiling fan in master bedroom, Master bedroom separate from other, Mirrored door closet in master bedroom, 2nd bedroom: 11x13, 3rd bedroom: 11x14, 4th Bedroom: 18x13, Alarm system owned, Built-in microwave, Carpet, Ceiling fan(s), Convection oven, Double built-in gas ovens, Gas cooktop, Gas stove, Marble/Stone floors',
            timestamp,
            user: ''
        }, {
            ID: 2,
            Favorite: false,
            name: 'package 500',
            status: false,
            Price: 500,
            img: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gallery/2.jpg',
            Features: 'Dishwasher, Disposal, Separate laundry room, Full bath downstairs, Formal dining room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Pantry, Walk-in pantry, Entry foyer, Formal living room, Rear living room, Vaulted ceiling in living room, Balcony in master bedroom, Master bedroom separate from other, Master bedroom upstairs, Sitting room in master bedroom, Walk-in closet in master bedroom, 2nd bedroom: 13X20, 3rd bedroom: 13X17, 4th Bedroom: 13X18, 5th Bedroom: 14X16, Alarm system owned, Blinds, Built-in electric oven, Built-in microwave, Carpet, Ceiling fan(s), Gas cooktop, Intercom system, Marble/Stone floors, Water conditioner owned, Water filtering system, Window Coverings Throughout',
            timestamp,
            user: ''

        }, {
            ID: 3,
            Favorite: false,
            name: 'package 1000',
            status: false,
            Price: 1000,
            img: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gallery/3.jpg',
            Features: 'Dishwasher, Disposal, Refrigerator, Separate laundry room, Washer/Dryer on 2nd floor, Full bath downstairs, Formal dining room, Downstairs family room, Separate family room, Wet bar in family room, Breakfast nook (eating area), Garden window in kitchen, Granite countertops in kitchen, Kitchen island, Marble/Stone flooring in kitchen, Pantry, Formal living room, Front living room, Master bedroom separate from other, Master bedroom upstairs, Sitting room in master bedroom, Walk-in closet in master bedroom, 2nd bedroom: 16x12, 3rd bedroom: 13x16, 4th Bedroom: 18x12, Alarm system owned, Built-in microwave, Carpet, Ceiling fan(s), Double built-in electric ovens, Gas cooktop, Marble/Stone floors',
            timestamp,
            user: ''

        }, {
            ID: 4,
            Favorite: false,
            name: 'package 5000',
            status: false,
            Price: 5000,
            img: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gallery/4.jpg',
            Features: 'Dishwasher, Disposal, Refrigerator, Separate laundry room, Full bath downstairs, Living/Dining room combo, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Recessed lighting in kitchen, Tile flooring in kitchen, Walk-in pantry, Formal living room, Front living room, Ceiling fan in master bedroom, Master bedroom downstairs, Walk-in closet in master bedroom, 2nd bedroom: 15x13, 3rd bedroom: 12x12, 4th Bedroom: 14x12, Alarm system owned, Blinds, Built-in microwave, Carpet, Ceiling fan(s), Central vacuum, Convection oven, Double built-in electric ovens, Electric cooktop, Intercom system, Tile floors',
            timestamp,
            user: ''
        }, {
            ID: 5,
            Favorite: false,
            name: 'package 10000',
            status: false,
            Price: 10000,
            img: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gallery/5.jpg',
            Features: 'Dishwasher, Disposal, Separate laundry room, Washer/Dryer on 1st floor, Full bath downstairs, Formal dining room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Formal living room, Rear living room, Sunken living room, Vaulted ceiling in living room, Balcony in master bedroom, Ceiling fan in master bedroom, Master bedroom separate from other, Master bedroom upstairs, Walk-in closet in master bedroom, 2nd bedroom: 16X17, 3rd bedroom: 14X16, 4th Bedroom: 13X13, 5th Bedroom: 12X12, Blinds, Built-in microwave, Carpet, Ceiling fan(s), Central vacuum, Double built-in electric ovens, Gas cooktop, Marble/Stone floors, Pot shelves, Water conditioner owned, Water filtering system, Window Coverings Throughout',
            timestamp,
            user: ''
        }];

        return {
            ok: true,
            data
        }
    }
}
