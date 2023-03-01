import { MathHandler } from '/@/utils/MathHandler';

export enum COLOR_TYPE {
  'RGBA',
  'HEX',
  'ARGB',
}

export type ColorType = 'RGBA' | 'HEX' | 'ARGB';

export const Color = {
  rgbToHex: function (val) {
    let r, g, b, a;
    const regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/; //判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
    const rsa = val.replace(/\s+/g, '').match(regRgba);
    if (!!rsa) {
      r = parseInt(rsa[1]).toString(16);
      r = r.length == 1 ? '0' + r : r;
      g = (+rsa[2]).toString(16);
      g = g.length == 1 ? '0' + g : g;
      b = (+rsa[3]).toString(16);
      b = b.length == 1 ? '0' + b : b;
      a = +(rsa[5] ? rsa[5] : 1) * 100;
      return {
        hex: '#' + r + g + b,
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
        a: a,
      };
    } else {
      return { hex: '无效', a: 100 };
    }
  },
  // //HEX十六进制颜色值转换为RGB(A)颜色值
  hexToRgb: function (val: string) {
    // 16进制颜色值的正则
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    let color = val.toLowerCase();
    let result = '';
    if (reg.test(color)) {
      // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        let colorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        color = colorNew;
      }
      // 处理六位的颜色值，转为RGB
      const colorChange: any = [];
      for (let i = 1; i < 7; i += 2) {
        colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
      }
      result = 'rgb(' + colorChange.join(',') + ')';
      return { rgb: result, r: colorChange[0], g: colorChange[1], b: colorChange[2] };
    } else {
      result = '无效';
      return { rgb: result };
    }
  },

  argbToRgba: function (val) {
    val = val.trim().toLowerCase();
    const color: any = {};
    try {
      const argb = /^#?([a-f/\d]{2})([a-f/\d]{2})([a-f/\d]{2})([a-f/\d]{2})$/i.exec(val);
      color.a = MathHandler.toFixed((parseInt(argb[1], 16) / 255) * 100, 1) / 100;
      color.r = parseInt(argb[2], 16);
      color.g = parseInt(argb[3], 16);
      color.b = parseInt(argb[4], 16);
    } catch (e) {
      console.log(e);
    }
    return color;
  },
  argbToHexAndAlpha: function (val) {
    val = val.trim().toLowerCase();
    const color: any = {};
    try {
      const argb = /^#?([a-f/\d]{2})([a-f/\d]{2})([a-f/\d]{2})([a-f/\d]{2})$/i.exec(val);
      color.a = MathHandler.toFixed((parseInt(argb[1], 16) / 255) * 100, 1);
      color.hex = `#${argb[2]}${argb[3]}${argb[4]}`;
    } catch (e) {
      console.log(e);
    }
    return color;
  },

  hexAndAlphaToArgb(hex, alpla) {
    // 把颜色值变成小写
    if (!Color.isHex(hex)) {
      return '无效';
    }
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    let colorNew = '#';
    if (hex.length === 4) {
      for (let i = 1; i < 4; i += 1) {
        colorNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
      }
      hex = colorNew;
    }
    const a = parseInt((alpla / 100) * 255).toString(16);
    return `#${a}${hex.replace('#', '')}`;
  },

  rgbaToArgb(val) {
    val = val.trim().toLowerCase();
    const { hex, a } = Color.rgbToHex(val);
    const alpha = parseInt((a / 100) * 255).toString(16);
    return `#${hex.replace('#', alpha)}`;
  },

  isHex(color) {
    return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color);
  },

  isArgb(color) {
    return /^#[0-9a-fA-f]{8}$/.test(color);
  },

  isRgba(color) {
    return /^rgba/.test(color);
  },

  isRgb(color) {
    return /^rgb/.test(color);
  },

  getRgba(val) {
    if (Color.isHex(val)) {
      const { r, g, b } = Color.hexToRgb(val);
      return { r, g, b };
    }
    if (Color.isArgb(val)) {
      const { r, g, b, a } = Color.argbToRgba(val);
      return { r, g, b, a };
    }
  },

  judgeColorType(color) {
    color = color.trim().toLowerCase();
    const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(color);
    const isRgb = /^rgb/.test(color);
    const isRgba = /^rgba/.test(color);
    const isHsl = /^hsl/.test(color);
    const isArgb = !isHsl && !isRgba && isRgb && !isHex;
    return {
      isArgb,
      isHsl,
      isRgba,
      isRgb,
      isHex,
    };
  },
};
