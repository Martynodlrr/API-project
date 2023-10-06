'use strict';

let options = {};
options.tableName = 'Spots'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

const data = [
  {
    ownerId: 1,
    address: "123 First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "First Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 100.00
  },
  {
    ownerId: 2,
    address: "456 Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Second Spot",
    description: "Delightful 2-bedroom urban oasis in the city's core! Relax in an elegantly appointed sanctuary boasting contemporary comforts, tranquil courtyard vistas, and a warm hearth. Just a short stroll to quaint coffee spots, rich heritage landmarks, and picturesque green spaces. Dive into genuine local culture with an added dash of opulence. Ideal for intimate escapes or family adventures. Reserve today for an unforgettable experience!",
    price: 150.00
  },
  {
    ownerId: 3,
    address: "789 Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Third Spot",
    description: "Stylish 2-bedroom city gem! Modern comfort meets serene views. Near cafes, landmarks & parks. Dive into local culture with luxury. Book for a unique stay!",
    price: 200.00
  },
  {
    ownerId: 4,
    address: "1011 Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Fourth Spot",
    description: "Enchanting 2-bedroom urban sanctuary! Relish in a blend of chic decor, modern conveniences, and peaceful garden scenes. Wander to nearby cafes, historic treasures, and lush parks. Immerse in the city's charm with a splash of sophistication. Ideal for couples' escapes or family trips. Secure your spot for an unparalleled getaway!",
    price: 80.00
  },
  {
    ownerId: 5,
    address: "1213 Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fifth Spot",
    description: "Luxe 2-bed city hideaway! Elegant interiors, garden views. Steps to cafes & historic spots. A blend of culture & comfort. Book for an unmatched stay!",
    price: 110.00
  },
  {
    ownerId: 1,
    address: "555 Sixth Ave",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Sixth Spot",
    description: "Luxe 2-bed in the city. Chic décor, near cafes & history. Book a unique escape!",
    price: 120.00
  },
  {
    ownerId: 2,
    address: "777 Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Seventh Spot",
    description: "Discover an urban 2-bedroom masterpiece! Nestled amidst the city's heartbeat, this haven merges sleek design with modern comforts. Gaze upon tranquil garden landscapes from your window, while being a leisurely walk away from trendy cafes, revered landmarks, and vibrant parks. A fusion of city vibrancy and peaceful retreat. Perfect for couples' escapes or cherished family moments. Reserve your unforgettable journey now!",
    price: 180.00
  },
  {
    ownerId: 3,
    address: "999 Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Eighth Spot",
    description: "Step into a 2-bedroom city dream! This refined retreat, tucked within the city's pulse, boasts elegant touches and state-of-the-art amenities. Wake up to serene garden vistas, and find yourself moments from artisanal coffee shops, storied monuments, and lively green expanses. Mingle tradition with contemporary elegance. Whether a romantic interlude or family bonding, this is your spot. Secure your special sojourn today!",
    price: 250.00
  },
  {
    ownerId: 4,
    address: "1212 Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Ninth Spot",
    description: "Experience city living in a 2-bedroom haven of elegance! Draped in sophisticated décor and equipped with all modern luxuries, it's a slice of paradise amid urban buzz. Revel in calming garden views and find yourself in close proximity to atmospheric cafes, historic gems, and inviting parks. A tasteful merge of local spirit and plush comfort. Ideal for lovebirds or family vacations. Book today for a journey to remember!",
    price: 9999999999.99
  },
  {
    ownerId: 5,
    address: "1313 Tenth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Tenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 130.00
  },
  {
    ownerId: 1,
    address: "789 Eleventh St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Eleventh Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 180.00
  },
  {
    ownerId: 2,
    address: "777 Twelfth St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Twelfth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 200.00
  },
  {
    ownerId: 3,
    address: "999 Thirteenth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Thirteenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 220.00
  },
  {
    ownerId: 4,
    address: "1212 Fourteenth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Fourteenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 130.00
  },
  {
    ownerId: 5,
    address: "1313 Fifteenth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fifteenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 160.00
  },
  {
    ownerId: 1,
    address: "789 Sixteenth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Sixteenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 110.00
  },
  {
    ownerId: 2,
    address: "777 Seventeenth St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Seventeenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 140.00
  },
  {
    ownerId: 3,
    address: "999 Eighteenth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Eighteenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 190.00
  },
  {
    ownerId: 4,
    address: "1212 Nineteenth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Nineteenth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 85.00
  },
  {
    ownerId: 5,
    address: "1313 Twentieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Twentieth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 120.00
  },
  {
    ownerId: 1,
    address: "2321 Twenty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Twenty-First Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 120.00
  },
  {
    ownerId: 2,
    address: "2143 Twenty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Twenty-Second Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 170.00
  },
  {
    ownerId: 3,
    address: "3491 Twenty-Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Twenty-Third Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 210.00
  },
  {
    ownerId: 4,
    address: "1934 Twenty-Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Twenty-Fourth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 75.00
  },
  {
    ownerId: 5,
    address: "1235 Twenty-Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Twenty-Fifth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 140.00
  },
  {
    ownerId: 1,
    address: "5566 Twenty-Sixth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Twenty-Sixth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 115.00
  },
  {
    ownerId: 2,
    address: "7878 Twenty-Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Twenty-Seventh Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 190.00
  },
  {
    ownerId: 3,
    address: "9999 Twenty-Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Twenty-Eighth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 230.00
  },
  {
    ownerId: 4,
    address: "3030 Twenty-Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Twenty-Ninth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 90.00
  },
  {
    ownerId: 5,
    address: "3131 Thirtieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Thirtieth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 120.00
  },
  {
    ownerId: 1,
    address: "789 Thirty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Thirty-First Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 190.00
  },
  {
    ownerId: 2,
    address: "777 Thirty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Thirty-Second Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 210.00
  },
  {
    ownerId: 3,
    address: "999 Thirty-Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Thirty-Third Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 240.00
  },
  {
    ownerId: 4,
    address: "1212 Thirty-Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Thirty-Fourth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 110.00
  },
  {
    ownerId: 5,
    address: "1313 Thirty-Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Thirty-Fifth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 160.00
  },
  {
    ownerId: 1,
    address: "789 Thirty-Sixth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Thirty-Sixth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 130.00
  },
  {
    ownerId: 2,
    address: "1337 Thirty-Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Thirty-Seventh Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 165.00
  },
  {
    ownerId: 3,
    address: "444 Fourthty-Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Thirty-Eighth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 215.00
  },
  {
    ownerId: 4,
    address: "5678 Thirty-Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Thirty-Ninth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 95.00
  },
  {
    ownerId: 5,
    address: "1313 Fortieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fortieth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 125.00
  },
  {
    ownerId: 1,
    address: "789 Forty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Forty-First Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 170.00
  },
  {
    ownerId: 2,
    address: "777 Forty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Forty-Second Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 190.00
  },
  {
    ownerId: 3,
    address: "999 Forty-Third St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Forty-Third Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 230.00
  },
  {
    ownerId: 4,
    address: "1212 Forty-Fourth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Forty-Fourth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 110.00
  },
  {
    ownerId: 5,
    address: "1313 Forty-Fifth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Forty-Fifth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 160.00
  },
  {
    ownerId: 1,
    address: "789 Forty-Sixth St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Forty-Sixth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 135.00
  },
  {
    ownerId: 2,
    address: "777 Forty-Seventh St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Forty-Seventh Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 180.00
  },
  {
    ownerId: 3,
    address: "999 Forty-Eighth St",
    city: "New York",
    state: "New York",
    country: "United States",
    lat: 40.712776,
    lng: -74.005974,
    name: "Forty-Eighth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 210.00
  },
  {
    ownerId: 4,
    address: "1212 Forty-Ninth St",
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    lat: 41.878113,
    lng: -87.629799,
    name: "Forty-Ninth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 80.00
  },
  {
    ownerId: 5,
    address: "1313 Fiftieth St",
    city: "Houston",
    state: "Texas",
    country: "United States",
    lat: 29.760427,
    lng: -95.369804,
    name: "Fiftieth Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 140.00
  },
  {
    ownerId: 1,
    address: "789 Fifty-First St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.7749295,
    lng: -122.4194183,
    name: "Fifty-First Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 185.00
  },
  {
    ownerId: 2,
    address: "777 Fifty-Second St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 34.052235,
    lng: -118.243683,
    name: "Fifty-Second Spot",
    description: "Charming 2-bedroom retreat nestled in the heart of the city! Unwind in a tastefully decorated haven with modern amenities, a serene garden view, and a cozy fireplace. Steps away from local cafes, historic sites, and scenic parks. Experience authentic local living with a touch of luxury. Perfect for romantic getaways or family vacations. Book now for a memorable stay!",
    price: 205.00
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, data, { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ["First Spot", "Second Spot", "Third Spot", "Fourth Spot", "Fifth Spot", "Sixth Spot", "Seventh Spot", "Eighth Spot", "Ninth Spot", "Tenth Spot", "Eleventh Spot", "Twelfth Spot", "Thirteenth Spot", "Fourteenth Spot", "Fifteenth Spot", "Sixteenth Spot", "Seventeenth Spot", "Eighteenth Spot", "Nineteenth Spot", "Twentieth Spot", "Twenty-First Spot", "Twenty-Second Spot", "Twenty-Third Spot", "Twenty-Fourth Spot", "Twenty-Fifth Spot", "Twenty-Sixth Spot", "Twenty-Seventh Spot", "Twenty-Eighth Spot", "Twenty-Ninth Spot", "Thirtieth Spot", "Thirty-First Spot", "Thirty-Second Spot", "Thirty-Third Spot", "Thirty-Fourth Spot", "Thirty-Fifth Spot", "Thirty-Sixth Spot", "Thirty-Seventh Spot", "Thirty-Eighth Spot", "Thirty-Ninth Spot", "Fortieth Spot", "Forty-First Spot", "Forty-Second Spot", "Forty-Third Spot", "Forty-Fourth Spot", "Forty-Fifth Spot", "Forty-Sixth Spot", "Forty-Seventh Spot", "Forty-Eighth Spot", "Forty-Ninth Spot", "Fiftieth Spot", "Fifty-First Spot", "Fifty-Second Spot"]
      }
    }, {});
  }
};
