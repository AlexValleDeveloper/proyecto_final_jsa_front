export interface Order {
  id: number;
  userId: number;
  recipeId: number;
  quantity: number;
  status: string;
}