import type { FormSchema, FormActionType, RegisterFn } from '/@/components/Form';

/**
 * 只有 1 个分组
 */
export interface CustomFormSchema extends FormSchema {
  customComponent?: string;
  customComponentProps?: (data: Recordable) => Recordable;
}

/*
 * 包含分组的概念
 */
export interface DrawerFormSchema {
  title: string;
  schemas: CustomFormSchema[];
}

export interface FormActions extends FormActionType {
  register: RegisterFn;
}

export enum DrawerFormMode {
  VIEW = 1,
  EDIT,
  ADD,
  COPY,
}

// export type DrawerFormMode = 'view' | 'edit' | 'add';
