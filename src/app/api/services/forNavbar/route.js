import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Services";

export async function GET(req) {
  await connectDB();

  try {
    const services = await Service.find({}).lean(); // fetch all services

    // Transform flat services into nested structure
    const serviceCategories = {};

    services.forEach((service) => {
      const { category, subcategory, title, href } = service;

      if (!serviceCategories[category]) {
        serviceCategories[category] = {
          title: capitalize(category),
          href: `/${category}`,
          subcategories: {},
        };
      }

      if (!serviceCategories[category].subcategories[subcategory]) {
        serviceCategories[category].subcategories[subcategory] = {
          title: capitalize(subcategory),
          services: [],
        };
      }

      serviceCategories[category].subcategories[subcategory].services.push({
        name: title,
        href,
      });
    });

    return new Response(JSON.stringify(serviceCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Helper to capitalize first letter
function capitalize(str) {
  if (!str || typeof str !== "string") return ""; // return empty string if invalid
  return str.charAt(0).toUpperCase() + str.slice(1);
}
