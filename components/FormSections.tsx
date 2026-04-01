import React from 'react';
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form';
import { BioFormData, Role, Cluster, Title, Gender, MaritalStatus, IdType, YesNo, AccountType } from '../types';
import { Input } from './Input';
import { Select } from './Select';
import { ToggleGroup } from './ToggleGroup';
import { CLUSTER_MAINPLACES } from '../constants';

interface SectionProps {
  register: UseFormRegister<BioFormData>;
  errors: FieldErrors<BioFormData>;
  control: Control<BioFormData>;
  watch?: any;
}

export const EmploymentSection: React.FC<SectionProps> = ({ register, errors, watch }) => {
  const selectedCluster = watch('cluster');
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        Employment Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Start Date on TIA"
          type="date"
          required
          error={errors.startDateOnTIA?.message}
          {...register('startDateOnTIA')}
        />
        <Input
          label="Employee Code"
          placeholder="Employee Code"
          required
          error={errors.employeeCode?.message}
          {...register('employeeCode')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Role"
          options={Object.values(Role)}
          placeholder="Select Role"
          required
          error={errors.role?.message}
          {...register('role')}
        />
        <Select
          label="Cluster"
          options={Object.values(Cluster)}
          placeholder="Select Cluster"
          required
          error={errors.cluster?.message}
          {...register('cluster')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Work Mainplace"
          options={selectedCluster ? (CLUSTER_MAINPLACES[selectedCluster as keyof typeof CLUSTER_MAINPLACES] || []) : []}
          placeholder="Select Mainplace"
          required
          error={errors.workMainplace?.message}
          disabled={!selectedCluster}
          {...register('workMainplace')}
        />
        <Input
          label="Region"
          readOnly
          className="bg-gray-100 text-gray-500 cursor-not-allowed"
          {...register('region')}
        />
      </div>
    </div>
  );
};

export const PersonalSection: React.FC<SectionProps> = ({ register, errors, control }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-pink-500"></span>
        Personal Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <Select
            label="Title"
            options={Object.values(Title)}
            placeholder="Title"
            required
            error={errors.title?.message}
            {...register('title')}
          />
        </div>
        <div className="md:col-span-4">
          <Input
            label="First Name/s (as appears on ID)"
            placeholder="First Names"
            required
            error={errors.firstNames?.message}
            {...register('firstNames')}
          />
        </div>
        <div className="md:col-span-5">
          <Input
            label="Surname (as appears on ID)"
            placeholder="Surname"
            required
            error={errors.surname?.message}
            {...register('surname')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              label="Gender"
              name="gender"
              value={field.value}
              options={[
                { label: 'Male', value: Gender.Male },
                { label: 'Female', value: Gender.Female }
              ]}
              onChange={field.onChange}
              required
            />
          )}
        />
        <Select
          label="Marital Status"
          options={Object.values(MaritalStatus)}
          placeholder="Select Status"
          required
          error={errors.maritalStatus?.message}
          {...register('maritalStatus')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="idType"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              label="ID Type"
              name="idType"
              value={field.value}
              options={[
                { label: 'Card', value: IdType.Card },
                { label: 'Book', value: IdType.Book }
              ]}
              onChange={field.onChange}
              required
            />
          )}
        />
        <Input
          label="ID / Passport Number"
          placeholder="13 Digits"
          required
          maxLength={13}
          error={errors.identityNumber?.message}
          {...register('identityNumber')}
        />
      </div>

      <Input
        label="Passport Number (Optional)"
        placeholder="Passport Number"
        error={errors.passportNumber?.message}
        {...register('passportNumber')}
      />
    </div>
  );
};

export const ContactSection: React.FC<SectionProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
        Contact & Address
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Primary Contact Number"
          placeholder="11 Digits"
          required
          maxLength={11}
          error={errors.primaryContactNumber?.message}
          {...register('primaryContactNumber')}
        />
        <Input
          label="Secondary Contact Number (Optional)"
          placeholder="11 Digits"
          maxLength={11}
          error={errors.secondaryContactNumber?.message}
          {...register('secondaryContactNumber')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="email@example.com"
          required
          error={errors.emailAddress?.message}
          {...register('emailAddress')}
        />
        <Input
          label="MOMO Number"
          placeholder="11 Digits"
          required
          maxLength={11}
          error={errors.momoNumber?.message}
          {...register('momoNumber')}
        />
      </div>

      <Input
        label="Residential Address"
        placeholder="Unit number, street name, suburb/town, and city"
        required
        error={errors.residentialAddress?.message}
        {...register('residentialAddress')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Town"
          placeholder="Town"
          required
          error={errors.town?.message}
          {...register('town')}
        />
        <Input
          label="City"
          placeholder="City"
          required
          error={errors.city?.message}
          {...register('city')}
        />
        <Input
          label="Postal Code"
          placeholder="Postal Code"
          required
          error={errors.postalCode?.message}
          {...register('postalCode')}
        />
      </div>
    </div>
  );
};

export const OtherSection: React.FC<SectionProps> = ({ register, errors, control, watch }) => {
  const hasCar = watch('hasCar');
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        Other Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="hasDriversLicense"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              label="Do you have a Driver's License?"
              name="hasDriversLicense"
              value={field.value}
              options={[
                { label: 'Yes', value: YesNo.Yes },
                { label: 'No', value: YesNo.No }
              ]}
              onChange={field.onChange}
              required
            />
          )}
        />
        <Controller
          name="hasCar"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              label="Do you have a Car?"
              name="hasCar"
              value={field.value}
              options={[
                { label: 'Yes', value: YesNo.Yes },
                { label: 'No', value: YesNo.No }
              ]}
              onChange={field.onChange}
              required
            />
          )}
        />
      </div>

      {hasCar === YesNo.Yes && (
        <Input
          label="Car Name"
          placeholder="e.g. Toyota Corolla"
          required
          error={errors.carName?.message}
          {...register('carName')}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Next-of-kin Name and Surname"
          placeholder="Full Name"
          required
          error={errors.nextOfKinName?.message}
          {...register('nextOfKinName')}
        />
        <Input
          label="Next-of-kin Contact Number"
          placeholder="Contact Number"
          required
          error={errors.nextOfKinContact?.message}
          {...register('nextOfKinContact')}
        />
      </div>
    </div>
  );
};

export const BankingSection: React.FC<SectionProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Banking & Tax Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Tax Number"
          placeholder="Tax Number"
          required
          error={errors.taxNumber?.message}
          {...register('taxNumber')}
        />
        <Input
          label="Bank Name"
          placeholder="Bank Name"
          required
          error={errors.bankName?.message}
          {...register('bankName')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Select
          label="Account Type"
          options={Object.values(AccountType)}
          placeholder="Select Type"
          required
          error={errors.accountType?.message}
          {...register('accountType')}
        />
        <Input
          label="Account Number"
          placeholder="Account No."
          required
          error={errors.accountNumber?.message}
          {...register('accountNumber')}
        />
        <Input
          label="Branch Code"
          placeholder="Branch Code"
          required
          error={errors.branchCode?.message}
          {...register('branchCode')}
        />
      </div>
    </div>
  );
};
