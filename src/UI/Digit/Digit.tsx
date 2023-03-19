import React from 'react';
import styles from './styles.module.css';

type StringNumber =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '-';

type DigitProps = {
  number: StringNumber;
  color: string;
  width: number;
  className?: string;
};

const table: Record<StringNumber, number[]> = {
  '0': [1, 2, 3, 4, 5, 6],
  '1': [2, 3],
  '2': [1, 2, 7, 5, 4],
  '3': [1, 2, 7, 3, 4],
  '4': [6, 7, 2, 3],
  '5': [1, 6, 7, 3, 4],
  '6': [1, 6, 5, 4, 3, 7],
  '7': [1, 2, 3],
  '8': [1, 2, 3, 4, 5, 6, 7],
  '9': [1, 2, 3, 4, 6, 7],
  '-': [7]
};

const Digit: React.FC<DigitProps> = React.memo(
  ({ number, color, width, className }) => {
    const style = React.useMemo(
      () =>
        ({
          '--number-color': color,
          '--number-width': `${width}px`
        } as React.CSSProperties),
      [color, width]
    );

    const numberCode = React.useMemo(() => table[number], [number]);

    return (
      <div
        style={style}
        className={
          className
            ? `${styles['container']} ${className}`
            : styles['container']
        }>
        <div
          className={`${styles['trapezoid-top']} ${
            numberCode.includes(1) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles['trapezoid-left']} ${
            numberCode.includes(6) ? styles.active : ''
          }`}
        />
        <div />
        <div
          className={`${styles['trapezoid-right']} ${
            numberCode.includes(2) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles['trapezoid-middle-top']} ${
            numberCode.includes(7) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles['trapezoid-middle-bottom']} ${
            numberCode.includes(7) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles['trapezoid-left']} ${
            numberCode.includes(5) ? styles.active : ''
          }`}
        />
        <div />
        <div
          className={`${styles['trapezoid-right']} ${
            numberCode.includes(3) ? styles.active : ''
          }`}
        />
        <div
          className={`${styles['trapezoid-bottom']} ${
            numberCode.includes(4) ? styles.active : ''
          }`}
        />
      </div>
    );
  }
);

export { Digit };
export type { StringNumber };
