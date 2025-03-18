import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Define schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  message: z.string().optional(),
  subscribe: z.boolean().optional()
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      subscribe: false
    }
  });
  
  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest('POST', '/api/rsvp', data);
    },
    onSuccess: () => {
      setFormSubmitted(true);
      toast({
        title: "Success!",
        description: "Thank you for your RSVP! We look forward to seeing you at the open house.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit RSVP: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">RSVP</span>
            <h2 className="text-4xl font-['Poppins'] uppercase tracking-wider">Secure Your Spot</h2>
            <p className="font-['Titillium_Web'] text-lg mt-4">
              Complete the form below to reserve your place at our exclusive open house event.
            </p>
          </div>
          
          <div className="bg-secondary/50 p-8 rounded-lg fade-in">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block font-['Titillium_Web'] mb-2">First Name*</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className={`w-full bg-primary border ${errors.firstName ? 'border-red-500' : 'border-secondary/50'} rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none`}
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-['Titillium_Web'] mb-2">Last Name*</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className={`w-full bg-primary border ${errors.lastName ? 'border-red-500' : 'border-secondary/50'} rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none`}
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block font-['Titillium_Web'] mb-2">Email Address*</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full bg-primary border ${errors.email ? 'border-red-500' : 'border-secondary/50'} rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none`}
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block font-['Titillium_Web'] mb-2">Phone Number*</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className={`w-full bg-primary border ${errors.phone ? 'border-red-500' : 'border-secondary/50'} rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none`}
                    {...register('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block font-['Titillium_Web'] mb-2">Questions or Comments</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full bg-primary border border-secondary/50 rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none"
                  {...register('message')}
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 bg-primary border border-secondary/50 rounded mr-3" 
                    {...register('subscribe')}
                  />
                  <span className="font-['Titillium_Web']">
                    Receive updates about similar properties and future open houses
                  </span>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#D9A566] text-white font-['Poppins'] p-4 rounded-lg hover:bg-[#D9A566]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'SUBMITTING...' : 'RSVP FOR OPEN HOUSE'}
              </button>
            </form>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <div className="text-center">
              <i className='bx bxs-phone text-[#D9A566] text-4xl mb-2'></i>
              <p className="font-['Titillium_Web']">(310) 555-1234</p>
            </div>
            <div className="text-center">
              <i className='bx bxs-envelope text-[#D9A566] text-4xl mb-2'></i>
              <p className="font-['Titillium_Web']">info@luxuryestates.com</p>
            </div>
            <div className="text-center">
              <i className='bx bxs-building-house text-[#D9A566] text-4xl mb-2'></i>
              <p className="font-['Titillium_Web']">456 Realty Row, Suite 300</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
