"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import ProductDetails from "@/components/ProductDetails";
import { get_products_in_inventry } from "@/actions/inventry";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getUser } from "@/actions/user";
import { Inventory, User } from "@/db/schema";
import { get_all_buyer_orders } from "@/actions/order";

const Page = () => {
  const [userProducts, setUserProducts] = useState([] as Inventory[]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User>({} as User);
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const user: User = (await getUser()) as User;
      console.log("user", user);
      setUserDetails(user);
      const products = (await get_products_in_inventry()) as Inventory[];

      console.log("userProducts", products);
      setUserProducts(products);
    };
    fetchProducts();
    setLoading(false);
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col items-center w-full">
        <div className="font-bold text-2xl mt-5">All listed products</div>
        <p>An overview of yours crops</p>
        {loading ? (
          <div className="flex justify-center items-center min-h-full">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 space-y-5">
            {userProducts.map((product, index) => {
              return (
                <ProductDetails
                  user={userDetails}
                  details={product}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
