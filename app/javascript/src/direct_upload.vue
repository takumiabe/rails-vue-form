<template>
<div>
  <label v-on:click="$refs.upload.click()">
    <input type="file" v-on:change="changed" ref="upload" style="display: none;" :multiple="multiple" />
    <slot>新規</slot>
  </label>

  <div class="list-group" v-if="uploads.length > 0">
    <div class="list-group-item" v-for="(file, index) in uploads" :key="index" >
      <slot name="progress" :file="file" :progress="progress">
        <i>Uploading: {{file.file.filename }}</i>
        <br/>
        <input type="text" :value="progress" :max="100" :animated="true" style="max-width: 200px; height: 2px" />
      </slot>
    </div>
  </div>
</div>
</template>

<script>
// 参考…
// https://gist.github.com/zealot128/3f75046ea7efc4489f03e4b71244d0f8
import { DirectUpload } from '@rails/activestorage'

export default {
  props: {
    uploadUrl: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isDragging: false,
      progress: 0,
      uploads: [],
    }
  },
  methods: {
    changed(event) {
      Array.from(event.target.files).forEach(file => this.upload(file))
      event.target.value = null
    },
    upload(file) {
      const upload = new DirectUpload(file, this.uploadUrl, this)
      this.uploads.push({ file, upload })
      this.progress = 0
      upload.create((error, blob) => {
        if (error) {
          this.$emit('fail', { file, error, upload })
        } else {
          this.uploads = this.uploads.filter(payload => payload.file.filename !== file.filename)
          this.$emit('upload', { file, blob })
        }
      })
    },
    onProgress(event) {
      this.progress = (event.loaded / event.total) * 100;
    },
    directUploadWillStoreFileWithXHR(xhr) {
      xhr.upload.addEventListener("progress", event => this.onProgress(event));
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
