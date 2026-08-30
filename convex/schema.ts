import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    slug: v.string(),
    name: v.string(),
    domain: v.string(),
    persona: v.string(),
    strategyStatus: v.union(v.literal("recommended"), v.literal("approved")),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),
  messages: defineTable({
    accountSlug: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    citations: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_account", ["accountSlug"]),
  artifacts: defineTable({
    accountSlug: v.string(),
    type: v.union(v.literal("interactive_demo"), v.literal("meeting_brief"), v.literal("demo_script")),
    status: v.union(v.literal("recommended"), v.literal("generating"), v.literal("ready"), v.literal("error")),
    updatedAt: v.number(),
  }).index("by_account", ["accountSlug"]),
});
