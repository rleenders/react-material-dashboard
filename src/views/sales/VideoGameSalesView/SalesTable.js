import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';

const SalesTable = ({
  sales,
  showDetails,
  handlePageChange,
  page
}) => {
  // Some funky calculations to get pagination to work
  // with the default TablePagination Component
  const count = sales.length < 20 ? (page + 1) * 20 : (page + 1) * 20 + 1;
  return (
    <Card>
      <CardContent>
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Rank
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Platform
                  </TableCell>
                  <TableCell>
                    Year
                  </TableCell>
                  <TableCell>
                    Genre
                  </TableCell>
                  <TableCell>
                    Publisher
                  </TableCell>
                  <TableCell>
                    Global Sales
                  </TableCell>
                  <TableCell>
                    View Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sale, index) => (
                  <TableRow
                    hover
                    key={sale.name + sale.platform}
                  >
                    <TableCell>
                      {sale.rank}
                    </TableCell>
                    <TableCell>
                      {sale.name}
                    </TableCell>
                    <TableCell>
                      {sale.platform}
                    </TableCell>
                    <TableCell>
                      {sale.year}
                    </TableCell>
                    <TableCell>
                      {sale.genre}
                    </TableCell>
                    <TableCell>
                      {sale.publisher}
                    </TableCell>
                    <TableCell>
                      {sale.global_sales}
                      M
                    </TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => showDetails(index)}>Show Sales Breakdown</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={count}
          onChangePage={handlePageChange}
          page={page}
          rowsPerPage={20}
          rowsPerPageOptions={[20]}
        />
      </CardContent>
    </Card>
  );
};

SalesTable.propTypes = {
  sales: PropTypes.array.isRequired,
  showDetails: PropTypes.func,
  handlePageChange: PropTypes.func,
  page: PropTypes.number,
};

export default SalesTable;
