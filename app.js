/* ─────────────────────────────────────
   NairaVault Bank — app.js
   Author: Nkechi Anna Ahanonye
   Version: 1.0
───────────────────────────────────── */

const App = (() => {

  /* ── DATA ── */
  const BANKS = [
    { code:'GTB',  label:'GTBank',    cls:'bg-gtb'      },
    { code:'UBA',  label:'UBA',       cls:'bg-uba'      },
    { code:'ZEN',  label:'Zenith',    cls:'bg-zenith'   },
    { code:'ACC',  label:'Access',    cls:'bg-access'   },
    { code:'FBN',  label:'First Bank',cls:'bg-first'    },
    { code:'FID',  label:'Fidelity',  cls:'bg-fidelity' },
    { code:'STL',  label:'Sterling',  cls:'bg-sterling' },
    { code:'POL',  label:'Polaris',   cls:'bg-polaris'  },
  ];

  const ACCOUNTS = {
    '0587432109': 'Adaeze Okonkwo',
    '0812345678': 'Emeka Nwosu',
    '0123678901': 'Fatima Aliyu',
    '0111222333': 'Chukwuemeka Obi',
    '0987654321': 'Kelechi Ugwu',
    '0765432100': 'Bimpe Adeyemi',
  };

  const TRANSACTIONS = [
    { icon:'GTB',    iconCls:'bg-gtb',     name:'Transfer to Adaeze O.',  desc:'GTBank · 0587432109',          type:'transfer', amount:'-₦50,000',   cls:'dr', time:'Today, 9:14 AM'       },
    { icon:'💼',     iconCls:'bg-salary',  name:'Salary Credit',           desc:'CloudAdvisory Ltd · NEFT',     type:'credit',   amount:'+₦380,000',  cls:'cr', time:'Yesterday, 8:00 AM'   },
    { icon:'ACC',    iconCls:'bg-access',  name:'Transfer to Emeka N.',    desc:'Access Bank · 0812345678',     type:'transfer', amount:'-₦25,000',   cls:'dr', time:'Apr 20, 3:22 PM'      },
    { icon:'⚡',     iconCls:'bg-bill',    name:'EKEDC Token Purchase',     desc:'Electricity · Bill Payment',   type:'bill',     amount:'-₦20,000',   cls:'dr', time:'Apr 18, 6:10 PM'      },
    { icon:'ZEN',    iconCls:'bg-zenith',  name:'Transfer from Kelechi U.', desc:'Zenith Bank · Inward NEFT',   type:'credit',   amount:'+₦120,000',  cls:'cr', time:'Apr 17, 11:40 AM'     },
  ];

  const HISTORY_GROUPS = [
    {
      label: 'Today — April 24, 2026',
      rows: [
        { icon:'GTB',  iconCls:'bg-gtb',     name:'Transfer to Adaeze O.', desc:'GTBank · 0587432109 · NEFT',    type:'transfer', amount:'-₦50,000',  cls:'dr', time:'9:14 AM'  },
        { icon:'📱',   iconCls:'bg-airtime',  name:'MTN Airtime',           desc:'Airtime Recharge · 08012345678', type:'bill',    amount:'-₦5,000',   cls:'dr', time:'7:32 AM'  },
      ]
    },
    {
      label: 'Yesterday — April 23, 2026',
      rows: [
        { icon:'💼',   iconCls:'bg-salary',  name:'Salary Credit',          desc:'CloudAdvisory Ltd · NEFT',     type:'credit',   amount:'+₦380,000', cls:'cr', time:'8:00 AM'  },
        { icon:'UBA',  iconCls:'bg-uba',     name:'Transfer to Fatima A.',   desc:'UBA · 0123678901 · NEFT',      type:'transfer', amount:'-₦15,000',  cls:'dr', time:'2:45 PM'  },
      ]
    },
    {
      label: 'April 20, 2026',
      rows: [
        { icon:'ACC',  iconCls:'bg-access',  name:'Transfer to Emeka N.',   desc:'Access Bank · 0812345678',     type:'transfer', amount:'-₦25,000',  cls:'dr', time:'3:22 PM'  },
        { icon:'⚡',   iconCls:'bg-bill',    name:'EKEDC Token',             desc:'Electricity · Bill Payment',   type:'bill',     amount:'-₦20,000',  cls:'dr', time:'6:10 PM'  },
        { icon:'ZEN',  iconCls:'bg-zenith',  name:'Transfer from Kelechi U.',desc:'Zenith Bank · Inward Transfer', type:'credit',  amount:'+₦120,000', cls:'cr', time:'11:40 AM' },
      ]
    },
  ];

  const PROFILE_MENU = [
    { icon:'🔔', title:'Notifications',    sub:'SMS, email & push alerts'          },
    { icon:'🔐', title:'Security Settings', sub:'PIN, password, biometrics'         },
    { icon:'💳', title:'Card Management',   sub:'Block, unblock, set limits'        },
    { icon:'📋', title:'Account Statement', sub:'Download PDF statement'            },
    { icon:'🏦', title:'Linked Accounts',   sub:'Manage other bank accounts'        },
    { icon:'🚪', title:'Sign Out',          sub:'Nkechi Anna Ahanonye', danger:true, action:"App.go('login')" },
  ];

  /* ── STATE ── */
  let selectedBank = BANKS[0].label;

  /* ── HELPERS ── */
  function buildTxnRow(t) {
    const isEmoji = t.icon.length <= 2 && /\p{Emoji}/u.test(t.icon);
    const iconContent = isEmoji
      ? `<span style="font-size:18px">${t.icon}</span>`
      : t.icon;
    return `
      <div class="txn-row">
        <div class="txn-icon-wrap ${t.iconCls}">${iconContent}</div>
        <div class="txn-info">
          <div class="txn-name">${t.name}</div>
          <div class="txn-desc">${t.desc}</div>
        </div>
        <div class="txn-right">
          <div class="txn-amount ${t.cls}">${t.amount}</div>
          <div class="txn-time">${t.time}</div>
        </div>
      </div>`;
  }

  /* ── INIT ── */
  function init() {
    buildQuickBanks();
    buildDashTxns();
    buildBankSelector();
    buildHistoryBody();
    buildProfileMenu();
    go('login');
  }

  function buildQuickBanks() {
    const el = document.getElementById('quick-banks');
    if (!el) return;
    el.innerHTML = BANKS.map(b => `
      <div class="qt-bank" onclick="App.go('transfer')">
        <div class="qt-logo ${b.cls}">${b.code}</div>
        <div class="qt-label">${b.label}</div>
      </div>`).join('');
  }

  function buildDashTxns() {
    const el = document.getElementById('dash-txns');
    if (!el) return;
    el.innerHTML = `<div class="txn-card">${TRANSACTIONS.map(buildTxnRow).join('')}</div>`;
  }

  function buildBankSelector() {
    const el = document.getElementById('bank-selector');
    if (!el) return;
    el.innerHTML = BANKS.map((b, i) => `
      <div class="bank-sel-item ${i === 0 ? 'selected' : ''}" onclick="App.selBank(this,'${b.label}')">
        <div class="bank-sel-logo ${b.cls}">${b.code}</div>
        <div class="bank-sel-label">${b.label}</div>
      </div>`).join('');
  }

  function buildHistoryBody() {
    const el = document.getElementById('history-body');
    if (!el) return;
    el.innerHTML = HISTORY_GROUPS.map((g, gi) => `
      <div class="history-group" style="${gi > 0 ? 'margin-top:16px' : ''}">
        <div class="history-group-label">${g.label}</div>
        <div class="history-card">${g.rows.map(buildTxnRow).join('')}</div>
      </div>`).join('') + '<div style="height:16px"></div>';
  }

  function buildProfileMenu() {
    const el = document.getElementById('profile-menu');
    if (!el) return;
    el.innerHTML = PROFILE_MENU.map(item => `
      <div class="pm-item" ${item.action ? `onclick="${item.action}"` : ''}>
        <div class="pm-icon">${item.icon}</div>
        <div class="pm-text">
          <div class="pm-title ${item.danger ? 'danger' : ''}">${item.title}</div>
          <div class="pm-sub">${item.sub}</div>
        </div>
        <div class="pm-arrow">›</div>
      </div>`).join('');
  }

  /* ── NAVIGATION ── */
  function go(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('s-' + id);
    if (target) target.classList.add('active');

    const nav = document.getElementById('bnav');
    if (nav) nav.style.display = id === 'login' ? 'none' : 'flex';

    document.querySelectorAll('.nav-item[data-s]').forEach(n => {
      n.classList.toggle('active', n.dataset.s === id);
    });

    if (target) target.scrollTop = 0;
  }

  /* ── COPY ACCOUNT ── */
  function copyAcct(btn) {
    navigator.clipboard?.writeText('0123456789').catch(() => {});
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:13px;height:13px">
        <polyline points="20 6 9 17 4 12"/>
      </svg> Copied!`;
    btn.style.background = 'var(--navy)';
    btn.style.color = 'var(--white)';
    setTimeout(() => {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:13px;height:13px">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg> Copy`;
      btn.style.background = '';
      btn.style.color = '';
    }, 2200);
  }

  /* ── BANK SELECTOR ── */
  function selBank(el, name) {
    document.querySelectorAll('.bank-sel-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    selectedBank = name;
    const sumBank = document.getElementById('sum-bank');
    if (sumBank) sumBank.textContent = name;
  }

  /* ── ACCOUNT VERIFY ── */
  function checkAcct(inp) {
    const badge   = document.getElementById('verified-badge');
    const nameEl  = document.getElementById('verified-name');
    const sumName = document.getElementById('sum-name');

    if (inp.value.length === 10) {
      const name = ACCOUNTS[inp.value] || 'Verified Account Holder';
      if (nameEl)  nameEl.textContent  = `${name} · ${selectedBank}`;
      if (sumName) sumName.textContent = name;
      if (badge)   badge.style.display = 'flex';
      updateSummary();
    } else {
      if (badge)   badge.style.display = 'none';
      const summary = document.getElementById('tf-summary');
      if (summary) summary.style.display = 'none';
    }
  }

  function updateSummary() {
    const amtInput  = document.getElementById('tf-amount');
    const acctInput = document.getElementById('tf-acct');
    const summary   = document.getElementById('tf-summary');
    const sumAmt    = document.getElementById('sum-amount');
    const sumTotal  = document.getElementById('sum-total');

    const amt  = parseFloat(amtInput?.value)  || 0;
    const acct = acctInput?.value || '';

    if (amt > 0 && acct.length === 10 && summary) {
      summary.style.display = 'block';
      if (sumAmt)   sumAmt.textContent   = '₦' + amt.toLocaleString('en-NG', { minimumFractionDigits: 2 });
      if (sumTotal) sumTotal.textContent = '₦' + (amt + 10.75).toLocaleString('en-NG', { minimumFractionDigits: 2 });
    }
  }

  /* ── TRANSFER ── */
  function doTransfer() {
    const acctInput = document.getElementById('tf-acct');
    const amtInput  = document.getElementById('tf-amount');
    const acct = acctInput?.value || '';
    const amt  = parseFloat(amtInput?.value) || 0;

    if (acct.length !== 10) { alert('Please enter a valid 10-digit account number.'); return; }
    if (amt <= 0)            { alert('Please enter a valid amount.'); return; }

    const name = document.getElementById('sum-name')?.textContent || 'Recipient';

    const mAmt  = document.getElementById('m-amount');
    const mRec  = document.getElementById('m-recipient');
    const mRef  = document.getElementById('m-ref');
    const modal = document.getElementById('success-modal');

    if (mAmt)  mAmt.textContent  = '₦' + amt.toLocaleString('en-NG', { minimumFractionDigits: 2 });
    if (mRec)  mRec.textContent  = `${name} · ${selectedBank}`;
    if (mRef)  mRef.textContent  = 'NV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    if (modal) modal.classList.add('show');
  }

  function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.remove('show');

    ['tf-acct','tf-amount','tf-narr'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    const badge   = document.getElementById('verified-badge');
    const summary = document.getElementById('tf-summary');
    if (badge)   badge.style.display   = 'none';
    if (summary) summary.style.display = 'none';

    go('dash');
  }

  /* ── HISTORY FILTER ── */
  function setFilter(el, type) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');

    const histBody = document.getElementById('history-body');
    if (!histBody) return;

    if (type === 'all') {
      buildHistoryBody();
      return;
    }

    // Filter all rows across all groups
    const filtered = [];
    HISTORY_GROUPS.forEach(g => {
      const rows = g.rows.filter(r => {
        if (type === 'credit')   return r.cls === 'cr';
        if (type === 'debit')    return r.cls === 'dr';
        if (type === 'transfer') return r.type === 'transfer';
        if (type === 'bill')     return r.type === 'bill';
        return true;
      });
      if (rows.length) filtered.push({ label: g.label, rows });
    });

    if (!filtered.length) {
      histBody.innerHTML = `<div style="text-align:center;padding:48px 20px;color:var(--slate);font-size:15px;font-weight:600">No transactions found</div>`;
      return;
    }

    histBody.innerHTML = filtered.map((g, gi) => `
      <div class="history-group" style="${gi > 0 ? 'margin-top:16px' : ''}">
        <div class="history-group-label">${g.label}</div>
        <div class="history-card">${g.rows.map(buildTxnRow).join('')}</div>
      </div>`).join('') + '<div style="height:16px"></div>';
  }

  /* ── PUBLIC API ── */
  return { init, go, copyAcct, selBank, checkAcct, updateSummary, doTransfer, closeModal, setFilter };

})();

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', App.init);
