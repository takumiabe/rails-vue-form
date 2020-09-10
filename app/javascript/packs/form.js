import Vue from '@vue'
import draggable from 'vuedraggable'
import directUpload from '../src/direct_upload.vue'
import { Article, Taggings } from '../src/models'

document.addEventListener('DOMContentLoaded', () => {
  let form = new Vue({
    el: '#form',
    components: { draggable, directUpload },
    data() {
      const { article, allTags, ...others } = JSON.parse(document.getElementById('form').dataset.init);
      let tagggingsWrapper = new Taggings(allTags);
      tagggingsWrapper.set(article.taggings);
      return { article: new Article({ ...article, taggings: tagggingsWrapper}), ...others }
    },
    computed: {
      availableTags() {
        return this.article.taggings.availableTags;
        let selected = this.tag_ids;
        return this.allTags.filter(x => !selected.includes(x.id));
      },
      tag_ids: {
        get() {
          return this.article.taggings.ids;
          return this.article.taggings.filter(x => x.tag_id && !x._destroy).map(x => x.tag_id)
        },
        set(row_ids) {
          this.article.taggings.ids = row_ids;
          return;
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
        return this.article.taggings.tag(tag_id);
        return this.allTags.find(x => x.id == tag_id);
      }
    }
  });
});
