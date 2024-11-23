import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      console.log("User signed in:", session?.user?.id);
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-50 to-white p-4">
      <Card className="w-full max-w-md p-8 glass-card fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to continue to KissleChef</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#16a34a',
                  brandAccent: '#15803d',
                },
              },
            },
          }}
          providers={[]}
          theme="light"
        />
      </Card>
    </div>
  );
};

export default Login;