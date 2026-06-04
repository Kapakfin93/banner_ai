import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BANNER_CATEGORIES,
  BANNER_SIZES,
  DESIGN_STYLES,
  VISUAL_ELEMENTS,
  TARGET_AUDIENCES,
  MOOD_OPTIONS,
} from "@/types/banner";
import type { BannerFormData } from "@/types/banner";
import {
  Palette,
  Type,
  Image,
  Users,
  Layout,
  Ruler,
  MessageSquare,
  Phone,
  Check,
} from "lucide-react";

interface BannerFormProps {
  readonly formData: BannerFormData;
  readonly onUpdateField: <K extends keyof BannerFormData>(field: K, value: BannerFormData[K]) => void;
  readonly onToggleElement: (element: string) => void;
}

export function BannerForm({
  formData,
  onUpdateField,
  onToggleElement,
}: BannerFormProps) {

  return (
    <div className="space-y-6">
      {/* Brand Info Section */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-foreground">Informasi Brand</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brandName" className="text-sm font-medium text-gray-700 dark:text-zinc-300">
              Nama Brand / Usaha <span className="text-red-500">*</span>
            </Label>
            <Input
              id="brandName"
              value={formData.brandName}
              onChange={(e) => onUpdateField("brandName", e.target.value)}
              placeholder="Contoh: Warung Sambal Pak Budi"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-zinc-300">
              Kategori Bisnis
            </Label>
            <Select
              value={formData.category}
              onValueChange={(v) => onUpdateField("category", v)}
            >
              <SelectTrigger className="h-11 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BANNER_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="cursor-pointer">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="tagline" className="text-sm font-medium text-gray-700 dark:text-zinc-300">
              Tagline / Slogan
            </Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => onUpdateField("tagline", e.target.value)}
              placeholder="Contoh: Pedasnya Bikin Nagih!"
              className="h-11"
            />
          </div>
        </div>
      </Card>

      {/* Banner Specs */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-foreground">Spesifikasi Banner</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Ukuran Banner</Label>
            <Select
              value={formData.bannerSize}
              onValueChange={(v) => onUpdateField("bannerSize", v)}
            >
              <SelectTrigger className="h-11 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BANNER_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value} className="cursor-pointer">
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {formData.bannerSize === "custom" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Ukuran Custom (meter)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={formData.customWidth}
                  onChange={(e) => onUpdateField("customWidth", e.target.value)}
                  placeholder="Lebar"
                  className="h-11"
                  min="0.5"
                  step="0.5"
                />
                <span className="text-gray-500 font-medium">×</span>
                <Input
                  type="number"
                  value={formData.customHeight}
                  onChange={(e) => onUpdateField("customHeight", e.target.value)}
                  placeholder="Tinggi"
                  className="h-11"
                  min="0.5"
                  step="0.5"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Colors */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-foreground">Warna Tema</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Warna Utama</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => onUpdateField("primaryColor", e.target.value)}
                className="w-14 h-11 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-zinc-700"
              />
              <div>
                <Badge variant="outline" className="font-mono text-xs border-gray-200 dark:border-border">
                  {formData.primaryColor}
                </Badge>
                <p className="text-xs text-gray-500 dark:text-muted-foreground mt-1">Warna dominan banner</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Warna Sekunder</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => onUpdateField("secondaryColor", e.target.value)}
                className="w-14 h-11 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-zinc-700"
              />
              <div>
                <Badge variant="outline" className="font-mono text-xs border-gray-200 dark:border-border">
                  {formData.secondaryColor}
                </Badge>
                <p className="text-xs text-gray-500 dark:text-muted-foreground mt-1">Warna aksen & detail</p>
              </div>
            </div>
          </div>
        </div>
        {/* Quick color presets */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 dark:text-muted-foreground mb-2">Preset warna populer:</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["#FF6B35", "#2C3E50"],
              ["#E74C3C", "#F39C12"],
              ["#27AE60", "#2ECC71"],
              ["#2980B9", "#3498DB"],
              ["#8E44AD", "#9B59B6"],
              ["#C0392B", "#ECF0F1"],
              ["#D35400", "#F1C40F"],
              ["#1ABC9C", "#16A085"],
            ].map(([primary, secondary]) => (
              <button
                key={`${primary}-${secondary}`}
                type="button"
                onClick={() => {
                  onUpdateField("primaryColor", primary);
                  onUpdateField("secondaryColor", secondary);
                }}
                className="flex rounded-full overflow-hidden border-2 border-gray-200 dark:border-zinc-700 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer"
              >
                <span className="w-5 h-5" style={{ backgroundColor: primary }} />
                <span className="w-5 h-5" style={{ backgroundColor: secondary }} />
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Design Style */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-foreground">Gaya Desain</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DESIGN_STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => onUpdateField("designStyle", style.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                formData.designStyle === style.value
                  ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-md"
                  : "border-gray-200 dark:border-border hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-secondary/40"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  formData.designStyle === style.value
                    ? "border-primary bg-primary"
                    : "border-gray-300 dark:border-zinc-700"
                }`}>
                  {formData.designStyle === style.value && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-foreground">{style.label}</p>
                  <p className="text-xs text-gray-500 dark:text-muted-foreground mt-0.5">{style.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Visual Elements */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-foreground">Elemen Visual</h3>
          <Badge variant="secondary" className="text-xs">
            Pilih beberapa
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VISUAL_ELEMENTS.map((element) => {
            const isSelected = formData.visualElements.includes(element.value);
            return (
              <button
                key={element.value}
                type="button"
                onClick={() => onToggleElement(element.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-md"
                    : "border-gray-200 dark:border-border hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-300 dark:border-zinc-700"
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-foreground">{element.label}</p>
                    <p className="text-xs text-gray-500 dark:text-muted-foreground mt-0.5">{element.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Target & Mood */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-foreground">Target & Mood</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Target Audiens</Label>
            <Select
              value={formData.targetAudience}
              onValueChange={(v) => onUpdateField("targetAudience", v)}
            >
              <SelectTrigger className="h-11 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TARGET_AUDIENCES.map((aud) => (
                  <SelectItem key={aud.value} value={aud.value} className="cursor-pointer">
                    {aud.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Mood / Feel</Label>
            <Select
              value={formData.mood}
              onValueChange={(v) => onUpdateField("mood", v)}
            >
              <SelectTrigger className="h-11 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOOD_OPTIONS.map((mood) => (
                  <SelectItem key={mood.value} value={mood.value} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: mood.color }}
                      />
                      {mood.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Contact Info */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-900 dark:text-foreground">Informasi Kontak</h3>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.includeContact}
              onCheckedChange={(v) => onUpdateField("includeContact", v)}
              className="cursor-pointer"
            />
            <span className="text-sm text-gray-600 dark:text-zinc-300">
              {formData.includeContact ? "Aktif" : "Nonaktif"}
            </span>
          </div>
        </div>
        {formData.includeContact && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactWhatsapp" className="text-xs font-medium text-gray-700 dark:text-zinc-300">No. WhatsApp</Label>
                <Input
                  id="contactWhatsapp"
                  value={formData.contactWhatsapp}
                  onChange={(e) => onUpdateField("contactWhatsapp", e.target.value)}
                  placeholder="Contoh: 0812-3456-7890"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactSocial" className="text-xs font-medium text-gray-700 dark:text-zinc-300">Instagram / Media Sosial</Label>
                <Input
                  id="contactSocial"
                  value={formData.contactSocial}
                  onChange={(e) => onUpdateField("contactSocial", e.target.value)}
                  placeholder="Contoh: @namabrand"
                  className="h-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactAddress" className="text-xs font-medium text-gray-700 dark:text-zinc-300">Alamat Toko / Usaha</Label>
              <Input
                id="contactAddress"
                value={formData.contactAddress}
                onChange={(e) => onUpdateField("contactAddress", e.target.value)}
                placeholder="Contoh: Jl. Mawar No. 123, Jakarta"
                className="h-10"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Additional Notes */}
      <Card className="p-5 border-l-4 border-l-primary shadow-sm bg-white dark:bg-card border-gray-200 dark:border-border">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-foreground">Catatan Tambahan</h3>
        </div>
        <Textarea
          value={formData.additionalNotes}
          onChange={(e) => onUpdateField("additionalNotes", e.target.value)}
          placeholder="Tambahan instruksi untuk desain (opsional)..."
          className="min-h-[80px] resize-none"
        />
      </Card>

      {/*
      <Separator />

      <Button
        onClick={onGenerate}
        disabled={!isValid || isGenerating}
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary-active text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isGenerating ? (
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            <span>Generating Desain Banner...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Generate Banner AI</span>
          </div>
        )}
      </Button>
      
      {!isValid && (
        <p className="text-center text-sm text-red-500 font-medium">
          Isi nama brand/usaha terlebih dahulu untuk generate
        </p>
      )}
      */}
    </div>
  );
}
