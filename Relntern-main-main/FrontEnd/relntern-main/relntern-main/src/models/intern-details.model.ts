// src/app/models/intern-details.model.ts

export interface InternDetails {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  startDate: Date;
  endDate: Date;
  association: string;
}
