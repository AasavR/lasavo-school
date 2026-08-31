// P2PPro Multi-Chain Wallet Service

export const WALLET_TYPES = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', desc: 'EVM Chains (Ethereum, Arbitrum, Base, Polygon, AVAX)', supported: ['ethereum', 'arbitrum', 'base', 'polygon', 'avalanche'] },
  { id: 'phantom', name: 'Phantom', icon: '👻', desc: 'Solana Network & EVM Multi-Chain', supported: ['solana', 'ethereum', 'polygon', 'base'] },
  { id: 'walletconnect', name: 'WalletConnect v2', icon: '🔗', desc: 'Mobile Wallets & Hardware Keypairs', supported: ['ethereum', 'arbitrum', 'base', 'polygon', 'solana', 'avalanche'] },
  { id: 'okx', name: 'OKX Web3 Wallet', icon: '⬛', desc: 'Multi-Chain & Bitcoin Ordinals/Runes/Sui', supported: ['ethereum', 'solana', 'sui', 'arbitrum', 'base'] },
  { id: 'ledger', name: 'Ledger Enterprise', icon: '🛡️', desc: 'Hardware Vault Keypair for Institutional RWAs', supported: ['ethereum', 'solana', 'arbitrum', 'polygon', 'base', 'avalanche', 'sui'] }
];

export function generateMockAddress(walletType, chainId) {
  if (chainId === 'solana') {
    return 'P2P7x89' + Math.random().toString(36).substring(2, 8).toUpperCase() + 'w9kL';
  } else if (chainId === 'sui') {
    return '0xsui' + Math.random().toString(36).substring(2, 10) + '99a';
  } else {
    return '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  }
}

export function formatAddress(address) {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
