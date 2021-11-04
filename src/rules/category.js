
/**
 * 类型名校验规则
 * @type {Array}
 */
export const CategoryNameRules = [
    { required: true, message: '请输入类型名称!'},
    {min: 2, message: "用户名至少2位!"},
    {max: 12, message: "用户名最多12位!"}
];
