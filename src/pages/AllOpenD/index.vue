<template>
  <div>
    <div class="teacher-list" @click="go('/openD-chat')" v-for="item in AllOpenD" :key="item.id">
      <div class="background"></div>
      <div class="openD-img"><img src="../../../static/img/testimg.jpg"></div>
      <div class="openD-info">
        <div class="openD-title">
          <p>{{item.description}}</p>
        </div>
        <div class="openD-else">
          <div>36人</div>
          <div>{{item.teacherName}}</div>
        </div>
        <div class="openD-else red" v-if="item.noRecord">
          <p>本开放日尚未开课</p>
        </div>
        <div class="openD-else" v-else>
          <p>{{item.startTime}}-{{item.endTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        AllOpenD: []
      }
    },
    components: {},
    methods: {
      go(src) {
        wx.navigateTo({
          url: `/pages${src}/main`
        })
      },
      getAllOpenD() {
        this.$fly.get('http://47.107.116.71:80/open_days/all').then((res) => {
          console.log(res)
          this.AllOpenD = res.data.data
          this.AllOpenD.forEach(element => {
            this.$fly.get(`http://47.107.116.71:80/user/info/${element.teacher}`).then((res) => {
              this.$set(element, "teacherName", res.data.data.username)
            })
            this.$fly.get(`http://47.107.116.71:80/open_days/record/${element.id}`).then((res) => {
              if (res.data.data.length > 0) {
                this.$set(element, "startTime", this.timeFormat(res.data.data[0].startTime))
                this.$set(element, "endTime", this.timeFormat(res.data.data[0].endTime))
              } else {
                this.$set(element, "noRecord", true)
              }
              console.log(element)
            })
          })
        })
      },
      timeFormat(value) {
        let date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
      }
    },
    mounted() {
      this.getAllOpenD()
    }
  }

</script>

<style scoped>
  .teacher-list {
    width: 96%;
    margin: 20rpx auto;
    background: white;
    min-height: 100rpx;
    position: relative;
    border-radius: 20rpx;
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: all .3s;
  }

  .teacher-list:active {
    transform: scale(1.02);
    box-shadow: 0 4px 8px 0 rgb(255, 209, 247), 0 6px 20px 0 rgb(255, 209, 247);
  }

  .openD-img {
    filter: opacity(100%);
    height: 150rpx;
    width: 150rpx;
    margin: 10rpx 20rpx 10rpx 10rpx
  }

  .openD-img>img {
    width: 100%;
    height: 100%;
    border-radius: 50%
  }

  .openD-info {
    flex: 1;
    margin: 10rpx 10rpx 10rpx;
    text-overflow: ellipsis;
    border-radius: 20rpx;
  }

  .openD-title {
    font-size: 32rpx;
    font-weight: bold;
    text-align: left;
  }

  .openD-else {
    display: flex;
    justify-content: flex-start;
    font-size: 24rpx;
    margin-top: 10rpx
  }

  .openD-else>div {
    margin-right: 15rpx;
  }

  .background {
    background-image: url("http://bpic.588ku.com/back_pic/04/76/98/6558ad5a9051beb.jpg");
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    filter: opacity(30%);

  }

  .touch {
    transform: scale(1.02);
    box-shadow: 0 4px 8px 0 rgb(255, 209, 247), 0 6px 20px 0 rgb(255, 209, 247);
  }
  .red{
    color:red
  }

</style>
