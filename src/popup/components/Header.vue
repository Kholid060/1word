<template>
  <div class="bg-primary header shadow-inner pb-6 justify-between text-white items-center flex px-5" :style="{ height: elementSize.height }">
    <div>
      <p class="text-white font-bold text-overflow" :class="[elementSize.title]">{{ getActiveName }}</p>
      <span style="color: #ffffffd4" class="text-sm">{{ wordLength }} words</span>
    </div>
    <div
      class="block-button p-3 rounded-full shadow-xl"
      :class="{ blocked: isWebBlocked }"
      v-tooltip.left="isWebBlocked ? 'Unblock website' : 'Block website'"
      @click="blockBtnHandler"
    >
      <mdi-icon name="mdi-power" :size="elementSize.btn"></mdi-icon>
    </div>
  </div>
</template>
<script>
import Word from '~/store/models/Word';
import url from 'url';

export default {
  props: {
    small: Boolean,
  },
  data: () => ({
    currentWebsite: '',
  }),
  computed: {
    wordLength() {
      const { popup } = this.$store.state;
      return Word.query()
        .where(word => {
          if (popup.activeId === 'all') return true;
          else return word.learn_id === popup.activeId;
        })
        .count();
    },
    elementSize() {
      return this.small
        ? {
            height: '95px',
            title: 'text-xl leading-none',
            btn: '24',
          }
        : {
            height: '150px',
            title: 'text-2xl',
            btn: '32',
          };
    },
    isWebBlocked() {
      return this.$store.state.blockedWebsite.includes(this.currentWebsite);
    },
    getActiveName() {
      const activeId = this.$store.state.popup.activeId;

      if (activeId !== 'all') return this.$options.filters.getLang(activeId);
      else return '1Word';
    },
  },
  methods: {
    blockBtnHandler() {
      if (this.isWebBlocked) {
        const index = this.$store.state.blockedWebsite.indexOf(this.currentWebsite);

        this.$store.commit('blockedWebsite', {
          type: 'delete',
          data: index,
        });
      } else {
        this.$store.commit('blockedWebsite', {
          type: 'add',
          data: this.currentWebsite,
        });
      }
    },
  },
  mounted() {
    this.$browser.tabs.query({ active: true }).then(([tab]) => {
      const { protocol, hostname } = url.parse(tab.url);

      this.currentWebsite = `${protocol}//${hostname}`;
    });
  },
};
</script>
<style lang="scss">
.header {
  transition: all 0.5s ease;
  * {
    transition: all 0.2s ease;
  }
}
.block-button {
  animation: pulse 1.5s infinite;
  background-color: white;
  cursor: pointer;
  &.blocked {
    @apply bg-danger;
    .mdi-icon {
      color: white;
    }
  }
  .mdi-icon {
    @apply text-primary;
  }
  &:hover {
    animation: none;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
