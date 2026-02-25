/**
 * 数字动画工具函数
 * 用于在网页中实现数字从起始值到结束值的动画过渡效果
 */

function animateValue(obj, start, end, duration) {
	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		obj.innerHTML = Math.floor(progress * (end - start) + start);
		if (progress < 1) {
			window.requestAnimationFrame(step);
		} else {
			obj.innerHTML = end;
		}
	};
	window.requestAnimationFrame(step);
}

function animateValueWithSuffix(obj, start, end, duration, suffix = "") {
	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		obj.innerHTML = `${Math.floor(progress * (end - start) + start)} ${suffix}`;
		if (progress < 1) {
			window.requestAnimationFrame(step);
		} else {
			obj.innerHTML = `${end} ${suffix}`;
		}
	};
	window.requestAnimationFrame(step);
}

window.animateValue = animateValue;
window.animateValueWithSuffix = animateValueWithSuffix;
