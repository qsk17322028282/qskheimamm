//手机号格式判断是否正确
export const checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("手机号不能为空 !"));
    } else {
        // 判断手机号的格式
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == true) {
            callback();
        } else {
            callback(new Error("手机号输入错误 !"));
        }
    }
};
//邮箱格式判断是否正确
export const checkEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("邮箱不能为空 !"));
    } else {
        // 判断手机号的格式
        // 正则
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) == true) {
            callback();
        } else {
            callback(new Error("邮箱输入错误 !"));
        }
    }
};