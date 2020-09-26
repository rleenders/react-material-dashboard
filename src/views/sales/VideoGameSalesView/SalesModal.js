import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Modal,
  makeStyles,
} from '@material-ui/core';
import SalesByRegion from './Charts/SalesByRegion';
import SalesByPlatform from './Charts/SalesByPlatform';

const useStyles = makeStyles(() => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 'auto',
  },
  header: {
    textAlign: 'center'
  }
}));

export default function SalesModal({ modalOpen, setModalOpen, data }) {
  const classes = useStyles();

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Card className={classes.modal}>
        <CardHeader className={classes.header} title={`${data.name} Sales Details`} titleTypographyProps={{ variant: 'h2' }} />
        <Divider />
        <CardContent>
          <Box display="flex">
            <SalesByRegion data={data} />
            <SalesByPlatform data={data} modalOpen={modalOpen} />
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
}

SalesModal.propTypes = {
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  data: PropTypes.object
};
