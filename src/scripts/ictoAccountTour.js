import { driver as driverFactory } from 'driver.js';
import 'driver.js/dist/driver.css';

const STORAGE_TOUR = 'icto-svc-tour-seen';
const MODAL_TOUR = 'icto-svc-tour-form-seen';

function getDriverFactory() {
  return Promise.resolve(driverFactory);
}

function buildSteps() {
  const steps = [
    {
      popover: {
        title: 'Welcome to the ICT service request',
        description:
          'This short tour explains how to use the page. Use Next, Back, or the keyboard. You can close anytime with Esc or the × in the popover.',
        side: 'over',
        align: 'center',
      },
    },
  ];

  if (document.getElementById('tour-hero')) {
    steps.push({
      element: '#tour-hero',
      popover: {
        title: 'Page purpose',
        description:
          'Use this for MSUTCTO institutional accounts and other ICT support—aligned with the official ICTO paper form.',
        side: 'bottom',
        align: 'start',
      },
    });
  }

  if (document.getElementById('tour-pick-service')) {
    steps.push({
      element: '#tour-pick-service',
      popover: {
        title: 'Select a service type',
        description:
          'Choose Emergency, Major, or Routine. Your choice sets priority context and opens the full request form in a focused window.',
        side: 'top',
        align: 'center',
      },
    });
  }

  if (document.getElementById('tour-quick-email')) {
    steps.push({
      element: '#tour-quick-email',
      popover: {
        title: 'Email without the form',
        description:
          'If you only need a quick message to ICTO, you can use this link—structured requests are still best with the form.',
        side: 'left',
        align: 'center',
      },
    });
  }

  steps.push({
    popover: {
      title: 'You are ready',
      description:
        'Open a service type to fill the form. Inside, choose Student, Faculty, or Staff so the correct labels (College/Office) appear. Tip: a second tour inside the form is available with “Form guide” at the top of the form.',
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
        description: 'This area reminds you what Emergency, Major, or Routine means for this submission.',
        side: 'bottom',
      },
    });
  }
  if (document.getElementById('tour-requester')) {
    steps.push({
      element: '#tour-requester',
      popover: {
        title: 'Who is requesting',
        description:
          'Select Student, Faculty, or Staff. Students see College/Location; faculty and staff see Office/Work location.',
        side: 'bottom',
      },
    });
  }
  if (document.getElementById('tour-software-accounts')) {
    steps.push({
      element: '#tour-software-accounts',
      popover: {
        title: 'Account-related help',
        description:
          'For institutional accounts, tick “Account configuration…” and/or “User access and permissions” and describe details below.',
        side: 'top',
      },
    });
  }
  if (document.getElementById('tour-liability')) {
    steps.push({
      element: '#tour-liability',
      popover: {
        title: 'Liability disclaimer',
        description: 'Read the terms and check the box before sending your request to ICTO.',
        side: 'top',
      },
    });
  }
  if (document.getElementById('tour-e-signature')) {
    steps.push({
      element: '#tour-e-signature',
      popover: {
        title: 'Electronic signature',
        description:
          'Draw your signature on the pad, then type your printed name underneath. Both are required, along with the confirmation checkbox, before ICTO can rely on your electronic sign-off.',
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
          'This sends your answers to the ICTO Google Form and shows your appointment reference receipt—bring it when you visit ICTO.',
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
