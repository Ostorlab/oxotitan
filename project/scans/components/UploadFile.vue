<template>
  <v-row no-gutters>
    <v-col
      v-for="(file, index) in fileList"
      :key="index"
      cols="12"
      tag="v-col"
    >
      <v-card
        align="center"
        class="ma-1 card dragover-over"
        dense
        flat
        outlined
      >
        <v-card-text class="justify-center pa-2 my-12">
          <v-icon
            color="accent"
            size="50"
          >
            mdi-file-upload-outline
          </v-icon>
          <p class="text-center justify-center pa-0 lighten-4 text-subtitle-1 accent-text">
            {{ file.name }}
            <br>
            <code>({{ formatFileSize(file.size) }})</code>
            <br>
            <v-btn
              class="mt-4"
              color="accent"
              @click="deleteFile(file)"
            >
              <v-icon start>
                mdi-trash-can-outline
              </v-icon>Delete
            </v-btn>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      v-if="(fileList.length === 0 && multiple === false) || multiple"
      class="ma-1"
      cols="12"
    >
      <v-card
        :class="{ 'dragover-over': dragover, 'card': true }"
        align="center"
        class="dragover"
        density="compact"
        flat
        hover
        variant="outlined"
        rounded
        @click="openUpload"
        @drop.prevent="onDrop($event)"
        @dragover.prevent="dragover = true"
        @dragenter.prevent="dragover = true"
        @dragleave.prevent="dragover = false"
      >
        <v-card-text class="justify-center pa-2 my-12">
          <v-icon
            color="#00000099"
            size="50"
          >
            mdi-upload-outline
          </v-icon>
          <p class="text-center justify-center pa-0 lighten-4 text-subtitle-1">
            <strong>Drag & Drop</strong> to upload a file,
          </p>
          <p class="text-center justify-center pa-0 lighten-4 text-subtitle-1">
            OR
          </p>
          <p class="text-center justify-center pa-0 lighten-4 text-subtitle-1">
            <strong>Click</strong> to select a file.
          </p>
          <input
            v-show="false"
            ref="fileInput"
            :multiple="multiple"
            type="file"
            @input="onChange"
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import _ from 'lodash'

interface Data {
  fileList: Array<File>
  dragover: boolean
}

export default defineComponent({
  name: 'UploadFile',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Object, Array],
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:model-value'],
  data(): Data {
    return {
      fileList: [],
      dragover: false
    }
  },
  watch: {
    modelValue(val) {
      if (val === null || val === undefined) {
        this.fileList = []
      }
    },
    fileList(fileList: Array<File>): void {
      if (this.multiple === true) {
        this.$emit('update:model-value', fileList)
      } else {
        this.$emit('update:model-value', fileList[0])
      }
    }
  },
  methods: {
    /**
     * Delete the uploaded file.
     * @param file
     */
    deleteFile(file: Array<File>): void {
      if (this.multiple === true) {
        this.fileList = this.fileList.filter((f) => {
          return !_.isEqual(file, f)
        })
      } else {
        this.fileList = []
      }
    },
    /**
     * Method to invvoke when the file input changes.
     * @param e
     */
    onChange(e): void {
      if (this.multiple === true) {
        this.fileList = [...this.fileList, ...e.target.files]
      } else {
        this.fileList = e.target.files
      }
    },
    /**
     * Method to invoke when a file is dragged and dropped on the input card.
     * @param e
     */
    onDrop(e): void {
      if (this.multiple === true) {
        this.fileList = [...this.fileList, ...e.dataTransfer.files]
      } else {
        this.fileList = e.dataTransfer.files
      }

      this.dragover = false
    },
    /**
     * Open the file upload modal.
     */
    openUpload(): void {
      const fileInputHtmlEl = this.$refs.fileInput as HTMLElement
      fileInputHtmlEl.click()
    }
  }
})
</script>

<style>
.dragover {
  transition: all 0.5s !important;
}

.card {
  border: 2px dashed !important;
}

.dragover:hover {
  border: 2px dashed #1f5770 !important;
  background-color: #1f577030;
}

.dragover-over {
  border: 2px dashed #0081ba !important;
  background-color: rgb(229, 242, 252) !important;
}
</style>
