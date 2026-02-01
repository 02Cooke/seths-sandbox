"use server"

import { db } from "@/db"
import { assets } from "@/db/schema/assets"
import { asc } from "drizzle-orm"

export async function getTopAssets(limit: number = 15) {
  const data = await db
    .select()
    .from(assets)
    .orderBy(asc(assets.rank))
    .limit(limit)

  return data
}
