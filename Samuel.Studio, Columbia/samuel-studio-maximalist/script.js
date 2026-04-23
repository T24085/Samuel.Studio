const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const flash = document.querySelector('.flash');
const progressBar = document.querySelector('.progress-bar');
const sceneTitle = document.querySelector('.scene-title');
const sceneCount = document.querySelector('.scene-count');
const navLinks = [...document.querySelectorAll('.scene-nav a')];
const panels = [...document.querySelectorAll('.panel')];
const revealTargets = [...document.querySelectorAll('.reveal, .split-reveal')];
const manifestoSection = document.querySelector('#manifesto');
const manifestoTypeTargets = [...document.querySelectorAll('#manifesto .manifesto-type')];
const serviceCards = [...document.querySelectorAll('.service-card')];
const motionSection = document.querySelector('#motion');
const motionVideos = [...document.querySelectorAll('#motion .motion-video')];

const panelIndex = new Map(panels.map((panel, index) => [panel, index]));
const posterSection = document.querySelector('#services');
const posterCopyBlock = document.querySelector('.poster-copy-block');
const posterWordButtons = [...document.querySelectorAll('.poster-word')];
const posterPreview = document.querySelector('.poster-preview');
const posterPreviewImg = document.querySelector('.poster-preview__img');
const posterCaption = document.querySelector('.poster-caption');
const posterDefault = posterWordButtons.find(button => button.classList.contains('is-active')) || posterWordButtons[0];
const posterCaptionDefault = posterCaption?.textContent || '';

function setPosterPreview(word) {
  if (!posterPreview || !posterPreviewImg || !posterCaption || !word) return;

  posterWordButtons.forEach(button => {
    button.classList.toggle('is-active', button === word);
    button.setAttribute('aria-pressed', String(button === word));
  });

  posterPreviewImg.src = `assets/${word.dataset.poster}`;
  posterPreviewImg.alt = word.dataset.posterAlt || '';
  posterCaption.textContent = word.dataset.posterCopy || posterCaptionDefault;
  posterPreview.classList.add('is-active');
}

function clearPosterPreview() {
  if (!posterPreview || !posterPreviewImg || !posterCaption) return;

  posterPreview.classList.remove('is-active');
  posterWordButtons.forEach(button => {
    const active = button === posterDefault;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  posterPreviewImg.src = `assets/${posterDefault?.dataset.poster || 'poster-business-headshot.png'}`;
  posterPreviewImg.alt = posterDefault?.dataset.posterAlt || '';
  posterCaption.textContent = posterCaptionDefault;
}

function setMotionPlayback(shouldPlay) {
  motionVideos.forEach(video => {
    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}

function setProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  if (progressBar) {
    progressBar.style.height = `${Math.max(14, Math.min(100, progress * 100))}%`;
  }
}

function setScene(panel) {
  if (!panel) return;

  body.dataset.accent = panel.dataset.accent || 'gold';

  const index = panelIndex.get(panel) ?? 0;
  const total = panels.length;
  const label = panel.dataset.scene || panel.id || 'Scene';

  if (sceneTitle) sceneTitle.textContent = label;
  if (sceneCount) {
    sceneCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${panel.id}`;
    if (active) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (flash) {
    flash.classList.add('active');
    window.clearTimeout(flash._timer);
    flash._timer = window.setTimeout(() => flash.classList.remove('active'), 140);
  }
}

if (!reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.18 });

  revealTargets.forEach(target => revealObserver.observe(target));

  let manifestoVisible = false;
  const playManifestoType = () => {
    manifestoTypeTargets.forEach(target => {
      target.classList.remove('in-view');
      void target.offsetWidth;
      target.classList.add('in-view');
    });
  };

  if (manifestoSection) {
    const manifestoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.45;

        if (visible && !manifestoVisible) {
          playManifestoType();
          manifestoVisible = true;
        } else if (!visible && manifestoVisible) {
          manifestoTypeTargets.forEach(target => target.classList.remove('in-view'));
          manifestoVisible = false;
        }
      });
    }, { threshold: [0, 0.25, 0.45, 0.65, 0.85] });

    manifestoObserver.observe(manifestoSection);
  }

  if (posterSection) {
    const posterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          posterSection.classList.add('is-visible');
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          posterSection.classList.remove('is-visible');
          clearPosterPreview();
        }
      });
    }, { threshold: [0.15, 0.35, 0.55, 0.75] });

    posterObserver.observe(posterSection);
  }

  if (motionSection && motionVideos.length) {
    let motionVisible = false;
    const motionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (visible && !motionVisible) {
          setMotionPlayback(true);
          motionVisible = true;
        } else if (!visible && motionVisible) {
          setMotionPlayback(false);
          motionVisible = false;
        }
      });
    }, { threshold: [0.15, 0.35, 0.55, 0.75] });

    motionObserver.observe(motionSection);
  }
} else {
  revealTargets.forEach(target => target.classList.add('in-view'));
  manifestoTypeTargets.forEach(target => target.classList.add('in-view'));
  if (posterSection) posterSection.classList.add('is-visible');
  setMotionPlayback(true);
}

const panelObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setScene(entry.target);
    }
  });
}, { threshold: 0.58 });

panels.forEach(panel => panelObserver.observe(panel));

window.addEventListener('scroll', setProgress, { passive: true });
window.addEventListener('resize', setProgress);
setProgress();
setScene(panels[0]);

const serviceStack = document.querySelector('.service-stack');
function activateServiceCard(card) {
  serviceCards.forEach(item => {
    const active = item === card;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
}

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => activateServiceCard(card));
  card.addEventListener('focus', () => activateServiceCard(card));
  card.addEventListener('click', () => activateServiceCard(card));
});

if (serviceStack) {
  serviceStack.addEventListener('mouseleave', () => {
    activateServiceCard(serviceCards[0]);
  });
}

if (posterCopyBlock && posterWordButtons.length) {
  posterWordButtons.forEach(button => {
    button.addEventListener('pointerenter', () => setPosterPreview(button));
    button.addEventListener('focus', () => setPosterPreview(button));
    button.addEventListener('click', () => setPosterPreview(button));
    button.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        clearPosterPreview();
        button.blur();
      }
    });
  });

  posterCopyBlock.addEventListener('pointerleave', clearPosterPreview);
  posterCopyBlock.addEventListener('focusout', event => {
    if (!posterCopyBlock.contains(event.relatedTarget)) {
      clearPosterPreview();
    }
  });
}
