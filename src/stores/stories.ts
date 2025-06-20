import { ref } from 'vue'
import { storyService } from '../lib/supabase'
import type { Story } from '../lib/supabase'

export const useStories = () => {
  const stories = ref<Story[]>([])
  const featuredStories = ref<Story[]>([])
  const loading = ref(false)

  const fetchStories = async () => {
    loading.value = true
    try {
      const { data, error } = await storyService.getApprovedStories()
      if (error) throw error
      stories.value = data || []
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching stories:', error)
      return { data: null, error }
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedStories = async () => {
    try {
      const { data, error } = await storyService.getFeaturedStories()
      if (error) throw error
      featuredStories.value = data || []
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching featured stories:', error)
      return { data: null, error }
    }
  }

  const submitStory = async (name: string, email: string, story: string, location?: string) => {
    try {
      const { data, error } = await storyService.submitStory(name, email, story, location)
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error submitting story:', error)
      return { data: null, error }
    }
  }

  return {
    stories,
    featuredStories,
    loading,
    fetchStories,
    fetchFeaturedStories,
    submitStory
  }
}