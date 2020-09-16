const styles = require('./popup.less');

type PosType = 'center' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type CssStylePosType = 'left' | 'right' | 'top' | 'bottom';
interface IPosValue {
	left?: number;
	right?: number;
	top?: number;
	bottom?: number;
}

interface Ipopup {
	width?: number;
	height?: number;
	title?: string;
	pos?: PosType;
	mask?: boolean;
	content?: () => void;
}

export default function popup(options: Ipopup) {
	return new Popup(options);
}

interface IComponent {
	tempContainer: HTMLDivElement;
	options: Ipopup;
	handler: {
		onDestroy: () => void;
	};
	init: () => void;
	template: () => void;
}

class Popup implements IComponent {
	tempContainer: HTMLDivElement;
	maskContainer: HTMLDivElement;
	options: Ipopup;
	handler = {
		onDestroy: () => {
			const closeElement = document.querySelector(`.${styles.header} .icon-close`);
			const onClick = (e: Event) => {
				this.tempContainer?.remove();
				this.maskContainer?.remove();
				closeElement.removeEventListener('click', onClick);
			};
			closeElement.addEventListener('click', onClick);
		},
	};
	constructor(setting: Ipopup) {
		this.options = Object.assign(
			{
				width: 880,
				height: 550,
				title: '',
				pos: 'center',
				mask: true,
				content: function () {},
			},
			setting,
		);
		this.init();
	}

	init() {
		this.template();
		this.handler.onDestroy();
		this.options.mask && this.createMask();
	}
	template() {
		this.tempContainer = document.createElement('div');
		this.tempContainer.innerHTML = `
            <div class="${styles.header}">
                <span>${this.options.title}</span>
                <i class="iconfont icon-close"></i>
            </div>
            <div class="${styles.content}">${this.options.content()}</div>
        `;
		this.tempContainer.className = `${styles.container}`;
		this.updateStyle(this.tempContainer)('width', `${this.options.width}px`);
		this.updateStyle(this.tempContainer)('height', `${this.options.height}px`);
		document.body.appendChild(this.tempContainer);
		// action: container should be mounted, then you can get container offsetHeight and offsetWidth
		this.setPos(this.tempContainer, this.options.pos);
	}
	private createMask() {
		this.maskContainer = document.createElement('div');
		this.maskContainer.className = styles.mask;
		this.maskContainer.style.width = '100%';
		this.maskContainer.style.height = `${document.body.offsetHeight}px`;
		document.body.appendChild(this.maskContainer);
	}
	private updateStyle(el: HTMLElement) {
		return (property: any, value: string | number) => (el.style[property] = `${value}`);
	}
	private setPos(container: HTMLDivElement, pos: PosType) {
		const { innerWidth, innerHeight } = window;
		const { offsetWidth, offsetHeight } = container;
		const centerLeft = (innerWidth - offsetWidth) / 2,
			centerTop = (innerHeight - offsetHeight) / 2;
		const updateStyle = (property: any, value: number) => this.updateStyle(container)(property, `${value}px`);
		const posMap = new Map<PosType, IPosValue>();
		posMap.set('topLeft', { left: 0, top: 0 });
		posMap.set('top', { left: centerLeft, top: 0 });
		posMap.set('topRight', { right: 0, top: 0 });
		posMap.set('center', { left: centerLeft, top: centerTop });
		posMap.set('bottomLeft', { left: 0, bottom: 0 });
		posMap.set('bottom', { left: centerLeft, bottom: 0 });
		posMap.set('bottomRight', { right: 0, bottom: 0 });
		Object.keys(posMap.get(pos)).forEach((key: CssStylePosType) => updateStyle(key, posMap.get(pos)[key]));
	}
}
