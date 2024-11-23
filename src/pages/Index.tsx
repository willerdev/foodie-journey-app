import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, LogOut, Loader2 } from "lucide-react";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const categories = [
  "All",
  "Italian",
  "American",
  "Japanese",
  "Healthy",
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { session } = useSessionContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("Fetching products with category:", selectedCategory);
        
        let query = supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (selectedCategory !== "All") {
          query = query.eq('category', selectedCategory);
        }

        if (searchQuery) {
          query = query.ilike('name', `%${searchQuery}%`);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        console.log("Fetched products:", data);
        
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleOrderNow = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-sage-800">FoodieHub</h1>
          <div className="flex gap-4 items-center">
            {session ? (
              <>
                <Link to="/profile" className="text-sage-700 hover:text-sage-900">
                  Profile
                </Link>
                <Link to="/orders" className="text-sage-700 hover:text-sage-900">
                  Orders
                </Link>
                <Link to="/cart" className="text-sage-700 hover:text-sage-900">
                  Cart
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-sage-700 hover:text-sage-900"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
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
              placeholder="Search for dishes or cuisines"
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </section>

        <section className="mb-12 fade-in">
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

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products found in this category</p>
            </div>
          ) : (
            products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-800">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {product.description?.substring(0, 50)}...
                    </span>
                    <Button
                      variant="ghost"
                      className="text-sage-600 hover:text-sage-700"
                      onClick={() => handleOrderNow(product.id)}
                    >
                      Order now <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;