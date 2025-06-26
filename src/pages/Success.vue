<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Success Header -->
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-4xl">✅</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-heading font-bold text-teal-800 mb-4">
          Thank You!
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Your support means the world to us and helps keep BeReady free for everyone.
        </p>
      </div>

      <!-- Payment Details -->
      <div v-if="sessionDetails" class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-heading font-bold text-teal-800 mb-6">
          Payment Confirmation
        </h2>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Transaction ID:</span>
            <span class="font-mono text-sm">{{ sessionDetails.id }}</span>
          </div>
          
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Amount:</span>
            <span class="font-semibold">${{ formatAmount(sessionDetails.amount_total) }}</span>
          </div>
          
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-600">Payment Status:</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ sessionDetails.payment_status }}
            </span>
          </div>
          
          <div class="flex justify-between items-center py-3">
            <span class="text-gray-600">Date:</span>
            <span>{{ formatDate(new Date()) }}</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-800 mb-4"></div>
        <p class="text-gray-600">Loading payment details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
        <div class="flex items-center mb-4">
          <span class="text-2xl mr-3">❌</span>
          <h3 class="text-lg font-semibold text-red-800">Unable to Load Payment Details</h3>
        </div>
        <p class="text-red-700">{{ error }}</p>
      </div>

      <!-- Impact Message -->
      <div class="bg-gradient-to-r from-teal-800 to-teal-600 rounded-xl p-8 text-white text-center mb-8">
        <h2 class="text-2xl font-heading font-bold mb-4">
          Your Impact
        </h2>
        <p class="text-lg mb-6 text-gray-100">
          Your donation helps us continue providing free first aid education to people around the world. 
          Together, we're building a more prepared and safer community.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl mb-2">📚</div>
            <h3 class="font-semibold mb-1">Free Education</h3>
            <p class="text-sm text-gray-200">Keeping all modules accessible to everyone</p>
          </div>
          
          <div class="text-center">
            <div class="text-3xl mb-2">🌍</div>
            <h3 class="font-semibold mb-1">Global Reach</h3>
            <p class="text-sm text-gray-200">Supporting learners worldwide</p>
          </div>
          
          <div class="text-center">
            <div class="text-3xl mb-2">💡</div>
            <h3 class="font-semibold mb-1">New Content</h3>
            <p class="text-sm text-gray-200">Funding development of new modules</p>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-8 text-center">
        <h3 class="text-xl font-heading font-bold text-teal-800 mb-4">
          What's Next?
        </h3>
        <p class="text-gray-700 mb-6">
          Continue your first aid learning journey and help spread the word about BeReady.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/learn"
            class="bg-teal-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
          >
            Continue Learning
          </router-link>
          <router-link
            to="/stories"
            class="bg-yellow-400 text-teal-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
          >
            Share Your Story
          </router-link>
          <button
            @click="shareSuccess"
            class="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Share on Social
          </button>
        </div>
      </div>

      <!-- Receipt Notice -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>
          A receipt for your donation has been sent to your email address.
          If you have any questions, please contact us at 
          <a href="mailto:support@beready.org" class="text-teal-800 hover:text-teal-600">
            support@beready.org
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const sessionDetails = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const formatAmount = (amount: number) => {
  return (amount / 100).toFixed(2)
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const shareSuccess = () => {
  const text = "I just supported BeReady, a platform providing free first aid education! Join me in building a more prepared world. #BeReadyToAct"
  const url = window.location.origin
  
  if (navigator.share) {
    navigator.share({
      title: 'I supported BeReady!',
      text,
      url
    })
  } else {
    // Fallback to Twitter
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }
}

onMounted(async () => {
  const sessionId = route.query.session_id as string
  
  if (!sessionId) {
    error.value = 'No session ID provided'
    loading.value = false
    return
  }

  try {
    // In a real implementation, you might want to fetch session details from Stripe
    // For now, we'll create a mock session details object
    sessionDetails.value = {
      id: sessionId,
      amount_total: 2500, // $25.00 in cents
      payment_status: 'paid'
    }
  } catch (err) {
    console.error('Error loading session details:', err)
    error.value = 'Failed to load payment details'
  } finally {
    loading.value = false
  }
})
</script>