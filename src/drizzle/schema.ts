//creating the schema for the database restaurant_management system

import { integer, varchar, primaryKey, foreignKey, boolean, decimal, date} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

// 1. Address Table
// Each address is linked to a user and a city
export const address = pgTable('address', {
    id: integer('id').primaryKey(),
    street_address_1: varchar('street_address_1'),
    street_address_2: varchar('street_address_2'),
    zip_code: varchar('zip_code'),
    delivery_instructions: varchar('delivery_instructions'),
    user_id: integer('user_id').references(() => users.id), // FK to users (1:many, one user can have multiple addresses)
    city_id: integer('city_id').references(() => city.id), // FK to city (1:many, one city can have multiple addresses)
    created_at: date('created_at'),
    updated_at: date('updated_at')
});

// 2. Category Table
// Independent table with no foreign key relationships
export const category = pgTable('category', {
    id: integer('id').primaryKey(),
    name: varchar('name')
});

// 3. City Table
// Each city is linked to a state
export const city = pgTable('city', {
    id: integer('id').primaryKey(),
    name: varchar('name'),
    state_id: integer('state_id').references(() => state.id) // FK to state (1:many, one state can have multiple cities)
});

// 4. Comment Table
// Each comment is linked to an order and a user
export const comment = pgTable('comment', {
    id: integer('id').primaryKey(),
    order_id: integer('order_id').references(() => orders.id), // FK to orders (1:many, one order can have multiple comments)
    user_id: integer('user_id').references(() => users.id), // FK to users (1:many, one user can have multiple comments)
    comment_text: varchar('comment_text'),
    is_complaint: boolean('is_complaint'),
    is_praise: boolean('is_praise'),
    created_at: date('created_at'),
    updated_at: date('updated_at')
});

// 5. Driver Table
// Each driver is linked to a user
export const driver = pgTable('driver', {
    id: integer('id').primaryKey(),
    car_make: varchar('car_make'),
    car_model: varchar('car_model'),
    car_year: integer('car_year'),
    user_id: integer('user_id').references(() => users.id), // FK to users (1:1, one user is one driver)
    online: boolean('online'),
    delivering: boolean('delivering'),
    created_at: date('created_at'),
    updated_at: date('updated_at')
});

// 6. MenuItem Table
// Each menu item is linked to a restaurant and a category
export const menu_item = pgTable('menu_item', {
    id: integer('id').primaryKey(),
    name: varchar('name'),
    restaurant_id: integer('restaurant_id').references(() => restaurant.id), // FK to restaurant (1:many, one restaurant can have multiple menu items)
    category_id: integer('category_id').references(() => category.id), // FK to category (1:many, one category can have multiple menu items)
    description: varchar('description'),
    ingredients: varchar('ingredients'),
    price: decimal('price'),
    active: boolean('active'),
    created_at: date('created_at'),
    updated_at: date('updated_at')
});

// 7. OrderMenuItem Table
// Each order menu item is linked to an order and a menu item
export const order_menu_item = pgTable('order_menu_item', {
    id: integer('id').primaryKey(),
    order_id: integer('order_id').references(() => orders.id), // FK to orders (many:many, one order can have multiple menu items and one menu item can be in multiple orders)
    menu_item_id: integer('menu_item_id').references(() => menu_item.id), // FK to menu_item
    quantity: integer('quantity'),
    item_price: decimal('item_price'),
    price: decimal('price'),
    comment: varchar('comment')
});

// 8. OrderStatus Table
// Each order status is linked to an order and a status catalog
export const order_status = pgTable('order_status', {
    id: integer('id').primaryKey(),
    order_id: integer('order_id').references(() => orders.id), // FK to orders (1:many, one order can have multiple statuses)
    status_catalog_id: integer('status_catalog_id').references(() => status_catalog.id), // FK to status_catalog (1:many, one status can be used for multiple orders)
    created_at: date('created_at')
});

// 9. Orders Table
// Each order is linked to a restaurant, an address, a user, and a driver
export const orders = pgTable('orders', {
    id: integer('id').primaryKey(),
    restaurant_id: integer('restaurant_id').references(() => restaurant.id), // FK to restaurant (1:many, one restaurant can have multiple orders)
    estimated_delivery_time: date('estimated_delivery_time'),
    actual_delivery_time: date('actual_delivery_time'),
    delivery_address_id: integer('delivery_address_id').references(() => address.id), // FK to address (1:many, one address can be used for multiple orders)
    user_id: integer('user_id').references(() => users.id), // FK to users (1:many, one user can have multiple orders)
    driver_id: integer('driver_id').references(() => driver.id), // FK to driver (1:many, one driver can deliver multiple orders)
    price: decimal('price'),
    discount: decimal('discount'),
    final_price: decimal('final_price'),
    comment: varchar('comment'),
    created_at: date('created_at'),
    updated_at: date('updated_at')
});

// 10. Restaurant Table
// Each restaurant is linked to a city
export const restaurant = pgTable('restaurant', {
    id: integer('id').primaryKey(),
    name: varchar('name'),
    street_address: varchar('street_address'),
    zip_code: varchar('zip_code'),
    city_id: integer('city_id').references(() => city.id), // FK to city (1:many, one city can have multiple restaurants)
    created_at: date('created_at'),
    updated_at: date('updated_at')
});

// 11. State Table
// Independent table with no foreign key relationships
export const state = pgTable('state', {
    id: integer('id').primaryKey(),
    name: varchar('name'),
    code: varchar('code')
});

// 12. StatusCatalog Table
// Independent table with no foreign key relationships
export const status_catalog = pgTable('status_catalog', {
    id: integer('id').primaryKey(),
    name: varchar('name')
});

// 13. Users Table
// Independent table with no foreign key relationships
export const users = pgTable('users', {
    id: integer('id').primaryKey(),
    name: varchar('name'),
    contact_phone: varchar('contact_phone'),
    phone_verified: boolean('phone_verified'),
    email: varchar('email'),
    email_verified: boolean('email_verified'),
    confirmation_code: varchar('confirmation_code'),
    password: varchar('password'),
    created_at: date('created_at'),
    updated_at: date('updated_at')
});

// 14. RestaurantOwner Table
// Each restaurant owner is linked to a restaurant and a user
export const restaurant_owner = pgTable('restaurant_owner', {
    id: integer('id').primaryKey(),
    restaurant_id: integer('restaurant_id').references(() => restaurant.id), // FK to restaurant (1:many, one restaurant can have multiple owners)
    owner_id: integer('owner_id').references(() => users.id) // FK to users (1:many, one user can own multiple restaurants)
});


