import { useEffect, useState } from 'react';
import { getAllCategories } from '../../../services';
import RadioButtonsGroup from '../../molecules/RadioButtonsGroup';

type Category = {
  category: string;
};

function CategoriesList() {
  const [categories, setCategory] = useState<{ value: string; label: string }[]>();
  const [choseCategory, setChoseCategory] = useState<string>('All');

  const radioCategoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoseCategory(event.target.value);
  };

  useEffect(() => {
    getAllCategories().then(
      (response) => {
        setCategory(
          response.data.map((item: Category) => ({
            value: item.category,
            label: item.category
          }))
        );
      },
      (error) => {
        console.log(error);

        setCategory([]);
      }
    );
  }, []);

  if (!categories) {
    return null;
  } else {
    return <RadioButtonsGroup name="Categories" options={categories} />;
  }
}

export default CategoriesList;
