"use server";
const revalidate = 0;
import { db } from "@/db";
import { Inventory, inventory } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function add_product_in_inventry(data: {
  user_id: string;
  name: string;
  quantity: number;
  cost: number;
  status: string;
}) {
  try {
    const product = await db.insert(inventory).values(data).returning({
      name: inventory.name,
      quantity: inventory.quantity,
      cost: inventory.cost,
      id: inventory.id,
      status: inventory.status,
    });

    return product;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function get_all_products_in_inventry(user_id: string) {
  try {
    const products = await db
      .select()
      .from(inventory)
      .where(eq(inventory.user_id, user_id))
      .then((res: Inventory[]) => res);

    return products;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function get_products_in_inventry() {
  try {
    const product = await db.select().from(inventory);
    return product;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
