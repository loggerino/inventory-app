const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");
const Brand = require("./models/brand");

const categories = [];
const items = [];
const brands = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createBrands();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function brandCreate(index, name, description, year) {
    const brand = new Brand({ name: name, description: description, year: year });

    await brand.save();
    brands[index] = brand;
    console.log(`Added brand: ${name}`);
}

async function itemCreate(index, name, description, price, stock, size, category, brand) {
    const itemDetail = {
        name: name,
        description: description,
        price: price,
        stock: stock,
        size: size,
    };
    if (category != false) itemDetail.category = category;
    if (brand != false) itemDetail.brand = brand;

    const item = new Item(itemDetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
}

async function createCategories() {
    console.log("Adding Categories");
    await Promise.all([
        categoryCreate(0, "T-shirt", "Casual tops"),
        categoryCreate(1, "Pants", "Bottom wear"),
        categoryCreate(2, "Shoes", "Footwear"),
    ]);
}

async function createBrands() {
    console.log("Adding Brands");
    await Promise.all([
        brandCreate(0, "Nike", "Sportswear", 1964),
        brandCreate(1, "Adidas", "Athletic shoes", 1949),
        brandCreate(2, "Puma", "Performance sports", 1948),
    ]);
}

async function createItems() {
    console.log("Adding Items");
    await Promise.all([
        itemCreate(0,
            "Classic White T-shirt",
            "A simple and comfortable white t-shirt.",
            19.99,
            100,
            ["S", "M", "L"],
            categories[0],
            brands[0]
        ),
        itemCreate(1,
            "Running Shoes",
            "High-performance running shoes for athletes.",
            129.99,
            50,
            ["7", "8", "9"],
            categories[2],
            brands[1]
        ),
        itemCreate(2,
            "Casual Jeans",
            "Comfortable and stylish denim jeans.",
            49.99,
            80,
            ["28", "30", "32"],
            categories[1],
            brands[2]
        ),
        itemCreate(3,
            "Graphic Print Hoodie",
            "A trendy hoodie with a unique graphic print.",
            39.99,
            60,
            ["M", "L", "XL"],
            categories[0],
            brands[0]
        ),
        itemCreate(4,
            "Leather Sneakers",
            "Stylish leather sneakers for everyday wear.",
            89.99,
            70,
            ["8", "9", "10"],
            categories[2],
            brands[2]
        ),
    ]);
}