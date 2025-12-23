"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Instagram, MapPin, Calendar, Link as LinkIcon, Edit2, Save, X, Camera, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/hooks/use-profile";
import PageHeader from "@/components/dashboard/PageHeader";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, isLoading: loading, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
    instagram_username: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        instagram_username: profile.instagram_username || "",
      });
    }
  }, [profile]);

  const email = profile?.email || "";

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: publicUrl });
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({
          display_name: formData.display_name,
          bio: formData.bio, 
          instagram_username: formData.instagram_username,
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating profile:", error);
    } 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-10">
      <PageHeader 
        title="My Profile" 
        description="Manage your personal information and public presence."
        actions={
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" className="gap-2" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-12">
        {/* Main Info Card */}
        <Card className="md:col-span-8 border-none shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5"></div>
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6 gap-6 px-4">
              <div className="relative group">
                <Avatar key={profile?.avatar_url} className="h-24 w-24 border-4 border-background shadow-md">
                  <AvatarImage src={profile?.avatar_url} className="object-cover" />
                  <AvatarFallback className="text-xl bg-muted">
                    {profile?.username?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {uploading ? (
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    ) : (
                      <Camera className="h-6 w-6 text-white" />
                    )}
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="flex-1 text-center md:text-left space-y-1 mb-2">
                  {isEditing ? (
                    <Input
                      value={formData.display_name}
                      onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                      placeholder="Your Display Name"
                      className="text-lg font-bold h-auto py-1 px-2 -ml-2 w-full max-w-sm border-2 border-primary/20 focus-visible:ring-primary"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-foreground">
                      {profile?.display_name || profile?.username || "User"}
                    </h2>
                  )}
                <p className="text-muted-foreground">@{profile?.username}</p>
              </div>
            </div>

            <div className="space-y-6 px-4 pb-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg border border-border/50 text-foreground">
                    <span className="text-muted-foreground/40 mr-2">@</span>
                    {profile?.username}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg border border-border/50 text-foreground">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground/40" />
                    {email}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                {isEditing ? (
                   <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="min-h-[120px] resize-none"
                   />
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-gray-600 min-h-[100px] whitespace-pre-wrap">
                    {profile?.bio || "No bio yet. Click edit to add a bio!"}
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-border/50">
                 <h3 className="text-sm font-semibold mb-3 text-foreground">Connected Accounts</h3>
                 <div className="flex flex-wrap gap-3">
                    {isEditing ? (
                       <div className="flex items-center gap-2 w-full max-w-sm">
                          <Instagram className="h-5 w-5 text-gray-400" />
                          <Input 
                            value={formData.instagram_username}
                            onChange={(e) => setFormData({...formData, instagram_username: e.target.value})}
                            placeholder="Instagram Username"
                          />
                       </div>
                    ) : (
                       profile?.instagram_username && (
                        <a 
                          href={`https://instagram.com/${profile.instagram_username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors"
                        >
                          <Instagram className="h-4 w-4" />
                          instagram.com/{profile.instagram_username}
                        </a>
                      )
                    )}
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats / Side Card */}
        <Card className="md:col-span-4 border-none shadow-sm h-fit">
          <CardHeader>
            <h3 className="font-semibold text-foreground">Account Details</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground/50" />
              <div className="text-sm">
                <p className="text-foreground font-medium">Joined</p>
                <p className="text-xs">{new Date(profile?.created_at || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
                <Button className="w-full justify-start" variant="ghost" onClick={() => window.open(`/${profile?.username}`, '_blank')}>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    View Public Page
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Logout Button */}
      <div className="md:hidden mt-8">
        <Button 
          variant="outline" 
          className="w-full py-6 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all bg-background/50 backdrop-blur-sm shadow-sm"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout from Account
        </Button>
      </div>
    </div>
  );
}
