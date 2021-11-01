/**
 * 获取组件displayName
 * @param TargetComponent Component
 * @returns {string}
 */
export default function getDisplayName(TargetComponent) {
    // 校验参数是否为组件

    // 返回组件的displayName
    return TargetComponent.displayName || TargetComponent.name || "Component";
}
