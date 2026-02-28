

const MOCK_PRODUCTS = [
    {
        id: "p_1",
        name: "Minimalist Ceramic Vase",
        description: "Handcrafted in Kyoto, this ceramic vase features a raw unglazed exterior creating a beautiful textural contrast with its smooth waterproof interior. Perfect for Ikebana or as a standalone architectural statement.",
        price: 8990,
        category: "home",
        stock: 14,
        images: [
            "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Handcrafted", "Unglazed ceramic", "Water-resistant interior", "H 24cm x W 12cm"]
    },
    {
        id: "p_2",
        name: "Architectural Table Lamp",
        description: "A geometric study in light and shadow. Machined from solid aircraft-grade aluminum with an anodized matte black finish. Emits a warm, diffused LED glow designed to reduce eye strain.",
        price: 12500,
        category: "lighting",
        stock: 5,
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Solid aluminum frame", "Touch dimmable", "2700K warm white LED", "Fabric cord"]
    },
    {
        id: "p_3",
        name: "Linen Lounge Armchair",
        description: "Deep, unstructured comfort meets refined Danish design lines. Upholstered in heavily textured Belgian linen that ages beautifully and softens with use. Supported by a blackened steel wireframe base.",
        price: 45000,
        category: "furniture",
        stock: 2,
        images: [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Belgian linen", "High-density foam", "Steel frame", "Fully assembled"]
    },
    {
        id: "p_4",
        name: "Onyx Coffee Table",
        description: "A low-profile centerpiece carved from a single slab of black marble with striking white veining. Hand-polished to a honed velvet finish. Incredibly heavy and stable.",
        price: 55000,
        category: "furniture",
        stock: 0,
        images: [
            "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Solid marble", "Honed finish", "Low profile (28cm height)", "Requires 2 person assembly"]
    },
    {
        id: "p_5",
        name: "Artisan Wood Serving Bowl",
        description: "Turned from sustainably sourced walnut. Each piece showcases unique variations in wood grain and natural imperfections, celebrating the raw beauty of the material.",
        price: 4500,
        category: "kitchen",
        stock: 22,
        images: [
            "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Walnut wood", "Food safe natural oil finish", "Hand wash only"]
    },
    {
        id: "p_6",
        name: "Brutalist Concrete Planter",
        description: "Cast from architectural-grade concrete. The porous nature of the material allows roots to breathe. Features intentionally rough edges and a sealed interior.",
        price: 3200,
        category: "home",
        stock: 8,
        images: [
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Cast concrete", "Drainage hole included", "Frost resistant suitable for outdoors"]
    },
    {
        id: "p_7",
        name: "Noise-Cancelling Over-Ear Headphones",
        description: "Experience pure audio with these premium wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-soft memory foam ear cushions.",
        price: 24999,
        category: "electronics",
        stock: 50,
        images: [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Active Noise Cancellation", "Bluetooth 5.0", "30h battery", "Built-in mic"]
    },
    {
        id: "p_8",
        name: "Minimalist Smartwatch",
        description: "A sleek, lightweight smartwatch with health tracking, notifications, and an always-on display. Water-resistant and compatible with all major smartphones.",
        price: 15999,
        category: "electronics",
        stock: 12,
        images: [
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["Heart rate monitor", "5 ATM water resistance", "7-day battery", "OLED display"]
    },
    {
        id: "p_9",
        name: "Essential Cotton Crew T-Shirt",
        description: "The perfect everyday tee. Made from 100% organic cotton, garment-dyed for a soft, worn-in feel from day one. Classic fit.",
        price: 1299,
        category: "clothing",
        stock: 100,
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["100% Organic Cotton", "Classic fit", "Machine washable", "Pre-shrunk"]
    },
    {
        id: "p_10",
        name: "Classic Denim Jacket",
        description: "A timeless wardrobe staple. Cut from heavyweight denim with a slight stretch for comfort. Features classic shank buttons and chest pockets.",
        price: 4999,
        category: "clothing",
        stock: 8,
        images: [
            "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800"
        ],
        details: ["98% Cotton, 2% Elastane", "Vintage wash", "Button closure"]
    }
];

// In-memory users for admin management
let USERS = [
    { id: "u_1", name: "Admin User", email: "admin@example.com", role: "admin" },
    { id: "u_2", name: "Jane Doe", email: "jane@example.com", role: "customer" },
    { id: "u_3", name: "John Smith", email: "john@example.com", role: "customer" }
];

// Simple subscriber pattern to simulate real-time updates for products
let productListeners = [];
const notifyProductListeners = () => {
    productListeners.forEach((cb) => {
        try { cb(MOCK_PRODUCTS); } catch (e) { /* noop */ }
    });
};


export const CATEGORIES = [
    { id: "all", name: "All Products" },
    { id: "furniture", name: "Furniture" },
    { id: "lighting", name: "Lighting" },
    { id: "home", name: "Home Decor" },
    { id: "kitchen", name: "Kitchen" },
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts({ page = 1, limit = 6, category = "all", search = "", sort = "newest" }) {
    await delay(800);

    let filtered = [...MOCK_PRODUCTS];

    if (category && category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }

    if (sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
        data: paginated,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
}

export async function getProductById(id) {
    await delay(600);
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
}

export async function getRelatedProducts(id, limit = 3) {
    const current = MOCK_PRODUCTS.find(p => p.id === id);
    if (!current) return [];
    const related = MOCK_PRODUCTS.filter(p => p.id !== id && p.category === current.category);
    return related.slice(0, limit);
}

export async function placeOrder(orderData) {
    await delay(1200);
    const newOrder = {
        id: `ord_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        status: "processing",
        ...orderData
    };
    orders.unshift(newOrder);
    return newOrder;
}

export async function getOrderHistory() {
    await delay(800);
    return orders;
}

// --- Admin helpers: Products CRUD, subscriptions, Users, and Order updates ---
export async function getAllProducts() {
    await delay(300);
    return MOCK_PRODUCTS;
}

export async function createProduct(product) {
    await delay(500);
    const newProduct = { id: `p_${Math.random().toString(36).substr(2, 9)}`, ...product };
    MOCK_PRODUCTS.unshift(newProduct);
    notifyProductListeners();
    return newProduct;
}

export async function updateProduct(id, updates) {
    await delay(400);
    const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Product not found');
    MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], ...updates };
    notifyProductListeners();
    return MOCK_PRODUCTS[idx];
}

export async function deleteProduct(id) {
    await delay(300);
    const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Product not found');
    const removed = MOCK_PRODUCTS.splice(idx, 1)[0];
    notifyProductListeners();
    return removed;
}

export function subscribeProducts(callback) {
    productListeners.push(callback);
    // send initial state
    try { callback(MOCK_PRODUCTS); } catch (e) { }
    return () => { productListeners = productListeners.filter(cb => cb !== callback); };
}

export async function getUsers() {
    await delay(300);
    return USERS;
}

export async function updateUserRole(id, role) {
    await delay(300);
    const idx = USERS.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    USERS[idx].role = role;
    return USERS[idx];
}

export async function updateOrderStatus(orderId, status) {
    await delay(300);
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) throw new Error('Order not found');
    // allow a few statuses for demo
    const valid = ["processing", "shipped", "delivered", "cancelled"];
    if (!valid.includes(status)) throw new Error('Invalid status');
    orders[idx].status = status;
    return orders[idx];
}
