import { z } from 'zod';
import { Title, Role, Cluster, Gender, IdType, YesNo, MaritalStatus, AccountType } from '../types';

export const bioFormSchema = z.object({
  startDateOnTIA: z.string().min(1, 'Start date is required'),
  employeeCode: z.string().min(1, 'Employee code is required'),
  title: z.union([z.nativeEnum(Title), z.literal('')]).refine(val => val !== '', 'Title is required'),
  firstNames: z.string().min(1, 'First names are required'),
  surname: z.string().min(1, 'Surname is required'),
  role: z.union([z.nativeEnum(Role), z.literal('')]).refine(val => val !== '', 'Role is required'),
  cluster: z.union([z.nativeEnum(Cluster), z.literal('')]).refine(val => val !== '', 'Cluster is required'),
  workMainplace: z.string().min(1, 'Work mainplace is required'),
  region: z.string().default('Central Region'),
  gender: z.union([z.nativeEnum(Gender), z.literal('')]).refine(val => val !== '', 'Gender is required'),
  idType: z.union([z.nativeEnum(IdType), z.literal('')]).refine(val => val !== '', 'ID type is required'),
  identityNumber: z.string()
    .min(1, 'ID number is required')
    .regex(/^\d{13}$/, 'Must be exactly 13 digits'),
  passportNumber: z.string().default(''), // Using default instead of optional for BioFormData alignment
  taxNumber: z.string().min(1, 'Tax number is required').regex(/^\d+$/, 'Must contain only numbers'),
  momoNumber: z.string()
    .min(1, 'MOMO number is required')
    .regex(/^\d{11}$/, 'Must be exactly 11 digits'),
  residentialAddress: z.string().min(1, 'Residential address is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  town: z.string().min(1, 'Town is required'),
  city: z.string().min(1, 'City is required'),
  primaryContactNumber: z.string()
    .min(1, 'Primary contact number is required')
    .regex(/^\d{11}$/, 'Must be exactly 11 digits'),
  secondaryContactNumber: z.string().default(''), // Using default instead of optional
  emailAddress: z.string().min(1, 'Email is required').email('Invalid email address'),
  hasDriversLicense: z.union([z.nativeEnum(YesNo), z.literal('')]).refine(val => val !== '', 'This field is required'),
  hasCar: z.union([z.nativeEnum(YesNo), z.literal('')]).refine(val => val !== '', 'This field is required'),
  carName: z.string().default(''), // Using default for BioFormData alignment
  maritalStatus: z.union([z.nativeEnum(MaritalStatus), z.literal('')]).refine(val => val !== '', 'Marital status is required'),
  nextOfKinName: z.string().min(1, 'Next-of-kin name is required'),
  nextOfKinContact: z.string().min(1, 'Next-of-kin contact is required'),
  accountNumber: z.string().min(1, 'Account number is required').regex(/^\d+$/, 'Must contain only numbers'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountType: z.union([z.nativeEnum(AccountType), z.literal('')]).refine(val => val !== '', 'Account type is required'),
  branchCode: z.string().min(1, 'Branch code is required'),
}).refine((data) => {
  if (data.hasCar === YesNo.Yes && !data.carName) {
    return false;
  }
  return true;
}, {
  message: "Car name is required if you have a car",
  path: ["carName"],
});
