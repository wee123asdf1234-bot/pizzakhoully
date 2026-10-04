import React from 'react';

/**
 * Official validated phone number for بيتزا الخولي
 * MUST ALWAYS be the exact string "0473251430"
 */
export const OFFICIAL_PHONE_NUMBER = '0473251430' as const;
export const OFFICIAL_TEL_HREF = 'tel:0473251430' as const;

// Automated integrity check at runtime
if (OFFICIAL_PHONE_NUMBER !== '0473251430') {
  console.error(
    `[CRITICAL BUG] Phone number sequence corrupted: expected "0473251430", got "${OFFICIAL_PHONE_NUMBER}"`
  );
}

interface PhoneNumberProps {
  className?: string;
  asLink?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

/**
 * PhoneNumber Component
 * Renders the phone number in strict LTR orientation with Unicode bidirectional isolation
 * so that it is NEVER reversed, mirrored, or scrambled in RTL Arabic context.
 */
export const PhoneNumber: React.FC<PhoneNumberProps> = ({
  className = '',
  asLink = false,
  prefix,
  suffix,
}) => {
  const renderedNumber = (
    <span
      dir="ltr"
      className={`phone-number font-mono tracking-normal ${className}`}
      style={{
        direction: 'ltr',
        unicodeBidi: 'isolate',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
    >
      {'\u2066'}{OFFICIAL_PHONE_NUMBER}{'\u2069'}
    </span>
  );

  if (asLink) {
    return (
      <a
        href={OFFICIAL_TEL_HREF}
        dir="ltr"
        className={`inline-flex items-center gap-1 ${className}`}
        style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
        title={`اتصل بنا: ${OFFICIAL_PHONE_NUMBER}`}
      >
        {prefix}
        {renderedNumber}
        {suffix}
      </a>
    );
  }

  return (
    <span
      dir="ltr"
      style={{ direction: 'ltr', unicodeBidi: 'isolate', display: 'inline-flex', alignItems: 'center' }}
    >
      {prefix}
      {renderedNumber}
      {suffix}
    </span>
  );
};
