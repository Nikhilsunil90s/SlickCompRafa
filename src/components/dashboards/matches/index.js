/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { getMatches } from 'api/match';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const columns = [
  {
    accessor: 'matchId',
    Header: 'Match Id'
  },
  {
    accessor: 'participants',
    Header: 'Participants',
    Cell: rowData => {
      const { participant1, participant2 } = rowData.row.original;
      return (
        <>
          {participant1.name} VS {participant2.name}
        </>
      );
    }
  },
  {
    accessor: 'details',
    Header: 'Details',
    Cell: rowData => {
      const { matchType, matchGender, giNogi, seniority, weight, duration } =
        rowData.row.original;
      return (
        <>
          {matchType}
          {matchGender && ` / ${matchGender}`}
          {(giNogi || giNogi === 0) && ` / ${giNogi === 1 ? 'Gi' : 'NoGi'}`}
          {seniority && ` / ${seniority}`}
          {weight && ` / ${weight}`}
          {duration && ` / ${duration}`}
        </>
      );
    }
  },
  {
    accessor: 'action',
    Header: 'Action',
    Cell: rowData => {
      const { matchId, matchEndtime, academyId } = rowData.row.original;
      return (
        <>
          {matchEndtime ? (
            <Link to={`/dashboard/match-result/${academyId}/${matchId}`}>
              See Results
            </Link>
          ) : (
            <Link to={`/control-match/${academyId}/${matchId}`}>Start</Link>
          )}
        </>
      );
    }
  }
];

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const Matches = ({ academyId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const matches = await getMatches(academyId);
      setData(matches);
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
export default connect(mapStateToProp)(Matches);
