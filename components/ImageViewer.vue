<!-- max-width: none !important;  -->
<!-- style="width: auto; height: 800px; margin: auto; visibility: visible; transform: none;" -->
<template>
  <div class="viewer-container viewer-fixed viewer-fade viewer-transition" v-bind:class="[{'viewer-in': dialog}, {'viewer-hide': !dialog}]" style="z-index: 100000000;">
    <div class="viewer-canvas" ref="canvas">
      <div class="image-container" ref="image" :style="{ backgroundImage: `url('${url}')`, maxHeight: maxHeight, maxWidth: maxWidth }">
        <!-- <img v-if="dialog" :src="url" :alt="filename" class="viewer-transition"> -->
      </div>
    </div>
    <div role="button" class="viewer-button viewer-close" data-action="mix" @click="dialog=false"></div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    value: Boolean
  },
  data () {
    return {
      dialog: false,
      maxWidth: '0px',
      maxHeight: '0px',
      canvasWidth: 0,
      canvasHeight: 0
    }
  },
  computed: {
    filename() {
      return this.url.replace(/^.*[\\\/]/, '')
    }
  },
  mounted() {
    this.$nextTick(() => window.addEventListener('resize', this.handleResize))
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    dialog (val) {
      this.$emit("input", val)
      this.$nextTick(() => this.handleResize())
    },
    value (val) {
      this.dialog = val
    }
  },
  methods: {
    handleResize() {
      const wWidth = Math.min(this.$refs.canvas.clientWidth * 0.9, 727)
      const wHeight = 800 / 727 * wWidth
      const hHeight = Math.min(this.$refs.canvas.clientHeight * 0.9, 800)
      const hWidth = 727 / 800 * hHeight
      this.canvasWidth = this.$refs.canvas.clientWidth
      this.canvasHeight = this.$refs.canvas.clientHeight
      this.maxWidth = Math.min(wWidth, hWidth) + 'px'
      this.maxHeight = Math.min(wHeight, hHeight) + 'px'
    }
  }
}
</script>

<style>
.viewer-container {
  background-color: rgba(0,0,0,.5);
  bottom: 0;
  direction: ltr;
  font-size: 0;
  left: 0;
  line-height: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  touch-action: none;
  user-select: none;
}
.viewer-fixed {
  position: fixed;
}
.viewer-fade {
  opacity: 0;
}
.viewer-hide {
  display: none;
}
.viewer-in {
  opacity: 1;
}
.viewer-transition {
  transition: all .3s;
}
.viewer-canvas {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
}
.image-container {
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  /* max-height: 800px;
  max-width: 727px; */
  height: 90%;
  width: 90%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #fff;
}
div.viewer-canvas img {
  background-color: #fff;
}
div.viewer-button {
  cursor: pointer;
  background-color: transparent;
  border-radius: 0;
  overflow: hidden;
  position: absolute;
  top: 25px;
  right: 33px;
  width: 40px;
  height: 40px;
}
@media (max-width: 1024px) {
  div.viewer-button {
    top: 10px;
    right: 10px;
  }
}
.viewer-close:before {
  background-repeat: no-repeat;
  color: transparent;
  display: block;
  font-size: 0;
  line-height: 0;
}
.viewer-button:before {
  bottom: 15px;
  left: 15px;
  position: absolute;
}
div.viewer-close:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9Ii03IC05IDMyIDMyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC03IC05IDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIyNCwtNi44OTUgMjIuODk1LC04IDksNS44OTUgLTQuODk1LC04IC02LC02Ljg5NSA3Ljg5NSw3IC02LDIwLjg5NSAtNC44OTUsMjIgOSw4LjEwNSAyMi44OTUsMjIgCgkyNCwyMC44OTUgMTAuMTA1LDcgIi8+Cjwvc3ZnPgo=);
  background-position: 50%;
  transition: opacity .25s ease!important;
}
</style>
