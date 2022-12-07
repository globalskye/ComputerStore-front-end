import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { selectedProvidersState } from '../../../atoms';
import { getAllProviders } from '../../../services';
import { Provider } from '../../../types/Provider';

function ProviderSelector() {
  const [providers, setProvider] = useState<Provider[]>();
  const [selectedProviders, setSelectedProviders] = useRecoilState(selectedProvidersState);

  useEffect(() => {
    getAllProviders().then(
      (response) => {
        setProvider(response.data);
      },
      (error) => {
        setProvider([]);
      }
    );
  }, []);

  const handleChange = (provider: Provider) => {
    if (selectedProviders.find((i) => i.id === provider.id)) {
      setSelectedProviders((prev) => prev.filter((i) => i.id !== provider.id));
    } else {
      setSelectedProviders((prev) => [...prev, provider]);
    }
  };

  if (!providers) {
    return null;
  }

  return (
    <FormControl>
      <FormLabel component="legend">Providers</FormLabel>
      <FormGroup>
        {providers.map((provider) => (
          <FormControlLabel
            key={provider.id}
            control={
              <Checkbox
                checked={!!selectedProviders.find((i) => i.id === provider.id)}
                onChange={() => handleChange(provider)}
                name={provider.provider}
              />
            }
            label={provider.provider}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default ProviderSelector;
