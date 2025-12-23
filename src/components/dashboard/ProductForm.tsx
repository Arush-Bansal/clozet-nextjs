
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useTags } from "@/hooks/use-tags";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Image as ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";

export interface ProductFormData {
  id?: string;
  title: string;
  price: number;
  image_url: string;
  is_sold: boolean;
  tags: string[];
}

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: ProductFormData | null;
}

const ProductForm = ({ onSuccess, onCancel, initialData }: ProductFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price.toString() || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [isSold, setIsSold] = useState(initialData?.is_sold || false);
  const { saveProduct, isSaving } = useProducts();
  const { tags } = useTags();
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);
  
  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !imagePreview) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let imageUrl = imagePreview;

      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${user.id}/${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      await saveProduct({
        id: initialData?.id,
        title,
        price: parseFloat(price),
        image_url: imageUrl!,
        is_sold: isSold,
        tags: selectedTags
      });

      onSuccess();
    } catch (error: any) {
      // Error is handled in the mutation onSuccess/onError but we might need to handle storage errors here
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-serif">{initialData ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Label htmlFor="image-upload" className="w-full cursor-pointer">
              <div className="aspect-square w-full max-w-[240px] mx-auto bg-muted/30 border-2 border-dashed border-border/50 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:bg-muted/50 transition-colors group relative">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="h-8 w-8 text-white" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center mb-2 shadow-sm border border-border/50">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">Upload Square Photo</span>
                  </>
                )}
              </div>
              <input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </Label>
            <p className="text-xs text-muted-foreground/50 text-center">Images will be automatically cropped to square.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. Vintage Denim Jacket" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-semibold">Price (₹)</Label>
            <Input 
              id="price" 
              type="number"
              placeholder="0.00" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl h-11"
              required
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="space-y-0.5">
              <Label htmlFor="is-sold" className="text-sm font-semibold">Mark as Sold</Label>
              <p className="text-xs text-muted-foreground">Toggle this if the item is already sold.</p>
            </div>
            <Switch 
              id="is-sold" 
              checked={isSold}
              onCheckedChange={setIsSold}
            />
          </div>

          {tags.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                    className="cursor-pointer select-none px-3 py-1.5 transition-all hover:border-primary"
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1 h-11 rounded-xl font-semibold" disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
