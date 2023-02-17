import {useContext} from 'react';

import { NetworkContext } from './NetworkProvider';

const useNetworkProvider = () => {
  return useContext(NetworkContext)
}

export default useNetworkProvider;
