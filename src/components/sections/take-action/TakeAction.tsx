import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Copy, Quote, Share2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { useToast } from '@/components/ui/Toast';
import { ACTION_CARDS, DRIVE_STEPS, SHARE_MESSAGE, TESTIMONIAL } from '@/data/actions';
import { cx } from '@/lib/cx';

export function TakeAction() {
  const { showToast } = useToast();
  const reduceMotion = useReducedMotion();
  const [driveOpen, setDriveOpen] = useState(false);
  const [register, drive, awareness] = ACTION_CARDS;

  const copyText = async (text: string, success: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(success);
    } catch {
      showToast('Copy is blocked here. Select the text and copy it manually.');
    }
  };

  const shareMessage = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'BloodLink', text: SHARE_MESSAGE, url });
      } catch {
        showToast('Sharing was cancelled.');
      }
      return;
    }
    await copyText(`${SHARE_MESSAGE} ${url}`, 'Share message copied. Paste it anywhere.');
  };

  return (
    <section id="take-action" aria-labelledby="action-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          index="07"
          eyebrow="Take action"
          title={<span id="action-title">Three ways to keep blood moving today.</span>}
          description="Donate, host, or share. Each one helps a hospital respond faster."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="flex">
            <article className="flex w-full flex-col rounded-3xl bg-brand-600 p-8 text-white shadow-lift">
              <register.icon className="h-10 w-10" aria-hidden="true" />
              <h3 className="mt-6 text-2xl text-white">{register.title}</h3>
              <p className="mt-3 flex-1 text-white/90">{register.description}</p>
              <a
                href="#become-donor"
                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-paper px-5 text-sm font-semibold text-ink-900 transition-colors hover:bg-white"
              >
                Start registration
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="flex">
            <article className="flex w-full flex-col rounded-3xl border border-ink-900/10 bg-white p-8 shadow-card">
              <drive.icon className="h-10 w-10 text-brand-600" aria-hidden="true" />
              <h3 className="mt-6 text-2xl">{drive.title}</h3>
              <p className="mt-3 text-ink-600">{drive.description}</p>
              <button
                type="button"
                aria-expanded={driveOpen}
                aria-controls="drive-steps"
                onClick={() => setDriveOpen((open) => !open)}
                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink-900/20 px-5 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                {driveOpen ? 'Hide drive checklist' : 'See the drive checklist'}
              </button>
              <AnimatePresence initial={false}>
                {driveOpen && (
                  <motion.ol
                    id="drive-steps"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-3 overflow-hidden"
                  >
                    {DRIVE_STEPS.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm text-ink-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush text-xs font-semibold text-brand-700">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </motion.ol>
                )}
              </AnimatePresence>
            </article>
          </Reveal>

          <Reveal delay={0.2} className="flex">
            <article className="flex w-full flex-col rounded-3xl bg-blush p-8 shadow-card">
              <awareness.icon className="h-10 w-10 text-brand-700" aria-hidden="true" />
              <h3 className="mt-6 text-2xl">{awareness.title}</h3>
              <p className="mt-3 text-ink-700">{awareness.description}</p>
              <blockquote className="mt-6 rounded-2xl bg-white/80 p-4 text-sm text-ink-800">
                {SHARE_MESSAGE}
              </blockquote>
              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <button
                  type="button"
                  onClick={() => copyText(window.location.href, 'Link copied. Send it to someone who should donate.')}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-semibold text-paper transition-colors hover:bg-brand-700"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copy link
                </button>
                <button
                  type="button"
                  onClick={shareMessage}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-ink-900/20 bg-white px-5 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-600 hover:text-brand-700"
                >
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  Share
                </button>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="grid gap-8 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-card lg:grid-cols-12 lg:p-12">
            <Quote className="h-10 w-10 text-brand-600 lg:col-span-1" aria-hidden="true" />
            <div className="lg:col-span-11">
              <blockquote className="font-display text-2xl leading-[1.3] text-ink-900 sm:text-3xl">
                <p>&ldquo;{TESTIMONIAL.quote}&rdquo;</p>
              </blockquote>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-ink-900">{TESTIMONIAL.name}</span>
                <span className="text-ink-600">{TESTIMONIAL.role}</span>
                <span
                  className={cx('inline-flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-700')}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {TESTIMONIAL.note}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
