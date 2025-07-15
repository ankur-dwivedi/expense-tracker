export const STATUS_ENUM = ["approved", "rejected", "pending"] as const;
export const CATEGORY_ENUM = ["Food", "Travel", "Bills", "Shopping"] as const;

export const STATUS = {
  APPROVED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
} as const;

export const CATEGORY = {
  FOOD: "Food",
  TRAVEL: "Travel",
  BILLS: "Bills",
  SHOPPING: "Shopping",
} as const;
