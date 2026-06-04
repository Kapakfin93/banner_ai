import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, ExternalLink, Check } from "lucide-react";
import { useState } from "react";
import type { BannerFormData } from "@/types/banner";

interface GeneratedResultProps {
  readonly imageUrl: string | null;
  readonly formData: BannerFormData;
  readonly onRegenerate: () => void;
  readonly isGenerating: boolean;
}

export function GeneratedResult({
  imageUrl,
  formData,
  onRegenerate,
  isGenerating,
}: GeneratedResultProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = globalThis.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `banner-${formData.brandName.toLowerCase().replaceAll(/\s+/g, "-")}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      globalThis.URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch {
      globalThis.open(imageUrl, "_blank");
    }
  };

  if (!imageUrl) {
    return (
      <Card className="p-8 border-dashed border-2 border-gray-300 dark:border-zinc-700 shadow-sm bg-white dark:bg-card">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-secondary/40 flex items-center justify-center mb-4">
            <RefreshCw className="w-10 h-10 text-gray-400 dark:text-zinc-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-foreground mb-2">
            Belum Ada Hasil
          </h3>
          <p className="text-sm text-gray-500 dark:text-muted-foreground max-w-md">
            Isi form spesifikasi banner di sebelah kiri, lalu klik "Generate Banner AI" untuk membuat desain
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden shadow-lg bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="relative bg-gray-100 dark:bg-secondary/20">
          {isGenerating && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-white font-medium">Generating...</span>
              </div>
            </div>
          )}
          <img
            src={imageUrl}
            alt={`Banner desain untuk ${formData.brandName}`}
            className="w-full h-auto object-contain max-h-[500px]"
          />
        </div>

        <div className="p-4 bg-white dark:bg-card">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs border-gray-200 dark:border-border dark:text-muted-foreground">
                {formData.bannerSize === "custom"
                  ? `${formData.customWidth}×${formData.customHeight}m`
                  : formData.bannerSize}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-gray-200 dark:border-border"
                style={{
                  borderColor: formData.primaryColor,
                  backgroundColor: formData.primaryColor + "15",
                  color: formData.primaryColor,
                }}
              >
                {formData.primaryColor}
              </Badge>
              <Badge variant="secondary" className="text-xs border-gray-200 dark:border-border dark:text-muted-foreground">
                {formData.designStyle.replaceAll("-", " ")}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2 cursor-pointer border-gray-200 dark:border-border dark:text-foreground dark:hover:bg-secondary"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>Tersimpan</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => globalThis.open(imageUrl, "_blank")}
                className="gap-2 cursor-pointer border-gray-200 dark:border-border dark:text-foreground dark:hover:bg-secondary"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onRegenerate}
                disabled={isGenerating}
                className="gap-2 bg-primary hover:bg-primary-active text-primary-foreground font-bold cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                <span>Generate Ulang</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <h4 className="font-medium text-sm text-gray-700 dark:text-foreground mb-3">Ringkasan Spesifikasi</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500 dark:text-muted-foreground">Brand:</div>
          <div className="text-gray-900 dark:text-foreground font-medium">{formData.brandName}</div>
          
          {formData.tagline && (
            <>
              <div className="text-gray-500 dark:text-muted-foreground">Tagline:</div>
              <div className="text-gray-900 dark:text-foreground">{formData.tagline}</div>
            </>
          )}
          
          <div className="text-gray-500 dark:text-muted-foreground">Kategori:</div>
          <div className="text-gray-900 dark:text-foreground capitalize">{formData.category}</div>
          
          <div className="text-gray-500 dark:text-muted-foreground">Gaya:</div>
          <div className="text-gray-900 dark:text-foreground capitalize">
            {formData.designStyle.replaceAll("-", " ")}
          </div>
          
          <div className="text-gray-500 dark:text-muted-foreground">Mood:</div>
          <div className="text-gray-900 dark:text-foreground capitalize">{formData.mood}</div>
          
          <div className="text-gray-500 dark:text-muted-foreground">Target:</div>
          <div className="text-gray-900 dark:text-foreground capitalize">
            {formData.targetAudience.replaceAll("-", " ")}
          </div>
          
          {formData.visualElements.length > 0 && (
            <>
              <div className="text-gray-500 dark:text-muted-foreground">Elemen:</div>
              <div className="text-gray-900 dark:text-foreground">
                {formData.visualElements.join(", ")}
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
