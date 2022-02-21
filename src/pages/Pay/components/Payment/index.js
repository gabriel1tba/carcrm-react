import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaskedInput from 'react-text-mask';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { MdArrowBack, MdCreditCard, MdEmail } from 'react-icons/md';

import { change, error as setError } from '../../../../store/actions/pay';

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

  const secureThumbnail = useRef(null);

  const [cart, setCart] = useState({});

  const setPaymentMethod = (status, response) => {
    try {
      if (status === 200) {
        document.getElementById('paymentMethodId').value = response[0].id;
        secureThumbnail.current.src = response[0].secure_thumbnail;
      } else {
        console.log(`payment method info error: ${response}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cardExpiration = (value) => {
    if (value.length === 5) {
      const [cardExpirationMonth, cardExpirationYear] = value.split('/');
      setCart({
        ...cart,
        cardExpiration: value,
        cardExpirationMonth,
        cardExpirationYear,
      });
    } else {
      setCart({
        ...cart,
        cardExpiration: value,
      });
    }
  };

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

          <div className="col-6 col-md-4">
            <div className="form-group">
              <label className="label-custom">Vencimento</label>
              <TextField
                error={
                  (error.cardExpirationMonth || error.cardExpirationYear) &&
                  true
                }
                id="cardExpiration"
                type="tel"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: cart.cardExpiration,
                  autoComplete: 'off',
                  onChange: (event) => cardExpiration(event.target.value),
                }}
              />
            </div>
          </div>

          <div className="col-md-8 order-1 order-md-0">
            <div className="form-group">
              <label className="label-custom">Nome impresso no cartão</label>
              <TextField
                error={error.cardholderName && true}
                id={'cardholderName'}
                value={cart.cardholderName || ''}
                autoComplete="off"
                inputProps={{ 'data-checkout': 'cardholderName' }}
                onChange={(event) =>
                  setCart({ ...cart, cardholderName: event.target.value })
                }
              />
            </div>
          </div>

          <div className="col-6 col-md-4">
            <div className="form-group">
              <label className="label-custom">CVV</label>
              <TextField
                error={error.securityCode}
                id="securityCode"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: cart.securityCode,
                  autoComplete: 'off',
                  type: 'tel',
                  inputProps: { 'data-checkout': 'securityCode' },
                  onChange: (event) =>
                    setCart({ ...cart, securityCode: event.target.value }),
                  endAdornment: (
                    <InputAdornment>
                      <div className="cvv_info" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <input
            type="hidden"
            id="cardExpirationMonth"
            value={cart.cardExpirationMonth || ''}
            data-checkout="cardExpirationMonth"
          />
          <input
            type="hidden"
            id="cardExpirationYear"
            value={cart.cardExpirationYear || ''}
            data-checkout="cardExpirationYear"
          />
          <input type="hidden" id="paymentMethodId" />
        </div>
      )}

      {pay_type !== 'card' && (
        <>
          <div className="form-group">
            <label className="label-custom">Nome</label>
            <TextField
              error={error.first_name && true}
              value={cart.first_name || ''}
              autoComplete="off"
              onChange={(event) =>
                setCart({ ...cart, first_name: event.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="label-custom">Sobrenome</label>
            <TextField
              error={error.last_name && true}
              value={cart.last_name || ''}
              autoComplete="off"
              onChange={(event) =>
                setCart({ ...cart, first_name: event.target.value })
              }
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label className="label-custom">Email</label>
        <TextField
          error={error.email && true}
          value={cart.email || ''}
          autoComplete="off"
          id="email"
          type="email"
          onChange={(event) => setCart({ ...cart, email: event.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <MdEmail
                  style={{ fontSize: '1.5rem' }}
                  className="mr-2 text-muted"
                />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="form-group">
        <label className="label-custom">CPF</label>
        <TextField
          error={error.cpf && true}
          autoComplete="off"
          id="cpf"
          InputProps={{
            inputComponent: TextMaskCustom,
            value: cart.cpf,
            type: 'tel',
            placeholder: '___.___.___-__',
            onChange: (event) =>
              setCart({
                ...cart,
                cpf: event.target.value,
                docNumber: event.target.value.replace(/[.-]/g, ''),
              }),
          }}
        />
        <input id="docType" value="CPF" data-checkout="docType" type="hidden" />
        <input
          id="docNumber"
          value={cart.docNumber || ''}
          data-checkout="docNumber"
          type="hidden"
        />
      </div>

      <div className="d-flex">
        <Button
          variant="contained"
          size="large"
          className="mt-4 mb-2 mr-3 font-weight-bold"
          startIcon={<MdArrowBack style={{ marginLeft: '12px' }} />}
          onClick={() => {
            dispatch(setError({}));
            dispatch(change({ pay_type: null }));
          }}
        >
          &nbsp;
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className="mt-4 mb-2 font-weight-bold"
        >
          Realizar pagamento
        </Button>
      </div>
    </form>
  );
};

export default Payment;
