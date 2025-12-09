export type View = 'home' | 'dashboard' | 'analytics' | 'create';

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface Activity {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  cost: number;
  category: 'food' | 'adventure' | 'culture' | 'relax' | 'transit';
  coordinates?: { lat: number; lng: number };
  notes?: string;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  image: string;
  budgetCategories: BudgetCategory[];
  activities: Activity[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}