<template>
  <transition name="slide">
    <div class="fixed h-full add-word w-full" v-if="show">
      <div class="overlay absolute" @click="clearAll"></div>
      <div class="content px-5 py-4">
        <div class="flex items-center mb-5">
          <p>{{ data.type === 'add' ? 'Add' : 'Edit' }} word</p>
          <div class="flex-grow"></div>
          <button-ui plain icon @click="clearAll">
            <mdi-icon name="mdi-close"></mdi-icon>
          </button-ui>
        </div>
        <form @keyup.enter="formHandler" @submit.prevent="formHandler">
          <input-ui block v-model="data.tempWord" placeholder="Title"></input-ui>
          <textarea-ui v-model="data.tempMeaning" block height="110px" placeholder="Meaning" class="mt-3"></textarea-ui>
          <select-ui class="mt-3" block :list="learns" v-model="data.learnId" v-if="data.type === 'add'">
            <template v-slot:selected="{ value }">
              <p class="text-overflow text">{{ value | getLang }}</p>
            </template>
            <template #option="{ value }">
              {{ value | getLang }}
            </template>
          </select-ui>
          <button-ui :disabled="!(!!data.tempWord && !!data.tempMeaning)" block type="primary" class="mt-8"> {{ data.type === 'add' ? 'Add' : 'Edit' }} word </button-ui>
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
import Learn from '~/store/models/Learn';
import Word from '~/store/models/Word';
import validateExistWord from '~/utils/validateExistWord';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';
import Bus from '~/utils/Bus';

export default {
  data: () => ({
    show: false,
    data: {
      type: 'add',
      learnId: '',
      tempWord: '',
      tempMeaning: '',
    },
  }),
  computed: {
    learns() {
      return Learn.all().map(item => item.learn_id);
    },
  },
  methods: {
    formHandler() {
      this.data.type === 'add' ? this.addWord() : this.editWord();
    },
    editWord() {
      this.checkWord().then(() => {
        Word.update({
          where: this.data.id,
          data: {
            title: this.data.tempWord,
            meaning: this.data.tempMeaning,
          },
        });
        this.clearAll();
      });
    },
    checkWord() {
      return new Promise((resolve, reject) => {
        if (this.data.tempWord === '' && this.data.tempMeaning === '') reject();

        const isWordExist = Word.query()
          .where(word => {
            return validateExistWord(word, this.data.tempWord, this.data.tempMeaning, this.data.learnId);
          })
          .exists();

        if (isWordExist) {
          this.$toast.error(`You alread add ${this.data.tempWord}`);
          reject();
        } else {
          resolve();
        }
      });
    },
    addWord() {
      this.checkWord().then(() => {
        Word.insert({
          data: {
            title: this.data.tempWord,
            meaning: this.data.tempMeaning,
            timestamp: Date.now(),
            learn_id: this.data.learnId,
          },
        });

        saveDataIntoStorage('words');

        this.clearAll();
      });
    },
    open(data) {
      this.show = true;

      const assignData = Object.assign({}, this.data, data);

      this.data = assignData;

      const learnId = data.learn_id;
      this.data.learnId = !!learnId && learnId !== 'all' ? learnId : this.learns[0];
    },
    clearAll() {
      this.show = false;
      this.data = {
        type: 'add',
        learnId: '',
        tempWord: '',
        tempMeaning: '',
      };
    },
  },
  created() {
    Bus.$on('openWordPopup', this.open);
  },
};
</script>
<style lang="scss">
@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.add-word {
  z-index: 12;
  .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.21);
    animation: opacity 1s ease;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .content {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 1;
    background-color: white;
    min-height: 100px;
    @apply rounded-tl-lg rounded-tr-lg;
  }
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(100px);
}
.slide-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100px);
}
</style>
