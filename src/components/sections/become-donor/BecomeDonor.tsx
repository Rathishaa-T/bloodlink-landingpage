import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, RotateCcw } from 'lucide-react';
import { DonorCardPreview } from '@/components/sections/become-donor/DonorCardPreview';
import { RegistrationProgress } from '@/components/sections/become-donor/RegistrationProgress';
import { StepAvailability } from '@/components/sections/become-donor/StepAvailability';
import { StepBasics } from '@/components/sections/become-donor/StepBasics';
import { StepEligibility } from '@/components/sections/become-donor/StepEligibility';
import { type RegistrationErrors, type RegistrationForm, validateAvailability, validateBasics } from '@/components/sections/become-donor/types';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useToast } from '@/components/ui/Toast';

const EMPTY_FORM: RegistrationForm = {
  name: '',
  age: '',
  group: null,
  city: '',
  answers: {},
  availability: [],
  consent: false,
};

const BENEFITS = [
  'Get matched with requests near your area',
  'Your phone number is never shown publicly',
  'Receive a donor card with your private donor ID',
];

function createDonorId(): string {
  return `BL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function BecomeDonor() {
  const { showToast } = useToast();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegistrationForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [donorId, setDonorId] = useState<string | null>(null);

  const patch = (changes: Partial<RegistrationForm>) => {
    setForm((current) => ({ ...current, ...changes }));
    const cleared = Object.keys(changes) as Array<keyof RegistrationErrors>;
    if (cleared.length) {
      setErrors((current) => {
        const next = { ...current };
        cleared.forEach((key) => delete next[key]);
        return next;
      });
    }
  };

  const goNext = () => {
    if (step === 1) {
      const found = validateBasics(form);
      setErrors(found);
      if (Object.keys(found).length > 0) return;
      setStep(2);
    } else if (step === 2) {
      setErrors({});
      setStep(3);
    } else {
      const found = validateAvailability(form);
      setErrors(found);
      if (Object.keys(found).length > 0) return;
      setDonorId(createDonorId());
    }
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setDonorId(null);
    setStep(1);
  };

  const firstName = form.name.trim().split(' ')[0];
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' as const };

  return (
    <section id="become-donor" aria-labelledby="become-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader
            index="03"
            eyebrow="Become a donor"
            title={<span id="become-title">Three quick steps to become a donor.</span>}
            description="Takes about two minutes. Nothing you enter here is sent anywhere in this prototype."
          />
          <ul className="mt-10 space-y-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-ink-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-700" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-card sm:p-10">
            {donorId ? (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transition}
                className="flex flex-col items-center text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-success-700" aria-hidden="true" />
                <h3 className="mt-4 text-3xl">Thank you, {firstName}. Welcome aboard.</h3>
                <p className="mt-3 max-w-md text-ink-600">
                  Here is your sample donor card. In the live app, it would be issued once your details are verified.
                </p>
                <div className="mt-8 w-full">
                  <DonorCardPreview name={form.name.trim()} group={form.group ?? 'O−'} city={form.city.trim()} donorId={donorId} />
                </div>
                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(donorId);
                        showToast(`Donor ID ${donorId} copied.`);
                      } catch {
                        showToast(`Your sample donor ID is ${donorId}.`);
                      }
                    }}
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Copy donor ID
                  </Button>
                  <Button variant="ghost" onClick={reset}>
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Start over
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <RegistrationProgress step={step} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
                    transition={transition}
                  >
                    {step === 1 && <StepBasics form={form} errors={errors} onChange={patch} />}
                    {step === 2 && (
                      <StepEligibility
                        answers={form.answers}
                        onAnswer={(id, value) => patch({ answers: { ...form.answers, [id]: value } })}
                      />
                    )}
                    {step === 3 && <StepAvailability form={form} errors={errors} onChange={patch} />}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <Button variant="ghost" onClick={goBack}>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button onClick={goNext}>
                    {step === 3 ? 'Create my donor card' : 'Continue'}
                    {step < 3 && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
