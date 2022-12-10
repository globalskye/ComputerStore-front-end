import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { selectedCategoriesState } from '../../../atoms';
import { getAllCategories } from '../../../services';
import { Category } from '../../../types/category';

function CategoriesList() {
  const [categories, setCategory] = useState<Category[]>();
  const [selectedCategories, setSelectedCategories] = useRecoilState(selectedCategoriesState);

  useEffect(() => {
    getAllCategories().then(
      (response) => {
        setCategory(response.data);
      },
      (error) => {
        console.log(error);

        setCategory([]);
      }
    );
  }, []);

  const handleChange = (category: Category) => {
    if (selectedCategories.find((i) => i.id === category.id)) {
      setSelectedCategories((prev) => prev.filter((i) => i.id !== category.id));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  if (!categories) {
    return null;
  }

  return (
    <FormControl>
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox
                checked={!!selectedCategories.find((i) => i.id === category.id)}
                onChange={() => handleChange(category)}
                name={category.category}
              />
            }
            label={category.category}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default CategoriesList;
