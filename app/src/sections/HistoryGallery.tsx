import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { History, Trash2, Clock, ArrowRight } from "lucide-react";
import type { GeneratedBanner } from "@/types/banner";

interface HistoryGalleryProps {
  readonly history: GeneratedBanner[];
  readonly onLoad: (banner: GeneratedBanner) => void;
  readonly onDelete: (id: string) => void;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins}m lalu`;
  if (diffHours < 24) return `${diffHours}j lalu`;
  if (diffDays < 7) return `${diffDays}h lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function HistoryGallery({ history, onLoad, onDelete }: HistoryGalleryProps) {
  if (history.length === 0) return null;

  return (
    <Card className="shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-gray-500 dark:text-muted-foreground" />
            <h3 className="font-semibold text-gray-900 dark:text-foreground">Riwayat Desain</h3>
            <Badge variant="secondary" className="text-xs border-gray-200 dark:border-border">{history.length}</Badge>
          </div>
        </div>

        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {history.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full text-left group flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-zinc-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-secondary/40 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => onLoad(item)}
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-secondary/20 flex-shrink-0 border border-gray-200 dark:border-zinc-700">
                  <img
                    src={item.imageUrl}
                    alt={item.formData.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 dark:text-foreground truncate">
                    {item.formData.brandName}
                  </p>
                  {item.formData.tagline && (
                    <p className="text-xs text-gray-500 dark:text-muted-foreground truncate">
                      {item.formData.tagline}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(item.timestamp)}
                    </span>
                    <Badge variant="outline" className="text-[10px] px-1 py-0 border-gray-200 dark:border-border dark:text-muted-foreground">
                      {item.formData.bannerSize}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 cursor-pointer hover:bg-gray-100 dark:hover:bg-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoad(item);
                    }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 hover:text-red-500 dark:hover:text-red-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
