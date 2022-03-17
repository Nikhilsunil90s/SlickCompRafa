/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { getUsers } from 'api/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import TableSearch from '../../../components/pages/table-search-box/TableSearch';

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const Users = ({ academyId }) => {
  const { t } = useTranslation();
  const columns = [
    {
      accessor: 'id',
      Header: t('usersColumns.column1')
    },
    {
      accessor: 'name',
      Header: t('usersColumns.column2')
    },
    {
      accessor: 'email',
      Header: t('usersColumns.column3')
    },
    {
      accessor: 'country',
      Header: t('usersColumns.column4'),
      Cell: rowData => {
        const { country } = rowData.row.original;
        return (
          <div className="d-flex">
            <ReactCountryFlag
              countryCode={country}
              style={{ width: '25px', height: 'auto' }}
              svg
            />
          </div>
        );
      }
    },
    {
      accessor: 'action',
      Header: t('matchesColumns.column5'),
      Cell: rowData => {
        const { uuid } = rowData.row.original;
        return (
          <div className="d-flex">
            <Link className="btn-view" to={`/dashboard/user/view/${uuid}`}>
              <FontAwesomeIcon icon={['fas', 'eye']} />
            </Link>
            {/* <Link className="btn-view" to={`/dashboard/user/edit/${uuid}`}> */}
            {/*   <FontAwesomeIcon icon={['fas', 'pencil-alt']} /> */}
            {/* </Link> */}
          </div>
        );
      }
    }
  ];
  const [data, setData] = useState([]);
  const [mapData, setMapData] = useState([]);
 useEffect(()=>{
   (async()=>{
    const users = await  getUsers(academyId);
    await setData(users)  
    await setMapData(users)
   })();
 },[])
  useEffect(() => {
    if(!mapData)return
    (async () => {
      await setMapData(mapData);
    })();
  }, [mapData]);

  return (
    <>
     <TableSearch Data={data} setData={setMapData} />   
      <AdvanceTableWrapper
        columns={columns}
        data={mapData || []}
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
            rowCount={mapData ? mapData.length : 0}
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
