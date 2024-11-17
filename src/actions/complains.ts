"use server";
const revalidate = 0;
import { db } from "@/db";
import { NewComplain, complains } from "@/db/schema";

export async function create_complain(values: NewComplain) {
  await db.insert(complains).values(values);
}

export async function get_complains() {
  return db.select().from(complains);
}
