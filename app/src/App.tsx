import { useBannerGenerator } from "@/hooks/useBannerGenerator";
import { BannerForm } from "@/sections/BannerForm";
import { PromptPreview } from "@/sections/PromptPreview";
import { GeneratedResult } from "@/sections/GeneratedResult";
import { HistoryGallery } from "@/sections/HistoryGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";
import {
  Sparkles,
  Copy,
  Check,
  Wand2,
  Lightbulb,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { trpc } from "@/providers/trpc";

export default function App() {
  const {
    formData,
    prompt,
    aiPrompt,
    setAiPrompt,
    localPrompt,
    isGenerating,
    generatedImage,
    history,
    updateField,
    toggleVisualElement,
    generateBanner,
    deleteFromHistory,
    loadFromHistory,
    copyPrompt,
  } = useBannerGenerator();
  const { theme, toggleTheme } = useTheme();

  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleCopy = async () => {
    const success = await copyPrompt();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const optimizeMutation = trpc.banner.optimizePrompt.useMutation();

  const handleOptimize = async () => {
    try {
      const result = await optimizeMutation.mutateAsync({ prompt: localPrompt });
      if (result?.optimizedPrompt) {
        setAiPrompt(result.optimizedPrompt);
      }
    } catch (error) {
      console.error("Failed to optimize prompt:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-card border-b border-gray-200 dark:border-border shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-foreground leading-tight">
                  JogloGenerator
                </h1>
                <p className="text-xs text-gray-500 dark:text-muted-foreground">Prompt Generator untuk Desainer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-secondary transition-colors duration-200 cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </Button>
              <Badge variant="outline" className="hidden sm:flex items-center gap-1 text-xs border-gray-200 dark:border-border dark:text-muted-foreground">
                <Zap className="w-3 h-3 text-primary" />
                AI-Powered
              </Badge>
              {isGenerating && (
                <Badge className="bg-primary/20 text-primary border border-primary/30 animate-pulse">
                  Generating...
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-foreground flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  Spesifikasi Banner
                </h2>
                <Badge
                  onClick={() => setShowGuide(!showGuide)}
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-[11px] px-2 py-0.5 rounded-full cursor-pointer transition-colors"
                >
                  Panduan Penggunaan
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-muted-foreground mt-1">
                Isi detail banner Anda, sistem akan otomatis membuat prompt AI yang optimized
              </p>

              {/* Quick Visual Guide Banner */}
              {showGuide && (
                <div className="mt-4 p-4 rounded-xl bg-white dark:bg-card border border-primary/20 dark:border-primary/30 shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
                  <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Alur Cepat Kerja Staf (4 Langkah Mudah)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { step: "1. ISI FORM", desc: "Tulis brand, tagline & kontak", icon: "✍️" },
                      { step: "2. SALIN PROMPT", desc: "Klik tombol 'Salin Prompt'", icon: "📋" },
                      { step: "3. PASTE KE AI", desc: "Kirim prompt ke ChatGPT/Midjourney", icon: "🤖" },
                      { step: "4. SIMPAN HASIL", desc: "Unduh banner spanduk jadi", icon: "💾" },
                    ].map((item) => (
                      <div key={item.step} className="flex flex-col items-center text-center p-2.5 rounded-lg bg-gray-50 dark:bg-secondary/40 border border-gray-100 dark:border-border">
                        <span className="text-2xl mb-1">{item.icon}</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-foreground">{item.step}</span>
                        <span className="text-[10px] text-gray-500 dark:text-muted-foreground mt-0.5 leading-tight">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <BannerForm
              formData={formData}
              onUpdateField={updateField}
              onToggleElement={toggleVisualElement}
            />
          </div>

          {/* Right Column - Preview & Result */}
          <div className="lg:col-span-5 space-y-6">
            {/* Sticky container */}
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Prompt Preview Card */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-foreground flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Prompt AI
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className={`gap-2 transition-all border-gray-200 dark:border-border cursor-pointer ${
                      copied 
                        ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-900/30 text-green-700 dark:text-green-400" 
                        : "dark:hover:bg-secondary dark:text-foreground"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Prompt</span>
                      </>
                    )}
                  </Button>
                </div>
                <PromptPreview 
                  prompt={prompt} 
                  onCopy={copyPrompt} 
                  isOptimizing={optimizeMutation.isPending}
                  onOptimize={handleOptimize}
                  isAiOptimized={!!aiPrompt}
                />
              </div>

              {/* Generated Result */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Hasil Generate
                </h2>
                <GeneratedResult
                  imageUrl={generatedImage}
                  formData={formData}
                  onRegenerate={generateBanner}
                  isGenerating={isGenerating}
                />
              </div>

              {/* History */}
              {history.length > 0 && (
                <HistoryGallery
                  history={history}
                  onLoad={loadFromHistory}
                  onDelete={deleteFromHistory}
                />
              )}

              {/* Tips Card */}
              <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl p-4 transition-colors duration-300">
                <h4 className="font-semibold text-sm text-gray-800 dark:text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Tips Prompt High-Converting
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-600 dark:text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Brand name yang jelas dan mudah dibaca</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Warna kontras tinggi untuk headline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Tagline pendek dan memorable (max 6 kata)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Informasi kontak yang lengkap dan jelas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Sesuaikan mood dengan target audiens</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-border bg-white dark:bg-card mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-foreground">JogloGenerator</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-muted-foreground text-center">
              Prompt engineering tool untuk desainer banner & spanduk. 
              Generate prompt optimized untuk AI image generator seperti Midjourney, DALL-E, dan Stable Diffusion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
