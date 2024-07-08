import { createContext, useEffect, useState } from "react";
import { Car } from "../../types/car";
import { CarItem } from "../car-item/car-item";
import { Filters } from "../filters/filters";
import styles from "./car-list.module.scss";

interface CarContextProps {
  handleDeleteCar: (id: number) => void;
  handleEditCar: (updatedCar: Car) => void;
  cars: Car[];
  setCars: (cars: Car[]) => void;
}

export const CarContext = createContext<CarContextProps>({
  handleDeleteCar: () => {},
  handleEditCar: () => {},
  cars: [],
  setCars: () => {},
});

export const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // const initialCars: Car[] = [
  //   {
  //     id: 1,
  //     name: "Toyota",
  //     model: "Corolla",
  //     year: 2021,
  //     color: "Black",
  //     price: 25000,
  //     latitude: 55.753215,
  //     longitude: 37.620393,
  //   },
  //   {
  //     id: 2,
  //     name: "Honda",
  //     model: "Civic",
  //     year: 2020,
  //     color: "White",
  //     price: 22000,
  //     latitude: 0,
  //     longitude: 0,
  //   },
  //   {
  //     id: 3,
  //     name: "Ford",
  //     model: "Mustang",
  //     year: 2019,
  //     color: "Red",
  //     price: 35000,
  //     latitude: 0,
  //     longitude: 0,
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetch('/api/cars');
        const response = await fetch('https://test.tspb.su/test-task/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCars(data);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  const handleDeleteCar = (id: number) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const handleEditCar = (updatedCar: Car) => {
    setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
  };

  return (
    <CarContext.Provider
      value={{ handleDeleteCar, handleEditCar, cars, setCars }}
    >
      <Filters />
      <ul className={styles["car-list"]}>
        {cars.map((car) => (
          <CarItem key={car.id} car={car} />
        ))}
      </ul>
    </CarContext.Provider>
  );
};
