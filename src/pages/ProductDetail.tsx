import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

// This is a mock product data - would be replaced with Supabase data
const mockProduct = {
  id: 1,
  name: "Delicious Burger",
  description: "A juicy burger with fresh vegetables and special sauce",
  price: 12.99,
  image: "/placeholder.svg",
  ingredients: ["Beef patty", "Lettuce", "Tomato", "Special sauce", "Sesame bun"],
  nutritionalInfo: {
    calories: 650,
    protein: "35g",
    carbs: "48g",
    fat: "22g"
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // In real implementation, this would fetch from Supabase
  const product = mockProduct;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold text-sage-600">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600">{product.description}</p>
            
            <div>
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Nutritional Information:</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>Calories: {product.nutritionalInfo.calories}</div>
                <div>Protein: {product.nutritionalInfo.protein}</div>
                <div>Carbs: {product.nutritionalInfo.carbs}</div>
                <div>Fat: {product.nutritionalInfo.fat}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="bg-sage-600 hover:bg-sage-700"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;