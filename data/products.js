export const categories = [
  "phones",
  "tv",
  "laptops",
  "accessories",
  "clothes",
  "shoes",
  "bags",
  "fridges",
  "cookers"
];

export const products = [
  {
    id: "1",
    name: "Samsung Galaxy A06",
    price: 15499,
    oldPrice: 19499,
    image: "/galaxy06.jpg",
    category: "phones",
    description:
      "Affordable smartphone with large display and long battery life.",
    features: [
      "6.5-inch HD+ display",
      "5000mAh battery",
      "Smooth performance",
      "Lightweight design"
    ],
    specs: {
      Display: "6.5-inch HD+",
      Battery: "5000mAh",
      SIM: "Dual SIM",
      Connectivity: "4G"
    }
  },

  {
    id: "2",
    name: "Vitron Smart TV 32\"",
    price: 30000,
    image: "/vitron32.jpg",
    category: "tv",
    description: "32-inch smart TV with streaming apps.",
    features: [
      "Built-in streaming apps",
      "HD display",
      "HDMI & USB ports"
    ],
    specs: {
      Size: "32 inch",
      Resolution: "HD",
      Connectivity: "HDMI, USB"
    }
  },

  {
    id: "3",
    name: "HP Laptop",
    price: 55000,
    image: "/p3.jpg",
    category: "laptops",
    description: "Reliable laptop for work and school.",
    features: [
      "Fast performance",
      "Lightweight",
      "Long battery life"
    ],
    specs: {
      RAM: "8GB",
      Storage: "256GB SSD",
      Processor: "Intel"
    }
  },

  {
    id: "4",
    name: "Power Bank 20000mAh",
    price: 2500,
    image: "/p4.jpg",
    category: "accessories",
    description: "High-capacity power bank.",
    features: [
      "Fast charging",
      "Portable",
      "Dual output"
    ],
    specs: {
      Capacity: "20000mAh",
      Output: "Dual USB"
    }
  },

  {
    id: "5",
    name: "Infinix Smart 8",
    price: 12000,
    image: "/phone2.jpg",
    category: "phones",
    description: "Budget smartphone with strong battery.",
    features: [
      "5000mAh battery",
      "Dual SIM",
      "Large display"
    ],
    specs: {
      Battery: "5000mAh",
      SIM: "Dual SIM",
      Network: "4G"
    }
  },

  // NEW PRODUCTS (what you asked)

  {
    id: "6",
    name: "Men's Casual Shirt",
    price: 1500,
    image: "/shirt.jpg",
    category: "clothes",
    description: "Comfortable cotton casual shirt.",
    features: ["Breathable fabric", "Slim fit"],
    specs: {
      Material: "Cotton",
      Fit: "Slim"
    }
  },

  {
    id: "7",
    name: "Running Shoes",
    price: 3500,
    image: "/shoes.jpg",
    category: "shoes",
    description: "Lightweight running shoes.",
    features: ["Comfort sole", "Durable"],
    specs: {
      Type: "Sports",
      Material: "Mesh"
    }
  },

  {
    id: "8",
    name: "Leather Handbag",
    price: 4000,
    image: "/bag.jpg",
    category: "bags",
    description: "Stylish leather handbag.",
    features: ["Spacious", "Durable leather"],
    specs: {
      Material: "Leather",
      Style: "Casual"
    }
  },

  {
    id: "9",
    name: "Double Door Fridge",
    price: 85000,
    image: "/fridge.jpg",
    category: "fridges",
    description: "Energy efficient refrigerator.",
    features: ["No frost", "Large capacity"],
    specs: {
      Capacity: "300L",
      Energy: "Efficient"
    }
  },

  {
    id: "10",
    name: "Electric Cooker",
    price: 12000,
    image: "/cooker.jpg",
    category: "cookers",
    description: "Multi-function electric cooker.",
    features: ["Fast heating", "Multiple modes"],
    specs: {
      Power: "2000W",
      Functions: "Multi-use"
    }
  }
];
