import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const account = await ctx.db.query("accounts").withIndex("by_slug", (q) => q.eq("slug", slug)).unique();
    if (!account) return null;
    const [messages, artifacts] = await Promise.all([
      ctx.db.query("messages").withIndex("by_account", (q) => q.eq("accountSlug", slug)).order("asc").collect(),
      ctx.db.query("artifacts").withIndex("by_account", (q) => q.eq("accountSlug", slug)).collect(),
    ]);
    return { account, messages, artifacts };
  },
});

export const approveStrategy = mutation({
  args: { slug: v.string(), name: v.string(), domain: v.string(), persona: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    const account = await ctx.db.query("accounts").withIndex("by_slug", (q) => q.eq("slug", args.slug)).unique();
    if (account) {
      await ctx.db.patch(account._id, { persona: args.persona, strategyStatus: "approved", updatedAt: now });
    } else {
      await ctx.db.insert("accounts", { ...args, strategyStatus: "approved", updatedAt: now });
    }
    const artifacts = await ctx.db.query("artifacts").withIndex("by_account", (q) => q.eq("accountSlug", args.slug)).collect();
    if (artifacts.length === 0) {
      await Promise.all([
        ctx.db.insert("artifacts", { accountSlug: args.slug, type: "interactive_demo", status: "ready", updatedAt: now }),
        ctx.db.insert("artifacts", { accountSlug: args.slug, type: "meeting_brief", status: "ready", updatedAt: now }),
        ctx.db.insert("artifacts", { accountSlug: args.slug, type: "demo_script", status: "ready", updatedAt: now }),
      ]);
    } else {
      await Promise.all(artifacts.map((artifact) => ctx.db.patch(artifact._id, { status: "ready", updatedAt: now })));
    }
    return { approved: true, updatedAt: now };
  },
});
