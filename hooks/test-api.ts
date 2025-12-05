import { useQuery } from '@tanstack/react-query';

export function useTestAPI() {
  return useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://mocki.io/v1/af291647-fa51-43bc-bc6e-ac8508b7b0b5').then((res) => res.json()),
  });
}
