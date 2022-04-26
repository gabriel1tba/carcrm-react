import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Account from './components/Account';
import Plans from './components/Plans';
import Cart from './components/Cart';

const Pay = () => {
  const app = useSelector((state) => state.appReducer.app);
  const plan = useSelector((state) => state.payReducer.plan);
  const [title, setTitle] = useState();

  useEffect(() => {
    if (app.status === 0 || app.status === 1) {
      setTitle(Object.keys(plan).length === 0 ? 'Planos' : 'Pagamento');
    }
    if (app.status === 2) {
      setTitle('Minha conta');
    }
  }, [app, plan]);

  return (
    <>
      <Header title={title} />
      {(app.status === 0 || app.status === 1) && (
        <>{Object.keys(plan).length === 0 ? <Plans /> : <Cart />}</>
      )}

      {app.status === 2 && <Account />}
    </>
  );
};

export default Pay;
