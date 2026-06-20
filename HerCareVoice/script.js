/* ==========================================================================
   HerCare Voice Interactive JavaScript
   Author: Rani Neog Adhikary - BuildSmart AI
   Version: 1.0.0
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking nav links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // --- Header Scrolled Shadow ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Clipboard Utility (Copy Phone Number) ---
    const copyBtn = document.getElementById('btn-copy-number');
    const phoneNumber = '+16598371320';

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied!
                `;
                copyBtn.style.backgroundColor = '#1D9E75';
                copyBtn.style.color = '#ffffff';

                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.backgroundColor = '';
                    copyBtn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // --- Scroll Triggered Counter Animation ---
    const counterElements = document.querySelectorAll('.metric-val');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        if (target === 0) {
            element.textContent = '0';
            return;
        }

        const timer = setInterval(() => {
            current += 1;
            element.textContent = current;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(element => {
        counterObserver.observe(element);
    });

    // --- Interactive Voice Call Simulator ---
    const btnSimulate = document.getElementById('btn-simulate-call');
    const simulationChat = document.getElementById('simulation-chat');
    const widgetStatus = document.querySelector('.widget-status');
    const callDuration = document.getElementById('call-duration');
    const waveformBars = document.querySelectorAll('.waveform .bar');

    let isSimulating = false;
    let durationInterval = null;
    let waveformInterval = null;
    let scriptTimers = [];

    const dialogueScript = [
        { sender: 'maya', text: 'Thank you for calling HerCare Women\'s Health. This is Maya, your digital patient coordinator. How can I help you today?', delay: 1000 },
        { sender: 'patient', text: 'Hi, I\'d like to book a routine annual wellness checkup, please.', delay: 4500 },
        { sender: 'maya', text: 'I would be happy to check availability for that checkup! May I please start with your full name and date of birth?', delay: 8000 },
        { sender: 'patient', text: 'Sure, my name is Sarah Jenkins, and my date of birth is November 12, 1993.', delay: 12000 },
        { sender: 'maya', text: 'Got it, Sarah Jenkins, born November 12, 1993. What is the best email address to send your booking confirmation?', delay: 16000 },
        { sender: 'patient', text: 'My email is sarah.jenkins@example.com.', delay: 20000 },
        { sender: 'maya', text: 'Perfect. I see an opening for an annual wellness exam with Dr. Evans next Tuesday, June 23rd, at 10:00 AM, or Wednesday, June 24th, at 2:30 PM. Do either of those work for you?', delay: 23500 },
        { sender: 'patient', text: 'Tuesday at 10:00 AM works great.', delay: 29000 },
        { sender: 'maya', text: 'Excellent. I have scheduled you for Tuesday, June 23rd at 10:00 AM with Dr. Evans. I\'ve sent a confirmation email to sarah.jenkins@example.com and synchronized this session with your patient file. Is there anything else I can help you with today?', delay: 32500 },
        { sender: 'patient', text: 'No, that\'s everything. Thank you so much!', delay: 38500 },
        { sender: 'maya', text: 'You\'re very welcome, Sarah! We look forward to seeing you. Have a wonderful day!', delay: 41500 }
    ];

    const startSimulation = () => {
        isSimulating = true;
        btnSimulate.disabled = true;
        btnSimulate.innerHTML = `
            <span class="pulse-dot" style="width: 8px; height: 8px; background-color: #ff5f56; display: inline-block; border-radius: 50%; margin-right: 6px;"></span>
            Call Active...
        `;
        
        // Reset and connect
        simulationChat.innerHTML = '';
        appendMessage('system', 'Incoming patient connection... Connected to Maya.');
        
        widgetStatus.classList.remove('live');
        widgetStatus.innerHTML = '<span class="pulse-dot" style="background-color: #ff5f56; animation: pulse 1s infinite;"></span> Call Active';
        widgetStatus.style.color = '#ff5f56';
        
        // Start duration counter
        let seconds = 0;
        callDuration.textContent = '00:00';
        durationInterval = setInterval(() => {
            seconds++;
            const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            callDuration.textContent = `${mins}:${secs}`;
        }, 1000);

        // Start waveform animation
        startWaveformAnimation();

        // Queue dialogue messages
        dialogueScript.forEach((step) => {
            const timer = setTimeout(() => {
                appendMessage(step.sender, step.text);
                // Trigger speaking spikes on waveform
                triggerWaveformSpike(step.sender === 'maya' ? 'maya' : 'patient');
            }, step.delay);
            scriptTimers.push(timer);
        });

        // End call hook
        const endCallTimer = setTimeout(() => {
            endSimulation(true);
        }, 45500);
        scriptTimers.push(endCallTimer);
    };

    const endSimulation = (completed = false) => {
        isSimulating = false;
        clearInterval(durationInterval);
        stopWaveformAnimation();
        
        // Clear remaining script timeouts if any
        scriptTimers.forEach(timer => clearTimeout(timer));
        scriptTimers = [];

        btnSimulate.disabled = false;
        btnSimulate.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Simulate Call
        `;

        widgetStatus.innerHTML = '<span class="pulse-dot"></span> Online';
        widgetStatus.style.color = '';
        widgetStatus.classList.add('live');

        if (completed) {
            appendMessage('success', '✓ Appointment booked in Cal.com & Google Calendar.<br>✓ Session transcription logged to Google Sheets.');
            appendMessage('system', 'Call disconnected. Total duration: ' + callDuration.textContent);
        } else {
            appendMessage('system', 'Call terminated.');
            callDuration.textContent = '00:00';
        }
    };

    const appendMessage = (sender, text) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = text;
        simulationChat.appendChild(messageDiv);
        simulationChat.scrollTop = simulationChat.scrollHeight;
    };

    const startWaveformAnimation = () => {
        waveformInterval = setInterval(() => {
            // Idle background hum
            waveformBars.forEach(bar => {
                const randomHeight = Math.floor(Math.random() * 15) + 6;
                bar.style.height = `${randomHeight}px`;
                bar.style.backgroundColor = 'rgba(29, 158, 117, 0.4)';
            });
        }, 120);
    };

    const triggerWaveformSpike = (speaker) => {
        // Speaker specific colors and higher amplitude spikes
        const color = speaker === 'maya' ? '#1D9E75' : '#ffffff';
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                waveformBars.forEach(bar => {
                    const spikeHeight = Math.floor(Math.random() * 25) + 12;
                    bar.style.height = `${spikeHeight}px`;
                    bar.style.backgroundColor = color;
                });
            }, i * 150);
        }
    };

    const stopWaveformAnimation = () => {
        clearInterval(waveformInterval);
        // Flatline
        waveformBars.forEach(bar => {
            bar.style.height = '4px';
            bar.style.backgroundColor = '';
        });
    };

    if (btnSimulate) {
        btnSimulate.addEventListener('click', () => {
            if (!isSimulating) {
                startSimulation();
            } else {
                endSimulation(false);
            }
        });
    }

    // --- Custom Desktop Call Modal ---
    const callModal = document.getElementById('call-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnModalCopy = document.getElementById('btn-modal-copy');
    const telLinks = document.querySelectorAll('a[href^="tel:"]');

    const openModal = () => {
        if (callModal) {
            callModal.classList.add('active');
        }
    };

    const closeModal = () => {
        if (callModal) {
            callModal.classList.remove('active');
        }
    };

    // Detect if desktop device
    const isDesktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isDesktop) {
        telLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Stop FaceTime/Default dialer from launching
                openModal();
            });
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeModal);
    }

    if (callModal) {
        // Close modal when clicking on background overlay
        callModal.addEventListener('click', (e) => {
            if (e.target === callModal) {
                closeModal();
            }
        });
    }

    if (btnModalCopy) {
        btnModalCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                const originalText = btnModalCopy.textContent;
                btnModalCopy.textContent = 'Copied!';
                btnModalCopy.style.backgroundColor = '#1D9E75';
                btnModalCopy.style.color = '#ffffff';

                setTimeout(() => {
                    btnModalCopy.textContent = originalText;
                    btnModalCopy.style.backgroundColor = '';
                    btnModalCopy.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy in modal: ', err);
            });
        });
    }

});
