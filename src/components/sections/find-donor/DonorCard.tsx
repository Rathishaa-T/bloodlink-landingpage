import { BloodGroupBadge } from '@/components/ui/BloodGroupBadge';
import { useToast } from '@/components/ui/Toast';
import type { Donor } from '@/data/donors';

export function DonorCard({ donor }: { donor: Donor }) {
  const { showToast } = useToast();
  const initials = `${donor.firstName.charAt(0)}${donor.lastInitial}`;
  const lastDonated =
    donor.monthsSinceDonation === null ? 'No record yet' : `${donor.monthsSinceDonation} months ago`;

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-ink-900/10 bg-white p-5 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush font-semibold text-brand-700"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-ink-900">
              {donor.firstName} {donor.lastInitial}.
            </h3>
            <p className="truncate text-sm text-ink-600">{donor.area}</p>
          </div>
        </div>
        <BloodGroupBadge group={donor.group} />
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-paper p-3">
          <dt className="text-ink-600">Distance</dt>
          <dd className="mt-0.5 font-semibold text-ink-900">{donor.distanceKm.toFixed(1)} km away</dd>
        </div>
        <div className="rounded-xl bg-paper p-3">
          <dt className="text-ink-600">Last donated</dt>
          <dd className="mt-0.5 font-semibold text-ink-900">{lastDonated}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {donor.availableNow ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-success-700">
            <span className="h-2.5 w-2.5 rounded-full bg-success-500" aria-hidden="true" />
            Available
          </p>
        ) : (
          <p className="text-sm text-ink-600">Available {donor.availableFrom}</p>
        )}
        <button
          type="button"
          onClick={() =>
            showToast(`Contact request noted for ${donor.firstName}. In the live app, the donor would confirm first.`)
          }
          className="inline-flex min-h-11 items-center rounded-full border border-ink-900/20 px-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-600 hover:text-brand-700"
        >
          Request contact
        </button>
      </div>
    </article>
  );
}
