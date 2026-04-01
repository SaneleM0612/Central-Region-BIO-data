import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BioFormData } from './types';
import { bioFormSchema } from './services/validation';
import { submitToGoogleSheet } from './services/sheetService';
import { 
  EmploymentSection, 
  PersonalSection, 
  ContactSection, 
  OtherSection, 
  BankingSection 
} from './components/FormSections';

const App: React.FC = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<BioFormData>({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      startDateOnTIA: '',
      employeeCode: '',
      title: '',
      firstNames: '',
      surname: '',
      role: '',
      cluster: '',
      workMainplace: '',
      region: 'Central Region',
      gender: '',
      idType: '',
      identityNumber: '',
      passportNumber: '',
      taxNumber: '',
      momoNumber: '',
      residentialAddress: '',
      postalCode: '',
      town: '',
      city: '',
      primaryContactNumber: '',
      secondaryContactNumber: '',
      emailAddress: '',
      hasDriversLicense: '',
      hasCar: '',
      carName: '',
      maritalStatus: '',
      nextOfKinName: '',
      nextOfKinContact: '',
      accountNumber: '',
      bankName: '',
      accountType: '',
      branchCode: '',
    },
    mode: 'onBlur', // Validate on blur for better performance and UX
  });

  const onSubmit = async (data: BioFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Preparation/Sanitization (already handled by sheetService but being safe)
    const success = await submitToGoogleSheet(data);
    
    if (success) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitError("Failed to connect to the database. Please check your internet connection and try again.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setSubmitError(null);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-[fadeIn_0.5s_ease-out]">
          <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-gray-500 mb-8">Your bio data has been securely transmitted to the Central Bio Data repository.</p>
          <button 
            onClick={handleReset}
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/30"
          >
            Thank you
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 tracking-tight">
            Central Bio Data
          </h1>
          <p className="text-gray-500 text-lg">Secure Employee Information Portal</p>
        </div>

        {submitError && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl shadow-sm animate-[shake_0.5s_ease-in-out]">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {submitError}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 relative overflow-hidden border border-white">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-10">
            
            <EmploymentSection 
              register={register} 
              errors={errors} 
              control={control} 
              watch={watch} 
            />

            <PersonalSection 
              register={register} 
              errors={errors} 
              control={control} 
            />

            <ContactSection 
              register={register} 
              errors={errors} 
              control={control} 
            />

            <OtherSection 
              register={register} 
              errors={errors} 
              control={control} 
              watch={watch}
            />

            <BankingSection 
              register={register} 
              errors={errors} 
              control={control} 
            />

            {/* Footer / Submit */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg tracking-wide text-white
                  transition-all duration-300 transform shadow-xl shadow-pink-500/20
                  ${isSubmitting 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-[1.01] hover:shadow-pink-500/40'
                  }
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit Bio Data"
                )}
              </button>
              <p className="text-center text-gray-400 text-xs mt-4">
                Secure 256-bit Encrypted Submission
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;


export default App;