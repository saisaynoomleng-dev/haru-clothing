'use client';

import { handleContactForm } from '@/actions/contact-us';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import SubmitButton from '@/components/shared/SubmitButton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Form from 'next/form';
import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

const SUBJECTS = [
  { name: 'Get A Franchise', value: 'franchise' },
  { name: 'Becoming a Supplier', value: 'supplier' },
];

const initialFormState = {
  success: false,
  message: '',
  field: '',
};

const ContactUsPage = () => {
  const [subject, setSubject] = useState<'franchise' | 'supplier' | ''>('');
  const [state, actionFunction] = useActionState(
    handleContactForm,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <Bounded isPaded>
      <PageTitle
        title="Contact Us"
        text="Reach out. Our team is here to assist."
      />

      <div className="grid md:grid-cols-2 md:gap-x-5 max-md:gap-y-5">
        <Form
          action={actionFunction}
          className="grid grid-cols-2 gap-y-5 gap-x-3"
        >
          <div className="flex flex-col gap-y-1 col-span-full">
            <h3 className="font-semibold">Get in Touch</h3>
            <p className="text-fs-300">
              Your email address will not be published. Required fields are
              marked <span className="text-red-500">*</span>
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="fullname" className="form-label">
              Fullname
            </label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              autoComplete="name"
            />
            {!state.success && state.field === 'fullname' ? (
              <p className="form-error-message">{state.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <Input
              type="text"
              id="phone"
              name="phone"
              autoComplete="phone number"
            />
            {!state.success && state.field === 'phone' ? (
              <p className="form-error-message">{state.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 col-span-full">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Input type="email" id="email" name="email" autoComplete="email" />
            {!state.success && state.field === 'email' ? (
              <p className="form-error-message">{state.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 col-span-full">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <Input hidden readOnly value={subject} name="subject" />

            <Select
              value={subject}
              onValueChange={(value) =>
                setSubject(value as 'franchise' | 'supplier')
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Subject" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s.name} value={s.value}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!state.success && state.field === 'subject' ? (
              <p className="form-error-message">{state.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 col-span-full">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <Textarea id="message" name="message" />
            {!state.success && state.field === 'message' ? (
              <p className="form-error-message">{state.message}</p>
            ) : null}
          </div>

          <div>
            <SubmitButton className="w-full">Send</SubmitButton>
          </div>
        </Form>

        <div className="hidden md:block">
          <Image
            src="/contact-us.jpg"
            alt="a woman posing in the subway station"
            width={400}
            height={600}
            className="w-full saturate-0"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default ContactUsPage;
