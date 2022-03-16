/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { getUsers } from 'api/user';
import { connect } from 'react-redux';

const columns = [
  {
    accessor: 'id',
    Header: 'User Id'
  },
  {
    accessor: 'name',
    Header: 'Name'
  },
  {
    accessor: 'email',
    Header: 'Email'
  },
  {
    accessor: 'country',
    Header: 'Country'
  }
];

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const Users = ({ academyId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const users = await getUsers(academyId);
      setData(users);
    })();
  }, []);
  return (
    <>
      <AdvanceTableWrapper
        columns={columns}
        data={data || []}
        sortable
        pagination
        perPage={5}
      >
        <AdvanceTable
          table
          headerClassName="bg-200 text-900 text-nowrap align-middle"
          rowClassName="align-middle white-space-nowrap"
          tableProps={{
            bordered: true,
            striped: true,
            className: 'fs--1 mb-0 overflow-hidden'
          }}
        />
        <div className="mt-3">
          <AdvanceTableFooter
            rowCount={data ? data.length : 0}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
          />
        </div>
      </AdvanceTableWrapper>
    </>
  );
};
export default connect(mapStateToProp)(Users);
