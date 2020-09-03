import Vue from '@vue'
import draggable from 'vuedraggable'
import directUpload from '../src/direct_upload.vue'

document.addEventListener('DOMContentLoaded', () => {
  let form = new Vue({
    el: '#form',
    components: { draggable, directUpload },
    data() {
      return { article: { comments: [] } }
    },
    methods: {
      addComment() {
        this.article.comments.push(
          { name: "", body: "", sort_key: 1, _destroy: null, images_attachments: [] }
        );
        this.updateSortKey();
      },
      delComment(comment) {
        if(comment.id) {
          this.$set(comment, '_destroy', 1);
        } else {
          let i = this.article.comments.findIndex(c => c === comment);
          if (i >= 0) {
            this.article.comments.splice(i, 1)
          }
        }
        this.updateSortKey();
      },
      updateSortKey() {
        this.article.comments.filter(comment => comment._destroy !== 1).forEach((comment, index) => {
          comment.sort_key = index + 1;
        });
      },
    }
  });
  const data = JSON.parse(document.getElementById('form').dataset.init);
  Object.assign(form.$data, data);
});
