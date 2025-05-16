// script.js

window.addEventListener('load', () => {
  setTimeout(() => {
    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
        loaderContainer.style.opacity = '0';
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            document.body.classList.remove('loading');
        }, 800);
    }
  }, 3500);
});

document.addEventListener('DOMContentLoaded', () => {
  const skinsSection = document.getElementById('skins-settings');
  const membersSection = document.getElementById('members');
  const showSkinsBtn = document.getElementById('show-skins-settings');
  const showMembersBtn = document.getElementById('show-members');
  const sectionOverlay = document.getElementById('section-overlay');

  const homeSection = document.getElementById('home');
  const voidBackground = homeSection ? homeSection.querySelector('.void-background') : null;

  const homeViewContent = homeSection ? homeSection.querySelector('.home-view-content') : null;
  const iframeViewContent = document.getElementById('iframe-view-content');
  const goToIframeArrow = document.getElementById('go-to-iframe-arrow');
  const goHomeArrow = document.getElementById('go-home-arrow');

  const openSection = (sectionElement) => {
    if (!sectionElement || !sectionOverlay) return;
    sectionOverlay.style.display = 'block';
    sectionElement.style.display = 'flex';
    sectionElement.style.justifyContent = 'center';
    sectionElement.style.alignItems = 'center';
    document.body.classList.add('section-active');
    setTimeout(() => { sectionOverlay.style.opacity = '1'; sectionElement.style.opacity = '1'; }, 50);
  };

  const closeSection = (sectionElement) => {
    if (!sectionElement || !sectionOverlay) return;
    sectionElement.style.opacity = '0'; sectionOverlay.style.opacity = '0';
    setTimeout(() => {
      sectionElement.style.display = 'none';
      sectionOverlay.style.display = 'none';
      document.body.classList.remove('section-active');
    }, 500);
  };

  if (showSkinsBtn) showSkinsBtn.addEventListener('click', () => openSection(skinsSection));
  if (showMembersBtn) showMembersBtn.addEventListener('click', () => openSection(membersSection));


  const setupCloseOnClickOutside = (sectionElement) => {
    if (!sectionElement) return;
    const container = sectionElement.querySelector('.container');
    const grid = sectionElement.querySelector('.settings-grid, .members-grid');
    const sectionTitle = sectionElement.querySelector('.section-title');
    const membersLoader = sectionElement.querySelector('#members-loader');

    sectionElement.addEventListener('click', (event) => {
        let target = event.target;
        let close = false;

        if (target === sectionElement) {
            close = true;
        }
        else if (container && target === container) {
            close = true;
        }
        else if (grid && target === grid) {
            close = true;
        }
        else if (sectionTitle && target === sectionTitle) {
            close = true;
        }
        else if (membersLoader && target === membersLoader) {
            close = true;
        }

        if (close) {
            closeSection(sectionElement);
        }
    });
  };

  setupCloseOnClickOutside(skinsSection);
  setupCloseOnClickOutside(membersSection);


  function playBlinkAnimation() {
      return new Promise((resolve) => {
          if (voidBackground) {
              voidBackground.classList.remove('deep-dark-active', 'random-blink-single-active', 'random-blink-double-active');
              voidBackground.classList.add('blink-active');
              setTimeout(() => {
                  voidBackground.classList.remove('blink-active');
                  resolve();
              }, 800);
          } else {
              resolve();
          }
      });
  }

  function playDeepDarkAnimation() {
      return new Promise((resolve) => {
          if (voidBackground) {
              voidBackground.classList.remove('blink-active', 'random-blink-single-active', 'random-blink-double-active');
              voidBackground.classList.add('deep-dark-active');
              setTimeout(() => {
                  voidBackground.classList.remove('deep-dark-active');
                  resolve();
              }, 800);
          } else {
              resolve();
          }
      });
  }

  function setParticleWindEffect(direction) {
    const particles = document.querySelectorAll('.void-background .particle');
    if (!particles.length) return;

    const animationName = direction === 'left' ? 'windToLeft' : 'windToRight';
    const windEffectDuration = 0.6;

    particles.forEach(particle => {
        const currentOpacity = parseFloat(window.getComputedStyle(particle).opacity);

        if (currentOpacity > 0.05) {
            particle.style.animationName = animationName;
            particle.style.animationDuration = `${windEffectDuration}s`;
            particle.style.animationDelay = `${0.1 + (Math.random() * 0.05)}s`;
            particle.style.animationTimingFunction = 'ease-out';
            particle.style.animationIterationCount = '1';
            particle.style.animationFillMode = 'forwards';
        }
    });
  }


  if (!homeViewContent || !iframeViewContent || !goToIframeArrow || !goHomeArrow || !voidBackground) {
      console.error('Essential page navigation or background elements are missing.');
  } else {
      goToIframeArrow.style.opacity = '1';
      goToIframeArrow.style.pointerEvents = 'auto';

      goToIframeArrow.addEventListener('click', async () => {
          goToIframeArrow.style.opacity = '0';
          goToIframeArrow.style.pointerEvents = 'none';

          await playBlinkAnimation();

          setParticleWindEffect('right');
          const deepDarkPromise = playDeepDarkAnimation();

          homeViewContent.style.opacity = '0';
          homeViewContent.style.transform = 'translateX(-100vw)';
          homeViewContent.style.pointerEvents = 'none';

          await new Promise(resolve => setTimeout(resolve, 100));

          iframeViewContent.classList.add('fade-in-slow');
          iframeViewContent.offsetHeight; // Trigger reflow
          iframeViewContent.style.opacity = '1';
          iframeViewContent.style.transform = 'translateX(0)';
          iframeViewContent.style.pointerEvents = 'auto';
          setTimeout(() => {
              iframeViewContent.classList.remove('fade-in-slow');
          }, 950);

          await deepDarkPromise;

          goHomeArrow.style.opacity = '1';
          goHomeArrow.style.pointerEvents = 'auto';
      });

      goHomeArrow.addEventListener('click', async () => {
          goHomeArrow.style.opacity = '0';
          goHomeArrow.style.pointerEvents = 'none';

          await playBlinkAnimation();

          setParticleWindEffect('left');
          const deepDarkPromise = playDeepDarkAnimation();

          iframeViewContent.style.opacity = '0';
          iframeViewContent.style.transform = 'translateX(100vw)';
          iframeViewContent.style.pointerEvents = 'none';

          await new Promise(resolve => setTimeout(resolve, 100));

          homeViewContent.classList.add('fade-in-slow');
          homeViewContent.offsetHeight; // Trigger reflow
          homeViewContent.style.opacity = '1';
          homeViewContent.style.transform = 'translateX(0)';
          homeViewContent.style.pointerEvents = 'auto';
          setTimeout(() => {
              homeViewContent.classList.remove('fade-in-slow');
          }, 950);

          await deepDarkPromise;

          goToIframeArrow.style.opacity = '1';
          goToIframeArrow.style.pointerEvents = 'auto';
      });
  }

  let randomBlinkTimeoutId = null;
  function triggerRandomBackgroundBlink() {
    if (voidBackground &&
        !voidBackground.classList.contains('blink-active') &&
        !voidBackground.classList.contains('deep-dark-active') &&
        !voidBackground.classList.contains('random-blink-single-active') &&
        !voidBackground.classList.contains('random-blink-double-active') ) {

        const isDoubleBlink = Math.random() < 0.4;

        if (isDoubleBlink) {
            voidBackground.classList.add('random-blink-double-active');
            setTimeout(() => {
                voidBackground.classList.remove('random-blink-double-active');
            }, 700);
        } else {
            voidBackground.classList.add('random-blink-single-active');
            setTimeout(() => {
                voidBackground.classList.remove('random-blink-single-active');
            }, 400);
        }
    }
  }

  function scheduleRandomBlink() {
    if (randomBlinkTimeoutId) {
        clearTimeout(randomBlinkTimeoutId);
    }
    const randomInterval = Math.random() * 4000 + 2000; 
    randomBlinkTimeoutId = setTimeout(() => {
      triggerRandomBackgroundBlink();
      scheduleRandomBlink();
    }, randomInterval);
  }
  if(voidBackground) {
    scheduleRandomBlink(); 
  }


  handleBackToTop();
  const PROXY_BASE_URL = 'https://api.allorigins.win/raw?url='; 
  const TEAM_OSU_URL = 'https://osu.ppy.sh/teams/5629';
  
  loadTeamMembers(`${PROXY_BASE_URL}${encodeURIComponent(TEAM_OSU_URL)}`, PROXY_BASE_URL);

  initializeVoidParticles();

  const osuSettingsDiv = document.getElementById('osu-settings');
  const tabletSettingsDiv = document.getElementById('tablet-settings');
  const btnOsu = document.getElementById('btn-osu');
  const btnTablet = document.getElementById('btn-tablet');
  if (btnOsu && btnTablet && osuSettingsDiv && tabletSettingsDiv) {
    btnOsu.addEventListener('click', () => {
      if (!osuSettingsDiv.classList.contains('active')) {
        tabletSettingsDiv.classList.remove('active');
        btnTablet.classList.remove('active-tab');
        osuSettingsDiv.classList.add('active');
        btnOsu.classList.add('active-tab');
      }
    });
    btnTablet.addEventListener('click', () => {
      if (!tabletSettingsDiv.classList.contains('active')) {
        osuSettingsDiv.classList.remove('active');
        btnOsu.classList.remove('active-tab');
        tabletSettingsDiv.classList.add('active');
        btnTablet.classList.add('active-tab');
      }
    });
  }
  handleLightbox();
});


function createVoidParticle() {
  const voidBg = document.querySelector('.void-background');
  if (!voidBg) return null;
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = `${Math.random() * window.innerWidth}px`;
  particle.style.top = `${Math.random() * window.innerHeight}px`;
  const size = Math.random() * 2.5 + 0.5; 
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  const duration = Math.random() * 10 + 8;
  const delay = Math.random() * 2; 
  particle.style.animationName = 'float'; 
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.animationTimingFunction = 'linear';
  particle.style.animationIterationCount = 'infinite';
  particle.style.animationFillMode = 'none';
  voidBg.appendChild(particle);
  setTimeout(() => {
    if (particle.parentElement) {
        particle.remove();
    }
  }, (duration + delay) * 1000 + 500);
  return particle;
}

function initializeVoidParticles() {
    const initialParticleCount = 70;
    const particleCreationInterval = 100;
    const regenerationInterval = 5000;
    const voidBg = document.querySelector('.void-background');
    if (!voidBg) return;
    for (let i = 0; i < initialParticleCount; i++) {
        setTimeout(createVoidParticle, i * particleCreationInterval);
    }
    setInterval(() => {
        const batchSize = 20; 
        for (let i = 0; i < batchSize; i++) {
            setTimeout(createVoidParticle, i * (particleCreationInterval / 2));
        }
    }, regenerationInterval);
}

async function fetchUserRank(userId, proxyForIndividualUserPages) {
    const userProfileUrl = `https://osu.ppy.sh/users/${userId}`;
    try {
        const res = await fetch(`${proxyForIndividualUserPages}${encodeURIComponent(userProfileUrl)}`);
        if (!res.ok) {
            console.error(`Failed to fetch profile for user ${userId}: ${res.status}`);
            return null;
        }
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        
        const profileDataElement = doc.querySelector('.js-react--profile-page[data-initial-data]');
        if (profileDataElement) {
            const initialDataAttr = profileDataElement.getAttribute('data-initial-data');
            if (initialDataAttr) {
                try {
                    const profileData = JSON.parse(initialDataAttr);
                    const rank = profileData?.user?.statistics?.global_rank; 
                    if (rank && typeof rank === 'number' && rank > 0) {
                        return `#${rank.toLocaleString()}`;
                    }
                } catch (e) {
                    console.error(`Error parsing data-initial-data for user ${userId}:`, e);
                }
            }
        }
        console.warn(`Could not extract rank for user ${userId} from their profile page's data-initial-data.`);
        return null;
    } catch (err) {
        console.error(`Error fetching rank for user ${userId}:`, err);
        return null;
    }
}

async function loadTeamMembers(teamPageFullUrl, proxyBaseUrl) { 
  const grid = document.querySelector('.members-grid');
  const loader = document.getElementById('members-loader');
  const defaultAvatar = 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha';
  const fallbackMembersData = [ // Added some dummy data for fallback demonstration
    { id: 123, username: 'FallbackPlayer1', avatar_url: defaultAvatar, country_code: 'US' },
    { id: 456, username: 'FallbackPlayer2', avatar_url: defaultAvatar, country_code: 'JP' }
  ];

  if (!grid || !loader) {
      console.error("Members grid or loader not found.");
      if (loader) loader.textContent = "Error: Page elements missing for members display.";
      return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); 

    const res = await fetch(teamPageFullUrl, { signal: controller.signal }); 
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error fetching team page! Status: ${res.status}`);

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const wrappers = doc.querySelectorAll('.js-react--user-card');

    if (!wrappers.length) throw new Error('No members found — .js-react--user-card selector may be outdated or not present.');

    const memberPromises = [];

    wrappers.forEach((el, index) => {
      const dataAttr = el.getAttribute('data-user');
      if (!dataAttr || dataAttr.trim() === '') return;

      let data;
      try {
        data = JSON.parse(dataAttr);
      } catch (e) {
        console.error(`Parse error for member data: ${e.message}`, el);
        return;
      }

      const { id, username, avatar_url, country_code } = data; 
      if (!id || !username) return;
      
      const validAvatar = (avatar_url && typeof avatar_url === 'string' && avatar_url.trim() !== '' && avatar_url !== 'https://assets.ppy.sh/images/layout/avatar-guest.png') ? avatar_url : defaultAvatar;
      
      const flagUrl = country_code ? `https://osu.ppy.sh/images/flags/${country_code.toUpperCase()}.png` : '';
      const flagImgHtml = country_code ? `<img src="${flagUrl}" alt="${country_code}" class="member-flag" title="${country_code}">` : '';

      const card = document.createElement('div');
      card.className = 'member-card';
      card.style.setProperty('--index', index);
      card.innerHTML = `
        <a href="https://osu.ppy.sh/users/${id}" target="_blank" rel="noopener noreferrer">
          <img src="${validAvatar}" alt="${username}" class="member-img" onerror="this.onerror=null;this.src='${defaultAvatar}';">
        </a>
        <div class="member-info">
          <h3>${username}</h3>
          <p class="member-details">
            ${flagImgHtml}
            <span class="member-rank-placeholder-${id}">Global Rank: Fetching...</span>
          </p>
        </div>`;
      grid.appendChild(card);

      memberPromises.push(
          fetchUserRank(id, proxyBaseUrl) 
            .then(rank => ({ id, rank }))
            .catch(err => {
                console.error(`Failed to get rank for user ${id}:`, err);
                return {id, rank: 'N/A'}; 
            })
      );
    });
    
    if (memberPromises.length > 0) {
        loader.style.display = 'none';
        grid.style.display = 'grid';
    } else {
        loader.textContent = 'No member data could be initially processed from the team page.';
        grid.innerHTML = ''; // Clear grid if no members found to process initially
        // Display fallback if primary fetch path led to no members for promises
        if (fallbackMembersData.length > 0 && grid) { // Check grid exists
            fallbackMembersData.forEach((member, index) => {
                const fallbackCard = document.createElement('div');
                fallbackCard.className = 'member-card';
                fallbackCard.style.setProperty('--index', index);
                const fallbackFlagUrl = member.country_code ? `https://osu.ppy.sh/images/flags/${member.country_code.toUpperCase()}.png` : '';
                const fallbackFlagImgHtml = member.country_code ? `<img src="${fallbackFlagUrl}" alt="${member.country_code}" class="member-flag" title="${member.country_code}">` : '';
    
                fallbackCard.innerHTML = `
                    <a href="https://osu.ppy.sh/users/${member.id}" target="_blank" rel="noopener noreferrer">
                        <img src="${member.avatar_url}" alt="${member.username}" class="member-img">
                    </a>
                    <div class="member-info">
                        <h3>${member.username}</h3>
                        <p class="member-details">
                            ${fallbackFlagImgHtml}
                            <span>Global Rank: N/A</span>
                        </p>
                    </div>`;
                grid.appendChild(fallbackCard);
            });
            if (loader) loader.style.display = 'none'; // Hide loader if showing fallback
            grid.style.display = 'grid'; // Ensure grid is visible for fallbacks
        }
        return; 
    }

    const ranks = await Promise.allSettled(memberPromises);

    ranks.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
            const { id, rank } = result.value;
            const rankSpan = grid.querySelector(`.member-rank-placeholder-${id}`);
            if (rankSpan) {
                rankSpan.textContent = `Global Rank: ${rank || 'N/A'}`;
            }
        }
    });

  } catch (err) {
    console.error('Error loading team members:', err.message);
    loader.textContent = `Failed to load members. ${err.name === 'AbortError' ? 'Request timed out.' : err.message}.`;
    grid.innerHTML = ''; 
    if (fallbackMembersData.length > 0 && grid) { // Check grid exists for fallback display
        fallbackMembersData.forEach((member, index) => {
            const fallbackCard = document.createElement('div');
            fallbackCard.className = 'member-card';
            fallbackCard.style.setProperty('--index', index);
            const fallbackFlagUrl = member.country_code ? `https://osu.ppy.sh/images/flags/${member.country_code.toUpperCase()}.png` : '';
            const fallbackFlagImgHtml = member.country_code ? `<img src="${fallbackFlagUrl}" alt="${member.country_code}" class="member-flag" title="${member.country_code}">` : '';

            fallbackCard.innerHTML = `
                <a href="https://osu.ppy.sh/users/${member.id}" target="_blank" rel="noopener noreferrer">
                    <img src="${member.avatar_url}" alt="${member.username}" class="member-img">
                </a>
                <div class="member-info">
                    <h3>${member.username}</h3>
                    <p class="member-details">
                        ${fallbackFlagImgHtml}
                        <span>Global Rank: N/A</span>
                    </p>
                </div>`;
            grid.appendChild(fallbackCard);
        });
        if(loader) loader.style.display = 'none';
        grid.style.display = 'grid';
    } else {
        if (grid) grid.style.display = 'none';
    }
  }
}


function handleBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (document.body.classList.contains('section-active')) {
            btn.classList.remove('visible');
            return;
        }
        btn.classList.toggle('visible', window.pageYOffset > 300);
    });
    btn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

function handleLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('zoomable')) {
        lightboxImg.src = e.target.src;
        lightbox.style.display = 'flex';
      }
      if (e.target === lightbox || e.target === lightboxImg) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }
    });
}
