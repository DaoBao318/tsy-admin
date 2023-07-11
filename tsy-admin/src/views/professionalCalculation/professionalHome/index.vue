<template>
  <PageWrapper :class="prefixCls" title="专业计算子模块">
    <template #headerContent>
      给排水专业计算子模块包括国铁（普铁和高铁）站点（各车站和段所）昼夜最大用水量与排水量计算、管道水力计算、设施设备选型计算功能，可将计算成果导出Excel。
    </template>
    <div :class="`${prefixCls}__content`">
      <a-list>
        <a-row :gutter="16" style="margin: 0 10px">
          <template v-for="item in list" :key="item.title">
            <a-col :span="8">
              <a-list-item>
                <a-card :class="`${prefixCls}__card`" class="cardStyle">
                  <div
                    :class="`${prefixCls}__card-title`"
                    :title="'点击进入页面' + item.title"
                    @click="jumpTo(item.page)"
                  >
                    <Icon class="icon" v-if="item.icon" :icon="item.icon" :color="item.color" />
                    {{ item.title }}
                  </div>
                  <div :class="`${prefixCls}__card-detail`">
                    {{ item.content }}
                  </div>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { cardList } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Row, Col, List } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'ProfessionalHome',
    components: {
      Icon,
      PageWrapper,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const go = useGo();
      const jumpTo = (type) => {
        go({ name: type });
        // WaterConsumption
        // EquipmentSelection
      };
      return {
        prefixCls: 'list-card',
        list: cardList,
        jumpTo,
      };
    },
  });
</script>
<style lang="less" scoped>
  .list-card {
    .cardStyle {
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5); /* 阴影效果 */
      border-radius: 10px; /* 圆角效果 */
      background-color: #f5f5f5;
    }

    .cardStyle:hover {
      background-color: #fff; /* 鼠标悬停时的背景颜色 */
      // filter: drop-shadow(0 0 2em #f5f5f5);
    }
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;
        cursor: pointer;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color-secondary;
        height: 200px;
        overflow: auto;
      }
    }
  }
</style>
