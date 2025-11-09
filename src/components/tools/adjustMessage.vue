<template>
  <div class="adjust">
    <normal-message @close="closeMessage">
      <div class="content">
        <div class="title">
          <span class="name">{{ list.name }}</span>
          <span class="teacher">
            <span class="top">授课教师:</span>
            <span>{{ list.teacher }}</span>
          </span>
        </div>
        <div class="schedule">
          <div class="oldSchedule">
            <div class="time">
              <span class="top">时间:</span>
              <span class="start">
                {{ list.oldTime.start }}
              </span>
              -
              <span class="end">
                {{ list.oldTime.end }}
              </span>
            </div>
            <span class="address">
              <span class="top">位置:</span>
              <span> 8号楼410</span>
            </span>
          </div>
          <div class="nowSchedule">
            <div class="time">
              <span class="top">时间:</span>
              <span class="start">
                {{ list.nowTime.start }}
              </span>
              -
              <span class="end">
                {{ list.nowTime.end }}
              </span>
            </div>
            <div class="address">
              <span class="top">位置:</span>
              <span>3号楼312</span>
            </div>
          </div>
        </div>
      </div>
    </normal-message>
  </div>
</template>

<script setup lang="ts">
import normalMessage from './normalMessage.vue'
withDefaults(defineProps<{ type?: string; list: adjust }>(), {
  type: 'adjust',
})
const emit = defineEmits(['close'])
const closeMessage = () => {
  emit('close')
  console.log(111)
}
interface adjust {
  name: string
  teacher: string
  oldTime: {
    start: string
    end: string
  }
  oldAddress: string
  nowTime: {
    start: string
    end: string
  }
  nowAddress: string
}
</script>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;
.adjust {
  position: relative;
  width: 100%;
  height: 100%;
  .content {
    @include flexStart;
    width: 100%;
    height: 100%;

    .title {
      @include flexStart;
      align-items: flex-start;
      width: 100%;
      padding: $space8 $space16;
      border-bottom: 1px solid #848282;
      .name {
        font-size: $font20;
        font-weight: 600;
        color: $gray900;
        margin-bottom: $space4;
      }
      .teacher {
        font-size: $font14;
        color: $gray800;
      }
    }

    .schedule {
      flex: 1;
      @include flexStart;
      width: 100%;
      align-items: flex-start;
      padding: $space16;
      font-size: $font14;
      font-weight: 520;

      // background: red;
      .address,
      .time {
        display: flex;

        // .top {
        //   // margin-right: 0.11rem;
        // }
      }

      .oldSchedule {
        @include flexStart(column);
        align-items: flex-start;
        color: $gray600;
        margin-bottom: $space16;
      }

      .nowSchedule {
        color: $gray700;
        @include flexStart(column);
        align-items: flex-start;
        font-weight: 500;
      }
    }
  }
}
</style>
