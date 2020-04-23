// 判断类型
const checkType = (type) => (target) => Object.prototype.toString.call(target) === `[object ${type}]`
const typeArr = ['Array', 'Undefined', 'String', 'Null', 'Object', 'Function']
const utils = {}
typeArr.forEach(item => {
    utils['is' + item] = checkType(item)
})

export default utils