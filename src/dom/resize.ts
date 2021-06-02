import ResizeObserver from 'resize-observer-polyfill';
/**
 * 可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距padding。（有关内容区域、内边距资料见盒子模型 ）
 * ResizeObserver避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通过在后续帧中处理DOM中更深层次的元素来实现这一点。
 * 如果（浏览器）遵循规范，只会在绘制前或布局后触发调用。
 */
const isServer = typeof window === 'undefined';



/**
 * 添加resize事件监听时，做了以下两件事情
 * 1、把resizeObserve对象保存在__ro__上，添加事件处理器为resizeHandler
 * 2、把监听事件保存在__resizeListeners__数组中
 * 3、在resize事件触发时，通过事件对象的target拿到html对象，拿取监听事件队列后依次触发每一个事件
 * 4、在取消监听事件时，从__resizeListeners__数组中移除指定的事件，并判断__resizeListeners__为空时，取消ResizeObserver的监听
 *
 * 5、bug点：如果在取消完了所有的监听后，再次监听应该会出问题，因为ResizeObserver对象在前期已经被disconnect，没有被重新observe
 *
 * @param {any[]} entries
 */
function resizeHandler(entries: any[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: () => any) => {
        fn();
      });
    }
  }
}

/* istanbul ignore next */
export function addResizeListener(element: any, fn: () => any) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
}

/* istanbul ignore next */
export function removeResizeListener(element: any, fn: () => any) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
}

export function triggerWindowResize() {
  // 创建一个指定类型的事件。其返回的对象必须先初始化并可以被传递给 element.dispatchEvent
  const event = document.createEvent('HTMLEvents');
  // event.initEvent(type, bubbles, cancelable);
  event.initEvent('resize', true, true);
  (event as any).eventType = 'message';
  // 触犯时间
  window.dispatchEvent(event);
}
