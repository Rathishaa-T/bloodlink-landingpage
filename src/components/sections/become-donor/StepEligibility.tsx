import { CheckCircle2, Info } from 'lucide-react';
import { ELIGIBILITY_QUESTIONS } from '@/data/registration';
import type { RegistrationForm } from '@/components/sections/become-donor/types';
import { cx } from '@/lib/cx';

interface StepEligibilityProps {
  answers: RegistrationForm['answers'];
  onAnswer: (id: string, value: 'yes' | 'no') => void;
}

export function StepEligibility({ answers, onAnswer }: StepEligibilityProps) {
  const answered = ELIGIBILITY_QUESTIONS.filter((question) => answers[question.id]).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-600">
        A quick check so you know what to expect. Nothing here stops you from continuing; anything we flag is simply
        confirmed at screening.
      </p>

      <ul className="space-y-3">
        {ELIGIBILITY_QUESTIONS.map((question) => {
          const answer = answers[question.id];
          const isGood = answer === question.preferredAnswer;
          return (
            <li key={question.id} className="rounded-2xl border border-ink-900/10 bg-white p-4 sm:p-5">
              <p id={`q-${question.id}`} className="font-medium text-ink-900">
                {question.question}
              </p>
              <div role="group" aria-labelledby={`q-${question.id}`} className="mt-3 flex gap-2">
                {(['yes', 'no'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={answer === value}
                    onClick={() => onAnswer(question.id, value)}
                    className={cx(
                      'min-h-11 min-w-20 rounded-full border px-5 text-sm font-semibold capitalize transition-colors duration-200',
                      answer === value
                        ? 'border-ink-900 bg-ink-900 text-paper'
                        : 'border-ink-900/20 bg-white text-ink-800 hover:border-brand-600',
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
              {answer && (
                <p
                  aria-live="polite"
                  className={cx(
                    'mt-3 flex items-start gap-2 text-sm',
                    isGood ? 'text-success-700' : 'text-warning-700',
                  )}
                >
                  {isGood ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>{isGood ? question.goodMessage : question.checkMessage}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="text-sm font-medium text-ink-700">
        {answered} of {ELIGIBILITY_QUESTIONS.length} questions answered
      </p>
    </div>
  );
}
