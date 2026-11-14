export interface EligibilityQuestion {
  id: string;
  question: string;
  // The answer that suggests a smooth first donation
  preferredAnswer: 'yes' | 'no';
  goodMessage: string;
  checkMessage: string;
}

export const ELIGIBILITY_QUESTIONS: EligibilityQuestion[] = [
  {
    id: 'healthy',
    question: 'Are you feeling well and healthy today?',
    preferredAnswer: 'yes',
    goodMessage: 'Wonderful. Feeling well is the best starting point.',
    checkMessage: 'No worries. Rest up and our team can reschedule you when you feel better.',
  },
  {
    id: 'weight',
    question: 'Do you weigh at least 45 kg?',
    preferredAnswer: 'yes',
    goodMessage: 'Great, that meets the minimum weight.',
    checkMessage: 'Weight is checked at screening. Please mention it there and the team will advise.',
  },
  {
    id: 'lastDonation',
    question: 'Have you donated blood in the last 3 months (men) or 4 months (women)?',
    preferredAnswer: 'no',
    goodMessage: 'Perfect. You have enough time between donations.',
    checkMessage: 'Not a problem. We will suggest your next eligible date after you register.',
  },
  {
    id: 'ageRange',
    question: 'Are you between 18 and 65 years old?',
    preferredAnswer: 'yes',
    goodMessage: 'Lovely. You are within the usual age range.',
    checkMessage: 'Age limits can vary by centre. Our team will confirm your eligibility during screening.',
  },
  {
    id: 'tattoo',
    question: 'Have you had a tattoo or piercing in the last 6 months?',
    preferredAnswer: 'no',
    goodMessage: 'Great, no waiting period is likely to apply.',
    checkMessage: 'A short waiting period is common after tattoos. Mention it at screening and we will guide you.',
  },
];

export const AVAILABILITY_OPTIONS = ['Weekday mornings', 'Weekday evenings', 'Weekends', 'Emergency call-outs'] as const;

export type AvailabilityOption = (typeof AVAILABILITY_OPTIONS)[number];
