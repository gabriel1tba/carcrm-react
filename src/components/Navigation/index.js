import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@material-ui/core';

import {
  toggleScreen1,
  toggleScreen2,
  toggleScreen3,
} from '../../store/actions/navigation';

const style = {
  width: '680px',
  maxWidth: window.innerWidth,
};

const Navigation = () => {
  const dispatch = useDispatch();
  const nav = useSelector((state) => state.navigationReducer);

  return (
    <>
      <Drawer
        anchor="right"
        open={nav.screen1.open}
        onClose={() => dispatch(toggleScreen1({ open: false }))}
      >
        <div style={style}></div>
      </Drawer>

      <Drawer
        anchor="right"
        open={nav.screen2.open}
        onClose={() => dispatch(toggleScreen2({ open: false }))}
      >
        <div style={style}></div>
      </Drawer>

      <Drawer
        anchor="right"
        open={nav.screen3.open}
        onClose={() => dispatch(toggleScreen3({ open: false }))}
      >
        <div style={style}></div>
      </Drawer>
    </>
  );
};

export default Navigation;
