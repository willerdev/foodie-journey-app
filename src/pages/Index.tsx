import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "The Fresh Kitchen",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
    cuisine: "Healthy",
    rating: 4.8,
    deliveryTime: "20-30",
  },
  {
    id: 2,
    name: "Burger House",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "25-35",
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "30-40",
  },
];

const categories = [
  "All",
  "Healthy",
  "Fast Food",
  "Japanese",
  "Italian",
  "Mexican",
  "Desserts",
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-sage-800">FoodieHub</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-sage-700 hover:text-sage-900">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-sage-600 hover:bg-sage-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Delicious food, delivered to your door
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Order from the best local restaurants with easy, contactless delivery
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className="pl-12 h-12 text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </section>

        <section className="mb-12 fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 ${
                  selectedCategory === category
                    ? "bg-sage-600 text-white"
                    : "text-gray-600 hover:text-sage-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in" style={{ animationDelay: "0.4s" }}>
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="overflow-hidden hover-scale glass-card"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600">{restaurant.cuisine}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-800">
                    ⭐️ {restaurant.rating}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {restaurant.deliveryTime} min
                  </span>
                  <Button
                    variant="ghost"
                    className="text-sage-600 hover:text-sage-700"
                  >
                    Order now <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;