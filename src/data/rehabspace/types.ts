export type CustomerType = {
	id?: bigint;
	registrationDate: Date;
	customerEmail: string;
	firstName: string;
	lastName: string;
	profession?: string | null;
	city?: string | null;
	phoneNumber: string;
	whatsappNumber?: string | null;
	customerType?: string | null;
	sessionBalance?: number | null;
	birthDay?: string | null; 
	gender?: string | null;
	email?: string | null;
  };
  

  export type AppointmentStatus = {
	status: string;
	userID: number;
	fullname: string;
	update: string;
	date: string;
	time: string;
  }
  
  export type Appointment = {
	id: number;
	created_at: string;
	locationId: number;
	locationName: string;
	user1: null | {}; 
	customerId: string;
	customerName: string;
	customerSurname: string;
	customerType: string;
	appointmentDate: string;
	AppointmentStartTime: string;
	status: AppointmentStatus;
	appointmentDateTime: string;
	user: string; 
  }

  export type ActivityType ={
	action: string;
	sessions: number;
	amount: number;
	details: string;
  }
  
  export type Activity ={
	activityId: number;
	createdAt: string;
	customerEmail: string;
	activityType: ActivityType;
	customerId: number;
  }
  