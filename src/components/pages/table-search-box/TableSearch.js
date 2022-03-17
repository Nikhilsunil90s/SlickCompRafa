import React, { Fragment, useEffect, useState } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCloseButton from 'components/common/FalconCloseButton';
import moment from 'moment';

const TableSearch = ({ Data, setData, type }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const filterFun = async (value) => {
    let arr = [];
    Data.map((el, ind) => {
    
      if(type==="matches"){
      if (JSON.stringify(el)
      .toLocaleLowerCase()
      .includes(value.toLocaleLowerCase())||
        moment(el.matchDatetime).format('MM-DD-YYYY').includes(value)
      ) {
        console.log(JSON.stringify(el).includes(value));
        arr.push(el);
      }}
      else{
        if (JSON.stringify(el)
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase())
        ) {
          console.log(JSON.stringify(el).includes(value));
          arr.push(el);
        }
      }
    });
    await setData(arr);
  };
  const search = async target => {
    await setSearchInputValue(target.value);
    await filterFun(target.value);
  };
  return (
    <Form className="position-relative search-box">
      <Form.Control
        type="search"
        placeholder="Search..."
        aria-label="Search"
        className="rounded-pill search-input"
        value={searchInputValue}
        onChange={({ target }) => {
          search(target);
        }}
        // onClick={() => setDropdownOpen(false)}
      />
      <FontAwesomeIcon
        icon="search"
        className="position-absolute text-400 search-box-icon"
      />
      {searchInputValue && (
        <div
          className="position-absolute"
          style={{ right: '10px', top: '8px' }}
        >
          <FalconCloseButton
            size="sm"
            noOutline
            onClick={() => {
              setSearchInputValue('');
            }}
          />
        </div>
      )}
    </Form>
  );
};
export default TableSearch;
