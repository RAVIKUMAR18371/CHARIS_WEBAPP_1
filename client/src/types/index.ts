export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface CollectedInfo {
  recipient?: string;
  relationship?: string;
  occasion?: string;
  personality?: string;
  interests?: string;
  budget?: string;
  emotionalGoal?: string;
}

export interface Gift {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  story: string;
  symbolicMeaning: string;
  imageUrl: string;
  galleryImages: string[];
  tags: string[];
}

export interface Recommendation {
  id: string;
  gift: Gift;
  whyChosen: string;
  emotionalReasoning: string;
}

export interface SavedGift {
  id: string;
  gift: Gift;
  savedAt: string;
}

export interface Conversation {
  id: string;
  status: 'ACTIVE' | 'COMPLETED';
  messages: ChatMessage[];
  collectedInformation: CollectedInfo;
  recommendations?: Recommendation[];
  createdAt: string;
  updatedAt: string;
}
