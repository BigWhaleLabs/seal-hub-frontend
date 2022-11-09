import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const commonPath = classnames(strokeWidth('stroke-1.5'))
const pathClasses = classnames(commonPath, stroke('stroke-accent'))

export default function () {
  return (
    <svg
      width="52"
      height="64"
      viewBox="0 0 52 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.2333 51.9946C16.3427 49.7028 9.77344 41.6197 9.77344 31.9999C9.77344 22.3801 16.3427 14.297 25.2333 12.0051M35.5399 51.9946C44.4305 49.7028 50.9998 41.6197 50.9998 31.9999C50.9998 22.3801 44.4305 14.297 35.5399 12.0051"
        stroke="url(#paint0_linear_19_6050)"
        className={commonPath}
      />
      <path
        d="M33.9774 27.6558C33.9774 25.4942 35.6798 23.742 37.7797 23.742C39.8797 23.742 41.582 25.4942 41.582 27.6558C41.582 29.8173 39.8797 27.6558 37.7797 27.6558C35.6798 27.6558 33.9774 29.8173 33.9774 27.6558Z"
        className={pathClasses}
      />
      <path
        d="M30.301 34.7858C31.722 34.7858 32.8739 34.9564 32.8739 33.324C32.8739 31.6916 31.722 30.3682 30.301 30.3682C28.88 30.3682 27.7281 31.6916 27.7281 33.324C27.7281 34.9564 28.88 34.7858 30.301 34.7858ZM30.301 34.7858C30.301 35.7675 30.301 37.9517 30.301 38.8352M30.301 38.8352C30.301 41.7802 33.9766 41.7802 33.9766 38.8352M30.301 38.8352C30.301 41.7802 26.6255 41.7802 26.6255 38.8352"
        className={pathClasses}
      />
      <path
        d="M19.2782 27.6558C19.2782 25.4942 20.9806 23.742 23.0805 23.742C25.1805 23.742 26.8828 25.4942 26.8828 27.6558C26.8828 29.8173 25.1805 27.6558 23.0805 27.6558C20.9806 27.6558 19.2782 29.8173 19.2782 27.6558Z"
        className={pathClasses}
      />
      <path d="M42.063 34.7859L37.6523 35.5221" className={pathClasses} />
      <path d="M37.6557 37.7307L42.0664 38.467" className={pathClasses} />
      <path d="M18.5386 34.7854L22.9492 35.5217" className={pathClasses} />
      <path d="M22.9497 37.7305L18.5391 38.4667" className={pathClasses} />
      <path
        d="M27.4969 18.0645L28.9249 16.6343C29.8609 15.6969 30.3867 14.4263 30.3867 13.1015V9.22673C30.3867 5.88978 26.3173 4.25788 24.0117 6.67025V6.67025C23.1529 7.56882 21.9003 7.97616 20.6772 7.7546L16.749 7.04299C13.9465 6.53531 11.2866 8.46768 10.9032 11.2899L10.4571 14.5737C10.2314 16.2355 9.18755 17.6735 7.67742 18.4029L4.69759 19.8423C2.13608 21.0796 1.12156 24.2018 2.46649 26.7085L4.03724 29.6361C4.82939 31.1125 4.82939 32.8875 4.03724 34.3639L2.46649 37.2915C1.12156 39.7982 2.13608 42.9204 4.69759 44.1577L7.67742 45.5971C9.18754 46.3265 10.2314 47.7645 10.4571 49.4263L10.9032 52.7101C11.2866 55.5323 13.9465 57.4647 16.749 56.957L20.6772 56.2454C21.9003 56.0238 23.1529 56.4312 24.0117 57.3297V57.3297C26.3173 59.7421 30.3867 58.1102 30.3867 54.7733V52.0477C30.3867 50.7778 30.8906 49.5598 31.7879 48.6611L33.4786 46.9677"
        stroke="url(#paint1_linear_19_6050)"
        className={commonPath}
      />
      <defs>
        <linearGradient
          id="paint0_linear_19_6050"
          x1="49.36"
          y1="43.30"
          x2="9.77"
          y2="43.30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--primary-bright)" />
          <stop offset="1" stop-color="var(--tertiary)" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_19_6050"
          x1="32.15"
          y1="50.08"
          x2="-3.88"
          y2="50.08"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="var(--primary-bright)" />
          <stop offset="1" stop-color="var(--tertiary)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
