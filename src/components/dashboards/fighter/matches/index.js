/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { getUserMatches } from 'api/user';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const getMatchDuration = duration => {
  return moment.utc(parseInt(duration) * 1000).format('mm:ss');
};

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const Matches = ({ academyId }) => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const columns = [
    {
      accessor: 'participants',
      Header: t('matchesColumns.column2'),
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
      Header: t('matchesColumns.column3'),
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
            {duration && ` / ${getMatchDuration(duration)}`}
          </>
        );
      }
    },
    {
      accessor: 'date',
      Header: t('matchesColumns.column4'),
      Cell: rowData => {
        const { matchDatetime } = rowData.row.original;
        return (
          <>{matchDatetime && moment(matchDatetime).format('MM-DD-YYYY')}</>
        );
      }
    },
    {
      accessor: 'action',
      Header: t('matchesColumns.column5'),
      Cell: rowData => {
        const { matchId, matchEndtime, academy } = rowData.row.original;
        return (
          <>
            {matchEndtime ? (
              <Link
                className="btn-view"
                to={`/dashboard/match-result/${academy.id}/${matchId}`}
              >
                <FontAwesomeIcon icon={['fas', 'eye']} />
              </Link>
            ) : (
              <Link
                className="btn-play"
                to={`/control-match/${academy.id}/${matchId}`}
              >
                <FontAwesomeIcon icon={['fas', 'play']} />
              </Link>
            )}
          </>
        );
      }
    }
  ];
  const { userId } = useParams();
  useEffect(() => {
    (async () => {
      let matches = await getUserMatches(academyId, userId);
      if (matches) {
        matches = matches.filter(match => {
          return match.matchEndtime !== null;
        });
        setData(matches);
      }
    })();
  }, []);
  return (
    <>
      <AdvanceTableWrapper
        columns={columns}
        data={data || []}
        sortable
        pagination
        perPage={10}
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
