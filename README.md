# NairaVault Bank 🏦

**Nigeria's most secure digital bank — serious, corporate, unmistakably a bank.**

> Built by Nkechi Anna Ahanonye | Cloud & DevOps Engineer | April 2026

---

## 🗂️ Project Structure

```
nairavault/
├── index.html          ← App entry point (HTML structure & screens)
├── src/
│   ├── css/
│   │   └── style.css   ← All styles & design tokens
│   └── js/
│       └── app.js      ← All logic, data & interactivity
├── images/             ← Icons, screenshots (add here)
└── README.md           ← You are here
```

---

## 📱 Screens

| Screen     | Description                                              |
|------------|----------------------------------------------------------|
| **Login**  | CBN-licensed badge, bank logo, secure sign-in form       |
| **Dashboard** | Debit card with chip, account number, quick transfer to GTB/UBA/Zenith/Access etc., recent transactions |
| **Send Money** | Bank selector, 10-digit account lookup, transfer summary, fee breakdown |
| **History**    | Filterable transaction history (All / Credits / Debits / Transfers / Bills) |
| **Profile**    | KYC verified status, Tier 3 account info, settings menu |

---

## 🎨 Design System

| Token        | Value     | Usage                        |
|--------------|-----------|------------------------------|
| `--navy`     | `#0A1628` | Primary background, topbar   |
| `--gold`     | `#B8860B` | Accent, nav indicator, logo  |
| `--success`  | `#0F7B3F` | Credit amounts, verified      |
| `--danger`   | `#C0392B` | Debit amounts, errors         |
| `--off-white`| `#F4F6FA` | App background                |

**Fonts:** Cormorant Garamond (display) · Source Sans 3 (body)

---

## 🚀 Running Locally

```bash
# Option 1 — Python (no install needed)
python3 -m http.server 8080
# Open: http://localhost:8080

# Option 2 — VS Code Live Server
# Install Live Server extension → Right-click index.html → Open with Live Server
```

---

## 🌐 GitHub Pages Deployment

```bash
git add .
git commit -m "NairaVault Bank v1.0"
git push origin main
```
Settings → Pages → Source: `main` branch → `/root` → Save

Live at: `https://nkydigitech.github.io/nairavault`

---

## ✅ Features

- [x] Mobile-first responsive design (max-width 430px)
- [x] Real debit card with EMV chip SVG
- [x] Account number copy to clipboard
- [x] Nigerian bank logos — GTBank, UBA, Zenith, Access, First Bank, Fidelity, Sterling, Polaris
- [x] 10-digit account number lookup with verified badge
- [x] Transfer fee calculation (₦10.75 NEFT fee)
- [x] Transaction history with date groups & filters
- [x] Success modal with unique transaction reference
- [x] CSS design token system
- [x] Separated HTML / CSS / JS architecture

---

## 📄 License

MIT — Free to use, fork, and build on.

---

*Built for LinkedIn showcase · NairaVault Bank · NairaVault Commercial Bank · CBN Licensed (Demo)*
