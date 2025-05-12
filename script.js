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
      const randomInterval = Math.random() * 4000 + 2000; // Between 2 and 6 seconds
  
      randomBlinkTimeoutId = setTimeout(() => {
        triggerRandomBackgroundBlink();
        scheduleRandomBlink();
      }, randomInterval);
    }
    if(voidBackground) {
      scheduleRandomBlink(); // Start the random blinking
    }
  
  
    handleBackToTop();
    const proxy = 'https://api.allorigins.win/raw?url=';
    const teamUrl = encodeURIComponent('https://osu.ppy.sh/teams/5629');
    loadTeamMembers(proxy + teamUrl);
  
    initializeVoidParticles();
  
    // Settings Tabs Logic
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
  
    // Lightbox setup is inside handleLightbox function now
    handleLightbox();
  });
  
  
  function createVoidParticle() {
    const voidBg = document.querySelector('.void-background');
    if (!voidBg) return null;
  
    const particle = document.createElement('div');
    particle.className = 'particle';
  
    // Position particle randomly within the viewport initially
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `${Math.random() * window.innerHeight}px`;
  
    // Randomize size
    const size = Math.random() * 2.5 + 0.5; // Size between 0.5px and 3px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
  
    // Randomize animation duration and delay
    const duration = Math.random() * 10 + 8; // Duration between 8s and 18s
    const delay = Math.random() * 2; // Delay up to 2s
  
    particle.style.animationName = 'float'; // Keep using float by default
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationTimingFunction = 'linear';
    particle.style.animationIterationCount = 'infinite';
    particle.style.animationFillMode = 'none'; // Reset fill mode
  
    voidBg.appendChild(particle);
  
    // Self-destruct after animation cycle + buffer to prevent buildup if regeneration is faster
    setTimeout(() => {
      if (particle.parentElement) {
          particle.remove();
      }
    }, (duration + delay) * 1000 + 500); // Adjust time slightly longer than animation
    return particle; // Return the particle in case it's needed immediately
  }
  
  function initializeVoidParticles() {
      const initialParticleCount = 70;
      const particleCreationInterval = 100; // ms between creating initial particles
      const regenerationInterval = 5000; // ms between regeneration batches
      const voidBg = document.querySelector('.void-background');
      if (!voidBg) return;
  
      // Initial burst of particles
      for (let i = 0; i < initialParticleCount; i++) {
          setTimeout(createVoidParticle, i * particleCreationInterval);
      }
  
      // Regenerate particles periodically
      setInterval(() => {
          const batchSize = 20; // How many particles to add each interval
          for (let i = 0; i < batchSize; i++) {
              // Slightly faster creation within the batch
              setTimeout(createVoidParticle, i * (particleCreationInterval / 2));
          }
      }, regenerationInterval);
  }
  
  
  async function loadTeamMembers(url) {
    const grid = document.querySelector('.members-grid');
    const loader = document.getElementById('members-loader');
    const defaultAvatar = 'https://via.placeholder.com/200/000000/FFFFFF/?text=Uchiha';
    // Simple fallback data in case the fetch fails completely
    const fallbackMembers = [
      { id: 12345, username: 'FallbackMember1', avatar_url: defaultAvatar },
      { id: 67890, username: 'FallbackMember2', avatar_url: defaultAvatar }
    ];
  
    if (!grid || !loader) {
        console.error("Members grid or loader not found.");
        if (loader) loader.textContent = "Error: Page elements missing for members display.";
        return;
    }
  
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
  
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
  
      // Updated selector based on current osu! website structure (inspect element if it breaks)
      const wrappers = doc.querySelectorAll('.js-react--user-card'); // Find elements holding user data
  
      if (!wrappers.length) throw new Error('No members found — selector may be outdated.');
  
      let validMembers = 0;
      wrappers.forEach((el, index) => {
        const dataAttr = el.getAttribute('data-user');
        if (!dataAttr || dataAttr.trim() === '') return; // Skip if no data attribute
  
        let data;
        try {
          data = JSON.parse(dataAttr); // Parse the JSON data
        } catch (e) {
          console.error(`Parse error for member data: ${e.message}`);
          return; // Skip this member if data is malformed
        }
  
        const { id, username, avatar_url } = data;
        if (!id || !username) return; // Skip if essential data is missing
  
        // Use default avatar if the provided one is missing, empty, or the generic guest avatar
        const validAvatar = (avatar_url && typeof avatar_url === 'string' && avatar_url.trim() !== '' && avatar_url !== 'https://assets.ppy.sh/images/layout/avatar-guest.png') ? avatar_url : defaultAvatar;
  
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.setProperty('--index', index); // For staggered animation
        card.innerHTML = `
          <a href="https://osu.ppy.sh/users/${id}" target="_blank" rel="noopener noreferrer">
            <img src="${validAvatar}" alt="${username}" class="member-img" onerror="this.onerror=null;this.src='${defaultAvatar}';">
          </a>
          <div class="member-info">
            <h3>${username}</h3>
            </div>`; // Add more details like rank if available and desired
            // Example: <p>Rank: #${data.statistics?.global_rank ?? 'N/A'}</p>
        grid.appendChild(card);
        validMembers++;
      });
  
      if (validMembers === 0 && wrappers.length > 0) throw new Error('No valid member data extracted from found elements.');
      if (validMembers > 0) {
          loader.style.display = 'none';
          grid.style.display = 'grid';
      } else {
          throw new Error('No team members could be processed.');
      }
  
    } catch (err) {
      console.error('Error loading team members:', err.message);
      loader.textContent = `Failed to load members. ${err.name === 'AbortError' ? 'Request timed out.' : err.message}. Displaying fallback.`;
      grid.innerHTML = ''; // Clear any potentially broken partial list
      // Display fallback members
      if (fallbackMembers.length > 0) {
          fallbackMembers.forEach((member, index) => {
              const card = document.createElement('div');
              card.className = 'member-card';
              card.style.setProperty('--index', index);
              card.innerHTML = `
                  <a href="https://osu.ppy.sh/users/${member.id}" target="_blank" rel="noopener noreferrer">
                      <img src="${member.avatar_url}" alt="${member.username}" class="member-img">
                  </a>
                  <div class="member-info">
                      <h3>${member.username}</h3>
                  </div>`;
              grid.appendChild(card);
          });
          grid.style.display = 'grid'; // Ensure grid is visible for fallbacks
      } else {
          // If even fallbacks aren't defined, just show the error.
          loader.textContent = `Failed to load members and no fallback data available.`;
          grid.style.display = 'none';
      }
    }
  }
  
  function handleBackToTop() {
      const btn = document.getElementById('backToTop');
      if (!btn) return;
  
      window.addEventListener('scroll', () => {
          // Hide button if a modal/section is active
          if (document.body.classList.contains('section-active')) {
              btn.classList.remove('visible');
              return;
          }
          // Show button when scrolled down
          btn.classList.toggle('visible', window.pageYOffset > 300);
      });
  
      btn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
  }
  
  function handleLightbox() {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
  
      if (!lightbox || !lightboxImg) return;
  
      document.addEventListener('click', (e) => {
        // Open lightbox if a zoomable image is clicked
        if (e.target.classList.contains('zoomable')) {
          lightboxImg.src = e.target.src;
          lightbox.style.display = 'flex';
        }
  
        // Close lightbox if the overlay or the image inside is clicked
        if (e.target === lightbox || e.target === lightboxImg) {
          lightbox.style.display = 'none';
          lightboxImg.src = ''; // Clear src to prevent brief flash of old image
        }
      });
  }