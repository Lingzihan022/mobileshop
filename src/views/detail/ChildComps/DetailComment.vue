<template>
  <div class="comment">
    <div class="title">
      <span>用户评价</span>
    </div>
    <div class="content">
      <div class="user">
        <img :src="avatar" alt="" /><span> {{ uname }}</span>
      </div>
      <p>{{ content }}</p>
      <div class="status">
        <span>{{ commentDate }}</span
        ><span>{{ size }}</span>
      </div>
      <div v-show="isImageShow" class="commentImage">
        <div v-for="(item, index) in images" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailComment",
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      uname: "",
      avatar: "",
      content: "",
      createdTime: 0,
      commentDate: "",
      size: "",
      images: [],
      isImageShow: false,
    };
  },
  watch: {
    comment: function (newComment, oldComment) {
      this.uname = this.comment.user.uname;
      this.avatar = this.comment.user.avatar;
      this.content = this.comment.content;
      this.createdTime = this.comment.created;
      this.size = this.comment.style;
      if (this.comment.images !== undefined) {
        this.images = this.comment.images;
        this.isImageShow = true;
      }
      let date = new Date(this.createdTime * 1000);
      let year = date.getFullYear();
      let mon =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate();
      this.commentDate = `${year}-${mon}-${day}`;
    },
  },

  method: {},
};
</script>

<style scoped>
.comment {
  padding: 20px 5px;
  font-size: 12px;
  border-bottom: 4px solid rgba(0, 0, 0, 0.08);
}
.title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.user img {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  vertical-align: middle;
  margin-right: 5px;
}
.content p {
  margin: 10px 0;
}
.status {
  color: #999;
  margin-bottom: 10px;
}

.commentImage > div {
  display: inline-block;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  overflow: hidden;
}
.commentImage img {
  width: 40px;
}
</style>