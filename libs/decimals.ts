import { BigNumber } from 'ethers';

const ERC20_DECIMALS = 18;
const decimalMultiplier = BigNumber.from(10).pow(BigNumber.from(ERC20_DECIMALS));

export const toBigNumERC20 = (value: string) => BigNumber.from(value).mul(decimalMultiplier)

export const fromBigNumERC20 = (value: BigNumber) => BigNumber.from(value).div(decimalMultiplier)