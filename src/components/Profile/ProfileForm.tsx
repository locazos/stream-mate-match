
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Gamepad2, Image } from 'lucide-react';

const ProfileForm: React.FC = () => {
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const streamCategories = [
    'Just Chatting',
    'Gaming',
    'Music',
    'Art',
    'IRL',
    'Educational',
    'Esports',
    'Talk Shows'
  ];
  
  const experienceLevels = [
    'Beginner',
    'Affiliate',
    'Partner',
    'Pro'
  ];

  const collaborationTypes = [
    'Co-streaming',
    'Guest Appearances',
    'Shared Projects',
    'Community Events',
    'Regular Collabs',
    'One-time Streams',
    'Tournament Teams',
    'Podcast/Talk Shows'
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your streamer profile has been saved successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-secondary mb-4 group">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image size={40} className="text-gray-400" />
            </div>
          )}
          <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <span className="text-white text-sm">Change Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Display Name</label>
          <Input placeholder="Your streamer name" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Twitch URL</label>
          <Input placeholder="https://twitch.tv/yourusername" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <Textarea placeholder="Tell other streamers about yourself..." className="min-h-[100px]" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Primary Category</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {streamCategories.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    <div className="flex items-center">
                      <Gamepad2 size={16} className="mr-2" />
                      {category}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Experience Level</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(level => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Typical Stream Schedule</label>
          <Input placeholder="E.g., Weekdays 7-10pm ET" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Looking For (Collaboration Types)</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {collaborationTypes.map(type => (
              <div key={type} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`collab-${type}`} 
                  className="rounded border-gray-600 text-twitch focus:ring-twitch"
                />
                <label htmlFor={`collab-${type}`} className="ml-2 text-sm">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full gradient-bg hover:opacity-90">
        Save Profile
      </Button>
    </form>
  );
};

export default ProfileForm;
