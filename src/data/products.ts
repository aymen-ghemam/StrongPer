export const products = Array.from({ length: 18 }).map((_, i) => ({
  index: i,
  name: `Pump Model ${i + 1}`,
  price: 100 + i * 50,
  image: `/src/Images/pump${i + 1}.jpg`,
  description: `This is the description of Pump Model ${
    i + 1
  }. High performance, durable, and perfect for industrial or domestic use.`,
}));
