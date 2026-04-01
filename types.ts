export enum IdType {
  Book = 'Book',
  Card = 'Card'
}

export enum Title {
  Dr = 'Dr',
  Mr = 'Mr',
  Miss = 'Miss',
  Mrs = 'Mrs'
}

export enum Role {
  CTL = 'CTL',
  FSS = 'FSS',
  MDR = 'MDR',
  IM = 'IM',
  FS = 'FS'
}

export enum Cluster {
  FreeState = 'Free State',
  NorthWest = 'North West',
  NorthernCape = 'Northern Cape'
}

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export enum YesNo {
  Yes = 'Yes',
  No = 'No'
}

export enum MaritalStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced'
}

export enum AccountType {
  Saving = 'Saving',
  Current = 'Current',
  Debit = 'Debit'
}

export interface BioFormData {
  startDateOnTIA: string;
  employeeCode: string;
  title: Title | '';
  firstNames: string;
  surname: string;
  role: Role | '';
  cluster: Cluster | '';
  workMainplace: string;
  region: string;
  gender: Gender | '';
  idType: IdType | '';
  identityNumber: string;
  passportNumber: string;
  taxNumber: string;
  momoNumber: string;
  residentialAddress: string;
  postalCode: string;
  town: string;
  city: string;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  emailAddress: string;
  hasDriversLicense: YesNo | '';
  hasCar: YesNo | '';
  carName: string;
  maritalStatus: MaritalStatus | '';
  nextOfKinName: string;
  nextOfKinContact: string;
  accountNumber: string;
  bankName: string;
  accountType: AccountType | '';
  branchCode: string;
}

export type FormErrors = Partial<Record<keyof BioFormData, string>>;