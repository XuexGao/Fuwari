/**
 * 数字动画工具函数
 * 用于在网页中实现数字从起始值到结束值的动画过渡效果
 */

function animateValue(
	obj: HTMLElement,
	start: number,
	end: number,
	duration: number,
): void {
	let startTimestamp: number | null = null;
	const step = (timestamp: number) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		obj.innerHTML = Math.floor(progress * (end - start) + start).toString();
		if (progress < 1) {
			window.requestAnimationFrame(step);
		} else {
			obj.innerHTML = end.toString();
		}
	};
	window.requestAnimationFrame(step);
}

function animateValueWithSuffix(
	obj: HTMLElement,
	start: number,
	end: number,
	duration: number,
	suffix = "",
): void {
	let startTimestamp: number | null = null;
	const step = (timestamp: number) => {
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

export { animateValue, animateValueWithSuffix };
