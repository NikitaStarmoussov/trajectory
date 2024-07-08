import React, { useContext, useState } from "react";
import { CarContext } from "../car-list/car-list";
import Select, { OnChangeValue } from "react-select";
import styles from "./filters.module.scss";

export const Filters: React.FC = () => {
  const defaultOption = { value: "asc", label: "Ascending" };

  const options: Option[] = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  type Option = {
    value: string;
    label: string;
  };

  const [selectedYearOrder, setSelectedYearOrder] = useState(defaultOption);
  const [selectedPriceOrder, setSelectedPriceOrder] = useState(defaultOption);

  const { cars, setCars } = useContext(CarContext);
  const handleYearOrderChange = (
    selected: OnChangeValue<{ value: string; label: string }, boolean>,
  ) => {
    if (selectedYearOrder.value !== (selected as Option).value) {
      setSelectedPriceOrder(defaultOption);
    }
    setSelectedYearOrder({ ...(selected as Option) });
    const sortedCars = [...cars];
    if (selectedYearOrder.value === "asc") {
      sortedCars.sort((a, b) => a.year - b.year);
    } else {
      sortedCars.sort((a, b) => b.year - a.year);
    }

    setCars(sortedCars);
  };

  const handlePriceOrderChange = (
    selected: OnChangeValue<{ value: string; label: string }, boolean>,
  ) => {
    if (selectedPriceOrder.value !== (selected as Option).value) {
      setSelectedYearOrder(defaultOption);
    }
    setSelectedPriceOrder({ ...(selected as Option) });
    const sortedCars = [...cars];
    if (selectedPriceOrder.value === "asc") {
      sortedCars.sort((a, b) => a.price - b.price);
    } else {
      sortedCars.sort((a, b) => b.price - a.price);
    }

    setCars(sortedCars);
  };

  const getYearValue = () => {
    return selectedYearOrder;
  };

  const getPriceValue = () => {
    return selectedPriceOrder;
  };

  return (
    <section className={styles["filters"]}>
      <fieldset>
        <legend>Sort by Year:</legend>
        <Select
          className={styles["filters-select"]}
          isSearchable={false}
          options={options}
          value={getYearValue()}
          onChange={handleYearOrderChange}
        />
      </fieldset>
      <fieldset>
        <legend>Sort by Price:</legend>
        <Select
          className={styles["filters-select"]}
          isSearchable={false}
          options={options}
          value={getPriceValue()}
          onChange={handlePriceOrderChange}
        />
      </fieldset>
    </section>
  );
};
