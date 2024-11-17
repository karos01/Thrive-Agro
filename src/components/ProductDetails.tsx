"use client";
import { add_product_to_sellers_account } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { Inventory, User } from "@/db/schema";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { get_all_buyer_orders } from "@/actions/order";

export default function ProductDetails({
  details,
  user,
}: {
  details: Inventory;
  user: User;
}) {
  const [buyerOrder, setBuyerOrder] = useState([] as String[]);
  const handleSubmit = async () => {
    try {
      const response = await add_product_to_sellers_account(details.id);
      console.log(response);
      toast.success("Product added to your account");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error adding product to your account");
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const userOrders = (await get_all_buyer_orders()) || [];
      console.log(userOrders);
      setBuyerOrder(userOrders.map((order) => order.inventory.id));
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex w-72 flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          {details.name}
        </h2>
        <div className="flex justify-between">
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {details.quantity} in stock
          </p>
          <div className="font-bold text-2xl">₹ {details.cost}/-</div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </dt>
            <dd className="mt-1 text-sm space-x-3 text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                {details.in_stock ? "In Stock" : "Out of Stock"}
              </span>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                {details.status}
              </span>
            </dd>
          </div>
          {user.user_type === "buyer" && (
            <Button
              disabled={buyerOrder.includes(details.id)}
              onClick={handleSubmit}
              className="w-full"
            >
              {buyerOrder.includes(details.id)
                ? "Already bought"
                : "Buy this product"}
            </Button>
          )}
        </dl>
      </div>
    </div>
  );
}
