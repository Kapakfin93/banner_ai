import { z } from "zod";
import { createRouter, publicQuery } from "../middleware.js";

interface MockJob {
  id: number;
  brandName: string;
  category: string;
  tagline: string | null;
  contactInfo: string | null;
  bannerSize: string;
  designStyle: string;
  primaryColor: string;
  secondaryColor: string;
  visualElements: string; // JSON string
  targetAudience: string;
  mood: string;
  additionalNotes: string | null;
  prompt: string;
  status: "pending" | "completed" | "failed";
  imageUrl: string | null;
  errorMessage: string | null;
  createdAt: Date;
}

// In-memory mock database
const mockJobs = new Map<number, MockJob>();
let nextJobId = 1;

export const bannerRouter = createRouter({
  // Submit a new generation job
  submit: publicQuery
    .input(
      z.object({
        brandName: z.string().min(1),
        category: z.string(),
        tagline: z.string().optional(),
        contactInfo: z.string().optional(),
        bannerSize: z.string(),
        designStyle: z.string(),
        primaryColor: z.string(),
        secondaryColor: z.string(),
        visualElements: z.array(z.string()),
        targetAudience: z.string(),
        mood: z.string(),
        additionalNotes: z.string().optional(),
        prompt: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const jobId = nextJobId++;
      
      const newJob: MockJob = {
        id: jobId,
        brandName: input.brandName,
        category: input.category,
        tagline: input.tagline || null,
        contactInfo: input.contactInfo || null,
        bannerSize: input.bannerSize,
        designStyle: input.designStyle,
        primaryColor: input.primaryColor,
        secondaryColor: input.secondaryColor,
        visualElements: JSON.stringify(input.visualElements),
        targetAudience: input.targetAudience,
        mood: input.mood,
        additionalNotes: input.additionalNotes || null,
        prompt: input.prompt,
        status: "pending",
        imageUrl: null,
        errorMessage: null,
        createdAt: new Date(),
      };

      mockJobs.set(jobId, newJob);

      // Mulai simulasi background image generation (non-blocking)
      setTimeout(() => {
        try {
          const job = mockJobs.get(jobId);
          if (!job) return;

          // Menentukan demo image berdasarkan kategori
          let demoImage = "/generated/demo-kuliner.jpg"; // Default
          if (input.category === "kecantikan") {
            demoImage = "/generated/demo-kecantikan.jpg";
          } else if (input.category === "otomotif") {
            demoImage = "/generated/demo-otomotif.jpg";
          } else {
            // Pemilihan fallback berdasarkan kecocokan keyword
            const lowerCat = input.category.toLowerCase();
            if (lowerCat.includes("kecantikan") || lowerCat.includes("fashion") || lowerCat.includes("beauty")) {
              demoImage = "/generated/demo-kecantikan.jpg";
            } else if (lowerCat.includes("otomotif") || lowerCat.includes("elektronik") || lowerCat.includes("tech")) {
              demoImage = "/generated/demo-otomotif.jpg";
            }
          }

          // Update status job menjadi completed dengan image URL-nya
          mockJobs.set(jobId, {
            ...job,
            status: "completed",
            imageUrl: demoImage,
          });
        } catch (error) {
          console.error(`Gagal menyelesaikan simulasi generate image untuk Job ${jobId}:`, error);
        }
      }, 5000); // Simulasi 5 detik rendering

      return { id: jobId };
    }),

  // Get job status
  status: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const job = mockJobs.get(input.id);
      if (!job) return null;
      return {
        ...job,
        visualElements: job.visualElements
          ? JSON.parse(job.visualElements)
          : [],
      };
    }),

  // Update job with generated image
  updateResult: publicQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["completed", "failed"]),
        imageUrl: z.string().optional(),
        errorMessage: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const job = mockJobs.get(input.id);
      if (job) {
        mockJobs.set(input.id, {
          ...job,
          status: input.status,
          imageUrl: input.imageUrl || null,
          errorMessage: input.errorMessage || null,
        });
      }
      return { success: true };
    }),

  // List all jobs
  list: publicQuery.query(async () => {
    const jobs = Array.from(mockJobs.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 50);
    return jobs.map((job) => ({
      ...job,
      visualElements: job.visualElements ? JSON.parse(job.visualElements) : [],
    }));
  }),

  // Delete a job
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      mockJobs.delete(input.id);
      return { success: true };
    }),

  // Optimize prompt with OpenRouter free models (Gemma 4 -> Poolside Laguna fallback)
  optimizePrompt: publicQuery
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey || apiKey === "your_openrouter_api_key_here") {
        throw new Error("OpenRouter API key is not configured in backend .env");
      }

      const systemMessage = `You are a professional prompt engineer for AI image generators (DALL-E 3, Midjourney, and Stable Diffusion XL).
Optimize the raw banner prompt to make it highly descriptive, structured, and visually rich.
Return ONLY the final optimized English prompt without any conversational introduction, markdown code block backticks, or filler.`;

      const models = [
        "google/gemma-4-31b-it:free",
        "poolside/laguna-m.1:free"
      ];

      for (const model of models) {
        try {
          console.log(`Attempting prompt optimization with model: ${model}`);
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
              "HTTP-Referer": "https://github.com/Kapakfin93/banner_ai",
              "X-Title": "JogloGenerator"
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: `Please optimize this raw banner prompt:\n\n${input.prompt}` }
              ]
            })
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.warn(`Optimization failed for ${model}: ${errorText}`);
            continue;
          }

          const data: any = await response.json();
          if (data.error) {
            console.warn(`Optimization API error for ${model}: ${JSON.stringify(data.error)}`);
            continue;
          }

          const content = data.choices?.[0]?.message?.content;
          if (content?.trim()) {
            console.log(`Successfully optimized prompt using ${model}`);
            return { optimizedPrompt: content.trim() };
          }
        } catch (err: any) {
          console.warn(`Connection failure for ${model} during optimization: ${err.message}`);
        }
      }

      throw new Error("All whitelisted OpenRouter free models failed to optimize prompt. Please try again.");
    }),
});

