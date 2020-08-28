import Vue from '@vue'

document.addEventListener('DOMContentLoaded', () => {
  let form = new Vue({
    el: '#form',
    data() {
      return { article: { comments: [] } }
    }
  });
  const data = JSON.parse(document.getElementById('form').dataset.init);
  Object.assign(form.$data, data);
});
