
export class Article {
  constructor({ taggings, comments, ...attrs }) {
    Object.assign(this, attrs);
    this.taggings = taggings;
    this.comments = comments;
  }

  addComment() {
    this.comments.push(
      { name: "", body: "", sort_key: 1, _destroy: null, images_attachments: [] }
    );
    this.updateSortKey();
  }

  delComment(comment) {
    if(comment.id) {
      comment._destroy = 1;
    } else {
      let i = this.comments.findIndex(c => c === comment);
      if (i >= 0) {
        this.comments.splice(i, 1)
      }
    }
    this.updateSortKey();
  }

  updateSortKey() {
    this.comments.filter(comment => comment._destroy !== 1).forEach((comment, index) => {
      comment.sort_key = index + 1;
    });
  }
}
