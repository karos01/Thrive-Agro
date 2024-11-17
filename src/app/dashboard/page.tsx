import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import Dashboard from "@/components/Dashboard";
import Buyer from "@/components/buyer";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div>
      <div className="flex w-full">
        <div>
          <Navbar />
        </div>
        <div className="w-full">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
