// Common Customizations
const milkCustomizations = {
    id: 'milk',
    name: 'Milk',
    type: 'single',
    options: [
        { id: 'regular', name: 'Regular', price: 0 },
        { id: 'oat', name: 'Oat', price: 40 },
        { id: 'almond', name: 'Almond', price: 50 },
    ],
};
const sizeCustomizations = {
    id: 'size',
    name: 'Size',
    type: 'single',
    options: [
        { id: 'small', name: 'Small', price: 0 },
        { id: 'medium', name: 'Medium', price: 30 },
        { id: 'large', name: 'Large', price: 60 },
    ],
};
const coffeeExtras = {
    id: 'extras',
    name: 'Extras',
    type: 'multiple',
    options: [
        { id: 'extra-espresso', name: 'Extra Espresso', price: 50 },
        { id: 'extra-caramel', name: 'Extra Caramel', price: 30 },
        { id: 'vanilla-syrup', name: 'Vanilla Syrup', price: 30 },
        { id: 'whipped-cream', name: 'Whipped Cream', price: 30 },
    ],
};
const sugarCustomizations = {
    id: 'sugar',
    name: 'Sugar',
    type: 'single',
    options: [
        { id: 'regular-sugar', name: 'Regular', price: 0 },
        { id: 'less-sugar', name: 'Less', price: 0 },
        { id: 'no-sugar', name: 'No Sugar', price: 0 },
    ],
};
const standardCoffeeCustomizations = [sizeCustomizations, milkCustomizations, coffeeExtras, sugarCustomizations];
// Categories
export const categories = [
    { id: 'coffee', name: 'Coffee', description: 'From classic espresso to handcrafted signature lattes.' },
    { id: 'cold-coffee', name: 'Cold Coffee', description: 'Chilled, refreshing, and perfectly brewed.' },
    { id: 'tea', name: 'Tea', description: 'Comforting teas sourced from the finest gardens.' },
    { id: 'breakfast', name: 'Breakfast', description: 'Start your day right with our morning favorites.' },
    { id: 'sandwiches', name: 'Sandwiches', description: 'Freshly toasted, packed with flavor.' },
    { id: 'burgers', name: 'Burgers', description: 'Juicy, satisfying, and made to order.' },
    { id: 'pizza', name: 'Pizza', description: 'Hand-tossed with our signature sauces.' },
    { id: 'pasta', name: 'Pasta', description: 'Classic Italian comfort food.' },
    { id: 'snacks', name: 'Snacks', description: 'Perfect bites to accompany your drink.' },
    { id: 'desserts', name: 'Desserts', description: 'Sweet treats for every craving.' },
    { id: 'ice-cream', name: 'Ice Cream', description: 'Cool and creamy indulgence.' },
    { id: 'mocktails', name: 'Mocktails', description: 'Vibrant, refreshing, and alcohol-free.' },
];
export const menuItems = [
    // COFFEE
    {
        id: 'c-1', categoryId: 'coffee', name: 'Espresso', description: 'Rich and intense shot of pure coffee.', price: 120, rating: 4.5, prepTime: '5 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=80', customizations: [sugarCustomizations]
    },
    {
        id: 'c-2', categoryId: 'coffee', name: 'Double Espresso', description: 'Two shots of rich espresso.', price: 150, rating: 4.6, prepTime: '5 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=80', customizations: [sugarCustomizations]
    },
    {
        id: 'c-3', categoryId: 'coffee', name: 'Americano', description: 'Espresso over hot water.', price: 140, rating: 4.4, prepTime: '5-7 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80', customizations: [sizeCustomizations, sugarCustomizations]
    },
    {
        id: 'c-4', categoryId: 'coffee', name: 'Cappuccino', description: 'Espresso with steamed milk and deep layer of foam.', price: 180, rating: 4.7, prepTime: '8-10 min', isVeg: true, isBestseller: true,
        imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80', customizations: standardCoffeeCustomizations
    },
    {
        id: 'c-5', categoryId: 'coffee', name: 'Café Latte', description: 'Espresso balanced with steamed milk and a light layer of foam.', price: 190, rating: 4.6, prepTime: '8-10 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80', customizations: standardCoffeeCustomizations
    },
    {
        id: 'c-6', categoryId: 'coffee', name: 'Flat White', description: 'Espresso with steamed sweet milk and no foam.', price: 200, rating: 4.5, prepTime: '8-10 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&q=80', customizations: [milkCustomizations, sugarCustomizations]
    },
    {
        id: 'c-7', categoryId: 'coffee', name: 'Mocha', description: 'Espresso with bittersweet mocha sauce and steamed milk.', price: 220, rating: 4.8, prepTime: '8-10 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80', customizations: standardCoffeeCustomizations
    },
    {
        id: 'c-8', categoryId: 'coffee', name: 'Caramel Macchiato', description: 'Smooth espresso, steamed milk, vanilla and rich caramel.', price: 230, rating: 4.8, prepTime: '8-10 min', isVeg: true, isBestseller: true,
        ingredients: ['Espresso', 'Milk', 'Vanilla', 'Caramel'],
        imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&q=80', customizations: standardCoffeeCustomizations
    },
    {
        id: 'c-9', categoryId: 'coffee', name: 'Vanilla Latte', description: 'Espresso, steamed milk, and vanilla syrup.', price: 220, rating: 4.7, prepTime: '8-10 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80', customizations: standardCoffeeCustomizations
    },
    {
        id: 'c-10', categoryId: 'coffee', name: 'Hazelnut Latte', description: 'Espresso, steamed milk, and hazelnut syrup.', price: 230, rating: 4.6, prepTime: '8-10 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80', customizations: standardCoffeeCustomizations
    },
    // COLD COFFEE
    {
        id: 'cc-1', categoryId: 'cold-coffee', name: 'Classic Cold Coffee', description: 'Blended coffee, milk, and vanilla ice cream.', price: 210, rating: 4.5, prepTime: '8-10 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80'
    },
    {
        id: 'cc-2', categoryId: 'cold-coffee', name: 'Iced Latte', description: 'Chilled espresso and milk over ice.', price: 200, rating: 4.6, prepTime: '5-7 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80', customizations: standardCoffeeCustomizations
    },
    {
        id: 'cc-3', categoryId: 'cold-coffee', name: 'Iced Americano', description: 'Espresso and water over ice.', price: 170, rating: 4.3, prepTime: '5 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80'
    },
    {
        id: 'cc-4', categoryId: 'cold-coffee', name: 'Mocha Frappe', description: 'Blended coffee, mocha sauce, milk, and ice.', price: 240, rating: 4.7, prepTime: '8-10 min', isVeg: true, isBestseller: true,
        imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80'
    },
    {
        id: 'cc-5', categoryId: 'cold-coffee', name: 'Caramel Frappe', description: 'Blended coffee, caramel syrup, milk, and ice.', price: 250, rating: 4.8, prepTime: '8-10 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80'
    },
    {
        id: 'cc-6', categoryId: 'cold-coffee', name: 'Java Chip Frappe', description: 'Mocha sauce, Frappuccino chips, coffee, and milk blended with ice.', price: 270, rating: 4.9, prepTime: '8-10 min', isVeg: true, isBestseller: true,
        imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80'
    },
    {
        id: 'cc-7', categoryId: 'cold-coffee', name: 'Cold Brew', description: 'Slow-steeped custom blend.', price: 220, rating: 4.6, prepTime: '5 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80'
    },
    {
        id: 'cc-8', categoryId: 'cold-coffee', name: 'Vanilla Cold Brew', description: 'Cold brew infused with vanilla.', price: 240, rating: 4.7, prepTime: '5 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80'
    },
    {
        id: 'cc-9', categoryId: 'cold-coffee', name: 'Caramel Cold Brew', description: 'Cold brew sweetened with caramel.', price: 250, rating: 4.8, prepTime: '5 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80'
    },
    // PIZZA (Selected few for brevity, will add others as needed)
    {
        id: 'p-1', categoryId: 'pizza', name: 'Margherita', description: 'Classic cheese and tomato sauce.', price: 320, rating: 4.5, prepTime: '15-20 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80'
    },
    {
        id: 'p-2', categoryId: 'pizza', name: 'Farmhouse', description: 'Onion, crisp capsicum, mushroom & fresh tomato.', price: 380, rating: 4.7, prepTime: '15-20 min', isVeg: true, isBestseller: true,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80'
    },
    {
        id: 'p-3', categoryId: 'pizza', name: 'Paneer Tikka', description: 'Spiced paneer, capsicum, and onions.', price: 420, rating: 4.6, prepTime: '15-20 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80'
    },
    {
        id: 'p-7', categoryId: 'pizza', name: 'BBQ Chicken', description: 'Smoked chicken, BBQ sauce, and cheese.', price: 450, rating: 4.8, prepTime: '15-20 min', isVeg: false,
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80'
    },
    // BURGERS
    {
        id: 'b-1', categoryId: 'burgers', name: 'Classic Veg Burger', description: 'Vegetable patty with lettuce, tomato, and mayo.', price: 250, rating: 4.4, prepTime: '10-15 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'
    },
    {
        id: 'b-4', categoryId: 'burgers', name: 'Cheese Burger', description: 'Classic burger with a slice of melted cheddar.', price: 300, rating: 4.7, prepTime: '10-15 min', isVeg: true, isBestseller: true,
        imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80'
    },
    {
        id: 'b-6', categoryId: 'burgers', name: 'Classic Chicken Burger', description: 'Juicy chicken patty, lettuce, tomato, and mayo.', price: 320, rating: 4.6, prepTime: '12-15 min', isVeg: false,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'
    },
    // DESSERTS
    {
        id: 'd-1', categoryId: 'desserts', name: 'Classic Cheesecake', description: 'Creamy New York style cheesecake.', price: 280, rating: 4.8, prepTime: 'Ready', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500&q=80'
    },
    {
        id: 'd-3', categoryId: 'desserts', name: 'Chocolate Brownie', description: 'Warm, gooey chocolate brownie.', price: 220, rating: 4.9, prepTime: 'Ready', isVeg: true, isBestseller: true,
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80'
    },
    {
        id: 'd-6', categoryId: 'desserts', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert.', price: 320, rating: 4.7, prepTime: 'Ready', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500&q=80'
    },
    // TEA
    {
        id: 't-1', categoryId: 'tea', name: 'Masala Chai', description: 'Spiced Indian tea.', price: 100, rating: 4.7, prepTime: '5-8 min', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=500&q=80'
    },
    // BREAKFAST
    {
        id: 'br-10', categoryId: 'breakfast', name: 'Butter Croissant', description: 'Flaky, buttery French pastry.', price: 140, rating: 4.6, prepTime: 'Ready', isVeg: true,
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80'
    }
];
export const specials = [
    menuItems.find(i => i.id === 'c-8'), // Caramel Macchiato
    menuItems.find(i => i.id === 'p-2'), // Farmhouse
    menuItems.find(i => i.id === 'd-3'), // Chocolate Brownie
    menuItems.find(i => i.id === 'b-6'), // Chicken Burger
].filter(Boolean);
export const getCategoryItems = (categoryId) => menuItems.filter(item => item.categoryId === categoryId);
