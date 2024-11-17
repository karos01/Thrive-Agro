"use server";
const revalidate = 0;
import { db } from "@/db";
import { Order, User, inventory, orders, users } from "@/db/schema";
import { encode, decode } from "jwt-simple";
import { cookies } from "next/headers";
import crypto from "crypto";
import { eq, and } from "drizzle-orm";

export async function get_all_buyer_orders() {
  try {
    const cookieStore = cookies();
    const tokenString = cookieStore.get("token")?.value;
    if (!tokenString) {
      return undefined;
    }
    const result: User = decode(
      tokenString,
      process.env.SALT_KEY!,
      false,
      "HS512"
    );
    const products = await db
      .select()
      .from(orders)
      .innerJoin(inventory, eq(inventory.id, orders.inventory_id))
      .where(eq(orders.buyer_id, result.id));

    return products;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function add_product_to_sellers_account(inventoryId: string) {
  try {
    const cookieStore = cookies();
    const tokenString = cookieStore.get("token")?.value;
    if (!tokenString) {
      return undefined;
    }
    const result: User = decode(
      tokenString,
      process.env.SALT_KEY!,
      false,
      "HS512"
    );

    const queryRes = await db
      .insert(orders)
      .values({
        inventory_id: inventoryId,
        buyer_id: result.id,
      })
      .returning({
        id: orders.id,
        inventory_id: orders.inventory_id,
        buyer_id: orders.buyer_id,
      });
    return queryRes;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
