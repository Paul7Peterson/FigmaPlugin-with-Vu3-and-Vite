import { ref, h, defineComponent } from 'vue';

import { UIMessageCode } from '@/types';

interface Props<T> {
  /** */
  message: UIMessageCode;
  /** */
  payload: T;
}

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const count = ref(1);

    // return the render function
    return () => h('div', props.msg + count.value);
  }
});