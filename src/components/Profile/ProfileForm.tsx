
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useProfile, type Profile } from '@/hooks/useProfile';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const LANGUAGES = ['Español', 'English', 'Português', 'Français', 'Deutsch', 'Italiano'];
const TIMEZONES = ['Europe/Madrid', 'America/New_York', 'America/Los_Angeles', 'Asia/Tokyo'];

export default function ProfileForm() {
  const { session } = useAuth();
  const { profile, isLoading, fetchProfile, updateProfile } = useProfile();
  
  const form = useForm<Profile>({
    defaultValues: {
      username: '',
      avatar_url: '',
      games: [],
      description: '',
      language: '',
      timezone: '',
      availability: ''
    }
  });

  useEffect(() => {
    if (session?.user.id) {
      fetchProfile(session.user.id);
    }
  }, [session?.user.id]);

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile]);

  const onSubmit = async (data: Profile) => {
    if (!session?.user.id) {
      toast.error('Must be logged in to update profile');
      return;
    }
    await updateProfile(session.user.id, data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-twitch" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre en Twitch" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="URL de tu avatar" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="games"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Games</FormLabel>
              <FormControl>
                <Input 
                  placeholder="League of Legends, Valorant, etc." 
                  value={field.value?.join(', ') || ''} 
                  onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Cuéntanos sobre tu contenido..."
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Weekdays 18:00-22:00" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full gradient-purple">
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Profile'
          )}
        </Button>
      </form>
    </Form>
  );
}
