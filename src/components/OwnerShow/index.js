import { useDispatch } from 'react-redux';
import { MdKeyboardBackspace } from 'react-icons/md';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { toggleScreen2 } from '../../store/actions/navigation';

const OwnerShow = ({ item }) => {
  const dispatch = useDispatch();
  const owner = item || {};

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            onClick={() => dispatch(toggleScreen2({ open: false }))}
            edge="start"
            color="inherit"
          >
            <MdKeyboardBackspace />
          </IconButton>

          <Typography variant="h6" color="inherit">
            {owner.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="scroll">
        <div className="card-body">
          <div className="d-flex align-items-center pb-4 pt-4">
            <Avatar style={{ width: 80, height: 80 }} className="bg-primary">
              <h1 className="m-0">{owner.name[0]}</h1>
            </Avatar>
            <h4 className="ml-4">{owner.name}</h4>
          </div>

          <Divider className="mt-4 mb-4" />

          {owner.phone && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                TELEFONE
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.phone}
              </Typography>
            </>
          )}

          {owner.phone2 && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                TELEFONE 2
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.phone2}
              </Typography>
            </>
          )}

          {owner.phone3 && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                TELEFONE 3
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.phone3}
              </Typography>
            </>
          )}

          {owner.email && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                EMAIL
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.email}
              </Typography>
            </>
          )}

          <Divider className="mt-2 mb-4" />

          {owner.name && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                NOME
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.name}
              </Typography>
            </>
          )}

          {owner.cpf && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                CPF
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.cpf}
              </Typography>
            </>
          )}

          {owner.rg && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                RG
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.rg}
              </Typography>
            </>
          )}

          {owner.cnpj && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                CNPJ
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.cnpj}
              </Typography>
            </>
          )}

          {owner.ie && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                INSCR. ESTADUAL
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {owner.ie}
              </Typography>
            </>
          )}

          {owner.birth && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                NASCIMENTO
              </Typography>

              <Typography className="font-weight-bold mb-2" component="h6">
                {format(zonedTimeToUtc(owner.birth), 'dd/MM/yyyy')}
              </Typography>
            </>
          )}

          <Divider className="mt-2 mb-4" />

          {owner.zipCode && (
            <>
              <Typography
                className="font-weight-bold"
                variant="caption"
                color="textSecondary"
              >
                ENDEREÇO
              </Typography>

              <address className="h6">
                {owner.street && (
                  <>
                    {' '}
                    {owner.street}{' '}
                    {owner.streetNumber && '- ' + owner.streetNumber} <br />
                  </>
                )}
                {owner.neighborhood && <> {owner.neighborhood} - </>}
                {owner.city && (
                  <>
                    {owner.city} {owner.uf && '/' + owner.uf}, {owner.zipCode}
                  </>
                )}
              </address>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OwnerShow;
