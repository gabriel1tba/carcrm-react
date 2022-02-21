import { useDispatch, useSelector } from 'react-redux';
import MaskedInput from 'react-text-mask';
import { InputAdornment, TextField } from '@material-ui/core';
import { MdCreditCard } from 'react-icons/md';

const TextMaskCustom = ({ inputRef, id, ...rest }) => {
  let mask = [];

  if (id === 'cardNumber') {
    mask = [
      /[0-9]/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
  }

  if (id === 'cardExpiration') {
    mask = [/[0-9]/, /\d/, '/', /\d/, /\d/];
  }

  if (id === 'securityCode') {
    mask = [/[0-9]/, /\d/, /\d/];
  }

  if (id === 'cpf') {
    mask = [
      /[0-9]/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];
  }

  return (
    <MaskedInput
      {...rest}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      guide={false}
    />
  );
};

const Payment = () => {
  return <h1>Payment</h1>;
};

export default Payment;
