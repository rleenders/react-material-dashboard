import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  // makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import api from 'src/api/codingApi';
import Filters from './Filters';
import SalesModal from './SalesModal';
import SalesTable from './SalesTable';

const VideoGameSalesView = () => {
  const [publisher, setPublisher] = useState();
  const [genre, setGenre] = useState();
  const [platform, setPlatform] = useState();
  const [page, setPage] = useState(0);
  const [sales, setSales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const params = {};
    if (publisher) {
      params.publisher = publisher;
    }
    if (genre) {
      params.genre = genre;
    }
    if (platform) {
      params.platform = platform;
    }
    if (page > 0) {
      params.page = page + 1;
    }
    api.getSales(params).then((data) => setSales(data));
  }, [publisher, genre, platform, page]);

  function setFilter(value, target) {
    console.log(value, target);
    switch (target) {
      case 'publisher':
        setPublisher(value);
        setPage(0);
        break;
      case 'genre':
        setGenre(value);
        setPage(0);
        break;
      case 'platform':
        setPlatform(value);
        setPage(0);
        break;
      default:
        break;
    }
  }

  function showDetails(id) {
    setModalData(sales[id]);
    setModalOpen(true);
  }

  return (
    <Page title="Video Game Sales">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <SalesModal
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
              data={modalData}
            />
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <Filters
                genre={genre}
                platform={platform}
                setFilter={setFilter}
              />
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box>
              <SalesTable
                sales={sales}
                showDetails={showDetails}
                handlePageChange={handlePageChange}
                page={page}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default VideoGameSalesView;
