import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@material-ui/core';

import Notes from '../Notes';
import Owners from '../Owners';
import OwnerEdit from '../OwnerEdit';
import OwnerShow from '../OwnerShow';
import OwnerVehicles from '../OwnerVehicles';
import Seo from '../Site/Seo';
import Units from '../Site/Units';
import UnitEdit from '../Site/UnitEdit';
import Logo from '../Site/Logo';
import Domain from '../Site/Domain';

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
        <div style={style}>
          {nav.screen1.type === 'owners' && (
            <Owners type={nav.screen1.type} props={nav.screen1.props} />
          )}
          {nav.screen1.type === 'seo' && <Seo />}
          {nav.screen1.type === 'units' && <Units />}
          {nav.screen1.type === 'logo' && <Logo />}
          {nav.screen1.type === 'domain' && <Domain />}
        </div>
      </Drawer>

      <Drawer
        anchor="right"
        open={nav.screen2.open}
        onClose={() => dispatch(toggleScreen2({ open: false }))}
      >
        <div style={style}>
          {nav.screen2.type === 'owner-edit' && (
            <OwnerEdit uid={nav.screen2.props.uid} props={nav.screen2.props} />
          )}

          {nav.screen2.type === 'owner-show' && (
            <OwnerShow item={nav.screen2.props.item} />
          )}

          {nav.screen2.type === 'owner-vehicles' && (
            <OwnerVehicles uid={nav.screen2.props.uid} />
          )}

          {nav.screen2.type === 'unit-edit' && (
            <UnitEdit uid={nav.screen2.props.uid} />
          )}
        </div>
      </Drawer>

      <Drawer
        anchor="right"
        open={nav.screen3.open}
        onClose={() => dispatch(toggleScreen3({ open: false }))}
      >
        <div style={style}>
          {nav.screen3.type === 'notes' && (
            <Notes
              uid={nav.screen3.props.uid}
              type={nav.screen3.props.type}
              props={nav.screen3.props}
            />
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navigation;
