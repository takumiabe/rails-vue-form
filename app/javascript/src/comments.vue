<template>
  <div>
    <draggable v-model='currentComments' @end='updateSortKey'>
      <div v-for='(comment, comment_index) in currentComments' :key='comment_index'>
        <template v-show='!comment._destroy'>
          <slot :comment='comment' :comment_index='comment_index' v-on:delete-comment='delComment(comment)'></slot>
          <button type='button' @click='delComment(comment)'>削除</button>
        </template>
      </div>
      <button type='button' @click='addComment'>add comment</button>
    </draggable>
  </div>  
</template>
<script>
import Vue from '@vue';
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: {
    comments: Array,
  },
  model: {
    prop: 'comments',
    event: 'change'
  },
  data() {
    return { currentComments: this.comments };
  },
  methods: {
    addComment() {
      this.currentComments.push(
        { name: "", body: "", sort_key: 1, _destroy: null, images_attachments: [] }
      );
      this.updateSortKey();
    },
    delComment(comment) {
      if(comment.id) {
        this.$set(comment, '_destroy', 1);
      } else {
        let i = this.currentComments.findIndex(c => c === comment);
        if (i >= 0) {
          this.currentComments.splice(i, 1)
        }
      }
      this.updateSortKey();
    },
    updateSortKey() {
      this.currentComments.filter(comment => comment._destroy !== 1).forEach((comment, index) => {
        comment.sort_key = index + 1;
      });
      this.$emit('change', this.currentComments)
    },
  }
}
</script>
