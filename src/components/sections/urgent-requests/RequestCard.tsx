import { BadgeCheck, Check, Clock, Share2 } from 'lucide-react';
import { BloodGroupBadge } from '@/components/ui/BloodGroupBadge';
import type { BloodRequest, Urgency } from '@/data/requests';
import { cx } from '@/lib/cx';

const URGENCY_STYLES: Record<Urgency, string> = {
  Critical: 'bg-brand-600 text-white',
  'Within 24h': 'bg-warning-50 text-warning-700 ring-1 ring-warning-500/40',
  Scheduled: 'bg-blush text-ink-700',
};

function formatPosted(minutes: number): string {
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)} h ago`;
}

interface RequestCardProps {
  request: BloodRequest;
  pledged: boolean;
  featured: boolean;
  onPledge: () => void;
  onShare: () => void;
}

export function RequestCard({ request, pledged, featured, onPledge, onShare }: RequestCardProps) {
  const percent = Math.round((request.unitsReceived / request.unitsNeeded) * 100);
  const remaining = request.unitsNeeded - request.unitsReceived;

  return (
    <article
      className={cx(
        'flex h-full flex-col gap-5 rounded-2xl border border-ink-900/10 bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1',
        featured && 'lg:col-span-2',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <BloodGroupBadge group={request.group} size="lg" />
        <span className={cx('rounded-full px-3 py-1 text-xs font-semibold', URGENCY_STYLES[request.urgency])}>
          {request.urgency}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-ink-900">{request.hospital}</h3>
        <p className="mt-1 text-sm text-ink-600">{request.area}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-600">
          <Clock className="h-4 w-4" aria-hidden="true" />
          Posted {formatPosted(request.postedMinutesAgo)}
        </p>
      </div>

      <div>
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-ink-900">
            {request.unitsReceived} of {request.unitsNeeded} units received
          </span>
          <span className="text-ink-600">{remaining > 0 ? `${remaining} to go` : 'Covered'}</span>
        </div>
        <div
          role="progressbar"
          aria-label={`${request.group} units received`}
          aria-valuemin={0}
          aria-valuemax={request.unitsNeeded}
          aria-valuenow={request.unitsReceived}
          className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink-100"
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-[width] duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <p className="flex items-center gap-2 text-sm font-medium text-success-700">
        <BadgeCheck className="h-5 w-5" aria-hidden="true" />
        Verified by hospital
      </p>

      <p className="text-sm text-ink-600">{request.note}</p>

      <div className="mt-auto flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={pledged}
          onClick={onPledge}
          className={cx(
            'inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-200',
            pledged ? 'bg-success-700 text-white' : 'bg-ink-900 text-paper hover:bg-brand-700',
          )}
        >
          {pledged && <Check className="h-4 w-4" aria-hidden="true" />}
          {pledged ? 'Pledged' : 'I can donate'}
        </button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink-900/20 px-5 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-600 hover:text-brand-700"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </button>
      </div>
    </article>
  );
}
