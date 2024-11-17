import Navbar from "@/components/Navbar";
import React from "react";
import { get_all_buyer_orders } from "@/actions/order";

export default async function Page() {
  const userOrders = (await get_all_buyer_orders()) || [];
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col items-center w-full">
        <div className="font-bold text-2xl mt-5">Your Orders</div>
        {userOrders.length === 0 ? (
          <div className="flex justify-center items-center min-h-full">
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {userOrders.map((order, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                      {order.inventory.name}
                    </h2>
                    <div className="flex justify-between">
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {order.inventory.quantity} in stock
                      </p>
                      <div className="font-bold text-2xl">
                        ₹ {order.inventory.cost}/-
                      </div>
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
                            {order.inventory.status}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
