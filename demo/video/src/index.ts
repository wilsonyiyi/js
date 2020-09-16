import popup from './components/popup';
import './index.less';

const items = document.querySelectorAll('li a');

items.forEach((item) => {
	item.addEventListener('click', function () {
		const { url, title } = this.dataset;
		popup({ title });
	});
});
