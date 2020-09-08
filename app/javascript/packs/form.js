import Vue from '@vue'
import draggable from 'vuedraggable'
import directUpload from '../src/direct_upload.vue'

document.addEventListener('DOMContentLoaded', () => {
  let form = new Vue({
    el: '#form',
    components: { draggable, directUpload },
    data() {
      return JSON.parse(document.getElementById('form').dataset.init);
    },
    computed: {
      availableTags() {
        let selected = this.tag_ids;
        return this.allTags.filter(x => !selected.includes(x.id));
      },
      tag_ids: {
        get() {
          return this.article.taggings.filter(x => x.tag_id && !x._destroy).map(x => x.tag_id)
        },
        set(row_ids) {
          const ids = row_ids.map(x => Number.parseInt(x))

          ids.forEach((id, index) => {
            const tagging = this.article.taggings.find(x => x.tag_id == id);
            if (tagging) {
              tagging._destroy = false;
            } else {
              this.article.taggings.push({ id: null, tag_id: id, _destroy: false });
            }
          })
          this.article.taggings.forEach(tagging => {
            if (!ids.includes(tagging.tag_id)) {
              tagging._destroy = true;
            }
          })
          this.article.taggings = this.article.taggings.filter(x => x.id || !x._destroy)
        }
      }
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
      findTag(tag_id) {
        return this.allTags.find(x => x.id == tag_id);
      }
    }
  });
});
