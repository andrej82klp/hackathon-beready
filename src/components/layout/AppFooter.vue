<template>
  <footer class="bg-teal-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span class="text-teal-800 font-bold text-xl">B</span>
            </div>
            <span class="text-xl font-heading font-bold">BeReady</span>
          </div>
          <p class="text-gray-200 mb-4 max-w-md">
            Empowering everyone with the knowledge and confidence to provide first aid when it matters most. 
            You are the help until help arrives.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-heading font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/learn" class="text-gray-200 hover:text-white transition-colors duration-200">
                Learn
              </router-link>
            </li>
            <li>
              <router-link to="/stories" class="text-gray-200 hover:text-white transition-colors duration-200">
                Real Stories
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-200 hover:text-white transition-colors duration-200">
                About
              </router-link>
            </li>
            <li>
              <router-link to="/donate" class="text-gray-200 hover:text-white transition-colors duration-200">
                Donate
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-lg font-heading font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/feedback" class="text-gray-200 hover:text-white transition-colors duration-200">
                Feedback
              </router-link>
            </li>
            <li>
              <a href="mailto:contact@beready.org" class="text-gray-200 hover:text-white transition-colors duration-200">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-200 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-200 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-teal-700 mt-8 pt-8 text-center">
        <p class="text-gray-200">
          © {{ new Date().getFullYear() }} BeReady. All rights reserved. Empowering communities through first aid education.
        </p>
      </div>
    </div>
  </footer>
</template>