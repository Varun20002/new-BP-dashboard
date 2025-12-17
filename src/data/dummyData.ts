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
  type: string;
  amount: string;
  link: string;
}

export interface Earnings {
  total: string;
  credited: string;
  pending: string;
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

export interface User {
  name: string;
  uid: string;
  phone: string;
  checks: UserChecklist;
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
    "name": "Arun Sharma",
    "id": "BP_88291",
    "avatar": "https://i.pravatar.cc/150?u=arun"
  },
  "earnings": {
    "total": "₹ 1,24,500",
    "credited": "₹ 1,00,000",
    "pending": "₹ 24,500",
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
      { "date": "12 Oct", "client": "Rohan Das", "type": "Futures", "amount": "₹ 120", "link": "/portfolio/rohan" },
      { "date": "12 Oct", "client": "Priya M", "type": "Spot", "amount": "₹ 45", "link": "/portfolio/priya" }
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
      "checks": { "signup": true, "kyc": true, "bank": true, "deposit": true, "onboarded": true } 
    },
    { 
      "name": "Sumit Roy", "uid": "DCX_002", "phone": "9876543211", 
      "checks": { "signup": true, "kyc": true, "bank": false, "deposit": false, "onboarded": false } 
    }
  ]
};

