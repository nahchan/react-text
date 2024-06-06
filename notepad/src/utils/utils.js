// 防抖
export function debounce(fun, wait) {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fun(args);
            clearTimeout(timer);
        }, wait);
    }
}

// 节流
export function throttle(fun, wait) {
    let date = 0;
    return function (...args) {
        const now = Date.now();
        if (now - date > wait) {
            fun(...args);
            date = now;
        }
    }
}