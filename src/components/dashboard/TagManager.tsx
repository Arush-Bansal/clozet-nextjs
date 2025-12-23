
"use client";

import { useState } from "react";
// supabase import removed
import { useTags } from "@/hooks/use-tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, X, Tag as TagIcon } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const TagManager = () => {
  const { tags, isLoading: loading, createTag, deleteTag: deleteTagMutation, isCreating: adding } = useTags();
  const [newTag, setNewTag] = useState("");

  const addTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      await createTag(newTag);
      setNewTag("");
    } catch (error) {
      // Error handled in hook
    } 
  };

  const deleteTag = async (id: string, name: string) => {
    // Optional: Check if tag is in use? Supabase cascade will handle it but warn user?
    if (!confirm(`Are you sure you want to delete tag "${name}"? It will be removed from all products.`)) return;

    try {
      await deleteTagMutation(id);
    } catch (error) {
      // Error handled in hook 
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Manage Tags</h3>
        <p className="text-sm text-gray-500">Create tags to organize your products.</p>
      </div>

      <form onSubmit={addTag} className="flex gap-2">
        <Input
          placeholder="New tag name (e.g. Vintage, Summer)"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="h-10"
        />
        <Button type="submit" disabled={adding || !newTag.trim()} className="h-10">
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">Add</span>
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {tags.length === 0 ? (
          <div className="w-full text-center py-8 text-gray-400 border-2 border-dashed rounded-xl bg-gray-50">
            <TagIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tags created yet</p>
          </div>
        ) : (
          tags.map((tag) => (
            <Badge 
              key={tag.id} 
              variant="secondary" 
              className="pl-3 pr-1 py-1.5 text-sm flex items-center gap-2 group hover:bg-gray-200"
            >
              {tag.name}
              <button
                onClick={() => deleteTag(tag.id, tag.name)}
                className="hover:bg-gray-300 rounded-full p-0.5 transition-colors"
                type="button"
              >
                <X className="h-3 w-3 text-gray-500 group-hover:text-red-500" />
              </button>
            </Badge>
          ))
        )}
      </div>
    </div>
  );
};

export default TagManager;
