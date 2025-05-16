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

const PROXY_CONFIGS = [
  { type: 'param_encoded', base: 'https://api.allorigins.win/raw?url=' },
  { type: 'param_encoded', base: 'https://corsproxy.io/?' }, // Example: https://corsproxy.io/?ENCODED_URL
  { type: 'append_unencoded', base: 'https://thingproxy.freeboard.io/fetch/' }, // Example: https://thingproxy.freeboard.io/fetch/UNENCODED_URL
  { type: 'param_encoded', base: 'https://cors-bypass.haines.workers.dev/?url=' },
  { type: 'param_encoded', base: 'https://api.codetabs.com/v1/proxy/?quest=' },
];

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
  
  const TEAM_OSU_URL = 'https://osu.ppy.sh/teams/5629';
  
  tryProxiesAndFetch(TEAM_OSU_URL, PROXY_CONFIGS)
    .then(data => {
      const loader = document.getElementById('members-loader');
      const grid = document.querySelector('.members-grid'); // Define grid here for fallback
      if (data && data.html && data.successfulProxyConfig) {
        loadTeamMembers(data.html, data.successfulProxyConfig);
      } else {
        if (loader) loader.textContent = "Failed to fetch team page using all available proxies.";
        console.error("Failed to fetch team page with any proxy.");
        const fallbackMembersData = [
          { id: 123, username: 'FallbackPlayer1', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'US', is_online: false },
          { id: 456, username: 'FallbackPlayer2', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'JP', is_online: true }
        ];
        displayFallbackMembers(grid, loader, fallbackMembersData);
      }
    })
    .catch(err => {
        const loader = document.getElementById('members-loader');
        const grid = document.querySelector('.members-grid'); // Define grid here for fallback
        console.error("Error in initial team page fetch attempt:", err);
        if (loader) loader.textContent = "Error fetching team page. Check console.";
        const fallbackMembersData = [
            { id: 123, username: 'FallbackPlayer1', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'US', is_online: false },
            { id: 456, username: 'FallbackPlayer2', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'JP', is_online: true }
        ];
        displayFallbackMembers(grid, loader, fallbackMembersData);
    });

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

function constructProxiedUrl(targetUrl, proxyConfig) {
    if (proxyConfig.type === 'param_encoded') {
        return `${proxyConfig.base}${encodeURIComponent(targetUrl)}`;
    } else if (proxyConfig.type === 'append_unencoded') {
        return `${proxyConfig.base}${targetUrl}`;
    }
    console.warn(`Unknown proxy type for ${proxyConfig.base}, defaulting to param_encoded.`);
    return `${proxyConfig.base}${encodeURIComponent(targetUrl)}`;
}


async function tryProxiesAndFetch(targetUrl, proxyConfigs, isJson = false) {
  for (const config of proxyConfigs) {
    const fullProxyUrl = constructProxiedUrl(targetUrl, config);
    
    console.log(`Trying proxy: ${config.base} (type: ${config.type}) for target: ${targetUrl}`);
    // console.log(`Full constructed URL: ${fullProxyUrl}`); // Optional: for deeper debugging

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(fullProxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`Success with proxy: ${config.base} for target: ${targetUrl}`);
        if (isJson) {
          const jsonData = await response.json();
          return { data: jsonData, successfulProxyConfig: config };
        } else {
          const htmlData = await response.text();
          return { html: htmlData, successfulProxyConfig: config };
        }
      } else {
        console.warn(`Proxy ${config.base} returned status: ${response.status} for ${targetUrl}`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn(`Proxy ${config.base} timed out for ${targetUrl}`);
      } else {
        console.warn(`Proxy ${config.base} fetch failed for ${targetUrl} with error:`, error.message);
      }
    }
  }
  console.error(`All proxies failed for target: ${targetUrl}`);
  return null;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUserRank(userId, successfulProxyConfig, maxRetries = 2, attempt = 1) {
    const userProfileUrl = `https://osu.ppy.sh/users/${userId}`;
    const proxiedUserProfileUrl = constructProxiedUrl(userProfileUrl, successfulProxyConfig);

    // console.log(`Fetching rank for user ${userId} (Attempt ${attempt}/${maxRetries + 1}) via ${successfulProxyConfig.base}`);
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(proxiedUserProfileUrl, {signal: controller.signal});
        clearTimeout(timeoutId);

        if (!res.ok) {
            console.error(`Attempt ${attempt}: Failed to fetch profile for user ${userId} via ${successfulProxyConfig.base}. Status: ${res.status} ${res.statusText}. URL: ${proxiedUserProfileUrl}`);
            // Retry on general network/proxy failures (indicated by status code >= 500 or specific error types below)
            // or if the status is 0 (often indicates a CORS issue or blocked request not properly handled by proxy)
            if ((res.status >= 500 || res.status === 0 || res.status === 404) && attempt <= maxRetries) { // Added 404 for retry due to proxy flakiness
                console.log(`Retrying for user ${userId} in ${attempt * 1500}ms... (Status: ${res.status})`);
                await delay(attempt * 1500); // Slightly increasing delay
                return fetchUserRank(userId, successfulProxyConfig, maxRetries, attempt + 1);
            }
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
                    } else if (profileData?.user?.statistics?.global_rank === null || profileData?.user?.statistics?.global_rank === 0) {
                        console.log(`User ${userId} is unranked based on profile data (rank: ${profileData?.user?.statistics?.global_rank}).`);
                        return 'N/A';
                    }
                } catch (e) {
                    console.error(`Error parsing data-initial-data for user ${userId}:`, e);
                }
            }
        }
        console.warn(`Attempt ${attempt}: Could not extract rank for user ${userId} from profile page data (via ${successfulProxyConfig.base}).`);
        return 'N/A'; 
    } catch (err) {
      console.error(`Attempt ${attempt}: Error fetching rank for user ${userId} via ${successfulProxyConfig.base}:`, err.message);
      if (attempt <= maxRetries) {
          console.log(`Retrying for user ${userId} in ${attempt * 1500}ms due to fetch error...`);
          await delay(attempt * 1500);
          return fetchUserRank(userId, successfulProxyConfig, maxRetries, attempt + 1);
      }
      return null;
    }
}

async function loadTeamMembers(teamPageHtml, successfulProxyConfigForUserProfiles) { 
  const grid = document.querySelector('.members-grid');
  const loader = document.getElementById('members-loader');

  if (!grid || !loader) { return; }

  try {
    const doc = new DOMParser().parseFromString(teamPageHtml, 'text/html');
    const wrappers = doc.querySelectorAll('.js-react--user-card');

    if (!wrappers.length) throw new Error('No members found in provided team page HTML.');

    const memberPromises = [];
    grid.innerHTML = '';


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

      const { id, username, avatar_url, country_code, is_online } = data; 
      if (!id || !username) return;
      
      const defaultAvatar = 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha';
      const validAvatar = (avatar_url && typeof avatar_url === 'string' && avatar_url.trim() !== '' && avatar_url !== 'https://assets.ppy.sh/images/layout/avatar-guest.png') ? avatar_url : defaultAvatar;
      
      const flagUrl = country_code ? `https://osu.ppy.sh/images/flags/${country_code.toUpperCase()}.png` : '';
      const flagImgHtml = country_code ? `<img src="${flagUrl}" alt="${country_code.toUpperCase()}" class="member-flag" title="${country_code.toUpperCase()}">` : '';

      const card = document.createElement('div');
      card.className = 'member-card';
      if (is_online) { 
          card.classList.add('member-online');
      }
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
          fetchUserRank(id, successfulProxyConfigForUserProfiles) 
            .then(rank => ({ id, rank }))
            .catch(err => {
                return {id, rank: 'N/A'}; 
            })
      );
    });
    
    if (memberPromises.length > 0) {
        if (loader) loader.style.display = 'none';
        if (grid) grid.style.display = 'grid';
    } else {
        if(loader) loader.textContent = 'No member data could be parsed from the team page.';
        const fallbackData = [
          { id: 123, username: 'FallbackPlayer1', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'US', is_online: false },
          { id: 456, username: 'FallbackPlayer2', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'JP', is_online: true }
        ];
        displayFallbackMembers(grid, loader, fallbackData); 
        return; 
    }

    const ranks = await Promise.allSettled(memberPromises);

    ranks.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
            const { id, rank } = result.value;
            const rankSpan = grid.querySelector(`.member-rank-placeholder-${id}`);
            if (rankSpan) {
                rankSpan.textContent = `Global Rank: ${rank || 'N/A'}`; // Default to N/A if rank is null from fetchUserRank
            }
        } else if (result.status === 'rejected') {
             // Error should have been logged by fetchUserRank or its promise wrapper.
             // Find the card by ID and update its placeholder to N/A if it's still "Fetching..."
             // For simplicity, we assume if it was rejected, the rank would remain "Fetching..." or already be set to N/A.
             // More robustly, you could extract the ID from the rejection if possible and update the specific card.
             console.error("A rank fetch promise was rejected:", result.reason);
        }
    });

  } catch (err) {
    console.error('Error processing team members from fetched HTML:', err.message);
    if(loader) loader.textContent = `Error processing members. ${err.message}.`;
    const fallbackData = [
        { id: 123, username: 'FallbackPlayer1', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'US', is_online: false },
        { id: 456, username: 'FallbackPlayer2', avatar_url: 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha', country_code: 'JP', is_online: true }
    ];
    displayFallbackMembers(grid, loader, fallbackData);
  }
}

function displayFallbackMembers(grid, loader, fallbackData) {
    if (!grid) return;
    grid.innerHTML = ''; 
    const defaultAvatar = 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha';

    if (fallbackData && fallbackData.length > 0) {
        fallbackData.forEach((member, index) => {
            const card = document.createElement('div');
            card.className = 'member-card';
            if (member.is_online) {
                card.classList.add('member-online');
            }
            card.style.setProperty('--index', index);
            const flagUrl = member.country_code ? `https://osu.ppy.sh/images/flags/${member.country_code.toUpperCase()}.png` : '';
            const flagImgHtml = member.country_code ? `<img src="${flagUrl}" alt="${member.country_code.toUpperCase()}" class="member-flag" title="${member.country_code.toUpperCase()}">` : '';

            card.innerHTML = `
                <a href="https://osu.ppy.sh/users/${member.id}" target="_blank" rel="noopener noreferrer">
                    <img src="${member.avatar_url || defaultAvatar}" alt="${member.username}" class="member-img" onerror="this.onerror=null;this.src='${defaultAvatar}';">
                </a>
                <div class="member-info">
                    <h3>${member.username}</h3>
                    <p class="member-details">
                        ${flagImgHtml}
                        <span>Global Rank: N/A</span>
                    </p>
                </div>`;
            grid.appendChild(card);
        });
        if (loader) loader.style.display = 'none';
        grid.style.display = 'grid';
    } else {
        if (loader) loader.textContent = 'No members to display and no fallback available.';
        grid.style.display = 'none';
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