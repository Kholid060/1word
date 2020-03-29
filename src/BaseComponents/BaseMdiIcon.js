import camelcase from 'lodash.camelcase';
import '~/assets/scss/components/_mdi-icon.scss';

export default {
  name: 'mdi-icon',
  props: {
    name: String,
    title: String,
    size: {
      type: [String, Number],
      default: 24,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
    rotate: {
      type: [String, Number],
    },
  },
  lib: {},
  add(icons) {
    if (typeof icons === 'object' && Object.keys(icons).length !== 0) {
      this.lib = icons;
    }
  },
  computed: {
    getIcon() {
      const icon = this.$options.lib[camelcase(this.name)];

      if (icon) {
        return icon;
      }

      console.error(`Can't find ${this.name}`);

      return undefined;
    },
  },
  render(h) {
    return h(
      'svg',
      {
        attrs: {
          viewBox: '0 0 24 24',
          height: this.size,
          width: this.size,
          fill: this.fill,
        },
        class: ['mdi-icon', `icon-rotate-${this.rotate}`],
        on: this.$listeners,
      },
      [
        this.title ? h('title', this.title) : '',
        h('path', {
          attrs: {
            d: this.getIcon,
          },
        }),
      ]
    );
  },
};
