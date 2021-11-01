/**
 * 用户名校验规则
 * @type {Array}
 */
export const usernameRules = [
    { required: true, message: 'Please input your Username!'},
    {min: 3, message: "用户名至少3位!"},
    {max: 12, message: "用户名最多12位!"},
    {pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须由英文、数字、下划线购成!"},
];


/**
 * 用户密码校验规则
 * @type {Array}
 */
export const passwordRules = [
    {required: true, message: 'Please input your Password!'},
    {min: 3, message: "密码至少3位"},
    {max: 12, message: "密码最多12位"},
]
