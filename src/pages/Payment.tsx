import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

const Payment = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally process the payment
    toast({
      title: "Order Placed Successfully",
      description: "Thank you for your order! You can track it in your orders page.",
    });
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                Card Number
              </label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="expiry">
                  Expiry Date
                </label>
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                  CVV
                </label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold mb-4">
                <span>Total to Pay</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              
              <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700">
                Pay Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;