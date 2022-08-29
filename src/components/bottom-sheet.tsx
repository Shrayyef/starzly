import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {useTheme} from '@react-navigation/native';
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {ITheme} from '../color';

interface IBottomSheet {
  visible: boolean;
  children: ReactNode;
  onClose: () => void;
}

const BottomSheetOptions: FC<IBottomSheet> = ({visible, children, onClose}) => {
  const theme = useTheme() as ITheme;

  const ref = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['85%'], []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        ref.current?.present(0);
      }, 100);
    } else {
      ref.current?.snapToIndex(-1);
    }
  }, [visible]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDismissOnClose
      onDismiss={onClose}
      onChange={handleSheetChanges}>
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheetOptions;
