import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Copy, FileText, Sparkles, Loader2 } from "lucide-react";

interface PromptPreviewProps {
  readonly prompt: string;
  readonly onCopy: () => Promise<boolean>;
  readonly isOptimizing?: boolean;
  readonly onOptimize?: () => void;
  readonly isAiOptimized?: boolean;
}

export function PromptPreview({ 
  prompt, 
  onCopy, 
  isOptimizing = false, 
  onOptimize, 
  isAiOptimized = false 
}: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900 dark:text-foreground">AI Prompt Preview</h3>
            <div className="flex gap-1.5">
              <Badge variant="secondary" className="text-xs font-mono border-gray-200 dark:border-border">English</Badge>
              {isAiOptimized && (
                <Badge className="text-xs bg-primary/20 text-primary border border-primary/30 font-medium">
                  AI-Optimized ✨
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {onOptimize && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOptimize}
                disabled={isOptimizing}
                className="gap-1.5 text-xs text-primary border-primary/30 bg-primary/5 hover:bg-primary/15 hover:text-primary transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Mengoptimalkan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Optimalkan dengan AI</span>
                  </>
                )}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={`gap-2 transition-all duration-200 cursor-pointer ${
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
        </div>
        
        <div className="relative">
          <ScrollArea className="h-[200px] rounded-lg bg-gray-50 dark:bg-secondary/40 border border-gray-200 dark:border-border p-4">
            <p className="text-sm text-gray-700 dark:text-foreground leading-relaxed font-mono whitespace-pre-wrap">
              {prompt}
            </p>
          </ScrollArea>
          
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 dark:from-secondary/40 to-transparent rounded-b-lg pointer-events-none" />
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-muted-foreground">
          <Sparkles className="w-3 h-3 text-primary" />
          <span>
            {isAiOptimized
              ? "Prompt ini telah dioptimalkan secara mendalam menggunakan AI reasoning model"
              : "Prompt ini dioptimasi otomatis dari form input Anda untuk hasil desain terbaik"}
          </span>
        </div>
      </div>
    </Card>
  );
}
