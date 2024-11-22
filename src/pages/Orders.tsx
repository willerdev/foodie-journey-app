import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  // Placeholder orders data
  const orders = [
    {
      id: 1,
      date: "2024-02-20",
      status: "Delivered",
      total: 45.90,
      items: ["Burger", "Fries", "Drink"],
      restaurant: "Burger House"
    },
    // Add more orders as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{order.restaurant}</h3>
                  <p className="text-sm text-gray-600">Order #{order.id}</p>
                </div>
                <span className="px-2 py-1 text-sm rounded bg-sage-100 text-sage-800">
                  {order.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                {order.date}
              </div>
              
              <div className="text-sm mb-4">
                {order.items.join(", ")}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  Total: ${order.total.toFixed(2)}
                </span>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/chat?orderId=${order.id}`)}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;