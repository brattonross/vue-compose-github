<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { format } from 'timeago.js';

export default createComponent({
  name: 'TimeAgo',

  props: {
    date: {
      type: [Date, String, Number],
      required: true
    }
  },

  setup({ date }, { slots }) {
    return () =>
      slots.default({
        timeAgo: format(date)
      });
  }
});
</script>
