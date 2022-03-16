/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import Section from 'components/common/Section';
import getMatches from 'api/match/get-matches';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const getMatchDuration = duration => {
  return moment.utc(parseInt(duration) * 1000).format('mm:ss');
};
const LastMatches = ({ academyId }) => {
  const [data, setData] = useState(null);
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
        const { matchId, matchEndtime, academyId } = rowData.row.original;
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

  useEffect(() => {
    (async () => {
      let matches = await getMatches(academyId);
      if (matches) {
        matches = matches.slice(0, 5);
        setData(matches);
      }
    })();
  }, []);

  return (
    <div className="profile-holder">
      <div className="section-header">
        <h1>{t('matchesHeader.lastMatches')}</h1>
        <Link className="btn-all" to={`/dashboard/matches`}>
          {t('matchesHeader.seeAll')}{' '}
          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
        </Link>
      </div>
      <Section bg="light" className="py-0 profile matches">
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
        </AdvanceTableWrapper>
      </Section>
    </div>
  );
};

export default LastMatches;
