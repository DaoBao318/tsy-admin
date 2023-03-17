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