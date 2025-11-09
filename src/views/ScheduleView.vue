<template>
  <div class="course-schedule">
    <!-- 课程列表容器 -->
    <div class="course-schedule__list">
      <!-- 一日课程项 -->
      <div class="course-schedule__day" v-for="item in 5" :key="item">
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
@use '@/styles/index.scss' as *;

.course-schedule {
  @include flexCenter();
  background-color: $gray200;
  color: $gray200;
  height: 100%;
  .course-schedule__list {
    @include flexCenter(column);
    width: 100%;
    height: 100%;
    padding: $space16;
    border-radius: $radius16;

    .course-schedule__day {
      @include flexCenter(column);
      align-items: start;
      width: 100%;
      margin-bottom: $space16;
      .course-schedule__date {
        color: $gray900;
        font-size: $font18;
        font-weight: bold;
        margin-bottom: $space16;
      }

      .course-schedule__content {
        width: 100%;
        background: $gray0;
        padding: $space16 0 $space16 $space16;
        border-radius: $radius16;
        @include flexCenter(column);
        align-items: start;
        //item 向下padding + 向上的margin
        .couse-item {
          @include flexStart(row);
          align-items: flex-start;
          width: 100%;
          margin: $space4 0 0 0;
          padding-bottom: $space4;

          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            padding-bottom: 0;
            border-bottom: none;
          }
          border-bottom: 1px solid $gray500;
          .point {
            width: $font14;
            height: $font14;
            background: $primary;
            margin-top: 0;
            border-radius: 50%;
            margin-right: $space16;
          }
          //文字区
          .couse-item-detail {
            @include flexCenter(column);
            width: 100%;
            align-items: start;
            .course-title {
              width: 100%;
              color: $gray800;
              line-height: $font16;
              margin-bottom: $space4;
              font-size: $font16;
              font-weight: 500;
            }
            .course-bottom {
              color: $gray400;
              width: 100%;
              font-size: $font12;
              color: 1px;
              @include flexStart(row);
              .course-status {
                margin-left: $space16;
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
