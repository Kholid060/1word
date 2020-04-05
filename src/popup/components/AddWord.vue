<template>
  <modal-ui v-model="show">
    <p slot="header">{{ data.type === 'add' ? 'Add' : 'Edit' }} word</p>
    <form @submit.prevent="formHandler">
      <input-ui block v-model="data.tempWord" placeholder="Title"></input-ui>
      <textarea-ui v-model="data.tempMeaning" block height="110px" placeholder="Meaning" style="max-height: 200px" class="mt-3"></textarea-ui>
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
  </modal-ui>
</template>
<script>
import Learn from '~/store/models/Learn';
import { addWord, updateWord } from '~/CRUD/Word';
import ModalUi from './BaseModal';
import Bus from '~/utils/Bus';

export default {
  components: { ModalUi },
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
      updateWord({
        title: this.data.tempWord,
        meaning: this.data.tempMeaning,
        ...this.data.id,
      })
        .then(() => {
          this.clearAll();
        })
        .catch(err => {
          this.$toast.error(err);
        });
    },
    addWord() {
      addWord({
        title: this.data.tempWord,
        meaning: this.data.tempMeaning,
        timestamp: Date.now(),
        learn_id: this.data.learnId,
      })
        .then(() => {
          this.clearAll();
        })
        .catch(err => {
          this.$toast.error(err);
        });
    },
    open(data) {
      this.show = true;

      const assignData = { ...this.data, ...data };

      this.data = assignData;

      const learnId = this.$store.state.popup.activeId;
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
