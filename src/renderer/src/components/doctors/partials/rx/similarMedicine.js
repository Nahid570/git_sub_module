import React, { useState, useEffect, memo } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { useGetRequest } from '../../../../hooks/useGetRequest';

const SimilarMedicine = ({ item, handleSelectedMedicine }) => {
  const [similarMedicines, setSimilarMedicines] = useState([]);
  const [similarMedicineInSearch, setSimilarMedicineInSearch] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (item?.genericName && item?.type) {
      console.log(item?.genericName, 'item?.genericName');
      getSimilarMedicineList();
    }
  }, []);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const {
    isLoading: isLoading,
    refetch: getSimilarMedicineList,
  } = useGetRequest(
    `getSimilarMedicineList`,
    `medicines/similar-medicines?genericName=${item?.genericName}&type=${item?.type}&strength=${item?.strength}`,
    (data) => {
      setSimilarMedicines(data.data);
      setSimilarMedicineInSearch(data.data);
    },
    (e) => {
      console.log(e);
    },
  );

  const medicineList = () => {
    return similarMedicineInSearch?.map((medicine, index) => {
      return (
        <div
          key={index}
          className={medicine.id === item.id && 'selected-similar-medicine'}
          onClick={() =>
            handleSelectedMedicine('similarMedicine', item.id, medicine)
          }
        >
          <span>
            {medicine?.brandName}{' '}
            {medicine.strength ? ` (${medicine.strength})` : ''}
          </span>
          <span>{medicine.companyName}</span>
        </div>
      );
    });
  };

  const handleSearch = (query) => {
    const result = similarMedicines.filter((item) => {
      return (
        item?.companyName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setSimilarMedicineInSearch([...result]);
  };

  return (
    <>
      <InputGroup size="sm" className="mb-2">
        <InputGroup.Text id="inputGroup-sizing-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="12"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 14 14"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          className="search-field"
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      <div className="list">{medicineList()}</div>
    </>
  );
};

export default memo(SimilarMedicine);
