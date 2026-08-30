# Gita Journal — Contemplative Private Journaling

A private, contemplative journaling web application that integrates Google Firebase Authentication, Cloud Firestore, the Gemini API, and a fixed, developer-verified Bhagavad Gita scripture dataset.

---

## Key Features

1. **Private, Dated Journaling**: Dedicated sacred writing canvas with date/time stamps, rich typography (Cinzel & Lora), and unhurried design.
2. **Socratic Inquiry**: Asks a single, compassionate clarifying question before offering solutions, helping users uncover root attachments or assumptions.
3. **Verified Scripture Canon**: Strictly references a fixed, developer-curated dataset of authentic Bhagavad Gita verses (exact Sanskrit, Transliteration, verified Chapter:Verse, and English translations). AI is strictly forbidden from hallucinating or fabricating verses.
4. **Grounded Practical Guidance**: Margin reflections and commentary directly anchored to the selected verse.
5. **Pattern Recall**: Detects emotional echoes and recurring themes across the user's past journal history ("You reflected on something like this before...").
6. **Crisis & Care Safeguards**: Immediate compassionate support and 24/7 verified hotline resources if acute distress is detected, prioritizing immediate human care over scripture.
7. **Zero-Trust User Isolation**: All Firestore reads/writes are locked strictly to the authenticated user ID (`request.auth.uid == userId`).

---

## 5 Threat Zones Analysis & Security Standard

| Threat Zone | Specific Risk Analyzed | Architectural Countermeasure | OWASP / LLM Ref |
| :--- | :--- | :--- | :--- |
| **1. Input Surfaces** | Prompt injection, payload tampering, payload overload | 5MB Express body parser limits, strict schema validation, and parameterization. | OWASP LLM01 / A03 |
| **2. Planning & Reasoning** | Hallucinated verses, fabricated chapter citations | Fixed developer-verified verse dataset; Gemini is bound strictly to retrieval grounding. | LLM09 Scriptural Grounding |
| **3. Tool & Execution** | Model outage (503/429/500), rate limiting | Multi-model resilience fallback ladder (`gemini-3.6-flash` → `gemini-3.1-flash-lite` → `gemini-flash-latest` → `gemini-3.7-flash`). | LLM04 Model Resilience |
| **4. Memory & State** | Cross-tenant data leaks, unauthorized reads/writes | Firestore owner-bound security rules (`request.auth.uid == userId`). Zero insecure defaults. | OWASP A01 / A05 |
| **5. Secret Management** | Exposure of API keys in browser client | Server-side `/api/reflect` proxy; Gemini API key kept strictly in backend `process.env`. | OWASP A02 / Zero-Hardcoding |

---

## Environment Setup & Secrets

Create a `.env` file in the root directory:

```env
# Gemini API Key (Server-side only)
GEMINI_API_KEY="your-gemini-api-key"

# App URL for hosting
APP_URL="http://localhost:3000"
```

---

## Firebase Firestore Security Rules

Deploy rules via `deploy_firebase` or Firebase CLI:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /entries/{entryId} {
        allow read, write, delete: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Development & Production Commands

- **Start Dev Server**: `npm run dev` (starts on `http://0.0.0.0:3000`)
- **Type Check & Lint**: `npm run lint`
- **Production Build**: `npm run build`
- **Production Start**: `npm start`
