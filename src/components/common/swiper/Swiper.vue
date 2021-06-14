<template>
  <div id="hy-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchmove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indecaotr" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    animDuration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
  },
  data: function () {
    return {
      slideCount: 0,
      showIndicator: true,
      scrolling: false,
      totalWidth: 0,
      currentIndex: 1,
      swiperStyle: {},
    };
  },
  mounted: function () {
    setTimeout(() => {
      this.handleDom();
      this.startTimer();
    }, 100);
  },
  methods: {
    startTimer: function () {
      this.palyTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer: function () {
      window.clearInterval(this.palyTimer);
    },
    scrollContent: function (currentPosition) {
      this.scrolling = true;
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);
      this.checkPosition();
      this.scrolling = false;
    },
    checkPosition: function () {
      window.setTimeout(() => {
        this.swiperStyle.transition = "0ms";
        //   3 1(1) 2(2) 3(3) 1(4)
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },
    setTransform: function (position) {
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
    },
    handleDom: function () {
      let swiperEl = document.querySelector(".swiper");
      let slideEls = swiperEl.getElementsByClassName("slide");
      this.slideCount = slideEls.length;

      if (this.slideCount > 1) {
        let cloneFirst = slideEls[0].cloneNode(true);
        let cloneLast = slideEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slideEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      this.setTransform(-this.totalWidth);
    },
    touchStart: function (e) {
      if (this.scrolling) return;

      this.stopTimer();
      this.startX = e.touches[0].pageX;
      //   console.log(this.startX);
    },
    touchmove: function (e) {
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = currentPosition + this.distance;
      this.setTransform(moveDistance);
    },
    touchEnd: function (e) {
      let currentMove = Math.abs(this.distance);
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex++;
      }
      this.setTransform(-this.currentIndex * this.totalWidth);
      this.startTimer();
    },
    /**
     * 控制上一个, 下一个
     */
    // previous: function () {
    //   this.changeItem(-1);
    // },

    // next: function () {
    //   this.changeItem(1);
    // },

    // changeItem: function (num) {
    //   // 1.移除定时器
    //   this.stopTimer();

    //   // 2.修改index和位置
    //   this.currentIndex += num;
    //   this.scrollContent(-this.currentIndex * this.totalWidth);

    //   // 3.添加定时器
    //   this.startTimer();
    // },
  },
};
</script>

<style scoped>
#hy-swiper {
  /* height: 200px; */
  overflow: hidden;
  position: relative;
  /* padding-top: 44px; */
}
.swiper {
  display: flex;
}
.indicator {
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  margin: 0 5px;
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  font-size: 12px;
}
.indi-item.active {
  background-color: rgba(212, 62, 46);
}
</style>