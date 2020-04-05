<template>
  <div>
    <p class="text-3xl font-semibold">Learn</p>
    <div class="flex mt-12">
      <div class="sidebar mr-6">
        <div style="width: 270px">
          <learn-card :practice-length="learn.practices.length" :word-length="learn.words.length" :learnId="learnId" @delete="deleteLearn"></learn-card>
          <practice-card :word-length="learn.words.length"></practice-card>
        </div>
      </div>
      <div class="main-content flex-grow">
        <add-word></add-word>
        <word-list :words="learn.words" class="mt-6"></word-list>
        <practice-history class="mt-6" :data="learn.practices" @delete="deletePractice" hide-name show-pagination show-delete></practice-history>
      </div>
    </div>
  </div>
</template>
<script>
import Learn from '~/store/models/Learn';
import { deletePractice } from '~/CRUD/Practice';
import { deleteLearn } from '~/CRUD/Learn';

import LearnCard from '../components/Pages/Learn/LearnCard.vue';
import WordList from '../components/Pages/Learn/WordList.vue';
import AddWord from '../components/Pages/Learn/AddWord.vue';
import PracticeCard from '../components/Pages/Learn/PracticeCard.vue';
import PracticeHistory from '../components/ui/PracticeHistory.vue';

export default {
  components: { LearnCard, WordList, AddWord, PracticeCard, PracticeHistory },
  computed: {
    learnId() {
      return this.$route.params.id;
    },
    learn() {
      if (
        !Learn.query()
          .where('learn_id', this.learnId)
          .exists()
      )
        this.$router.push('/');

      return (
        Learn.query()
          .where('learn_id', this.learnId)
          .withAll()
          .first() || { practices: [], words: [] }
      );
    },
  },
  methods: {
    deletePractice(practice) {
      Practice.delete(practice.$id);
    },
    deleteLearn() {
      const id = this.learn.$id;

      deleteLearn(id, this.learn.learn_id)
        .then(() => {
          this.$router.push('/');
        })
        .catch(() => {
          this.$router.push({ path: '/welcome', query: { id: 'add-learn' } });
        });
    },
  },
  mounted() {
    if (this.learn === null) this.$router.push('/');
  },
};
</script>
