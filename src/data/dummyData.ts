export interface UserProfile {
  name: string;
  id: string;
  avatar: string;
}

export interface RecoverableBreakdown {
  probability: 'High' | 'Medium' | 'Low';
  count: number;
  value: number;
  color: string;
}

export interface ActionItem {
  name: string;
  stage: string;
  prob: string;
  phone: string;
}

export interface EarningsHistory {
  date: string;
  client: string;
  uid: string;
  type: string;
  volume: string;
  earnings: string;
  totalEarnings: string;
}

export interface EarningsStats {
  totalUsers: number;
  spotVolume: string;
  futuresVolume: string;
  perpsVolume: string;
}

export interface Earnings {
  total: string;
  credited: string;
  pending: string;
  stats: EarningsStats;
  recoverable: {
    totalAmount: number;
    userCount: number;
    breakdown: RecoverableBreakdown[];
    actionList: ActionItem[];
  };
  history: EarningsHistory[];
}

export interface OnboardingStats {
  kycPending: number;
  bankPending: number;
  depositPending: number;
  purchasePending: number;
  onboarded: number;
}

export interface Birthday {
  name: string;
  date: string;
  phone: string;
}

export interface TradedUser {
  name: string;
  uid: string;
  phone: string;
  volume: string;
}

export interface UserChecklist {
  signup: boolean;
  kyc: boolean;
  bank: boolean;
  deposit: boolean;
  onboarded: boolean;
}

// Client View Data Types
export interface ClientPortfolioItem {
  token: string;
  quantity: string;
  date: string;
  action: 'Deposit' | 'Withdrawal' | 'Transfer';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface OrderHistoryItem {
  pair: string;
  type: 'Buy' | 'Sell';
  price: string;
  amount: string;
  status: 'Filled' | 'Cancelled' | 'Open';
  date: string;
}

export interface MarginHistoryItem {
  date: string;
  amount: string;
  token: string;
  type: 'Pledge' | 'Unpledge';
  status: 'Success' | 'Failed';
}

export interface FuturesOrderItem {
  contract: string;
  type: 'Long' | 'Short';
  leverage: string;
  price: string;
  quantity: string;
  status: 'Open' | 'Filled' | 'Closed';
  date: string;
}

export interface FuturesPositionItem {
  symbol: string;
  side: 'Long' | 'Short';
  leverage: string;
  entryPrice: string;
  markPrice: string;
  pnl: string; // e.g., "+ ₹500" or "- ₹200"
  roe: string;
}

export interface FuturesTradeItem {
  contract: string;
  side: 'Long' | 'Short';
  price: string;
  quantity: string;
  realizedPnl: string;
  date: string;
}

export interface InstaHistoryItem {
  pair: string;
  side: 'Buy' | 'Sell';
  amount: string;
  price: string;
  date: string;
}

export interface ConversionItem {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  date: string;
}

export interface TDSSummaryItem {
  date: string;
  orderId: string;
  tradeValue: string;
  tdsDeducted: string;
}

export interface Holding {
  name: string;
  symbol: string;
  quantity: string;
}

export interface User {
  name: string;
  uid: string;
  phone: string;
  walletBalance: string;
  checks: UserChecklist;
  holdings?: Holding[];
  portfolioHistory?: ClientPortfolioItem[];
  orderHistory?: OrderHistoryItem[];
  marginHistory?: MarginHistoryItem[];
  futuresOrders?: FuturesOrderItem[];
  futuresPositions?: FuturesPositionItem[];
  futuresTrades?: FuturesTradeItem[];
  instaHistory?: InstaHistoryItem[];
  conversionHistory?: ConversionItem[];
  tdsSummary?: TDSSummaryItem[];
}

export interface DashboardData {
  userProfile: UserProfile;
  earnings: Earnings;
  onboardingStats: OnboardingStats;
  birthdays: Birthday[];
  tradedToday: TradedUser[];
  allUsers: User[];
}

export const dummyData: DashboardData = {
  "userProfile": {
    "name": "Lohit Gupta",
    "id": "BP_88291",
    "avatar": "/lohit_profile.png.png"
  },
  "earnings": {
    "total": "₹ 1,24,500",
    "credited": "₹ 1,00,000",
    "pending": "₹ 24,500",
    "stats": {
        "totalUsers": 145,
        "spotVolume": "₹ 1,20,50,000",
        "futuresVolume": "₹ 45,00,000",
        "perpsVolume": "₹ 80,00,000"
    },
    "recoverable": {
      "totalAmount": 47300,
      "userCount": 12,
      "breakdown": [
        { "probability": "High", "count": 5, "value": 25000, "color": "green" },
        { "probability": "Medium", "count": 3, "value": 15000, "color": "yellow" },
        { "probability": "Low", "count": 4, "value": 7300, "color": "red" }
      ],
      "actionList": [
        { "name": "Vihaan Gowda", "stage": "Bank Details", "prob": "High", "phone": "9988776655" },
        { "name": "Sarah Lee", "stage": "KYC", "prob": "Medium", "phone": "9988776655" }
      ]
    },
    "history": [
      { "date": "17 Dec", "client": "Rohan Das", "uid": "DCX_112", "type": "Futures", "volume": "₹ 50,000", "earnings": "₹ 120", "totalEarnings": "₹ 1,450" },
      { "date": "17 Dec", "client": "Priya M", "uid": "DCX_098", "type": "Spot", "volume": "₹ 12,000", "earnings": "₹ 45", "totalEarnings": "₹ 890" },
      { "date": "16 Dec", "client": "Vikram S", "uid": "DCX_554", "type": "US Perps", "volume": "₹ 1,00,000", "earnings": "₹ 250", "totalEarnings": "₹ 5,200" },
      { "date": "16 Dec", "client": "Ankit V", "uid": "DCX_331", "type": "Spot", "volume": "₹ 5,000", "earnings": "₹ 15", "totalEarnings": "₹ 150" },
      { "date": "15 Dec", "client": "Sneha R", "uid": "DCX_222", "type": "Futures", "volume": "₹ 75,000", "earnings": "₹ 180", "totalEarnings": "₹ 3,100" },
    ]
  },
  "onboardingStats": {
    "kycPending": 12,
    "bankPending": 5,
    "depositPending": 8,
    "purchasePending": 3,
    "onboarded": 145
  },
  "birthdays": [
    { "name": "Ankit Verma", "date": "Today", "phone": "9876543210" },
    { "name": "Sneha Reddy", "date": "Today", "phone": "9123456780" }
  ],
  "tradedToday": [
    { "name": "Vikram Singh", "uid": "DCX_909", "phone": "+91-98***11", "volume": "₹ 50,000" },
    { "name": "Tara Sutaria", "uid": "DCX_112", "phone": "+91-98***22", "volume": "₹ 12,500" }
  ],
  "allUsers": [
    { 
      "name": "Amit Kumar", "uid": "DCX_001", "phone": "9876543210", 
      "walletBalance": "₹ 12,500.00",
      "checks": { "signup": true, "kyc": true, "bank": true, "deposit": true, "onboarded": true },
      "holdings": [
        { "name": "Bitcoin", "symbol": "BTC", "quantity": "0.05" },
        { "name": "Shiba Inu", "symbol": "SHIB", "quantity": "1000000" }
      ],
      "portfolioHistory": [
        { "token": "USDT", "quantity": "500.00", "date": "16 Dec 2025, 10:30 AM", "action": "Deposit", "status": "Completed" },
        { "token": "INR", "quantity": "50,000", "date": "15 Dec 2025, 02:15 PM", "action": "Deposit", "status": "Completed" },
        { "token": "BTC", "quantity": "0.005", "date": "14 Dec 2025, 09:45 AM", "action": "Withdrawal", "status": "Pending" }
      ],
      "orderHistory": [
        { "pair": "BTC/INR", "type": "Buy", "price": "₹ 35,50,000", "amount": "0.001 BTC", "status": "Filled", "date": "16 Dec 2025" },
        { "pair": "ETH/INR", "type": "Sell", "price": "₹ 2,20,000", "amount": "0.5 ETH", "status": "Filled", "date": "15 Dec 2025" }
      ],
      "futuresPositions": [
         { "symbol": "BTCUSDT", "side": "Long", "leverage": "10x", "entryPrice": "$42,500", "markPrice": "$43,100", "pnl": "+ $600", "roe": "+14%" }
      ],
      "tdsSummary": [
         { "date": "16 Dec 2025", "orderId": "ORD_9988", "tradeValue": "₹ 35,500", "tdsDeducted": "₹ 355" }
      ]
    },
    { 
      "name": "Sumit Roy", "uid": "DCX_002", "phone": "9876543211", 
      "walletBalance": "₹ 0.00",
      "checks": { "signup": true, "kyc": true, "bank": false, "deposit": false, "onboarded": false },
      "holdings": [
        { "name": "Ethereum", "symbol": "ETH", "quantity": "0.5" }
      ],
      "portfolioHistory": []
    },
     { 
      "name": "Vikram Singh", "uid": "DCX_909", "phone": "9876543212", 
      "walletBalance": "₹ 4,50,250.80",
      "checks": { "signup": true, "kyc": true, "bank": true, "deposit": true, "onboarded": true },
      "holdings": [
        { "name": "Shiba Inu", "symbol": "SHIB", "quantity": "5000000" },
        { "name": "Solana", "symbol": "SOL", "quantity": "50" }
      ],
      "portfolioHistory": [
        { "token": "ETH", "quantity": "1.5", "date": "17 Dec 2025, 11:20 AM", "action": "Deposit", "status": "Completed" },
        { "token": "INR", "quantity": "1,00,000", "date": "17 Dec 2025, 09:00 AM", "action": "Deposit", "status": "Completed" }
      ],
      "orderHistory": [
        { "pair": "SOL/USDT", "type": "Buy", "price": "$85.50", "amount": "10 SOL", "status": "Filled", "date": "17 Dec 2025" },
        { "pair": "BTC/USDT", "type": "Sell", "price": "$43,200", "amount": "0.1 BTC", "status": "Filled", "date": "16 Dec 2025" },
        { "pair": "XRP/INR", "type": "Buy", "price": "₹ 55.00", "amount": "1000 XRP", "status": "Open", "date": "16 Dec 2025" }
      ],
      "marginHistory": [
         { "date": "15 Dec 2025", "amount": "₹ 50,000", "token": "INR", "type": "Pledge", "status": "Success" }
      ],
      "futuresOrders": [
         { "contract": "BTCUSDT-PERP", "type": "Long", "leverage": "20x", "price": "$43,000", "quantity": "0.5 BTC", "status": "Filled", "date": "17 Dec 2025" }
      ],
      "futuresPositions": [
         { "symbol": "BTCUSDT", "side": "Long", "leverage": "20x", "entryPrice": "$43,000", "markPrice": "$43,500", "pnl": "+ $250", "roe": "+11.6%" },
         { "symbol": "ETHUSDT", "side": "Short", "leverage": "10x", "entryPrice": "$2,250", "markPrice": "$2,280", "pnl": "- $30", "roe": "-1.3%" }
      ],
      "futuresTrades": [
         { "contract": "BTCUSDT", "side": "Long", "price": "$42,800", "quantity": "0.2 BTC", "realizedPnl": "+ $120", "date": "16 Dec 2025" }
      ],
      "instaHistory": [
         { "pair": "USDT/INR", "side": "Buy", "amount": "100 USDT", "price": "₹ 88.50", "date": "14 Dec 2025" }
      ],
      "conversionHistory": [
         { "fromToken": "USDT", "toToken": "BTC", "fromAmount": "1000", "toAmount": "0.023", "rate": "1 BTC = 43000 USDT", "date": "13 Dec 2025" }
      ],
      "tdsSummary": [
         { "date": "17 Dec 2025", "orderId": "ORD_1122", "tradeValue": "₹ 85,000", "tdsDeducted": "₹ 850" },
         { "date": "16 Dec 2025", "orderId": "ORD_1120", "tradeValue": "₹ 1,20,000", "tdsDeducted": "₹ 1,200" }
      ]
    }
  ]
};
