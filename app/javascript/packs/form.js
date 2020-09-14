import Vue from '@vue'
import draggable from 'vuedraggable'
import directUpload from '../src/direct_upload.vue'
import comments from '../src/comments.vue'

document.addEventListener('DOMContentLoaded', () => {
  let form = new Vue({
    el: '#form',
    components: { comments, draggable, directUpload },
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
      findTag(tag_id) {
        return this.allTags.find(x => x.id == tag_id);
      }
    }
  });
});
