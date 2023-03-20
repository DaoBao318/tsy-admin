管道计算 pipelineCalculation

管道形状 pipeShape
水流条件  flowConditions
最大沟高 maximumDitchHeight
最大管径 maximumPipeDiameter
充满度 fullness
管道计算 pipelineCalculation

Gravity
搜索条目 searchFormGravity
表格列 columnGravity
抽屉表单 drawerFormGravity

Pressure
搜索条目 searchFormPressure
表格列 columnPressure
抽屉表单 drawerFormPressure



接口
get gravity page  getGravityPage
get pressure page getPressurePage

方法
//管道材料切换
pipeMaterialSwitching
1、


    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '请选择计算公式',
        disabled: false,
        onChange: (value) => {
            //设置里面的值
            formModel.pipeMaterial = ''; 
          debugger;
          console.log('计算公式----schema',schema);
          console.log('计算公式----formModel',formModel);

        },
      };
    },

    类型标定
    import { BasicColumn } from '/@/components/Table';
    import { FormSchema } from '/@/components/Table';


{
    field: 'site',
    label: '网站',
    component: 'Select',
    required: true,

  },
  Result


    componentProps: ({ formModel, formActionType }) => {
      return {
        placeholder: '请选择内容',
        options: calculationContentOption,
        disabled: false,
        onChange: async (e: any) => {
            let target = e.target.value;
          const { updateSchema } = formActionType;
          updateSchema([{
            field: 'taskNum',
            component: 'InputNumber',
            componentProps: {

            },
          }]);
        },
      };
    },

    slots: { customRender: '' },
  //接口泛型的使用
  export interface FormSchema {
  // Field name
  field: string;
  }
  xx: FormSchema[] 数组对象
  xx: FormSchema 对象形式
    beforeFetch: (param) => {
    debugger;
  },
  afterFetch: (param) => {
    debugger;
  },

  //添加一个，删除一个，更新一个
    appendSchemaByField(
    {
      field: 'velocityOfFlow1',
      label: '流速（m/s）11111111',
      required: false,
      component: 'Input',
      colProps: { span: 12 },
      componentProps: {
        disabled: true,
      },
    },
    'calculationContent',
    false,
  );
  validate validateFields 是一样的

  参考 ColorInput 组件

  InputNumberExpand
  在这个里面进行注册，D:\tsy-admin-git\tsy-admin\src\components\Form\src\componentMap.ts；然后类型约束添加到 D:\tsy-admin-git\tsy-admin\src\components\Form\src\types\index.ts 在component中引入组件

    rules: [
      {
        required: true,
        validator: async (rule, value) => {
          debugger;
          if (!value) {
            return Promise.reject('值不能为空');
          }
          if (value === 1) {
            return Promise.reject('值不能为1');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],

  