import { IS_DEFINED } from '@/utils/check.functions';

export default function (name, value) {
	const store = useState(name);
	if (IS_DEFINED(store)) {
		store.value = value;
	} else {
		useState(name, () => value);
	}
}
