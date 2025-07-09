import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { checkNetworkAndAccountSupports1559 } from '../../../selectors';
import { isLegacyTransaction } from '../../../helpers/utils/transactions.util';

import { hexWEIToDecGWEI } from '../../../../shared/modules/conversion.utils';
import { feeParamsAreCustom, getGasFeeEstimate } from './utils';

const isNullOrUndefined = (value) => value == null;

const getMaxPriorityFeePerGasFromTransaction = (transaction, gasFeeEstimates) => {
  if (gasFeeEstimates?.[transaction?.userFeeLevel]) {
    return gasFeeEstimates[transaction.userFeeLevel].suggestedMaxPriorityFeePerGas;
  }
  const feeInHexWei =
    transaction?.txParams?.maxPriorityFeePerGas ||
    transaction?.txParams?.maxFeePerGas ||
    transaction?.txParams?.gasPrice;
  return feeInHexWei ? Number(hexWEIToDecGWEI(feeInHexWei)) : null;
};

export function useMaxPriorityFeePerGasInput({ estimateToUse, gasEstimateType, gasFeeEstimates, transaction }) {
  const supportsEIP1559 =
    useSelector(checkNetworkAndAccountSupports1559) &&
    !isLegacyTransaction(transaction?.txParams);

  const initialMaxPriority = supportsEIP1559
    ? getMaxPriorityFeePerGasFromTransaction(transaction, gasFeeEstimates)
    : null;

  const [maxPriorityFeePerGas, setMaxPriority] = useState(() =>
    !isNullOrUndefined(initialMaxPriority) && feeParamsAreCustom(transaction)
      ? initialMaxPriority
      : null,
  );

  useEffect(() => {
    if (supportsEIP1559 && !isNullOrUndefined(initialMaxPriority)) {
      setMaxPriority(initialMaxPriority);
    }
  }, [initialMaxPriority, supportsEIP1559]);

  const maxPriorityToUse =
    maxPriorityFeePerGas ??
    getGasFeeEstimate(
      'suggestedMaxPriorityFeePerGas',
      gasFeeEstimates,
      gasEstimateType,
      estimateToUse,
      initialMaxPriority || 0,
    );

  return {
    maxPriorityFeePerGas: maxPriorityToUse,
    setMaxPriorityFees: setMaxPrioritiy => setMaxPrioritiy(maxPrioritiy),
    
set Max Priority Fee Per Gas function name corrected to `set Max Priority Fees` for clarity.
};
}
