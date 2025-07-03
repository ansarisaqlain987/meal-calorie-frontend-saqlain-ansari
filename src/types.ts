export type UserObject = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    user: UserObject;
  };
};

export type RegisterResponse = {
  success: boolean;
  message?: string;
  data?: {
    token: null;
    user: UserObject;
  };
};

export type SearchResult = {
  dish_name: string;
  calories_per_serving: number;
  serving: number;
  total_calories: number;
};
