import React from 'react';
import { Digit, StringNumber } from 'UI/Digit/Digit';
import styles from './styles.module.css';

type DigitalDisplayProps = {
  number: number;
  length: number;
  min: number;
  max: number;
};

const generateZeroPad = (number: number, length: number) => {
  const isNegative = number < 0;
  const stringNumber = Math.abs(number).toString();
  const padLength = isNegative
    ? length - stringNumber.length - 1
    : length - stringNumber.length;

  const sign = isNegative ? '-' : '';

  const string = sign.concat('0'.repeat(padLength).concat(stringNumber));

  return string.split('') as StringNumber[];
};

const DigitalDisplay: React.FC<DigitalDisplayProps> = ({
  number,
  length,
  min,
  max
}) => {
  const numbers =
    number > max
      ? (max.toString().split('') as StringNumber[])
      : number < min
      ? (min.toString().split('') as StringNumber[])
      : generateZeroPad(number, length);

  return (
    <div className={styles.display}>
      {numbers.map((number, index) => (
        <Digit
          key={index}
          className={styles.digit}
          color='red'
          width={16}
          number={number}
        />
      ))}
    </div>
  );
};

export { DigitalDisplay };
