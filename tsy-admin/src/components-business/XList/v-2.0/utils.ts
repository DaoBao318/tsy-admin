import { setDividerFormItem } from '/@/utils/util';
import { UseFormOptions, FormPropsSelf } from './types';

function beforeFetch(params) {
  params.page = params['split.page'];
  params.page_size = params['split.size'];
  delete params['split.page'];
  delete params['split.size'];
  return params;
}

// 处理useTable的props
export function handleUseTableOptions(useTableOptions) {
  const { schemas, createActions, ...other } = useTableOptions;
  other['useSearchForm'] ??= true;
  other['showIndexColumn'] ??= false;
  const formConfig = other['formConfig'] || {
    labelWidth: 80,
    labelAlign: 'right',
    autoSubmitOnEnter: true,
    schemas,
    showAdvancedButton: true,
    autoAdvancedLine: 2,
    actionColOptions: {
      span: 3,
      style: {
        minWidth: '160px',
      },
    },
  };

  // 如果存在操作项目
  if (createActions) {
    other['actionColumn'] = {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      slots: { customRender: 'action' },
    };
  }

  return {
    title: '列表',
    beforeFetch,
    striped: true,
    bordered: true,
    showTableSetting: true,
    canResize: false,
    tableSetting: {
      redo: true,
      size: false,
      fullScreen: false,
      setting: false,
    },
    ...other,
    formConfig,
  };
}

// 设置每一项schema的show函数
function setPerSchemaItemShowFn(showFn, schemas = []) {
  if (!showFn || typeof showFn !== "function") {
    return schemas;
  }
  return schemas.map((subItem) => {
    const { show, ...otherSubItem } = subItem;
    otherSubItem.show = (data) => {
      return typeof show === 'function' ? showFn(data) && show(data) : showFn(data);
    };
    return otherSubItem;
  });
}

/**
 * @param schemas 简易的标准模式
 * @returns [...packTypeSchema, ...giftPackMethodSchema, ...giftPackMoreSchema]
 */

/**
 * @param schemas 带分割线，以及show的分块模式
 * @returns schemas: [{ title: '礼包类型', schemas: packTypeSchema, show: isOwnNewAlive,}]
 */

function judgeiSDividerMode(schemas) {
  const idx = schemas.findIndex((item) => item.schemas);
  if (idx !== -1) {
    const bool = schemas.every((curItem) => curItem.schemas);
    if (!bool) {
      console.error('格式不符合规范');
      return false;
    }
    return true;
  }
}
// 将传入的非标准schemas整理成标准schemas
export function getStandardUseFormProps(useFormOptions: UseFormOptions) {
  const { schemas = [], ...otherAttrs } = useFormOptions;
  if (!schemas.length) {
    return {
      useFormOptions: {
        ...otherAttrs,
        schemas: [],
      },
      slotsNames: [],
    };
  }

  let useFormSchemas = schemas;
  const slotsNames: FormPropsSelf[] = [];

  if (judgeiSDividerMode(schemas)) {
    const arrs = schemas.map(({ title, schemas = [], show }) => {
      const widthShowSchames = setPerSchemaItemShowFn(show, schemas);
      return title
        ? [setDividerFormItem(title, show), ...setPerSchemaItemShowFn(show, widthShowSchames)]
        : widthShowSchames;
    });
    useFormSchemas = arrs.flat(1);
  }

  useFormSchemas.forEach((schema) => {
    if (schema?.slot) {
      slotsNames.push(schema.slot);
    }
  });
  return {
    useFormOptions: {
      ...otherAttrs,
      schemas: useFormSchemas,
    },
    slotsNames, // 所有slots的name集合
  };
}
