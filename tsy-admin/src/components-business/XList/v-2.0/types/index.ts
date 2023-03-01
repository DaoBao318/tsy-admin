import { BasicTableProps, TableActionType, FormSchema, BasicColumn } from '/@/components/Table';
import { FormActionType } from '/@/components/Form/';
import { ReturnMethods as ModalReturnMethods } from '/@/components/Modal/src/typing';
import type { DynamicProps } from '/#/utils';
import { FormProps } from './form';
import { ReturnMethods, RegisterFn } from '/@/components/Drawer/src/typing';

type TableProps = Partial<DynamicProps<BasicTableProps>>;
interface UseTableOptions extends TableProps {
  title?: string; // table标题
  api?: (...arg: any) => Promise<any>; // table Api 必须符合标准
  columns: BasicColumn[]; // 表格列配置
  schemas?: FormSchema[]; // 表单搜索
  createActions?: Function; // 创建action function
}

export type FormPropsSelf = Partial<DynamicProps<FormProps>>;
type schemaSelfProp = {
  title?: string;
  schemas: FormPropsSelf[];
  show: Function;
};
export interface UseFormOptions extends FormPropsSelf {
  schemas: schemaSelfProp[] | FormPropsSelf[];
}
export interface LayerItemProps {
  name: string;
  component: 'DrawerForm' | 'ModalForm';
  title?: string;
  componentProps?:
    | ((opt: {
        schema: FormSchema;
        tableAction: TableActionType;
        formActionType: FormActionType;
        formModel: Recordable;
      }) => Recordable)
    | object;
  useFormOptions: UseFormOptions;
}

export interface UseXListOptions {
  useTableOptions: UseTableOptions; // useTable的配置 支持form表单搜索非嵌套配置
  layers?: Array<LayerItemProps>;
}

export interface LayerSlot {
  slot: string;
  componentName?: string;
  componentProps?: (record: Recordable) => Recordable;
}

export enum DrawerFormMode {
  VIEW = 1,
  EDIT,
  ADD,
  COPY,
}

type UseTableMethod = TableActionType & {
  getForm: () => FormActionType;
};

interface TableMethods extends UseTableMethod {
  register: (instance: TableActionType, formInstance: UseTableMethod) => void;
}

interface LayerMethods extends ReturnMethods, ModalReturnMethods {
  register: RegisterFn;
  open: ReturnMethods['openDrawer'];
}
export interface IContext {
  // getEnv
  // table 回掉方法，useTable 返回的结果
  table: TableMethods;
  // useDrawer 返回的 mothods 类型
  layers?: Record<string, LayerMethods>;

}
