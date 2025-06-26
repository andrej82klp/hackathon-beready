<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-3xl">❤️</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-heading font-bold text-teal-800 mb-4">
          Support BeReady
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Help us keep first aid education free and accessible for everyone. 
          Your donation directly supports our mission to build a more prepared world.
        </p>
      </div>

      <!-- Impact Statement -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-heading font-bold text-teal-800 mb-6 text-center">
          Your Impact
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-4 bg-yellow-50 rounded-lg">
            <div class="text-3xl mb-2">📚</div>
            <h3 class="font-semibold text-teal-800 mb-2">$25</h3>
            <p class="text-sm text-gray-600">Provides free access to all modules for 5 learners</p>
          </div>
          
          <div class="text-center p-4 bg-yellow-50 rounded-lg">
            <div class="text-3xl mb-2">🎥</div>
            <h3 class="font-semibold text-teal-800 mb-2">$50</h3>
            <p class="text-sm text-gray-600">Funds creation of one new instructional video</p>
          </div>
          
          <div class="text-center p-4 bg-yellow-50 rounded-lg">
            <div class="text-3xl mb-2">🌍</div>
            <h3 class="font-semibold text-teal-800 mb-2">$100</h3>
            <p class="text-sm text-gray-600">Supports platform hosting for 1,000 users per month</p>
          </div>
        </div>
      </div>

      <!-- Donation Form -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-heading font-bold text-teal-800 mb-6">
          Make a Donation
        </h2>

        <form @submit.prevent="processDonation" class="space-y-6">
          <!-- Donation Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Donation Type
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                @click="donationType = 'one-time'"
                class="p-4 border-2 rounded-lg transition-colors duration-200"
                :class="donationType === 'one-time' 
                  ? 'border-teal-800 bg-teal-50 text-teal-800' 
                  : 'border-gray-200 hover:border-gray-300'"
              >
                <div class="font-semibold">One-time</div>
                <div class="text-sm text-gray-600">Single donation</div>
              </button>
              
              <button
                type="button"
                @click="donationType = 'monthly'"
                class="p-4 border-2 rounded-lg transition-colors duration-200"
                :class="donationType === 'monthly' 
                  ? 'border-teal-800 bg-teal-50 text-teal-800' 
                  : 'border-gray-200 hover:border-gray-300'"
              >
                <div class="font-semibold">Monthly</div>
                <div class="text-sm text-gray-600">Recurring support</div>
              </button>
            </div>
          </div>

          <!-- Amount Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Amount
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <button
                v-for="amount in suggestedAmounts"
                :key="amount"
                type="button"
                @click="selectedAmount = amount"
                class="p-3 border-2 rounded-lg font-semibold transition-colors duration-200"
                :class="selectedAmount === amount 
                  ? 'border-yellow-400 bg-yellow-50 text-teal-800' 
                  : 'border-gray-200 hover:border-gray-300'"
              >
                ${{ amount }}
              </button>
            </div>
            
            <div class="flex items-center">
              <span class="text-gray-500 mr-2">$</span>
              <input
                v-model.number="customAmount"
                type="number"
                min="1"
                step="1"
                placeholder="Custom amount"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-800 focus:border-transparent"
                @input="selectedAmount = null"
              />
            </div>
          </div>

          <!-- Donor Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                v-model="donorInfo.firstName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-800 focus:border-transparent"
              />
            </div>
            
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                v-model="donorInfo.lastName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-800 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              v-model="donorInfo.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-800 focus:border-transparent"
            />
          </div>

          <!-- Payment Method -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-4xl mb-2">💳</div>
              <p class="text-gray-600 mb-2">Secure payment processing</p>
              <p class="text-sm text-gray-500">
                We use industry-standard encryption to protect your payment information
              </p>
            </div>
          </div>

          <!-- Additional Options -->
          <div class="space-y-3">
            <div class="flex items-center">
              <input
                id="anonymous"
                v-model="donorInfo.anonymous"
                type="checkbox"
                class="h-4 w-4 text-teal-800 focus:ring-teal-800 border-gray-300 rounded"
              />
              <label for="anonymous" class="ml-2 text-sm text-gray-700">
                Make this donation anonymous
              </label>
            </div>
            
            <div class="flex items-center">
              <input
                id="newsletter"
                v-model="donorInfo.newsletter"
                type="checkbox"
                class="h-4 w-4 text-teal-800 focus:ring-teal-800 border-gray-300 rounded"
              />
              <label for="newsletter" class="ml-2 text-sm text-gray-700">
                Send me updates about BeReady's impact
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="!isFormValid || processing"
              class="w-full bg-yellow-400 text-teal-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="processing">Processing...</span>
              <span v-else>
                Donate ${{ finalAmount }} {{ donationType === 'monthly' ? '/month' : '' }}
              </span>
            </button>
          </div>

          <!-- Security Notice -->
          <!-- <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">
                  Your donation is secure and tax-deductible
                </h3>
                <p class="text-sm text-green-700 mt-1">
                  BeReady is a registered 501(c)(3) nonprofit organization. You will receive a receipt for tax purposes.
                </p>
              </div>
            </div>
          </div> -->
        </form>
      </div>

      <!-- Other Ways to Help -->
      <div class="mt-12 bg-teal-800 rounded-xl p-8 text-white text-center">
        <h2 class="text-2xl font-heading font-bold mb-4">
          Other Ways to Support BeReady
        </h2>
        <p class="text-gray-100 mb-6">
          Can't donate right now? There are other meaningful ways to help our mission.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
      <!-- Security Notice -->
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              Your donation is secure
            </h3>
            <p class="text-sm text-green-700 mt-1">
              All payments are processed securely through Stripe. You will receive a receipt for your records.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStripe } from '../stores/stripe'
import { stripeProducts } from '../stripe-config'

const { createCheckoutSession, loading: stripeLoading } = useStripe()

const donationType = ref<'one-time' | 'monthly'>('one-time')
const selectedAmount = ref<number | null>(25)
const customAmount = ref<number | null>(null)
const processing = ref(false)

const suggestedAmounts = [10, 25, 50, 100]

const donorInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  anonymous: false,
  newsletter: true
})

const finalAmount = computed(() => {
  return customAmount.value || selectedAmount.value || 0
})

const isFormValid = computed(() => {
  return finalAmount.value > 0 && 
         donorInfo.value.firstName && 
         donorInfo.value.lastName && 
         donorInfo.value.email
})

const processDonation = async () => {
  if (!isFormValid.value) return

  processing.value = true

  try {
    // Use the donation product from stripe-config
    const donationProduct = stripeProducts.find(p => p.name === 'Donation')
    
    if (!donationProduct) {
      throw new Error('Donation product not found')
    }

    await createCheckoutSession(donationProduct)

  } catch (error) {
    console.error('Donation processing error:', error)
    alert('There was an error processing your donation. Please try again.')
  } finally {
    processing.value = false
  }
}
</script>