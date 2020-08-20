<template>
  <div>
    <!-- <div class="screen__nav">
      <div class="swiper swiper_brands">
        <div class="swiper-container swiper-container-horizontal">
          <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
            <nuxt-link to="/categories/156/" class="swiper-slide swiper-slide-active" style="width: 108.556px; margin-right: 34px;"><img src="/brand/main/small/ravenol.svg" class="swiper-img"></nuxt-link>
            <nuxt-link to="/categories/157/" class="swiper-slide swiper-slide-next" style="width: 108.556px; margin-right: 34px;"><img src="/brand/main/small/logo-axiom.svg" class="swiper-img"></nuxt-link>
            <nuxt-link to="/categories/141/" class="swiper-slide" style="width: 108.556px; margin-right: 34px;"><img src="/brand/main/small/bglogo.png" class="swiper-img"></nuxt-link>
            <nuxt-link to="#" class="swiper-slide" style="width: 108.556px; margin-right: 34px;"><img src="/brand/main/small/gulf-logo-dtp.svg" class="swiper-img"></nuxt-link>
            <nuxt-link to="#" class="swiper-slide" style="width: 108.556px; margin-right: 34px;"><img src="/brand/main/small/amsoil-logo.svg" class="swiper-img"></nuxt-link>
            <nuxt-link to="#" class="swiper-slide" style="width: 108.556px; margin-right: 34px;"><img src="/brand/main/small/jtc2.png" class="swiper-img"></nuxt-link>
          </div>
        </div>
      </div>
    </div> -->
    <Category />
    <!-- <div class="box">
      <div class="cover cover_main mb mb_large" ref="youtube">
        <div class="cover__title"><a href="/blog/" class="link-title">Блог</a></div>
        <div class="youtube-container">
          <div class="youtube-cell" v-for="(item, i) in items" :key="i">
            <a :href="'https://www.youtube.com/watch?v=' + item.id"
              class="gallery__item" @click.prevent="open_youtube(item.id)"
              :style="{ 'background-image': 'url(&quot;' + item.snippet.thumbnails[image].url + '&quot;)' }">
              <div class="gallery__box"><span class="gallery__time">{{item.duration}}</span>
                <div class="gallery__content">
                  <div class="gallery__title">
                    <h3 class="gallery__text">{{item.snippet.title}}</h3></div>
                  <div class="gallery__info">
                    <div class="info info_light">
                      <time class="info__item">{{item.date}}</time>
                      <div class="info__item">
                        <span class="info__icon icon icon_eye"><svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#eye"></use></svg></span>
                        {{item.statistics.viewCount}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="youtube-dialog">
          <Dialog v-model="dialog" max-width="580px">
            <div class="i-dialog-action">
              <a href="#" @click="dialog=false">
                <span class="icon icon_close_youtube">
                  <svg class="icon__item"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/icons-sprite.svg#close_big"></use></svg>
                </span>
              </a>
            </div>
            <youtube :player-width="playerWidth" :player-height="playerHeight" :video-id="videoId" :player-vars="{autoplay: 1}" />
          </Dialog>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import Dialog from '~/components/Dialog.vue'
import Category from '~/components/Category.vue'

export default {
  head () {
    return {
      title: 'Главная',
    }
  },
  components: {
    Dialog,
    Category
  },
  data() {
    return {
      playerWidth: 580,
      playerHeight: 390,
      items: [],
      image: 'high',
      dialog: false,
      videoId: null
    }
  },
  created() {
    axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCrqB0H9Bs4d_RHXPfZLxKAg&maxResults=4&order=date&type=video&key=" + process.env.youtube_key)
      .then(async res => {
        this.items = await Promise.all(res.data.items.map(async item => {
          return axios.get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=" + item.id.videoId + "&key=" + process.env.youtube_key).then(result => {
            const info = result.data.items[0]
            const new_item = Object.assign({}, item, info)
            new_item.duration = new_item.contentDetails.duration.duration()
            new_item.date = item.snippet.publishedAt.toLocal()
            return new_item
          })
        }))
      })
  },
  mounted() {
    this.$nextTick(() => window.addEventListener('resize', this.handleResize))
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    open_youtube(id) {
      this.videoId = id
      this.dialog = true
    },
    handleResize() {
      // const width = (this.$refs.youtube.clientWidth - 4 * 3) / 3
      this.image = window.innerWidth < 1050 ? 'medium' : 'high'
      this.playerWidth = window.innerWidth < 580 ? window.innerWidth : 580
      this.playerHeight = this.playerWidth * 390 / 580
    },
    ready() {
    }
  }
}
</script>

<style>
.container_main .cover:first-child {
  margin-top: 20px;
}
.youtube-dialog .modal-mask {
  background-color: rgba(0, 0, 0, .9);
}
.youtube-dialog .modal-container {
  background-color: transparent;
  box-shadow: none;
}
.icon_close_youtube {
  width: 26px;
  height: 26px;
}
.i-dialog-action .icon_close_youtube {
  position: absolute;
  top: 6px;
  right: 6px;
  margin: 0;
}
.icon_close_youtube {
  fill: white;
}
.screen__nav {
  display: flex;
  align-items: center;
  height: 110px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #242417;
  margin-bottom: 45px;
}
@media (max-width: 1024px) {
  .screen__nav {
    display: none;
  }
}
.swiper {
  position: relative;
}
.swiper_brands {
  width: 100%;
}
.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.swiper_brands .swiper-container {
  margin-left: 66px;
  margin-right: 66px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform,-webkit-transform;
  box-sizing: content-box;
}
.swiper-container-android .swiper-slide, .swiper-wrapper {
  transform: translateZ(0);
}
.swiper_brands .swiper-wrapper {
  align-items: center;
  justify-content: center;
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform,-webkit-transform;
}
.swiper-img {
  max-width: 100%;
  height: auto;
}
.swiper_brands .swiper-img {
  transform: none;
  transition: -webkit-transform .25s ease;
  transition: transform .25s ease;
  transition: transform .25s ease,-webkit-transform .25s ease;
}
.swiper_brands .swiper-slide:hover .swiper-img {
  transform: translateY(-5px);
}
.swiper-container .swiper-notification {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  z-index: -1000;
}
.swiper-button-next, .swiper-button-prev {
  position: absolute;
  top: 50%;
  width: 27px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  background-size: 27px 44px;
  background-position: 50%;
  background-repeat: no-repeat;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
  /* background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' …L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' fill='%23007aff'/%3E%3C/svg%3E); */
  left: 10px;
  right: auto;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
  /* background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' …2L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z' fill='%23007aff'/%3E%3C/svg%3E); */
  right: 10px;
  left: auto;
}
.swiper-button-next, .swiper-button-prev {
  background-image: none!important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .25s ease;
}
.icon_arrow_left {
  width: 15px;
  height: 25px;
}
.icon_arrow_right {
  width: 15px;
  height: 25px;
}
.icon_arrow_left .icon__item {
  fill: #fff;
}
.icon_arrow_right .icon__item {
  fill: #fff;
}

.youtube-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.youtube-cell {
  margin-right: 4px;
  margin-bottom: 24px;
  width: 480px;
  /* height: 360px; */
}
.gallery__item {
  text-decoration: none;
  color: #000;
  display: block;
  position: relative;
  overflow: hidden;
  background-color: #ebebeb;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
}
.gallery__item:before {
  height: 200px;
  background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.6)));
  background: linear-gradient(180deg,transparent 0,rgba(0,0,0,.6));
}
.gallery__item:after, .gallery__item:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
.gallery__item:after {
  top: 0;
  background-color: rgba(0,0,0,.1);
  opacity: 0;
  -webkit-transition: opacity .25s ease;
  transition: opacity .25s ease;
}
.gallery__box {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
  height: 360px;
}
.gallery__time {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 12px;
  background-color: #ffe300;
  padding: 3px 5px 4px;
}
.gallery__text {
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  display: inline;
  color: #fff;
  border-bottom: 1px solid hsla(0,0%,100%,.5);
  -webkit-transition: color .25s ease,border-color .25s ease;
  transition: color .25s ease,border-color .25s ease;
}
.gallery__info {
  margin-top: 8px;
}
@media (max-width:1050px) {
  .youtube-cell {
    width: 320px;
    /* height: 180px; */
  }
  .gallery__box {
    padding: 10px;
    height: 180px;
  }
  .gallery__time {
    top: 10px;
    left: 10px;
  }
  .gallery__text {
    font-size: 14px;
  }
}

.info, .info__item {
  display: flex;
  align-items: center;
}
.info__item {
  font-size: 12px;
  color: #666;
  margin-right: 13px;
}
.info__item:last-child {
  margin-right: 0;
}
.info_light .info__item {
  color: #fff;
}
.icon_eye {
  width: 19px;
  height: 11px;
}
.info__icon {
  margin-right: 4px;
}
.info_light .info__icon .icon__item {
  fill: #fff;
}
</style>
