import { History } from 'history';
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';

interface NavBlockerControl {
	confirm: () => void;
	cancel: () => void;
}

interface NavBlocker {
	onBlock: (control: NavBlockerControl) => void;
	enabled?: boolean;
}

export const useNavBlocker = ({ onBlock, enabled }: NavBlocker) => {
	const { block } = useContext(UNSAFE_NavigationContext).navigator as History;

	const onBlockRef = useRef(onBlock);
	useLayoutEffect(() => {
		onBlockRef.current = onBlock;
	});

	useEffect(() => {
		if (!enabled) {
			return;
		}

		let isActive = false;

		const unblock = block(({ retry }) => {
			if (isActive) {
				unblock();
				return retry();
			}

			onBlockRef.current({
				confirm: retry,
				cancel: () => {
					isActive = false;
				},
			});

			isActive = true;
		});

		return unblock;
	}, [block, enabled]);
};
