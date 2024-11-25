import MealItem from './MealItem';
import Error from './Error';
import useHttp from '../hooks/useHttp';

// this is outside of the Meals function to prevent infinite loop when that plain object
// would be recreated on each Meals function call
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  // debug
  // console.log(loadedMeals);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
