import React, { useState } from 'react';

const PLANS = [
  { id: 'premium_boards', name: 'Premium Boards Level', price: '₹499/mo', color: '#ff4d6d', features: ['Unlimited Physics/Math Chats', 'CBSE Style Guide Matching', 'Full Miss Rosie & Mr. Sirus Core Access'] },
  { id: 'elite_companion', name: 'Elite AI Companion', price: '₹999/mo', color: '#b7094c', features: ['Everything in Premium', 'SHA-256 Signature Isolation', 'Custom Voice/Anime Portrait Modules'] }
];

export default function App() {
  const [userTier, setUserTier] = useState<'free_sandbox' | 'premium_boards'>('free_sandbox');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const triggerSecureStripeCheckout = async (planId: string) => {
    setIsCheckoutLoading(true);
    try {
      // Direct network routing block pointing straight to your billing function nodes
      console.log(`Initializing network signature loop for plan element parameter target: ${planId}`);
      // Simulate Stripe redirection framework matrix delay
      setTimeout(() => {
        alert("Redirecting securely to Stripe Payment Gateway Node...");
        setIsCheckoutLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Billing pipeline routing exception caught:", error);
      setIsCheckoutLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b090a', color: '#f5f3f4', minHeight: '100vh', fontFamily: 'monospace', padding: '16px' }}>
      {/* Monetization Tracking Dashboard Header */}
      <div style={{ borderBottom: '1px solid #ff4d6d', paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#ff4d6d', margin: 0, fontSize: '20px', letterSpacing: '2px' }}>GENESIS AI PRO TERMINAL</h1>
          <small style={{ color: '#a4161a' }}>Account Status: <span style={{ color: userTier === 'free_sandbox' ? '#ffb703' : '#52b788', fontWeight: 'bold' }}>{userTier.toUpperCase()}</span></small>
        </div>
      </div>

      {userTier === 'free_sandbox' ? (
        /* Premium Upgrade Dynamic Wall Grid Panel Container */
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#ff4d6d', fontSize: '18px', marginBottom: '8px' }}>🔓 UNLOCK ACADEMIC FACULTY CORE ENGINE</h2>
          <p style={{ color: '#adb5bd', fontSize: '12px', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: '1.5' }}>
            Your free sandbox testing credits are spent. Upgrade your learning terminal connection stream to unlock unthrottled access to formally dressed anime faculty mentors.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
            {PLANS.map((plan) => (
              <div key={plan.id} style={{ backgroundColor: '#161a1d', border: `1px solid ${plan.color}`, borderRadius: '6px', padding: '16px', textAlign: 'left', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', color: plan.color }}>{plan.name}</h3>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#52b788' }}>{plan.price}</span>
                </div>
                <ul style={{ margin: '0 0 16px 0', paddingLeft: '18px', fontSize: '11px', color: '#adb5bd', lineHeight: '1.6' }}>
                  {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <button
                  onClick={() => triggerSecureStripeCheckout(plan.id)}
                  disabled={isCheckoutLoading}
                  style={{ width: '100%', backgroundColor: plan.color, color: '#0b090a', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                >
                  {isCheckoutLoading ? 'GENERATING SECURE LINK...' : `SUBSCRIBE TO ${plan.name.toUpperCase()}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ color: '#52b788' }}>Premium Platform Core Active — Classroom Streams Engaged.</div>
      )}
    </div>
  );
}
