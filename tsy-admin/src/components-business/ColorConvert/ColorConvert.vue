<template lang="pug">
.color-wrap
    a-input.color-box(:style="{ background: bgc }" disabled v-model:value="targetColort")
    a-input.hex(placeholder="输入#加6位#abcdef" v-model:value="colorState.hex" v-bind="$attrs")
    a-input-number.alpha(
        :min="0"
        :max="100"
        placeholder="透明度"
        v-model:value="colorState.alpha"
        :formatter="value => `${value}%`"
        )
</template>

<script lang="ts">
  import { defineComponent, watch, ref, reactive, computed } from 'vue';
  import { Color, COLOR_TYPE } from './handlerColor';

  export default defineComponent({
    name: 'ColorConvert',
    props: {
      // 传入的颜色值
      value: {
        type: String,
        default: '', // argb颜色
      },
      // 需要返回的颜色类型；目前支持
      expectExportColorType: {
        type: Number,
        default: COLOR_TYPE.ARGB,
      },
    },
    emits: ['update:value', 'change'],
    setup(props, { emit }) {
      const targetColort = ref('');
      const colorState = reactive({
        alpha: ref<number>(100),
        hex: ref<string>(''),
      });

      const bgc = computed(() => {
        const { r, g, b } = Color.hexToRgb(colorState.hex);
        if (!r) {
          return 'transparent';
        }
        return `rgba(${r},${g}, ${b}, ${colorState.alpha / 100})`;
      });

      watch(
        () => props.value,
        (newColor, oldColor) => {
          if (newColor === oldColor || newColor === targetColort.value) return;
          if (Color.isArgb(newColor)) {
            const { hex, a } = Color.argbToHexAndAlpha(newColor);
            colorState.alpha = a;
            colorState.hex = hex;
          } else if (Color.isHex(newColor)) {
            colorState.alpha = 100;
            colorState.hex = newColor;
          } else if (Color.isRgba(newColor) || Color.isRgb(newColor)) {
            const { hex, a } = Color.rgbToHex(newColor);
            colorState.hex = hex;
            colorState.alpha = a;
          }
        }
      );

      watch(
        () => colorState,
        (newState) => {
          if (props.expectExportColorType === COLOR_TYPE.ARGB) {
            const argb = Color.hexAndAlphaToArgb(newState.hex, newState.alpha);
            targetColort.value = argb;
            emit('update:value', argb);
            emit('change', argb);
            return;
          }
          if (props.expectExportColorType === COLOR_TYPE.RGBA) {
            const { r, g, b } = Color.hexToRgb(newState.hex);
            const rgba = `rgba(${r},${g}, ${b}, ${newState.alpha / 100})`;
            targetColort.value = rgba;
            emit('update:value', rgba);
            emit('change', rgba);
          }
        },
        {
          deep: true,
        }
      );

      return {
        colorState,
        bgc,
        targetColort,
      };
    },
  });
</script>

<style lang="stylus" scoped>
  .color-wrap
      display: flex
      align-items: center
      justify-content: flex-start
      .hex
        width 43%
      .alpha
        width 30%
        margin-left: 2%
      .color-box
        width 25%
        height 30px
        font-size 10px
</style>
