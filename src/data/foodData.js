/**
 * foodData.js – Sample Donation Data for FoodBridge
 *
 * This file contains 6 realistic demo food donations.
 * Each object represents one surplus food item posted by a donor.
 * This data is used to populate the app on first load.
 */

const foodData = [
  {
    id: 1,
    donorName: "Green Leaf Restaurant",
    foodName: "Vegetable Rice",
    category: "Meals",
    quantity: 25,
    unit: "plates",
    location: "Sector 17, Chandigarh",
    phone: "9876543210",
    expiry: "2026-09-19T18:00",
    description:
      "Freshly cooked vegetable fried rice with mixed seasonal vegetables. Packed in food-safe containers. Best consumed within 4 hours.",
    status: "Available",
  },
  {
    id: 2,
    donorName: "Baker's Corner",
    foodName: "Bread Packets",
    category: "Bakery",
    quantity: 40,
    unit: "packets",
    location: "MG Road, Pune",
    phone: "9123456789",
    expiry: "2026-09-20T10:00",
    description:
      "Whole wheat bread packets, freshly baked this morning. Each packet contains 10 slices. Suitable for sandwiches or breakfast distribution.",
    status: "Available",
  },
  {
    id: 3,
    donorName: "FreshFarm Organics",
    foodName: "Fruit Boxes",
    category: "Fruits",
    quantity: 15,
    unit: "boxes",
    location: "Koramangala, Bangalore",
    phone: "9988776655",
    expiry: "2026-09-21T12:00",
    description:
      "Assorted seasonal fruit boxes including apples, bananas, and oranges. Each box weighs approximately 2 kg. Ideal for shelter distribution.",
    status: "Available",
  },
  {
    id: 4,
    donorName: "College Hostel Mess",
    foodName: "Packed Meals",
    category: "Meals",
    quantity: 50,
    unit: "packs",
    location: "IIT Campus, Delhi",
    phone: "9011223344",
    expiry: "2026-09-19T20:00",
    description:
      "Complete meal packs with dal, rice, roti, and sabzi. Leftover from evening mess. Hygienically packed and ready for immediate distribution.",
    status: "Accepted",
  },
  {
    id: 5,
    donorName: "Café Delight",
    foodName: "Sandwiches",
    category: "Bakery",
    quantity: 30,
    unit: "pieces",
    location: "Connaught Place, Delhi",
    phone: "9876001234",
    expiry: "2026-09-19T16:00",
    description:
      "Assorted veg sandwiches including paneer tikka, cheese grilled, and vegetable club. Made fresh today. Contains dairy.",
    status: "Available",
  },
  {
    id: 6,
    donorName: "Walmart Neighbourhood Store",
    foodName: "Grocery Pack",
    category: "Packaged Food",
    quantity: 20,
    unit: "packs",
    location: "Andheri West, Mumbai",
    phone: "9555667788",
    expiry: "2026-10-15T23:59",
    description:
      "Sealed grocery packs with rice (1 kg), dal (500 g), cooking oil (500 ml), and salt (200 g). Long shelf life. Suitable for families in need.",
    status: "Completed",
  },
];

export default foodData;
