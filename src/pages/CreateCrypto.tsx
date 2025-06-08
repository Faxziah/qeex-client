import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import ERC20 from '../../public/contracts/ERC20/Token.json';

const CreateCrypto: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask не установлен');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const factory = new ethers.ContractFactory(
        ERC20.abi,
        ERC20.bytecode,
        signer
      );

      const contract = await factory.deploy(
        name,
        symbol,
        ethers.parseEther(totalSupply)
      );

      await contract.waitForDeployment();
      const address = await contract.getAddress();
      
      navigate(`/contracts/${address}`);
    } catch (err) {
      console.error('Error deploying contract:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при создании контракта');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Создать криптовалюту
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Название"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Символ"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Общее количество токенов"
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
              margin="normal"
              required
              type="number"
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Создание...' : 'Создать криптовалюту'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateCrypto; 