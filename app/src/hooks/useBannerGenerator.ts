import { useState, useCallback, useEffect, useRef } from "react";
import { trpc } from "@/providers/trpc";
import type { BannerFormData, GeneratedBanner } from "@/types/banner";
import { generateOptimizedPrompt } from "@/lib/promptEngine";

const STORAGE_KEY = "bannerai_history";
const POLL_INTERVAL = 3000;

const DEFAULT_FORM: BannerFormData = {
  brandName: "",
  category: "kuliner",
  tagline: "",
  contactInfo: "",
  contactWhatsapp: "",
  contactAddress: "",
  contactSocial: "",
  bannerSize: "3x1",
  customWidth: "3",
  customHeight: "1",
  primaryColor: "#FF6B35",
  secondaryColor: "#2C3E50",
  designStyle: "modern-minimalist",
  visualElements: ["gradient-bg", "geometric"],
  targetAudience: "general",
  mood: "cheerful",
  additionalNotes: "",
  includeContact: true,
};

function loadHistory(): GeneratedBanner[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: GeneratedBanner[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
  } catch {
    // Storage full or unavailable
  }
}

export function useBannerGenerator() {
  const [formData, setFormData] = useState<BannerFormData>(DEFAULT_FORM);
  const contactParts: string[] = [];
  if (formData.contactWhatsapp.trim()) contactParts.push(`WA: ${formData.contactWhatsapp.trim()}`);
  if (formData.contactSocial.trim()) contactParts.push(`IG/Sosmed: ${formData.contactSocial.trim()}`);
  if (formData.contactAddress.trim()) contactParts.push(`Alamat: ${formData.contactAddress.trim()}`);
  const contactInfo = contactParts.join("\n");

  const prompt = generateOptimizedPrompt({
    ...formData,
    contactInfo,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedBanner[]>(loadHistory);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const utils = trpc.useUtils();

  // Mutations
  const submitJob = trpc.banner.submit.useMutation({
    onSuccess: (data) => {
      startPolling(data.id);
    },
  });

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
  }, []);

  const startPolling = useCallback((jobId: number) => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
    }

    pollRef.current = setInterval(async () => {
      try {
        const job = await utils.client.banner.status.query({ id: jobId });
        if (!job) return;

        if (job.status === "completed" && job.imageUrl) {
          setGeneratedImage(job.imageUrl);
          setIsGenerating(false);
          
          // Save to history
          const newBanner: GeneratedBanner = {
            id: jobId.toString(),
            formData: { ...formData },
            prompt,
            imageUrl: job.imageUrl,
            timestamp: Date.now(),
          };
          setHistory(prev => {
            const updated = [newBanner, ...prev].slice(0, 50);
            saveHistory(updated);
            return updated;
          });

          if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
          }
        } else if (job.status === "failed") {
          setIsGenerating(false);
          if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
          }
        }
      } catch {
        // Silent fail on polling error
      }
    }, POLL_INTERVAL);
  }, [formData, prompt, utils]);

  const updateField = useCallback(<K extends keyof BannerFormData>(
    field: K,
    value: BannerFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleVisualElement = useCallback((element: string) => {
    setFormData(prev => {
      const current = prev.visualElements;
      const updated = current.includes(element)
        ? current.filter(e => e !== element)
        : [...current, element];
      return { ...prev, visualElements: updated };
    });
  }, []);

  const generateBanner = useCallback(async () => {
    if (!formData.brandName.trim()) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);

    const contactParts: string[] = [];
    if (formData.contactWhatsapp.trim()) contactParts.push(`WA: ${formData.contactWhatsapp.trim()}`);
    if (formData.contactSocial.trim()) contactParts.push(`IG/Sosmed: ${formData.contactSocial.trim()}`);
    if (formData.contactAddress.trim()) contactParts.push(`Alamat: ${formData.contactAddress.trim()}`);
    const derivedContactInfo = contactParts.join("\n");

    const optimizedPrompt = generateOptimizedPrompt({
      ...formData,
      contactInfo: derivedContactInfo,
    });

    try {
      await submitJob.mutateAsync({
        brandName: formData.brandName,
        category: formData.category,
        tagline: formData.tagline || undefined,
        contactInfo: derivedContactInfo || undefined,
        bannerSize: formData.bannerSize,
        designStyle: formData.designStyle,
        primaryColor: formData.primaryColor,
        secondaryColor: formData.secondaryColor,
        visualElements: formData.visualElements,
        targetAudience: formData.targetAudience,
        mood: formData.mood,
        additionalNotes: formData.additionalNotes || undefined,
        prompt: optimizedPrompt,
      });
    } catch {
      setIsGenerating(false);
    }
  }, [formData, submitJob]);

  const deleteFromHistory = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const loadFromHistory = useCallback((banner: GeneratedBanner) => {
    setFormData(banner.formData);
    setGeneratedImage(banner.imageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const copyPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      return true;
    } catch {
      return false;
    }
  }, [prompt]);

  return {
    formData,
    prompt,
    isGenerating,
    generatedImage,
    history,
    updateField,
    toggleVisualElement,
    generateBanner,
    deleteFromHistory,
    loadFromHistory,
    copyPrompt,
  };
}
