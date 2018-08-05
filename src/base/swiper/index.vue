<template>
  <div class="container">
    <ul>
      <li class="list-item " v-for="(item,index) in list " data-type="0">
        <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
          <img class="list-img" :src="item.imgUrl" alt="">
          <div class="list-content">
            <p class="title">{{item.title}}</p>
            <p class="tips">{{item.tips}}</p>
            <p class="time">{{item.time}}</p>
          </div>
        </div>
        <div class="delete" @click="deleteItem" :data-index="index">删除</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: 'index',
    data () {
      return {
        list : [
          {
            title : 'Chrome更新了' ,
            imgUrl : './static/images/Chrome.png' ,
            tips : '不再支持Flash视频播放' ,
            time : '上午 8:30'
          },
          {
            title : '电影新资讯' ,
            imgUrl : './static/images/Sina.png' ,
            tips : '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观' ,
            time : '上午 12:00'
          },
          {
            title : '聚焦两会·共筑中国梦' ,
            imgUrl : './static/images/video.png' ,
            tips : '习近平代表的两会故事' ,
            time : '下午 17:45'
          },
          {
            title : '微信团队' ,
            imgUrl : './static/images/Wechat.png' ,
            tips : '您的帐号有异常登录，如非本人操作，请及时修改密码' ,
            time : '昨天'
          }
        ],
        startX : 0 ,
        endX : 0 ,
      }
    },
    methods : {
      //跳转
      skip(){
        if( this.checkSlide() ){
          this.restSlide();
        }else{
          alert('You click the slide!')
        }
      },
      //滑动开始
      touchStart(e){
        this.startX = e.touches[0].clientX;
      },
      //滑动结束
      touchEnd(e){
        let parentElement = e.currentTarget.parentElement;
        this.endX = e.changedTouches[0].clientX;
        if( parentElement.dataset.type == 0 && this.startX - this.endX > 30  ){
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide(){
        let listItems = document.querySelectorAll('.list-item');
        for( let i = 0 ; i < listItems.length ; i++){
          if( listItems[i].dataset.type == 1 ) {
            return true;
          }
        }
        return false;
      },
      //一次只能滑动一个
      restSlide(){
        let listItems = document.querySelectorAll('.list-item');
        for( let i = 0 ; i < listItems.length ; i++){
          listItems[i].dataset.type = 0;
        }
      },
      //删除
      deleteItem(e){
        let index = e.currentTarget.dataset.index;
        this.restSlide();
        this.list.splice(index,1);
      }
    }
  }
</script>

<style scoped>
  .list-item{
    position: relative;
    height: 120px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .list-item[data-type="0"]{
    transform: translate3d(0,0,0);
  }
  .list-item[data-type="1"]{
    transform: translate3d(-200px,0,0);
  }
  .list-box{
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
    padding: 0 30px;
  }
  .list-item .list-img{
    display: block;
    width: 100px;
    height: 100px;
  }
  .list-item .list-content{
    padding: 10px 0 10px 10px;
    position: relative;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
  }
  .list-item .title{
    display: block;
    color: #333;
    overflow: hidden;
    font-size: 30px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list-item .tips{
    display: block;
    overflow: hidden;
    font-size: 24px;
    color: #999;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list-item .time{
    display: block;
    font-size: 24px;
    position: absolute;
    right: 0;
    top: 0.1rem;
    color: #666;
  }
  .list-item .delete{
    width: 200px;
    height: 120px;
    background: #ff4949;
    font-size: 32px;
    color: #fff;
    text-align: center;
    line-height: 120px;
    position: absolute;
    top:0;
    right: -200px;
  }
</style>
