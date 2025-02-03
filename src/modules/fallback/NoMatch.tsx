import { useNavigate } from "react-router-dom";
import { Button } from "@/lib/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-12 h-1/2">
      <div className="  px-4 md:px-8 lg:px-24 py-8 ">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
          404
        </p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
          Sorry, the page you are looking for could not be found.
        </p>
        <Button onClick={() => navigate(-1)} className="mt-4 w-full">
          <ChevronLeft className={"animate-pulse"} /> Go Back
        </Button>
      </div>
    </div>
  );
}
