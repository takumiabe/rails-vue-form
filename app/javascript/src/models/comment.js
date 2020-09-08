export class Comment {
  constructor({ images_attachments, ...attrs } = {}) {
    Object.assign(this, attrs);
    this.images_attachments = images_attachments || [];
  }

  addImage({ signed_id }) {
    this.images_attachments.push({ signed_id })
  }

  delImage(signed_id) {
    const i = this.images_attachments.findIndex(x => x.signed_id == signed_id)
    this.images_attachments.splice(i, 1)
  }
}
