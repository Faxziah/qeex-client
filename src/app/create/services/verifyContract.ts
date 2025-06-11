import { ContractsType } from "@/app/interface/IContract";

export async function verify({
  contractTypeId,
  contractAddress,
  chainId,
  constructorArgs,
}: {
  contractTypeId: ContractsType;
  contractAddress: string;
  chainId: number,
  constructorArgs: { type: string, value: any }[];
}) {
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractTypeId,
        contractAddress,
        chainId,
        constructorArgs,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
}