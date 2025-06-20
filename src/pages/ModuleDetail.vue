<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-800"></div>
        <p class="mt-4 text-gray-600">Loading module...</p>
      </div>

      <!-- Module Not Found -->
      <div v-else-if="!module" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">❓</span>
        </div>
        <h1 class="text-2xl font-heading font-bold text-gray-800 mb-4">Module Not Found</h1>
        <p class="text-gray-600 mb-6">The module you're looking for doesn't exist.</p>
        <router-link
          to="/learn"
          class="bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
        >
          Back to Modules
        </router-link>
      </div>

      <!-- Module Content -->
      <div v-else>
        <!-- Module Header -->
        <div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div class="flex items-center mb-6">
            <router-link
              to="/learn"
              class="mr-4 text-gray-500 hover:text-teal-800 transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </router-link>
            <div class="flex-1">
              <div class="flex items-center space-x-4 mb-2">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">{{ module.icon }}</span>
                </div>
                <div>
                  <h1 class="text-2xl md:text-3xl font-heading font-bold text-teal-800">
                    {{ module.title }}
                  </h1>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{{ module.duration }}</span>
                    <span class="capitalize">{{ module.difficulty }}</span>
                    <span v-if="moduleProgress?.completed" class="text-green-600 font-medium">
                      ✓ Completed ({{ moduleProgress.score }}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p class="text-lg text-gray-600">
            {{ module.description }}
          </p>
        </div>

        <!-- Slide-based Content or Regular Content -->
        <div v-if="moduleSlides.length > 0">
          <SlideNavigation 
            :slides="moduleSlides" 
            :module="module"
            @start-test="startTest"
          />
        </div>
        
        <!-- Regular Module Content (fallback) -->
        <div v-else>
          <div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <div class="prose prose-lg max-w-none" v-html="module.content"></div>

            <!-- Video Placeholder -->
            <div class="mt-8 bg-gray-100 rounded-lg p-8 text-center">
              <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-teal-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-heading font-bold text-teal-800 mb-2">
                Video Demonstration
              </h3>
              <p class="text-gray-600 mb-4">
                Watch our step-by-step video guide for {{ module.title.toLowerCase() }}.
              </p>
              <button class="bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200">
                Play Video
              </button>
            </div>
          </div>

          <!-- Test Section -->
          <div class="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-8 text-center">
            <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">🏆</span>
            </div>
            
            <h2 class="text-2xl font-heading font-bold text-teal-800 mb-4">
              Ready to Test Your Knowledge?
            </h2>
            
            <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
              Complete the assessment to earn your {{ module.badge_name }} badge and demonstrate your mastery of these essential skills.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                v-if="isAuthenticated"
                @click="startTest"
                class="bg-yellow-400 text-teal-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
              >
                {{ moduleProgress?.completed ? 'Retake Test' : 'Take the Test to Earn Your Badge' }}
              </button>
              
              <router-link
                v-else
                to="/register"
                class="bg-yellow-400 text-teal-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
              >
                Sign Up to Take Test & Earn Badge
              </router-link>
              
              <router-link
                to="/learn"
                class="bg-gray-200 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Back to Modules
              </router-link>
            </div>
          </div>
        </div>

        <!-- Test Modal -->
        <div
          v-if="showTest"
          class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 md:p-8">
              <ModuleTest
                v-if="module"
                :module-id="module.id"
                :module-name="module.title"
                :badge-name="module.badge_name"
                @test-completed="handleTestCompleted"
                @close="closeTest"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../stores/auth'
import { useModules } from '../stores/modules'
import { useAchievements } from '../stores/achievements'
import SlideNavigation from '../components/SlideNavigation.vue'
import ModuleTest from '../components/ModuleTest.vue'
import type { Module } from '../lib/supabase'

const route = useRoute()
const { user, isAuthenticated } = useAuth()
const { fetchModuleById, startModule, completeModule, fetchUserProgress, userProgress } = useModules()
const { earnBadge } = useAchievements()

const module = ref<Module | null>(null)
const loading = ref(true)
const showTest = ref(false)

const moduleProgress = computed(() => {
  if (!user.value || !module.value) return null
  return userProgress.value.find(p => p.module_id === module.value!.id)
})


onMounted(async () => {
  const moduleId = route.params.id as string
  
  try {
    const { data, error } = await fetchModuleById(moduleId)
    if (error) throw error
    module.value = data
    
    // Start tracking this module if user is authenticated
    if (isAuthenticated.value && user.value) {
      await fetchUserProgress(user.value.id)
      await startModule(user.value.id, moduleId)
    }
  } catch (error) {
    console.error('Error loading module:', error)
  } finally {
    loading.value = false
  }
})

const startTest = () => {
  showTest.value = true
  currentQuestion.value = 0
  selectedAnswer.value = null
  userAnswers.value = []
  testScore.value = 0
}

const closeTest = () => {
  showTest.value = false
  currentQuestion.value = 0
  selectedAnswer.value = null
  userAnswers.value = []
}

const selectAnswer = (index: number) => {
  selectedAnswer.value = index
}

const nextQuestion = () => {
  if (selectedAnswer.value !== null) {
    userAnswers.value[currentQuestion.value] = selectedAnswer.value
    currentQuestion.value++
    selectedAnswer.value = null
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
    selectedAnswer.value = userAnswers.value[currentQuestion.value] || null
  }
}

const finishTest = async () => {
  if (selectedAnswer.value !== null) {
    userAnswers.value[currentQuestion.value] = selectedAnswer.value
  }

  submittingTest.value = true

  try {
    // Calculate score
    let correct = 0
    userAnswers.value.forEach((answer, index) => {
      if (answer === testQuestions.value[index].correct) {
        correct++
      }
    })
    
    testScore.value = Math.round((correct / testQuestions.value.length) * 100)
    currentQuestion.value = testQuestions.value.length

    // Save progress and award badge if passing score and user is authenticated
    if (isAuthenticated.value && user.value && module.value) {
      // Complete the module
      await completeModule(user.value.id, module.value.id, testScore.value)
      
      // Award badge if passing score
      if (testScore.value >= 70) {
        await earnBadge(user.value.id, module.value.badge_name, module.value.id)
      }
    }
  } catch (error) {
    console.error('Error submitting test:', error)
  } finally {
    submittingTest.value = false
  }
}
</script>