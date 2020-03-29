<template>
  <div>
    <template v-if="!loaded">
      <div class="loader"></div>
      <p class="text-lg text-center text-light mt-4">Generate questions...</p>
    </template>
    <template v-else>
      <practice-complete v-if="isPracticeDone" :question="questions.length" :correct="correctCount"></practice-complete>
      <template v-else>
        <Header :number="qNumber" :length="questions.length"></Header>
        <div class="mt-8 w-5/12 mx-auto">
          <question v-model="userAnswer" @answer="answerQuestion" :data="currentQuestion"></question>
        </div>
        <transition name="slide">
          <message v-if="answered" :correct="userAnswer === currentQuestion.answer" @next="nextQuestion"></message>
        </transition>
      </template>
    </template>
  </div>
</template>
<script>
import Header from '../components/Pages/Practice/Header.vue';
import Message from '../components/Pages/Practice/Message.vue';
import Question from '../components/Pages/Practice/Question.vue';
import PracticeComplete from '../components/Pages/Practice/PracticeComplete.vue';

import questionGenerator from '~/utils/questionGenerator';
import Practice from '~/store/models/Practice';
import Word from '~/store/models/Word';
import saveDataIntoStorage from '~/utils/saveDataIntoStorage';

export default {
  components: { Header, Message, Question, PracticeComplete },
  data: () => ({
    loaded: false,
    questions: [],
    userAnswers: [],
    qNumber: 0,
    correctCount: 0,
    userAnswer: '',
    answered: false,
  }),
  beforeRouteLeave(to, from, next) {
    if (this.qNumber === this.questions.length) return next();

    const confirm = window.confirm('Do you really want to leave?');
    if (confirm) next();
  },
  methods: {
    nextQuestion() {
      this.userAnswer = '';
      this.answered = false;
      this.qNumber += 1;

      if (this.isPracticeDone) {
        Practice.insert({
          data: {
            correct: this.correctCount,
            wrong: this.questions.length - this.correctCount,
            score: (this.correctCount / this.questions.length) * 100,
            question_length: this.questions.length,
            learn_id: this.$route.params.id,
            timestamp: Date.now(),
          },
        }).then(() => saveDataIntoStorage('practices'));
      }
    },
    answerQuestion(userAnswer) {
      this.answered = true;
      this.userAnswer = userAnswer;

      if (userAnswer === this.currentQuestion.answer) this.correctCount += 1;

      const correct = new Audio(require('~/assets/audio/correct.wav').default);
      const wrong = new Audio(require('~/assets/audio/wrong.wav').default);

      userAnswer === this.currentQuestion.answer ? correct.play() : wrong.play();
    },
    nextQuestionKey({ key }) {
      if (key === 'Enter' && this.answered) {
        this.nextQuestion();
      }
    },
  },
  computed: {
    isPracticeDone() {
      return this.qNumber === this.questions.length;
    },
    currentQuestion() {
      return this.questions[this.qNumber];
    },
  },
  created() {
    const { valid, length } = this.$store.state.practice;

    if (!valid) return this.$router.push(`/learn/${this.$route.params.id}`);

    const words = Word.query()
      .where('learn_id', this.$route.params.id)
      .get();

    questionGenerator(words, length).then(questions => {
      this.questions = questions;
      setTimeout(() => (this.loaded = true), 2000);
    });
  },
  mounted() {
    document.addEventListener('keyup', this.nextQuestionKey);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.nextQuestionKey);
  },
};
</script>
<style scoped>
.slide-enter-active {
  transition: all 0.4s ease;
}
.slide-leave-active {
  opacity: 0;
  transition: all 0.4s ease;
}
.slide-enter, .slide-leave-to
/* .slide-leave-active below version 2.1.8 */ {
  transform: translateY(12px);
}
</style>
