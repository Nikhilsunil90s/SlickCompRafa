/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { useGetMatchesQuery } from 'api/match';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableSearch from '../../../components/pages/table-search-box/TableSearch';

const getMatchDuration = duration => {
  return moment.utc(parseInt(duration) * 1000).format('mm:ss');
};

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const Matches = ({ academyId }) => {
  const [FilterData,setData] =useState([])
  const { t } = useTranslation();
  const columns = [
    {
      accessor: 'matchId',
      Header: t('matchesColumns.column1')
    },
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
        const { matchId, matchEndtime } = rowData.row.original;
        return (
          <>
            {matchEndtime ? (
              <Link
                className="btn-view"
                to={`/dashboard/match-result/${academyId}/${matchId}`}
              >
                <FontAwesomeIcon icon={['fas', 'eye']} />
              </Link>
            ) : (
              <Link
                className="btn-play"
                to={`/control-match/${academyId}/${matchId}`}
              >
                <FontAwesomeIcon icon={['fas', 'play']} />
              </Link>
            )}
          </>
        );
      }
    }
  ];
  // const [data, setData] = useState([]);
  const { data, error, isLoading } = useGetMatchesQuery(academyId, {
    refetchOnMountOrArgChange: true
  });
  
useEffect(()=>{
if(!data)return
setData(data)
},[data])
  const { userId } = useParams();
  // useEffect(() => {
  //   if (!matches.length) {
  //     (async () => {
  //       const matches = await getMatches(academyId);
  //       if (userId) {
  //         const userMatches = matches.filter(match => {
  //           return (
  //             (match.participant1.id == userId ||
  //               match.participant2.id == userId) &&
  //             match.matchEndtime !== null
  //           );
  //         });
  //         setData(userMatches);
  //       } else {
  //         setData(matches);
  //       }
  //     })();
  //   }
  // }, []);
  return (
    <>
    <TableSearch Data={data} setData={setData} type="matches" />
      <AdvanceTableWrapper
        columns={columns}
        data={FilterData || []}
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
            rowCount={FilterData ? FilterData.length : 0}
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
