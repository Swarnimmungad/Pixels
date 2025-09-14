import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    width: v.number(),
    height: v.number(),
    canvasState: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getUser, {});
    console.log("this is users: " + user);
    if (user.plan == "free") {
      const projectCount = await ctx.db
        .query("projects")
        .withIndex("by_user", (q) => {
          return q.eq("userId", user._id);
        })
        .collect();
      console.log(projectCount);
      if (projectCount.length >= 3) {
        throw new Error(
          "Free plan limited to 3 projects.Upgrade to Pro for unlimited projects"
        );
      }
    }

    const projectId = await ctx.db.insert("projects", {
      title: args.title,
      userId: user._id,
      originalImageUrl: args.originalImageUrl,
      currentImageUrl: args.currentImageUrl,
      thumbnailUrl: args.thumbnailUrl,
      width: args.width,
      height: args.height,
      canvasState: args.canvasState,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.patch(user._id, {
      projectsUsed: user.projectsUsed + 1,
      lastActiveAt: Date.now(),
    });

    return projectId;
  },
});

export const getUsersProjects = query({
  handler: async (ctx) => {
    const user = await ctx.runQuery(internal.users.getUser, {});
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user_updated", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return projects;
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getUser, {});

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("No Project Found");
    }
    if (!user || project.userId !== user._id) {
      throw new Error("Access Denied ");
    }

    await ctx.db.delete(args.projectId);
    await ctx.db.patch(user._id, {
      projectsUsed: Math.max(0, user.projectsUsed - 1),
      lastActiveAt: Date.now(),
    });
  },
});

export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getUser, {});
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project Not Found");
    }
    if (!user || !user._id == project.userId) {
      throw new Error("Projects Access Denied ");
    }
    return project;
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    canvasState: v.optional(v.any()),
    width: v.optional(v.number()), // ← Add this
    height: v.optional(v.number()), // ← Add this
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    activeTransformations: v.optional(v.string()),
    backgroundRemoved: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getUser, {});
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project Not Found");
    }

    if (!user || !user._id == project.userId) {
      throw new Error("Projects Access Denied ");
    }

    const updateData = {
      updatedAt: Date.now(),
    };
    if (args.canvasState !== undefined)
      updateData.canvasState = args.canvasState;
    if (args.canvasState !== undefined)
      updateData.canvasState = args.canvasState;
    if (args.width !== undefined) updateData.width = args.width;
    if (args.height !== undefined) updateData.height = args.height;
    if (args.currentImageUrl !== undefined)
      updateData.currentImageUrl = args.currentImageUrl;
    if (args.thumbnailUrl !== undefined)
      updateData.thumbnailUrl = args.thumbnailUrl;
    if (args.activeTransformations !== undefined)
      updateData.activeTransformations = args.activeTransformations;
    if (args.backgroundRemoved !== undefined)
      updateData.backgroundRemoved = args.backgroundRemoved;

    await ctx.db.patch(args.projectId, updateData);
    return args.projectId;
  },
});
