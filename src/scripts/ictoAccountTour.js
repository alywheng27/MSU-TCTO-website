import { driver as driverFactory } from 'driver.js';
import 'driver.js/dist/driver.css';

// Bumped to v2 to re-offer the refreshed tour after new features were added.
const STORAGE_TOUR = 'icto-svc-tour-seen-v2';
const MODAL_TOUR = 'icto-svc-tour-form-seen-v2';

function getDriverFactory() {
  return Promise.resolve(driverFactory);
}

function buildSteps() {
  const steps = [
    {
      popover: {
        title: 'Welcome to the ICT service request',
        description:
          'This short tour shows what is new on this page and how to complete a request. Use Next / Back or the arrow keys; press Esc or the × to close at any time.',
        side: 'over',
        align: 'center',
      },
    },
  ];

  if (document.getElementById('tour-hero')) {
    steps.push({
      element: '#tour-hero',
      popover: {
        title: 'What this page is for',
        description:
          'Use this for MSUTCTO institutional accounts and other ICT support. It mirrors the official ICTO paper form and ends with a printable receipt.',
        side: 'bottom',
        align: 'start',
      },
    });
  }

  if (document.getElementById('tour-pick-service')) {
    steps.push({
      element: '#tour-pick-service',
      popover: {
        title: 'Pick a service type',
        description:
          'Choose <strong>Emergency</strong>, <strong>Major</strong>, or <strong>Routine</strong>. Your pick sets priority context and opens the full ICTO request form in a focused window.',
        side: 'top',
        align: 'center',
      },
    });
  }

  if (document.getElementById('tour-quick-email')) {
    steps.push({
      element: '#tour-quick-email',
      popover: {
        title: 'Need a quick email instead?',
        description:
          'If you only need a quick message to ICTO, use this link. For trackable requests, please still use the form.',
        side: 'left',
        align: 'center',
      },
    });
  }

  steps.push({
    popover: {
      title: 'You are ready to start',
      description:
        'Open a service type and choose <strong>Student</strong>, <strong>Faculty</strong>, or <strong>Staff</strong> so the right labels and document uploads appear. Tip: a second, in‑form walkthrough is available via <strong>Form guide (tour)</strong> at the top of the request form.',
      side: 'over',
      align: 'center',
    },
  });

  return steps;
}

function buildModalSteps() {
  const steps = [];

  if (document.getElementById('tour-modal-type-blurb')) {
    steps.push({
      element: '#tour-modal-type-blurb',
      popover: {
        title: 'Context for your request',
        description:
          'This banner reminds you what <strong>Emergency</strong>, <strong>Major</strong>, or <strong>Routine</strong> means for this submission. You can re-open this walkthrough anytime via <strong>Form guide (tour)</strong>.',
        side: 'bottom',
      },
    });
  }

  if (document.getElementById('tour-form-stepper')) {
    steps.push({
      element: '#tour-form-stepper',
      popover: {
        title: 'New · Live progress stepper',
        description:
          'Track the four steps — <strong>Requester</strong>, <strong>Documents</strong>, <strong>Service details</strong>, <strong>Attestation</strong>. Each badge turns green as you complete it, red if something needs fixing. Click any step to jump straight to that section.',
        side: 'bottom',
      },
    });
  }

  if (document.getElementById('tour-requester')) {
    steps.push({
      element: '#tour-requester',
      popover: {
        title: 'Step 1 · Who is requesting',
        description:
          'Pick <strong>Student</strong>, <strong>Faculty</strong>, or <strong>Staff</strong>. Students see <em>College / Location</em>; faculty and staff see <em>Office / Work location</em>. The required uploads in the next step also adapt to your role.',
        side: 'bottom',
      },
    });
  }

  if (document.getElementById('tour-supporting-docs')) {
    steps.push({
      element: '#tour-supporting-docs',
      popover: {
        title: 'Step 2 · Supporting documents',
        description:
          'Upload the IDs ICTO needs to verify you. Students upload <strong>Student ID (front & back)</strong> and a <strong>Certificate of Registration</strong>; faculty and staff upload a <strong>Valid ID (front & back)</strong>. The fields only appear after you pick your role in Step 1.',
        side: 'top',
      },
    });
  }

  if (document.getElementById('tour-software-accounts')) {
    steps.push({
      element: '#tour-software-accounts',
      popover: {
        title: 'Step 3 · Account-related help',
        description:
          'For institutional accounts, tick <strong>Account configuration and login assistance</strong> and/or <strong>User access and permissions</strong>, then describe the details in the <em>Software — Specific</em> box below.',
        side: 'top',
      },
    });
  }

  if (document.getElementById('tour-liability')) {
    steps.push({
      element: '#tour-liability',
      popover: {
        title: 'Step 4 · Liability disclaimer',
        description:
          'Read the terms and tick the box before sending your request to ICTO. Submission is blocked until this is acknowledged.',
        side: 'top',
      },
    });
  }

  if (document.getElementById('tour-e-signature')) {
    steps.push({
      element: '#tour-e-signature',
      popover: {
        title: 'Electronic signature & attestation',
        description:
          'Draw your signature on the pad <em>or</em> use the new <strong>Upload image</strong> button to send a photo of your signature. Then enter your <strong>printed name</strong> and tick the confirmation box — all three are required before ICTO can rely on your e-sign.',
        side: 'top',
      },
    });
  }

  if (document.getElementById('icto-human-verify-wrap')) {
    steps.push({
      element: '#icto-human-verify-wrap',
      popover: {
        title: 'New · Security verification',
        description:
          'Tick <strong>I am not a robot</strong> just before sending. If a <strong>CAPTCHA</strong> appears, type the code shown — you can refresh the code if it is hard to read. This protects ICTO from automated submissions.',
        side: 'top',
      },
    });
  }

  if (document.getElementById('tour-submit')) {
    steps.push({
      element: '#tour-submit',
      popover: {
        title: 'Send to ICTO',
        description:
          'This sends your answers to the ICTO Google Form and opens your <strong>appointment reference receipt</strong>, which you can print or save as PDF. Bring or send the reference number when you follow up with ICTO.',
        side: 'top',
      },
    });
  }

  return steps;
}

const baseConfig = {
  showProgress: true,
  progressText: '{{current}} of {{total}}',
  nextBtnText: 'Next',
  prevBtnText: 'Back',
  doneBtnText: 'Done',
  overlayColor: '#0f172a',
  overlayOpacity: 0.5,
  smoothScroll: true,
  allowClose: true,
  stagePadding: 8,
  stageRadius: 8,
  popoverClass: 'icto-tour-popover',
};

function markStorage(key) {
  try {
    localStorage.setItem(key, '1');
  } catch {
    /* ignore */
  }
}

export function startIctoPageTour() {
  return getDriverFactory()
    .then((driverFactory) => {
      const steps = buildSteps();
      if (steps.length === 0) return;

      const d = driverFactory({
        ...baseConfig,
        steps,
        onCloseClick: (_el, _step, { driver: drv }) => {
          markStorage(STORAGE_TOUR);
          drv.destroy();
        },
        onDestroyed: () => {
          markStorage(STORAGE_TOUR);
        },
      });
      d.drive(0);
    })
    .catch((error) => {
      console.error('Unable to start page tour.', error);
    });
}

export function startIctoFormTour() {
  const modal = document.getElementById('icto-form-modal');
  if (!modal || modal.classList.contains('hidden') || !modal.classList.contains('is-open')) {
    return Promise.resolve();
  }
  return getDriverFactory()
    .then((driverFactory) => {
      const steps = buildModalSteps();
      if (steps.length === 0) return;

      const d = driverFactory({
        ...baseConfig,
        steps,
        onCloseClick: (_el, _step, { driver: drv }) => {
          markStorage(MODAL_TOUR);
          drv.destroy();
        },
        onDestroyed: () => {
          markStorage(MODAL_TOUR);
        },
      });
      d.drive(0);
    })
    .catch((error) => {
      console.error('Unable to start form tour.', error);
    });
}

export function shouldOfferPageTour() {
  try {
    return !localStorage.getItem(STORAGE_TOUR);
  } catch {
    return true;
  }
}

export function initIctoTours() {
  const fab = document.getElementById('tour-fab');
  if (fab && !fab.dataset.tourBound) {
    fab.addEventListener('click', () => {
      void startIctoPageTour();
    });
    fab.dataset.tourBound = '1';
  }

  const formGuide = document.getElementById('tour-form-guide');
  if (formGuide && !formGuide.dataset.tourBound) {
    formGuide.addEventListener('click', (e) => {
      e.preventDefault();
      void startIctoFormTour();
    });
    formGuide.dataset.tourBound = '1';
  }

  const offer = document.getElementById('tour-offer-pill');
  if (offer && shouldOfferPageTour()) {
    offer.classList.remove('hidden');
  }

  const startOffer = document.getElementById('tour-offer-start');
  if (startOffer && !startOffer.dataset.tourBound) {
    startOffer.addEventListener('click', () => {
      const pill = document.getElementById('tour-offer-pill');
      if (pill) pill.classList.add('hidden');
      void startIctoPageTour();
    });
    startOffer.dataset.tourBound = '1';
  }

  const dismissOffer = document.getElementById('tour-offer-dismiss');
  if (dismissOffer && !dismissOffer.dataset.tourBound) {
    dismissOffer.addEventListener('click', () => {
      const pill = document.getElementById('tour-offer-pill');
      if (pill) {
        pill.classList.add('hidden');
        markStorage(STORAGE_TOUR);
      }
    });
    dismissOffer.dataset.tourBound = '1';
  }

  // Safety net: delegated listeners keep tour buttons working even if
  // the DOM is re-rendered and direct listeners are lost.
  if (!document.body.dataset.tourDelegatedBound) {
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target.closest('#tour-fab, #tour-offer-start, #tour-form-guide') : null;
      if (!target) return;

      if (target.id === 'tour-form-guide') {
        event.preventDefault();
        void startIctoFormTour();
        return;
      }

      if (target.id === 'tour-offer-start') {
        const pill = document.getElementById('tour-offer-pill');
        if (pill) pill.classList.add('hidden');
      }

      void startIctoPageTour();
    });
    document.body.dataset.tourDelegatedBound = '1';
  }
}

if (typeof window !== 'undefined') {
  window.startIctoPageTour = startIctoPageTour;
  window.startIctoFormTour = startIctoFormTour;
  window.initIctoTours = initIctoTours;
}
