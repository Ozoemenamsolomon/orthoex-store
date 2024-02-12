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
  
  export type BookingPrice = {
	id: bigint;
	created_at: Date;
	organisationId: string;
	plan: string;
	price: number; 
  };
  
  export type Holiday = {
	id: number;
	created_at: Date;
	locationId: number;
	date: string;
	closedAllDay: boolean;
	startTime: string;
	endTime: string;
  };
  
  export type Location = {
	[x: string]: any;
	locationId: number;
	created_at: Date;
	locationName: string;
	locationAddress: string;
	organisationName: string;
	organisationLogo: string;
	bookingDuration: number;
	maxBookingPerSlot: number;
	startTime: string;
	totalSlotsPerDay: number;
	breakBetweenSlots: number;
	availableSaturday: boolean;
	availableSunday: boolean;
	organisationId: string;
  }
  
  export type CustomerAccountHistory = {
	id: bigint;
	created_at: string;
	userEmail: string;
	customerEmail: string;
	activityId: bigint;
	Activity: string;
	session: number;
	userId: bigint;
	customerId: bigint;
  }
  
  export type CalendarProps = {
	location: Location;
	setCustomer: React.Dispatch<React.SetStateAction<CustomerType>>;
	chosenLocation: Location;
	setChosenLocation: React.Dispatch<React.SetStateAction<Location>>;
	setBooking: React.Dispatch<React.SetStateAction<string | any>>;
	booking: string | any;
	customer: CustomerType;
	holidays: Holiday[];
  }