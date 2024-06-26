export interface UserData {
  id: any;
  emp_id: string;
  project: any;
  requested_date: string;
  approved_date: string;
  approver: string;
  status: string;
  comments: string;
  request_type: string;
}
export interface cardData {
  icon: string;
  itle: string;
  number: number;
}
export interface Request {
  id: number;
  name: string;
  status: string;
}

export interface INotifications {
  id: string;
  emp_id: string;
  message: string;
  read: boolean;
  project: string;
  approver: string;
}
export interface IUserDetails {
  emp_id: string;
  emp_name: string;
  emp_fname: string;
  emp_mname: string;
  emp_lname: string;
  email: string;
  desiganation: string;
  Project: string;
}

export interface IUsesrAllDetals {
  emp_id: string;
  emp_name: string;
  emp_fname: string;
  emp_mname: string;
  emp_lname: string;
  email: string;
  desiganation: string;
  Project: string;
}

export interface IUsesrRequestsDetails {
  emp_id: string;
  email: string;
  Project: string;
  requested_date: string;
  no_of_days: string;
  status: string;
  comments: string;
}
export interface IInnovations {
  s_no: string;
  title: string;
  idea_description: string;
  idea_type: string;
  benefits: string;
  Technology: string;
  estimated_effort: string;
  actual_affort: string;
  annual_saving: string;
  status: string;
  resource_name: string;
}
