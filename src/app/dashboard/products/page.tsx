"use client";

import { useState } from "react";
import { ProductsSkeleton } from "@/components/skeletons/ProductsSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Package, Tag, Trash2, ExternalLink, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductForm from "@/components/dashboard/ProductForm";
import TagManager from "@/components/dashboard/TagManager";
import PageHeader from "@/components/dashboard/PageHeader";

export default function ProductsPage() {
  const { products, isLoading: loading, toggleStatus, deleteProduct } = useProducts();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);

  const handleToggleSold = async (id: string, isSold: boolean) => {
    try {
      await toggleStatus({ id, isSold });
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
    } catch (error) {
      // Error handled in hook
    }
  };

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Products" 
        description="Manage what you're selling on your public profile"
        actions={
          <div className="flex gap-3">
            <Dialog open={isTagsDialogOpen} onOpenChange={setIsTagsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-xl px-4 h-11">
                  <Tag className="mr-2 h-4 w-4" />
                  Manage Tags
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-3xl p-6">
                <TagManager />
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) setEditingProduct(null);
            }}>
              <DialogTrigger asChild>
                <Button className="rounded-xl px-6 h-11" onClick={() => setEditingProduct(null)}>
                  <Plus className="mr-2 h-5 w-5" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-3xl p-6">
                <ProductForm 
                  initialData={editingProduct}
                  onSuccess={() => {
                    setIsDialogOpen(false);
                    setEditingProduct(null);
                    queryClient.invalidateQueries({ queryKey: ["products"] });
                  }}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setEditingProduct(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {products.length === 0 ? (
        <Card className="border-dashed border-2 border-border shadow-none bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mb-4 shadow-sm border border-border/50">
              <Package className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <CardTitle className="text-xl text-foreground">No products yet</CardTitle>
            <CardDescription className="max-w-xs mt-2">
              Start adding pre-loved items to your store to start earning.
            </CardDescription>
            <Button variant="outline" className="mt-6 rounded-xl">
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group">
              <div className="aspect-square relative overflow-hidden bg-muted/30">
                <img 
                  src={product.image_url} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                   {product.is_sold && (
                     <Badge className="bg-red-500 text-white border-none px-3 py-1">SOLD</Badge>
                   )}
                </div>
              </div>
              <CardHeader className="p-3 sm:p-4 pb-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                  <CardTitle className="text-base sm:text-lg line-clamp-1 flex-1">{product.title}</CardTitle>
                  <span className="font-bold text-base sm:text-lg">₹{product.price}</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-3 sm:pt-4 flex items-center justify-between border-t border-border/50 mt-3 sm:mt-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Switch 
                    id={`sold-${product.id}`} 
                    checked={product.is_sold}
                    onCheckedChange={(checked) => handleToggleSold(product.id, checked)}
                    className="scale-75 sm:scale-100 origin-left"
                  />
                  <Label htmlFor={`sold-${product.id}`} className="text-[10px] sm:text-sm font-medium text-muted-foreground">
                    Sold
                  </Label>
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 sm:h-9 sm:w-9 text-gray-400 hover:text-primary hover:bg-primary/10" 
                    onClick={() => {
                      const tags = product.product_tags?.map((pt: any) => pt.tag_id) || [];
                      setEditingProduct({
                        ...product,
                        tags
                      });
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-9 sm:w-9 text-gray-400 hover:text-red-500 hover:bg-red-50" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
