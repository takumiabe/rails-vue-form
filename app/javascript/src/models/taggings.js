export class Taggings {
  constructor(tags) {
    this.allTags = tags;
    this.taggings = [];
  }

  set(taggings) {
    if (taggings) {
      this.taggings = taggings.slice();
    } else {
      this.taggings.splice(0, this.taggings.length);
    }
  }

  get ids() {
    return this.taggings.filter(x => x.tag_id && !x._destroy).map(x => x.tag_id)
  }

  get availableTags() {
    return this.allTags.filter(x => !this.ids.includes(x.id));
  }

  tag(tag_id) {
    return this.allTags.find(x => x.id == tag_id);
  }

  set ids(row_ids) {
    const ids = row_ids.map(x => Number.parseInt(x))

    ids.forEach((id, index) => {
      const tagging = this.taggings.find(x => x.tag_id == id);
      if (tagging) {
        tagging._destroy = false;
      } else {
        this.taggings.push({ id: null, tag_id: id, _destroy: false });
      }
    })
    this.taggings.forEach(tagging => {
      if (!ids.includes(tagging.tag_id)) {
        tagging._destroy = true;
      }
    })
    this.taggings = this.taggings.filter(x => x.id || !x._destroy)
  }
}
