import { useState, useEffect, useRef } from 'react';
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
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.payReducer.plan);
  const pay_type = useSelector((state) => state.payReducer.pay_type);
  const success = useSelector((state) => state.payReducer.success);
  const error = useSelector((state) => state.payReducer.error);

  const inputPayment = useRef(null);
  const secureThumbnail = useRef(null);

  const [cart, setCart] = useState({});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';

    script.addEventListener('load', () => {
      window.Mercadopago.setPublishableKey(process.env.REACT_APP_MP_PUBLIC_KEY);
    });
    document.body.appendChild(script);

    return () => {
      const iframe = document.querySelector('iframe');
      document.body.removeChild(iframe);
      document.body.removeChild(script);
    };
  }, []);

  const setPaymentMethod = (status, response) => {
    try {
      if (status === 200) {
        inputPayment.current.value = response[0].id;
        secureThumbnail.current.src = response[0].secure_thumbnail;
      } else {
        console.log(`payment method info error: ${response}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="pay">
      {pay_type === 'card' && (
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label className="label-custom">Número do cartão</label>
              <TextField
                error={error.cardNumber && true}
                id="cardNumber"
                type="tel"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: cart.cardNumber,
                  placeholder: '____ ____ ____ ____',
                  inputProps: { 'data-checkout': 'cardNumber' },
                  autoComplete: 'off',
                  onChange: (event) => {
                    setCart({
                      ...cart,
                      cardNumber: event.target.value,
                    });
                    if (event.target.value.length >= 7) {
                      window.Mercadopago.getPaymentMethod(
                        {
                          bin: event.target.value.substring(0, 7),
                        },
                        setPaymentMethod
                      );
                    }
                  },
                  startAdornment: (
                    <InputAdornment>
                      <MdCreditCard
                        style={{ fontSize: '1.5rem' }}
                        className="mr-2 text-muted"
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment>
                      <img alt="" ref={secureThumbnail} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <input type="hidden" ref={inputPayment} />
        </div>
      )}
    </form>
  );
};

export default Payment;
