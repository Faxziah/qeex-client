import { compile } from 'solc';
import * as fs from 'fs';
import * as path from 'path';

const contractPath = path.join(__dirname, '../public/contracts/ERC20/ERC20.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'ERC20.sol': {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(compile(JSON.stringify(input)));

if (output.errors) {
  console.error('Compilation errors:', output.errors);
  process.exit(1);
}

const contract = output.contracts['ERC20.sol']['ERC20'];

const artifact = {
  abi: contract.abi,
  bytecode: contract.evm.bytecode.object,
};

fs.writeFileSync(
  path.join(__dirname, '../public/contracts/ERC20/ERC20.json'),
  JSON.stringify(artifact, null, 2)
);

console.log('Contract compiled successfully!'); 