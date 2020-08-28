import Vue from '@vue'
import draggable from 'vuedraggable'

document.addEventListener('DOMContentLoaded', () => {
  let form = new Vue({
    el: '#form',
    components: { draggable },
    data() {
      return { article: { comments: [] } }
    }
  });
  const data = JSON.parse(document.getElementById('form').dataset.init);
  Object.assign(form.$data, data);
});
