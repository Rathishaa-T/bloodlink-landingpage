import { useEffect, useMemo, useState } from 'react';
import { RequestCard } from '@/components/sections/urgent-requests/RequestCard';
import { FilterChip } from '@/components/ui/FilterChip';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useToast } from '@/components/ui/Toast';
import { BLOOD_GROUPS, type BloodGroup } from '@/data/bloodGroups';
import { BLOOD_REQUESTS, type BloodRequest, type Urgency } from '@/data/requests';

const URGENCIES: Array<Urgency | 'All'> = ['All', 'Critical', 'Within 24h', 'Scheduled'];
const LIVE_TICK_MS = 9000;

export function UrgentRequests() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState<BloodRequest[]>(BLOOD_REQUESTS);
  const [groupFilter, setGroupFilter] = useState<BloodGroup | 'All'>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | 'All'>('All');
  const [pledged, setPledged] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRequests((current) => {
        const open = current.filter((request) => request.unitsReceived < request.unitsNeeded);
        if (open.length === 0) return current;
        const target = open[Math.floor(Math.random() * open.length)];
        return current.map((request) =>
          request.id === target.id ? { ...request, unitsReceived: request.unitsReceived + 1 } : request,
        );
      });
    }, LIVE_TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  const visible = useMemo(
    () =>
      requests.filter(
        (request) =>
          (groupFilter === 'All' || request.group === groupFilter) &&
          (urgencyFilter === 'All' || request.urgency === urgencyFilter),
      ),
    [requests, groupFilter, urgencyFilter],
  );

  const togglePledge = (id: string) => {
    setPledged((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const shareRequest = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#urgent-requests`;
    try {
      await navigator.clipboard.writeText(`${url}?request=${id}`);
      showToast('Link copied. Share it with your network.');
    } catch {
      showToast('Copy is blocked here. Copy the address from your browser bar instead.');
    }
  };

  return (
    <section id="urgent-requests" aria-labelledby="urgent-title" className="scroll-mt-24 bg-blush-50 py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="02"
            eyebrow="Urgent blood requests"
            title={<span id="urgent-title">Hospitals are asking. Here is who needs help now.</span>}
            description="Each request is verified by the hospital. Progress updates as units are confirmed."
          />
          <p className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-sm">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-600 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-600" />
            </span>
            Live board, updated as units are confirmed
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <div role="group" aria-label="Filter by blood group" className="flex flex-wrap gap-2">
            <FilterChip active={groupFilter === 'All'} onClick={() => setGroupFilter('All')}>
              All groups
            </FilterChip>
            {BLOOD_GROUPS.map((group) => (
              <FilterChip key={group} active={groupFilter === group} onClick={() => setGroupFilter(group)}>
                {group}
              </FilterChip>
            ))}
          </div>
          <div role="group" aria-label="Filter by urgency" className="flex flex-wrap gap-2">
            {URGENCIES.map((urgency) => (
              <FilterChip key={urgency} active={urgencyFilter === urgency} onClick={() => setUrgencyFilter(urgency)}>
                {urgency === 'All' ? 'Any urgency' : urgency}
              </FilterChip>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((request, index) => (
              <li key={request.id} className="flex">
                <RequestCard
                  request={request}
                  pledged={pledged.has(request.id)}
                  featured={index === 0 && visible.length > 3}
                  onPledge={() => {
                    togglePledge(request.id);
                    if (!pledged.has(request.id)) {
                      showToast('Thank you. The hospital coordinator will contact you with next steps.');
                    }
                  }}
                  onShare={() => shareRequest(request.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-ink-900/20 bg-white p-8 text-center">
            <p className="font-display text-xl text-ink-900">No requests match these filters right now.</p>
            <button
              type="button"
              onClick={() => {
                setGroupFilter('All');
                setUrgencyFilter('All');
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-full border border-ink-900/20 px-5 text-sm font-semibold hover:border-brand-600 hover:text-brand-700"
            >
              Show all requests
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
