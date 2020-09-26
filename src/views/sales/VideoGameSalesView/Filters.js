import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  Select,
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import api from 'src/api/codingApi';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Filters({
  genre,
  platform,
  setFilter,
}) {
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (publishers.length === 0) {
      api.getPublishers().then((data) => {
        setPublishers(data);
      });
    }
    if (genres.length === 0) {
      api.getGenres().then((data) => {
        setGenres(data);
      });
    }
    if (platforms.length === 0) {
      api.getPlatforms().then((data) => {
        setPlatforms(data);
      });
    }
  });

  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <Box>
            <FormControl className={classes.formControl}>
              <Autocomplete
                options={publishers}
                getOptionLabel={(item) => item}
                style={{ width: 300 }}
                blurOnSelect
                onChange={(event, value) => setFilter(value, 'publisher')}
                renderInput={(params) => <TextField {...params} label="Publishers" />}
              />

            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Genres</InputLabel>
              <Select
                value={genre}
                onChange={(event) => setFilter(event.target.value, 'genre')}
              >
                <MenuItem value={undefined}>All</MenuItem>
                {
                  genres.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Platforms</InputLabel>
              <Select
                value={platform}
                onChange={(event) => setFilter(event.target.value, 'platform')}
              >
                <MenuItem value={undefined}>All</MenuItem>
                {
                  platforms.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

Filters.propTypes = {
  genre: PropTypes.string,
  platform: PropTypes.string,
  setFilter: PropTypes.func,
};
