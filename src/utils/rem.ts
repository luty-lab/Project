/**
 * 自适应 rem 核心逻辑
 * 设计稿基准：750px（移动端常用），1rem = 100px（设计稿中 100px = 1rem）
 */
export function setupRem() {
  // 设计稿宽度（根据实际设计稿修改，如 375px/750px/1920px）
  const DESIGN_WIDTH = 375
  // 1rem 对应的设计稿像素值（固定 100px，方便计算）
  const REM_BASE = 100
  // 最大屏幕宽度（超过此宽度不再放大，避免内容过大）
  const MAX_SCREEN_WIDTH = 1920

  // 计算并设置根字体大小
  function setRem() {
    // 获取当前屏幕宽度（优先取可视区宽度）
    const clientWidth = document.documentElement.clientWidth || window.innerWidth
    // 限制最大宽度
    const actualWidth = clientWidth > MAX_SCREEN_WIDTH ? MAX_SCREEN_WIDTH : clientWidth
    // 核心公式：根字体大小 = (实际宽度 / 设计稿宽度) * 100px
    const fontSize = (actualWidth / DESIGN_WIDTH) * REM_BASE
    // 设置到 html 元素（保留 3 位小数，避免精度问题）
    document.documentElement.style.fontSize = `${fontSize.toFixed(3)}px`
  }

  // 初始化执行
  setRem()

  // 监听窗口变化（屏幕旋转、缩放时重新计算）
  window.addEventListener('resize', setRem)
  // 监听页面加载完成（避免图片等资源加载导致尺寸偏差）
  window.addEventListener('load', setRem)
  // 监听屏幕旋转（移动端适配）
  window.addEventListener('orientationchange', setRem)
}
