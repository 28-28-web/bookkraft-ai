'use client';

import Link from 'next/link';
import { TOOL_CREDIT_COSTS } from '@/lib/constants';

/**
 * CreditDisplay — Shows credit cost and balance before AI tool submit
 */
export default function CreditDisplay({ toolSlug, balance = 0, isLifetime = false }) {
    const cost = TOOL_CREDIT_COSTS[toolSlug];
    if (!cost) return null; // Logic/free tools don't need this

    const hasEnough = isLifetime || balance >= cost;

    return (
        <div className="credit-display" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: hasEnough ? 'var(--gold-light)' : 'var(--rust-bg, #FEF2F2)',
            border: `1px solid ${hasEnough ? 'var(--border)' : '#FECACA'}`,
            borderRadius: 'var(--radius)',
            marginBottom: 'var(--space-4)',
            fontSize: 'var(--text-sm)',
        }}>
            <span style={{ color: 'var(--ink)' }}>
                {isLifetime ? (
                    'Lifetime Access — unlimited runs'
                ) : (
                    <>This tool costs <strong style={{ color: 'var(--gold)' }}>{cost} credit{cost !== 1 ? 's' : ''}</strong></>
                )}
            </span>
            {!isLifetime && (
                <span style={{ color: hasEnough ? 'var(--mid)' : 'var(--rust)' }}>
                    Your balance: <strong>{balance}</strong>
                    {!hasEnough && (
                        <Link href="/pricing#credits" style={{
                            marginLeft: '8px',
                            color: 'var(--gold)',
                            fontWeight: 500,
                            textDecoration: 'underline',
                        }}>
                            Top Up
                        </Link>
                    )}
                </span>
            )}
        </div>
    );
}
