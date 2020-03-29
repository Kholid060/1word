import Vue from 'vue';

import Card from './BaseCard.vue';
import Button from './BaseButton.vue';
import Flag from './BaseFlag.vue';
import Progress from './BaseProgress.vue';
import Input from './BaseInput.vue';
import Textarea from './BaseTextarea.vue';
import Select from './BaseSelect.vue';
import EmptyState from './BaseEmptyState.vue';
import List from './BaseList.vue';
import Paginate from './BasePaginate.vue';

Vue.component(Paginate.name, Paginate);
Vue.component(List.name, List);
Vue.component(EmptyState.name, EmptyState);
Vue.component(Select.name, Select);
Vue.component(Textarea.name, Textarea);
Vue.component(Input.name, Input);
Vue.component(Progress.name, Progress);
Vue.component(Card.name, Card);
Vue.component(Button.name, Button);
Vue.component(Flag.name, Flag);
