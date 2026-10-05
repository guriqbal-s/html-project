// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set Current Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const emailToCopy = 'guriqbalsinghbal@outlook.com';

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        copyText.textContent = 'Copied to clipboard!';
        copyBtn.classList.add('text-sage-400');
        setTimeout(() => {
          copyText.textContent = 'Copy email to clipboard';
          copyBtn.classList.remove('text-sage-400');
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }

  // Contact Form Mailto Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('user-email').value.trim();
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Guriqbal,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
      );

      window.location.href = `mailto:guriqbalsinghbal@outlook.com?subject=${subject}&body=${body}`;
    });
  }

  // ----------------------------------------------------
  // Interactive Bash Terminal Simulator (Soothing Palette)
  // ----------------------------------------------------
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('clear-term-btn');
  const cmdPresets = document.querySelectorAll('.cmd-preset');

  const commandHistory = [];
  let historyIndex = -1;

  // Simulator Commands & Output
  const commandResponses = {
    'help': `
<span class="text-sand-400 font-semibold">Linux Lab Commands:</span>
  <span class="text-sage-400">whoami</span>          - About Guriqbal Singh & current stage
  <span class="text-sage-400">ls -la</span>          - List script files and Linux permissions
  <span class="text-sage-400">bash backup.sh</span>   - Execute automated directory backup script
  <span class="text-sage-400">bash monitor.sh</span>  - Run system health & memory monitor
  <span class="text-sage-400">cat roadmap.txt</span>  - Read the 10-week learning progression
  <span class="text-sage-400">cat backup.sh</span>   - Inspect the bash backup source code
  <span class="text-sage-400">free -m</span>         - Display memory statistics
  <span class="text-sage-400">uptime</span>          - Show system uptime & load average
  <span class="text-sage-400">contact</span>         - Display email & GitHub info
  <span class="text-sage-400">clear</span>           - Clear terminal window
    `,

    'whoami': `
<span class="text-mineral-100 font-semibold">Guriqbal Singh</span> (guriqbal-s)
• <span class="text-sand-400">Education:</span> Master of Commerce (M.Com) & B.Com
• <span class="text-sage-400">Current Phase:</span> Week 3 of Cloud & DevOps Transition
• <span class="text-sand-300">Focus:</span> Linux CLI, Bash Scripting, File Permissions, Git, AWS Free Tier
• <span class="text-mineral-300">Goal:</span> Junior Cloud/DevOps Engineer with deep business & FinOps understanding
    `,

    'ls -la': `
<span class="text-mineral-500">total 36</span>
drwxr-xr-x 2 guriqbal guriqbal 4096 Oct  5 21:30 <span class="text-sand-400 font-semibold">.</span>
drwxr-xr-x 4 guriqbal guriqbal 4096 Oct  5 21:00 <span class="text-sand-400 font-semibold">..</span>
-rwxr-xr-x 1 guriqbal guriqbal 1042 Oct  3 18:40 <span class="text-sage-400">backup.sh</span>
-rwxr-xr-x 1 guriqbal guriqbal  980 Oct  4 15:12 <span class="text-sage-400">monitor.sh</span>
-rwxr-xr-x 1 guriqbal guriqbal  850 Oct  5 10:20 <span class="text-sage-400">user_setup.sh</span>
-rw-r--r-- 1 guriqbal guriqbal  620 Oct  5 21:15 notes.txt
-rw-r--r-- 1 guriqbal guriqbal 1240 Oct  5 21:25 roadmap.txt
    `,

    'bash backup.sh': `
<span class="text-sand-400">[2026-10-05 21:50:12]</span> <span class="text-mineral-100 font-medium">Starting automated backup...</span>
[INFO] Source directory: /home/guriqbal/workspace
[INFO] Destination: /home/guriqbal/backups
[INFO] Creating archive: backup_20261005_215012.tar.gz
<span class="text-sage-400">✓ Compression completed: 4.2MB</span>
[INFO] Checking backup integrity... <span class="text-sage-400 font-semibold">[OK]</span>
[INFO] Pruning archives older than 7 days... (0 pruned)
<span class="text-sage-300">✔ Backup finished successfully! Log saved to /var/log/backup.log</span>
    `,

    'bash monitor.sh': `
<span class="text-sand-400 font-semibold">================ SYSTEM HEALTH CHECK ================</span>
<span class="text-mineral-400">Timestamp:</span> Mon Oct  5 21:52:00 IST 2026
<span class="text-mineral-400">Hostname :</span> ubuntu-cloud-lab

<span class="text-sand-300 font-medium">[CPU & LOAD]</span>
  Load average: 0.12, 0.08, 0.04 (Normal)

<span class="text-sand-300 font-medium">[MEMORY USAGE]</span>
  Total: 3912 MB | Used: 1240 MB | Free: 2110 MB (<span class="text-sage-400">31.6% used</span>)

<span class="text-sand-300 font-medium">[DISK SPACE (/)]</span>
  Size: 48 GB | Used: 9.8 GB | Avail: 36 GB (<span class="text-sage-400">21% used</span>)

<span class="text-sand-300 font-medium">[ACTIVE USERS]</span>
  guriqbal (pts/0)

<span class="text-sage-400 font-semibold">Status: All system parameters within healthy limits.</span>
=====================================================
    `,

    'cat roadmap.txt': `
<span class="text-sand-400 font-semibold">=== GURIQBAL'S 10-WEEK CLOUD & DEVOPS ROADMAP ===</span>
[✔] <span class="text-sage-400">Week 1:</span> Linux CLI, File System Navigation, Redirection & Pipes
[✔] <span class="text-sage-400">Week 2:</span> Bash Variables, Conditionals, Loops, Git & GitHub Workflows
[▶] <span class="text-sand-400 font-medium">Week 3:</span> Cron Automation, File Permissions, Basic Networking (CURRENT)
[ ] <span class="text-mineral-500">Week 4:</span> AWS Global Infra, IAM Users/Roles, First EC2 Instance
[ ] <span class="text-mineral-500">Week 5:</span> AWS S3 Buckets, Security Groups, VPC Subnets
[ ] <span class="text-mineral-500">Week 6:</span> Docker Basics & Writing Dockerfiles
[ ] <span class="text-mineral-500">Week 7:</span> Containerizing Web Apps & Multi-Container with Docker Compose
[ ] <span class="text-mineral-500">Week 8:</span> GitHub Actions CI/CD Basics
[ ] <span class="text-mineral-500">Week 9:</span> Terraform Foundations for AWS
[ ] <span class="text-mineral-500">Week 10:</span> AWS Certified Cloud Practitioner Revision & Mock Tests
    `,

    'cat backup.sh': `
<span class="text-mineral-500">#!/bin/bash
# backup.sh - Automated Directory Archiver
# Written by Guriqbal Singh (Week 2 Lab)</span>

<span class="text-sand-400">SRC_DIR</span>="\$HOME/workspace"
<span class="text-sand-400">DEST_DIR</span>="\$HOME/backups"
<span class="text-sand-400">TIMESTAMP</span>=\$(date +%Y%m%d_%H%M%S)
<span class="text-sand-400">ARCHIVE_NAME</span>="backup_\${TIMESTAMP}.tar.gz"

mkdir -p "\$DEST_DIR"
echo "Creating archive \$ARCHIVE_NAME..."
tar -czf "\$DEST_DIR/\$ARCHIVE_NAME" "\$SRC_DIR" 2>/dev/null

if [ \$? -eq 0 ]; then
  echo "Backup created successfully at \$DEST_DIR/\$ARCHIVE_NAME"
else
  echo "Backup failed!" >&2
  exit 1
fi
    `,

    'free -m': `
<span class="text-mineral-500">               total        used        free      shared  buff/cache   available</span>
<span class="text-mineral-200">Mem:            3912        1240        2110          18         562        2420</span>
<span class="text-mineral-200">Swap:           2048           0        2048</span>
    `,

    'uptime': `
<span class="text-mineral-200"> 21:53:14 up 3 days,  4:12,  1 user,  load average: 0.08, 0.05, 0.01</span>
    `,

    'contact': `
<span class="text-sand-400 font-semibold">Connect with Guriqbal Singh:</span>
• <span class="text-mineral-300">Email:</span> <a href="mailto:guriqbalsinghbal@outlook.com" class="text-sand-300 underline">guriqbalsinghbal@outlook.com</a>
• <span class="text-mineral-300">GitHub:</span> <a href="https://github.com/guriqbal-s" target="_blank" class="text-sand-300 underline">https://github.com/guriqbal-s</a>
• <span class="text-mineral-400">Phase:</span> Week 3 of learning - Open to study groups, mentorship & junior roles.
    `
  };

  function appendToTerminal(inputCmd, outputHtml) {
    if (!terminalScreen) return;

    if (inputCmd !== null) {
      const cmdRow = document.createElement('div');
      cmdRow.className = 'flex items-center gap-2 text-mineral-400';
      cmdRow.innerHTML = `<span class="text-sage-400 select-none">guriqbal@ubuntu:~$</span> <span class="text-mineral-100 font-medium">${escapeHtml(inputCmd)}</span>`;
      terminalScreen.appendChild(cmdRow);
    }

    if (outputHtml) {
      const outRow = document.createElement('div');
      outRow.className = 'text-mineral-300 pl-3.5 border-l border-charcoal-800 text-xs sm:text-sm whitespace-pre-wrap';
      outRow.innerHTML = outputHtml.trim();
      terminalScreen.appendChild(outRow);
    }

    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function executeCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();

    // Handle clear
    if (lower === 'clear') {
      terminalScreen.innerHTML = '';
      return;
    }

    // Lookup command
    let response = commandResponses[lower];
    if (!response) {
      response = `<span class="text-stone-400">bash: command not found: ${escapeHtml(trimmed)}</span>\n<span class="text-mineral-500">Type <span class="text-sand-400">'help'</span> to see available commands or click the buttons above.</span>`;
    }

    appendToTerminal(trimmed, response);
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      if (val.trim()) {
        commandHistory.push(val);
        historyIndex = commandHistory.length;
        executeCommand(val);
        terminalInput.value = '';
      }
    });

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  // Clear button
  if (clearBtn && terminalScreen) {
    clearBtn.addEventListener('click', () => {
      terminalScreen.innerHTML = `
        <div class="text-mineral-500"># Screen cleared. Type <span class="text-sand-400">'help'</span> for available commands.</div>
      `;
    });
  }

  // Preset Buttons
  cmdPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        if (terminalInput) {
          terminalInput.value = cmd;
        }
        executeCommand(cmd);
      }
    });
  });
});
