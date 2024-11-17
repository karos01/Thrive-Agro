"use server";
const revalidate = 0;
import { db } from "@/db";
import { User, users } from "@/db/schema";
import { encode, decode } from "jwt-simple";
import { cookies } from "next/headers";
import crypto from "crypto";
import { eq, and } from "drizzle-orm";

export async function signup(data: {
  name: string;
  email: string;
  password_hash: string;
  user_type: string;
}) {
  try {
    const cookieStore = cookies();
    data.password_hash = crypto
      .createHash("sha256")
      .update(data.password_hash)
      .digest("hex");

    console.log(data);
    const user = await db
      .insert(users)
      .values(data)
      .returning({
        name: users.name,
        email: users.email,
        id: users.id,
        user_type: users.user_type,
      })
      .then((res) => res[0]);

    const fifteenMinutesInMs = 15 * 60 * 1000;

    const token: string = encode(
      {
        ...user,
        issued: Date.now(),
        expires: Date.now() + fifteenMinutesInMs,
      },
      process.env.SALT_KEY!,
      "HS512"
    );

    cookieStore.set({
      name: "token",
      httpOnly: true,
      path: "/",
      value: token,
    });

    return {
      success: true,
      token,
      user_type: user.user_type,
    };
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function login(data: { email: string; password_hash: string }) {
  try {
    const cookieStore = cookies();
    const fifteenMinutesInMs = 15 * 60 * 1000;

    data.password_hash = crypto
      .createHash("sha256")
      .update(data.password_hash)
      .digest("hex");

    console.log(data);

    const result = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.password_hash, data.password_hash),
          eq(users.email, data.email)
        )
      )
      .limit(1);

    console.log(result);
    if (result.length == 0) {
      return {
        success: false,
        token: "",
        user_type: "",
      };
    }

    const user = result[0];

    const token: string = encode(
      {
        ...user,
        issued: Date.now(),
        expires: Date.now() + fifteenMinutesInMs,
      },
      process.env.SALT_KEY!,
      "HS512"
    );

    cookieStore.set({
      name: "token",
      path: "/",
      value: token,
    });

    return {
      success: true,
      token,
      user_type: user.user_type,
    };
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function getUser() {
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
    return result;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function log_out() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("token");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
