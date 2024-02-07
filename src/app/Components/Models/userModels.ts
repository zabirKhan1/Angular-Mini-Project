export interface UsersTypes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  dob: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Dashboard {
  chartType: string;
  title: string;
  xAxis?: string[];
  data: ChartData[];
}

export interface ChartData {
  name?: string;
  data: (string | number)[][];
}
