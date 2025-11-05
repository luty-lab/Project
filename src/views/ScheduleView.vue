<template>
  <div class="course-schedule">
    <!-- 课程列表容器 -->
    <div class="course-schedule__list">
      <!-- 单个课程项 -->
      <div class="course-schedule__item">
        <!-- 课程日期标题 -->
        <div class="course-schedule__date">11/05 九月十六 周三</div>
        <!-- 课程内容容器 -->
        <div class="course-schedule__content">
          <div class="couse-item" v-for="i in 3" :key="i">
            <div class="point"></div>
            <div class="couse-item-detail">
              <div class="course-title">软件测试</div>
              <div class="course-bottom">
                <div class="course-time">09:50-12:00</div>
                <div class="course-status">已结束</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 课程内容容器 -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/color.scss' as *;
@mixin flexCenter {
  display: flex;
  justify-content: start;
  align-items: center;
}
@mixin flexColumn {
  @include flexCenter();
  flex-direction: column;
}
.course-schedule {
  @include flexCenter();
  color: rgb(255, 255, 255);
  background: #fff;
  height: 100%;
  .course-schedule__list {
    width: 100%;
    height: 100%;
    padding: 2rem;
    border-radius: 2rem;
    background: $primary;
    .course-schedule__item {
      @include flexColumn();
      align-items: start;
      width: 100%;

      .course-schedule__date {
        font-size: $size-t2;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      .course-schedule__content {
        width: 100%;
        padding: 1rem 0 1rem 1rem;
        border-radius: 1rem;
        background: $card;
        @include flexColumn();
        align-items: start;
        //item 向下padding + 向上的margin
        .couse-item {
          @include flexCenter();
          align-items: start;
          width: 100%;
          margin: 0.5rem 0 0 0;
          padding-bottom: 0.5rem;
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            padding-bottom: 0;
            border-bottom: none;
          }
          border-bottom: 1px solid #ffffff;
          .point {
            width: 1rem;
            height: 1rem;
            background: #469a5d;
            margin-top: 0.2rem;
            border-radius: 50%;
            margin-right: 0.3rem;
          }
          //文字区
          .couse-item-detail {
            @include flexColumn();
            width: 100%;
            align-items: start;
            .course-title {
              width: 100%;
              line-height: $size-t2;
              margin-bottom: 0.5rem;
              font-size: $size-t2;
              font-weight: 500;
            }
            .course-bottom {
              width: 100%;
              font-size: $size-p2;
              color: $color-p2;
              @include flexCenter();

              .course-status {
                margin-left: 1.5rem;
              }
            }
          }
        }
      }
    }
  }
}

// .course-Schedule {
//   @include flexCenter();
//   background: #fff;
//   height: 100%;
//   .course-schedule__list {
//     .course-schedule__item {
//       .course-schedule__date {
//       }
//       .course-schedule__content {
//         .course-schedule__name {
//         }
//         .course-schedule__time {
//         }
//         .course-schedule__status {
//         }
//       }
//     }
//   }
// }
</style>
