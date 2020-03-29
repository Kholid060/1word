<template>
  <div class="flex items-center h-full">
    <div class="w-5/12">
      <p class="text-4xl font-bold mb-3">Add word</p>
      <p class="text-xl">When you browsing the web, you can add a word to your list by double click at the word that you want to add.</p>
      <button-ui width="200px" @click="$emit('next', 'add-learn')" type="primary" class="mt-20">Next</button-ui>
    </div>
    <div class="w-7/12">
      <img :src="require('~/assets/images/illustration.png').default" class="illustration" />
    </div>
  </div>
</template>
