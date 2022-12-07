import { useEffect, useState } from 'react';
import { getAllProviders } from '../../../services';
import RadioButtonsGroup from '../../molecules/RadioButtonsGroup';

type Provider = {
  id: number;
  provider: string;
};

function ProviderSelector() {
  const [providers, setProvider] = useState<{ value: string; label: string }[]>();
  const [choseProvider, setChoseProvider] = useState<string>('All');

  const radioProviderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoseProvider(event.target.value);
  };

  useEffect(() => {
    getAllProviders().then(
      (response) => {
        setProvider(
          response.data.map((item: Provider) => ({
            value: item.id,
            label: item.provider
          }))
        );
      },
      (error) => {
        console.log(error);
        setProvider([]);
      }
    );
  });

  if (!providers) {
    return null;
  }

  return (
    <>
      <RadioButtonsGroup name="Providers" options={providers} />;
    </>
  );
}

export default ProviderSelector;
