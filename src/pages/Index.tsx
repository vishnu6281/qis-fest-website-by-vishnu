import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <img 
            src="/lovable-uploads/ca7c2a52-60b2-4d93-b799-5e0b8d9edb44.png" 
            alt="QIS Fest Logo" 
            className="w-full max-w-2xl mx-auto animate-fade-in"
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">QIS FEST 2K25</h1>
            <p className="text-xl text-white/80 mb-8">
              QIS College of Engineering and Technology
            </p>
            
            <Button
              size="lg"
              onClick={() => navigate("/photo-mosaic")}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-xl py-6 px-8 animate-pulse"
            >
              Digital Group Photo
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;