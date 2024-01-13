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
  